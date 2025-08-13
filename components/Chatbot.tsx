import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { streamMessage } from '../services/geminiService';
import { PaperAirplaneIcon, CloseIcon, ChatBubbleIcon } from './icons/Icons';
import useWindowSize from '../hooks/useWindowSize';

const SachiAvatar = ({ className = 'w-10 h-10' }: { className?: string }) => (
    <div className={`${className} rounded-full bg-gradient-to-br from-mun-green to-green-400 flex-shrink-0 flex items-center justify-center text-white font-bold text-base shadow-md`}>
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
  "Is the fee refundable?",
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  const handleToggle = () => {
      setIsOpen(!isOpen);
      if (!isOpen && messages.length === 0) {
        const welcomeMessage: ChatMessage = {
            id: `ai-init-${Date.now()}`,
            sender: 'ai',
            text: "Hello! I am DiploBot, your official guide for DPSR MUN 2025. How can I assist you? You can ask me anything or pick a suggestion below! 🌟"
        };
        setMessages([welcomeMessage]);
        setShowSuggestions(true);
    }
  }

  const handleSend = async (messageToSend?: string) => {
    const textToSend = messageToSend ?? input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = { id: `user-${Date.now()}`, sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setShowSuggestions(false);
    setIsLoading(true);

    try {
        const stream = await streamMessage(textToSend);
        let text = '';
        const aiMessageId = `ai-${Date.now()}`;
        setMessages(prev => [...prev, { id: aiMessageId, sender: 'ai', text: '...' }]);

        for await (const chunk of stream) {
            text += chunk.text;
            setMessages(prev => prev.map(m => m.id === aiMessageId ? { ...m, text } : m));
        }
    } catch (error) {
        console.error("Chatbot error:", error);
        const errorMessage: ChatMessage = {
            id: `err-${Date.now()}`,
            sender: 'ai',
            text: 'An error occurred. Please try again later.'
        };
        setMessages(prev => [...prev, errorMessage]);
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
        rawMarkup = rawMarkup.replace(/<a href/g, '<a target="_blank" rel="noopener noreferrer" href');
        return { __html: rawMarkup };
    }
    return { __html: text.replace(/\n/g, '<br />') };
  };

  return (
    <>
      <style>{`
        @keyframes enter {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .message-enter {
          animation: enter 0.4s ease-out forwards;
        }
      `}</style>
      <button
        onClick={handleToggle}
        className={`fixed ${isMobile ? 'bottom-4 right-4' : 'bottom-8 right-8'} w-16 h-16 bg-mun-green rounded-full text-white flex items-center justify-center shadow-2xl shadow-mun-green/30 z-40 transition-all duration-300 hover:scale-110 hover:bg-green-500 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
        aria-label="Open chat"
      >
        <ChatBubbleIcon className="w-8 h-8" />
      </button>

      <div className={`fixed ${isMobile ? 'bottom-4 right-4' : 'bottom-8 right-8'} z-50 w-[calc(100vw-${isMobile ? '2rem' : '4rem'})] max-w-xl h-[75vh] max-h-[750px] flex flex-col transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'}`}>
        <div className="bg-white rounded-2xl w-full h-full flex flex-col shadow-2xl border border-gray-200/80">
          <header className="flex justify-between items-center p-5 border-b border-gray-200/80 bg-gray-50/70 rounded-t-2xl flex-shrink-0">
             <div className="flex items-center gap-4">
                 <SachiAvatar />
                 <h3 className="font-bold text-xl text-mun-dark-text">DiploBot, your MUN Helper</h3>
            </div>
            <button onClick={handleToggle} className="text-gray-500 hover:text-mun-dark-text transition-colors" aria-label="Close chat">
              <CloseIcon className="w-7 h-7" />
            </button>
          </header>

          <main className="flex-1 p-6 overflow-y-auto bg-white" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)', backgroundSize: '20px 20px' }}>
            <div className="flex flex-col gap-5">
              {messages.map(msg => (
                <div key={msg.id} className={`flex items-end gap-3 message-enter ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'ai' && <SachiAvatar />}
                  <div
                    className={`max-w-[80%] py-3 px-5 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-br from-mun-green to-green-600 text-white rounded-br-lg shadow-md'
                        : 'bg-white text-mun-dark-text rounded-bl-lg shadow-md border border-gray-300'
                    }`}
                  >
                    {msg.text === '...' ? (
                        <div className="flex items-center gap-1.5 p-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></span>
                        </div>
                    ) : (
                        <div className={`prose prose-base max-w-none prose-p:my-2 ${
                          msg.sender === 'user'
                            ? 'prose-p:text-white prose-strong:text-white'
                            : 'prose-p:text-mun-dark-text prose-strong:text-mun-dark-text'
                        } prose-a:text-blue-200 hover:prose-a:text-blue-300`} dangerouslySetInnerHTML={renderMarkdown(msg.text)} />
                    )}
                  </div>
                  {msg.sender === 'user' && <UserAvatar />}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </main>

          <footer className="p-5 border-t border-gray-200/80 bg-gray-50/70 rounded-b-2xl flex-shrink-0">
            {showSuggestions && (
                <div className="pb-3 flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                        <button key={s} onClick={() => handleSuggestionClick(s)} className="px-3.5 py-2 bg-white border border-gray-300 rounded-full text-sm text-mun-dark-text hover:bg-mun-soft-green hover:border-mun-green/50 transition-all duration-200">
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
                placeholder="Ask about committees..."
                className="flex-1 bg-white border border-gray-300 rounded-full py-3 px-5 text-mun-dark-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-mun-green transition-shadow text-base"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="w-12 h-12 bg-mun-green rounded-full flex items-center justify-center text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110"
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