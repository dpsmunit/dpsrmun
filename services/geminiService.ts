import { GoogleGenAI, Chat } from "@google/genai";

const API_KEYS = [
  import.meta.env.VITE_GEMINI_API_1,
  import.meta.env.VITE_GEMINI_API_2,
  import.meta.env.VITE_GEMINI_API_3,
  // Add more as needed
];

interface ApiKeyStatus {
  index: number;
  isHealthy: boolean;
  lastUsed: Date | null;
  errorCount: number;
  lastError: string | null;
}

let aiInstances: GoogleGenAI[] = [];
let chatSessions: Chat[] = [];
let systemInstructions: string[] = [];
let currentKeyIndex = 0;
let apiKeyStatuses: ApiKeyStatus[] = [];
let initializationPromise: Promise<void> | null = null;

// Configuration
const MAX_RETRIES = 3;
const ERROR_THRESHOLD = 5;
const HEALTH_CHECK_INTERVAL = 300000; // 5 minutes
const PERSONALITY_FILE = '/personality.txt'; // Served from Vite's public directory
const KNOWLEDGE_FILE = '/knowledge.txt';   // Served from Vite's public directory

const initializeAiInstances = async (): Promise<void> => {
  if (API_KEYS.length === 0 || API_KEYS.every(key => !key || key.includes('your-api-key'))) {
    console.error("No valid API keys found.");
    throw new Error("API Keys are missing. Please configure them to use the chat feature.");
  }

  const validKeys = API_KEYS.filter(key => key && !key.includes('your-api-key'));
  
  if (validKeys.length === 0) {
    throw new Error("No valid API keys configured. Please replace placeholder keys with actual API keys.");
  }

  aiInstances = validKeys.map(apiKey => new GoogleGenAI({ apiKey }));
  chatSessions = new Array(aiInstances.length).fill(null);
  systemInstructions = new Array(aiInstances.length).fill('');
  
  apiKeyStatuses = validKeys.map((_, index) => ({
    index,
    isHealthy: true,
    lastUsed: null,
    errorCount: 0,
    lastError: null
  }));
  
  console.log(`✅ Initialized ${aiInstances.length} AI instances with round-robin load balancing.`);
};

const fetchSystemInstruction = async (keyIndex: number): Promise<string> => {
  try {
    console.log(`📥 Loading system instruction files for API key ${keyIndex + 1}...`);
    
    const [personalityRes, knowledgeRes] = await Promise.all([
      fetch(PERSONALITY_FILE, { cache: 'no-store' }), // Prevent caching issues
      fetch(KNOWLEDGE_FILE, { cache: 'no-store' })
    ]);

    if (!personalityRes.ok || !knowledgeRes.ok) {
      throw new Error(`Failed to fetch AI configuration files for key ${keyIndex + 1}. Status: ${personalityRes.status}/${knowledgeRes.status}`);
    }

    const personality = await personalityRes.text();
    const knowledge = await knowledgeRes.text();

    // Validate content is not HTML
    if (personality.trim().startsWith('<!DOCTYPE') || knowledge.trim().startsWith('<!DOCTYPE')) {
      throw new Error(`Invalid system instruction for key ${keyIndex + 1}: Files contain HTML content, expected plain text. Check ${PERSONALITY_FILE} and ${KNOWLEDGE_FILE} in the public directory.`);
    }

    const systemInstruction = `${personality}\n\nHere is your knowledge base:\n${knowledge}`;
    console.log(`✅ System instruction loaded for API key ${keyIndex + 1}:\n${systemInstruction.substring(0, 100)}...`);
    return systemInstruction;
  } catch (error) {
    console.error(`❌ Error loading system instruction for API key ${keyIndex + 1}:`, error);
    throw new Error(`Could not load AI personality for key ${keyIndex + 1}. Ensure ${PERSONALITY_FILE} and ${KNOWLEDGE_FILE} are plain text files in the public directory.`);
  }
};

const createChatSession = async (aiInstance: GoogleGenAI, keyIndex: number): Promise<Chat> => {
  try {
    const systemInstruction = await fetchSystemInstruction(keyIndex);
    systemInstructions[keyIndex] = systemInstruction;
    
    const chatSession = aiInstance.chats.create({
      model: 'gemini-2.0-flash',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 500,
      },
    });
    
    console.log(`🔗 Created new chat session for API key ${keyIndex + 1} with system instruction.`);
    return chatSession;
  } catch (error) {
    markApiKeyUnhealthy(keyIndex, `Chat creation failed: ${error}`);
    throw error;
  }
};

