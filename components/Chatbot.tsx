
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { streamMessage, resetChat } from '../services/geminiService';
import { PaperAirplaneIcon, CloseIcon, ChatBubbleIcon } from './icons/Icons';

const SachiAvatar = ({ className = 'w-10 h-10' }: { className?: string }) => (
    <div className={`${className} rounded-full bg-gradient-to-br from-mun-green to-green-400 flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
      S
    </div>
);

const UserAvatar = ({ className = 'w-10 h-10' }: { className?: string }) => (
    <div className={`${className} rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
    </div>
);

const suggestions = [
  "What committees are beginner-friendly?",
  "Tell me about the UNSC committee.",
  "How do I register?",
  "Mun Guide"
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  const handleToggle = () => {
      const nextIsOpen = !isOpen;
      setIsOpen(nextIsOpen);
      if (nextIsOpen && messages.length === 0) {
        const welcomeMessage: ChatMessage = {
            id: `ai-init-${Date.now()}`,
            sender: 'ai',
            type: 'message',
            text: "Hello! I am Sachi, your official guide for DPSR MUN 2025. How can I assist you? You can ask me anything or pick a suggestion below! 🌟"
        };
        setMessages([welcomeMessage]);
        setShowSuggestions(true);
    }
  }

  const handleSend = async (messageToSend?: string) => {
    const textToSend = (messageToSend ?? input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = { id: `user-${Date.now()}`, sender: 'user', text: textToSend, type: 'message' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setShowSuggestions(false);
    setIsLoading(true);

    const aiMessageId = `ai-${Date.now()}`;
    // Add a placeholder message for the typing indicator
    setMessages(prev => [...prev, { id: aiMessageId, sender: 'ai', text: '...', type: 'message' }]);
    
    try {
        const stream = await streamMessage(textToSend);
        let accumulatedText = '';

        for await (const chunk of stream) {
            accumulatedText += chunk.text;
            setMessages(prev => prev.map(m => m.id === aiMessageId ? { ...m, text: accumulatedText } : m));
        }
    } catch (error) {
        console.error("Chatbot error:", error);
        const errorMessageText = error instanceof Error ? error.message : 'An unknown error occurred. Please try again.';
        const errorMessage: ChatMessage = {
            id: aiMessageId,
            sender: 'ai',
            text: `I'm sorry, I've encountered an issue. ${errorMessageText}`,
            type: 'error'
        };
        setMessages(prev => prev.map(m => m.id === aiMessageId ? errorMessage : m));
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
      handleSend(suggestion);
  };

  const renderMarkdown = (text: string) => {
    if (typeof window !== 'undefined' && (window as any).marked) {
        let rawMarkup = (window as any).marked.parse(text, { breaks: true, gfm: true });
        rawMarkup = rawMarkup.replace(/<a href/g, '<a class="text-blue-600 font-semibold hover:underline" target="_blank" rel="noopener noreferrer" href');
        return { __html: rawMarkup };
    }
    return { __html: text.replace(/\n/g, '<br />') };
  };

  return (
    <>
      <style>{`
        @keyframes chat-window-enter {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-chat-window-enter { animation: chat-window-enter 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards; }

        @keyframes message-enter {
            from { opacity: 0; transform: translateY(10px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .message-enter { animation: message-enter 0.4s ease-out forwards; }
        
        @keyframes typing-dot {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
            40% { transform: scale(1); opacity: 1; }
        }
        .typing-dot {
            animation: typing-dot 1.4s infinite ease-in-out both;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        .typing-dot:nth-child(3) { animation-delay: 0s; }
        
        @keyframes pulse-glow {
            0% { box-shadow: 0 0 0 0 rgba(29, 185, 84, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(29, 185, 84, 0); }
            100% { box-shadow: 0 0 0 0 rgba(29, 185, 84, 0); }
        }
        .pulse-glow-active {
            animation: pulse-glow 2s infinite;
        }

        .chat-bg-pattern {
            background-color: #F9F9F9;
            background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
            background-size: 20px 20px;
        }
      `}</style>
      <button
        onClick={handleToggle}
        className={`fixed bottom-8 right-8 w-16 h-16 bg-mun-green rounded-full text-white flex items-center justify-center shadow-2xl shadow-mun-green/30 z-40 transition-all duration-300 hover:scale-110 hover:bg-green-500 ${isOpen ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100 scale-100'}`}
        aria-label="Open chat"
      >
        <ChatBubbleIcon className="w-8 h-8" />
      </button>

      <div className={`fixed bottom-8 right-8 z-50 w-[calc(100vw-4rem)] max-w-lg h-[80vh] max-h-[700px] flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'}`}>
        <div className={`bg-white rounded-2xl w-full h-full flex flex-col shadow-2xl border border-gray-200/80 ${isOpen ? 'animate-chat-window-enter' : ''}`}>
          <header className="flex justify-between items-center p-5 border-b border-gray-200/80 bg-gray-50/70 rounded-t-2xl flex-shrink-0">
             <div className="flex items-center gap-4">
                 <SachiAvatar />
                 <div>
                    <h3 className="font-bold text-lg text-mun-dark-text">Sachi, your MUN Helper</h3>
                    <p className="text-sm text-gray-500">Online</p>
                 </div>
            </div>
            <button onClick={handleToggle} className="text-gray-500 hover:text-mun-dark-text transition-colors" aria-label="Close chat">
              <CloseIcon className="w-7 h-7" />
            </button>
          </header>

          <main className="flex-1 p-4 sm:p-6 overflow-y-auto chat-bg-pattern">
            <div className="flex flex-col gap-5">
              {messages.map(msg => (
                <div key={msg.id} className={`flex items-start gap-3 message-enter w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'ai' && <SachiAvatar />}
                  <div className={`max-w-[85%] sm:max-w-[80%] px-4 pt-3 pb-2 rounded-xl relative ${
                    msg.sender === 'user'
                      ? 'bg-mun-green text-white rounded-br-none shadow-md'
                      : msg.type === 'error'
                      ? 'bg-red-100 text-red-800 border border-red-200 rounded-bl-none shadow-sm'
                      : 'bg-white text-mun-dark-text rounded-bl-none shadow-sm border border-gray-200'
                  }`}>
                    {msg.text === '...' ? (
                      <div className="flex items-center gap-1.5 p-2">
                        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full typing-dot"></span>
                        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full typing-dot"></span>
                        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full typing-dot"></span>
                      </div>
                    ) : (
                      <div
                        className={`prose prose-sm max-w-none ${
                          msg.sender === 'user'
                            ? 'prose-p:text-white prose-strong:text-white'
                            : msg.type === 'error'
                            ? 'prose-p:text-red-800 prose-strong:text-mun-dark-text'
                            : 'prose-p:text-mun-dark-text prose-strong:text-mun-dark-text'
                        }`}
                        dangerouslySetInnerHTML={renderMarkdown(msg.text)}
                      />
                    )}
                  </div>
                  {msg.sender === 'user' && <UserAvatar />}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </main>

          <footer className="p-4 border-t border-gray-200/80 bg-gray-50/70 rounded-b-2xl flex-shrink-0">
            {showSuggestions && (
                <div className="pb-3 flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                        <button key={s} onClick={() => handleSuggestionClick(s)} className="px-3 py-1.5 bg-white border border-gray-300 rounded-full text-sm font-medium text-mun-green hover:bg-mun-soft-green hover:border-mun-green/50 transition-all duration-200 hover:shadow-sm transform hover:-translate-y-0.5">
                            {s}
                        </button>
                    ))}
                </div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about committees, registration..."
                className="flex-1 bg-white border border-gray-300 rounded-full py-3 px-5 text-mun-dark-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-mun-green transition-shadow text-base"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`w-12 h-12 bg-mun-green rounded-full flex items-center justify-center text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mun-green ${input.trim() && !isLoading ? 'pulse-glow-active' : ''}`}
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                <PaperAirplaneIcon className="w-6 h-6" />
              </button>
            </form>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
