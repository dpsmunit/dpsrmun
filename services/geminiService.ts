import { GoogleGenAI, Chat } from "@google/genai";

const API_KEYS = [
  import.meta.env.VITE_GEMINI_API_1,
  import.meta.env.VITE_GEMINI_API_2,
  import.meta.env.VITE_GEMINI_API_3,
  import.meta.env.VITE_GEMINI_API_4,
  import.meta.env.VITE_GEMINI_API_5,
  import.meta.env.VITE_GEMINI_API_6,
  import.meta.env.VITE_GEMINI_API_7,
  import.meta.env.VITE_GEMINI_API_8,
  import.meta.env.VITE_GEMINI_API_9,
  import.meta.env.VITE_GEMINI_API_10,

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
const PERSONALITY_FILE = '/personality.txt';
const KNOWLEDGE_FILE = '/knowledge.txt';
const UPDATES_FILE = '/updates.txt';

const initializeAiInstances = async (): Promise<void> => {
  if (API_KEYS.length === 0 || API_KEYS.every(key => !key || key.includes('your-api-key'))) {
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
};

const fetchSystemInstruction = async (keyIndex: number): Promise<string> => {
  try {
    const [personalityRes, knowledgeRes, updatesRes] = await Promise.all([
      fetch(PERSONALITY_FILE, { cache: 'no-store' }),
      fetch(KNOWLEDGE_FILE, { cache: 'no-store' }),
      fetch(UPDATES_FILE, { cache: 'no-store' })
    ]);

    if (!personalityRes.ok || !knowledgeRes.ok || !updatesRes.ok) {
      throw new Error(
        `Failed to fetch AI configuration files for key ${keyIndex + 1}. ` +
        `Status: ${personalityRes.status}/${knowledgeRes.status}/${updatesRes.status}`
      );
    }

    const personality = await personalityRes.text();
    const knowledge = await knowledgeRes.text();
    const updates = await updatesRes.text();

    if (
      personality.trim().startsWith('<!DOCTYPE') ||
      knowledge.trim().startsWith('<!DOCTYPE') ||
      updates.trim().startsWith('<!DOCTYPE')
    ) {
      throw new Error(
        `Invalid system instruction for key ${keyIndex + 1}: Files contain HTML content, expected plain text. ` +
        `Check ${PERSONALITY_FILE}, ${KNOWLEDGE_FILE}, and ${UPDATES_FILE} in the public directory.`
      );
    }

    return `${personality}\n\nHere is your knowledge base:\n${knowledge}\n\n${updates}`;
  } catch (error) {
    throw new Error(
      `Could not load AI configuration for key ${keyIndex + 1}. ` +
      `Ensure ${PERSONALITY_FILE}, ${KNOWLEDGE_FILE}, and ${UPDATES_FILE} are plain text files in the public directory.`
    );
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
        maxOutputTokens: 1024,
      },
    });
    
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
    }
  }
};

const getHealthyKeyIndex = (): number => {
  const healthyKeys = apiKeyStatuses.filter(status => status.isHealthy);
  
  if (healthyKeys.length === 0) {
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
  
  return { session: currentChat, keyIndex };
};

export const resetChat = (): void => {
  chatSessions = new Array(aiInstances.length).fill(null);
  systemInstructions = new Array(aiInstances.length).fill('');
  currentKeyIndex = 0;
  
  apiKeyStatuses.forEach(status => {
    status.errorCount = Math.max(0, status.errorCount - 1);
  });
};

export const resetChatSession = (index: number): void => {
  if (index >= 0 && index < chatSessions.length) {
    chatSessions[index] = null;
    systemInstructions[index] = '';
  }
};

export const reloadSystemInstruction = async (): Promise<void> => {
  systemInstructions = new Array(aiInstances.length).fill('');
  chatSessions = new Array(aiInstances.length).fill(null);
  initializationPromise = null;
  await ensureInitialization();
  await initializeAllChatSessions();
};

export const initializeAllChatSessions = async (): Promise<void> => {
  await ensureInitialization();
  
  for (let i = 0; i < aiInstances.length; i++) {
    if (!chatSessions[i] && apiKeyStatuses[i]?.isHealthy) {
      try {
        chatSessions[i] = await createChatSession(aiInstances[i], i);
      } catch {
        // Silently handle preload failure
      }
    }
  }
};

export const streamMessage = async (message: string): Promise<any> => {
  let lastError: Error | null = null;
  let attempts = 0;
  
  while (attempts < MAX_RETRIES) {
    try {
      const { session, keyIndex } = await getNextChatSession();
      const response = await session.sendMessageStream({ message });
      
      return response;
    } catch (error) {
      attempts++;
      lastError = error as Error;
      
      const problemKeyIndex = (currentKeyIndex - 1 + aiInstances.length) % aiInstances.length;
      markApiKeyUnhealthy(problemKeyIndex, lastError.message);
      resetChatSession(problemKeyIndex);
      
      if (error instanceof Error) {
        if (error.message.includes('API Key') || error.message.includes('403')) {
          continue;
        }
        
        if (error.message.includes('fetch') || error.message.includes('network')) {
          if (attempts < MAX_RETRIES) {
            await new Promise(resolve => setTimeout(resolve, attempts * 1000));
            continue;
          }
          throw new Error("Could not initialize AI. Please check your network connection.");
        }
        
        if (error.message.includes('quota') || error.message.includes('rate limit')) {
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
  for (let i = 0; i < aiInstances.length; i++) {
    try {
      const testSession = await createChatSession(aiInstances[i], i);
      await testSession.sendMessage({ message: "Test" });
      
      if (apiKeyStatuses[i]) {
        apiKeyStatuses[i].isHealthy = true;
        apiKeyStatuses[i].errorCount = Math.max(0, apiKeyStatuses[i].errorCount - 1);
      }
    } catch (error) {
      markApiKeyUnhealthy(i, `Health check failed: ${error}`);
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
  }
};