const markApiKeyUnhealthy = (keyIndex: number, error: string): void => {
  if (apiKeyStatuses[keyIndex]) {
    apiKeyStatuses[keyIndex].errorCount++;
    apiKeyStatuses[keyIndex].lastError = error;
    
    if (apiKeyStatuses[keyIndex].errorCount >= ERROR_THRESHOLD) {
      apiKeyStatuses[keyIndex].isHealthy = false;
      console.warn(`⚠️ API key ${keyIndex + 1} marked as unhealthy after ${ERROR_THRESHOLD} errors.`);
    }
  }
};

const getHealthyKeyIndex = (): number => {
  const healthyKeys = apiKeyStatuses.filter(status => status.isHealthy);
  
  if (healthyKeys.length === 0) {
    console.log("🔄 Resetting all API key health status (circuit breaker).");
    apiKeyStatuses.forEach(status => {
      status.isHealthy = true;
      status.errorCount = 0;
    });
    return currentKeyIndex;
  }
  
  let attempts = 0;
  while (attempts < aiInstances.length) {
    if (apiKeyStatuses[currentKeyIndex]?.isHealthy) {
      return currentKeyIndex;
    }
    currentKeyIndex = (currentKeyIndex + 1) % aiInstances.length;
    attempts++;
  }
  
  return currentKeyIndex;
};

const ensureInitialization = async (): Promise<void> => {
  if (!initializationPromise) {
    initializationPromise = initializeAiInstances();
  }
  
  return initializationPromise;
};

const getNextChatSession = async (): Promise<{ session: Chat; keyIndex: number }> => {
  await ensureInitialization();

  const keyIndex = getHealthyKeyIndex();
  const currentAi = aiInstances[keyIndex];
  
  if (!chatSessions[keyIndex]) {
    chatSessions[keyIndex] = await createChatSession(currentAi, keyIndex);
  }

  const currentChat = chatSessions[keyIndex];
  
  if (apiKeyStatuses[keyIndex]) {
    apiKeyStatuses[keyIndex].lastUsed = new Date();
  }
  
  currentKeyIndex = (currentKeyIndex + 1) % aiInstances.length;
  
  console.log(`🎯 Using chat session ${keyIndex + 1} of ${aiInstances.length}`);
  
  return { session: currentChat, keyIndex };
};

export const resetChat = (): void => {
  console.log("🔄 All chat sessions have been reset.");
  chatSessions = new Array(aiInstances.length).fill(null);
  systemInstructions = new Array(aiInstances.length).fill('');
  currentKeyIndex = 0;
  
  apiKeyStatuses.forEach(status => {
    status.errorCount = Math.max(0, status.errorCount - 1);
  });
};

export const resetChatSession = (index: number): void => {
  if (index >= 0 && index < chatSessions.length) {
    console.log(`🔄 Chat session ${index + 1} has been reset.`);
    chatSessions[index] = null;
    systemInstructions[index] = '';
  }
};

export const reloadSystemInstruction = async (): Promise<void> => {
  console.log("🔄 Forcing reload of system instructions for all keys...");
  systemInstructions = new Array(aiInstances.length).fill('');
  chatSessions = new Array(aiInstances.length).fill(null);
  initializationPromise = null;
  await ensureInitialization();
  await initializeAllChatSessions();
};

export const initializeAllChatSessions = async (): Promise<void> => {
  await ensureInitialization();
  
  console.log("⚡ Preloading all chat sessions...");
  
  for (let i = 0; i < aiInstances.length; i++) {
    if (!chatSessions[i] && apiKeyStatuses[i]?.isHealthy) {
      try {
        chatSessions[i] = await createChatSession(aiInstances[i], i);
      } catch (error) {
        console.warn(`⚠️ Failed to preload chat session ${i + 1}:`, error);
      }
    }
  }
  
  const activeSessions = chatSessions.filter(session => session !== null).length;
  console.log(`✅ Preloaded ${activeSessions}/${aiInstances.length} chat sessions with system instructions.`);
};

export const streamMessage = async (message: string): Promise<any> => {
  let lastError: Error | null = null;
  let attempts = 0;
  
  while (attempts < MAX_RETRIES) {
    try {
      const { session, keyIndex } = await getNextChatSession();
      const response = await session.sendMessageStream({ message });
      
      console.log(`✅ Message sent successfully using API key ${keyIndex + 1}`);
      console.log(`📜 System instruction sent: ${systemInstructions[keyIndex].substring(0, 100)}...`);
      return response;
      
    } catch (error) {
      attempts++;
      lastError = error as Error;
      
      console.error(`❌ Attempt ${attempts} failed:`, error);
      
      const problemKeyIndex = (currentKeyIndex - 1 + aiInstances.length) % aiInstances.length;
      markApiKeyUnhealthy(problemKeyIndex, lastError.message);
      resetChatSession(problemKeyIndex);
      
      if (error instanceof Error) {
        if (error.message.includes('API Key') || error.message.includes('403')) {
          console.error(`🚫 API key issue detected for key ${problemKeyIndex + 1}`);
          continue;
        }
        
        if (error.message.includes('fetch') || error.message.includes('network')) {
          if (attempts < MAX_RETRIES) {
            console.log(`🔄 Network error, retrying in ${attempts * 1000}ms...`);
            await new Promise(resolve => setTimeout(resolve, attempts * 1000));
            continue;
          }
          throw new Error("Could not initialize AI. Please check your network connection.");
        }
        
        if (error.message.includes('quota') || error.message.includes('rate limit')) {
          console.warn(`⏳ Rate limit hit for key ${problemKeyIndex + 1}, trying next key...`);
          continue;
        }
      }
      
      if (attempts >= MAX_RETRIES) {
        break;
      }
    }
  }
  
  throw new Error(`Failed to communicate with AI after ${MAX_RETRIES} attempts. ${lastError?.message || 'Unknown error occurred.'}`);
};

export const performHealthCheck = async (): Promise<void> => {
  console.log("🔍 Performing API key health check...");
  
  for (let i = 0; i < aiInstances.length; i++) {
    try {
      const testSession = await createChatSession(aiInstances[i], i);
      await testSession.sendMessage({ message: "Test" });
      
      if (apiKeyStatuses[i]) {
        apiKeyStatuses[i].isHealthy = true;
        apiKeyStatuses[i].errorCount = Math.max(0, apiKeyStatuses[i].errorCount - 1);
      }
      
      console.log(`✅ API key ${i + 1} is healthy`);
    } catch (error) {
      markApiKeyUnhealthy(i, `Health check failed: ${error}`);
      console.warn(`⚠️ API key ${i + 1} failed health check:`, error);
    }
  }
};

if (typeof window !== 'undefined') {
  setInterval(performHealthCheck, HEALTH_CHECK_INTERVAL);
}

export const getApiKeyStats = () => {
  const healthyKeys = apiKeyStatuses.filter(status => status.isHealthy).length;
  const totalErrors = apiKeyStatuses.reduce((sum, status) => sum + status.errorCount, 0);
  
  return {
    totalKeys: aiInstances.length,
    healthyKeys,
    unhealthyKeys: aiInstances.length - healthyKeys,
    currentKeyIndex: currentKeyIndex,
    validKeys: API_KEYS.filter(key => key && !key.includes('your-api-key')).length,
    systemInstructionsLoaded: systemInstructions.filter(instruction => instruction !== '').length,
    activeChatSessions: chatSessions.filter(session => session !== null).length,
    totalErrors,
    keyStatuses: apiKeyStatuses.map((status, index) => ({
      index: status.index + 1,
      healthy: status.isHealthy,
      errorCount: status.errorCount,
      lastUsed: status.lastUsed?.toISOString(),
      lastError: status.lastError,
      systemInstructionLoaded: systemInstructions[index] !== ''
    }))
  };
};

export const markApiKeyHealthy = (keyIndex: number): void => {
  if (keyIndex >= 0 && keyIndex < apiKeyStatuses.length) {
    apiKeyStatuses[keyIndex].isHealthy = true;
    apiKeyStatuses[keyIndex].errorCount = 0;
    apiKeyStatuses[keyIndex].lastError = null;
    console.log(`✅ API key ${keyIndex + 1} manually marked as healthy`);
  }
};
