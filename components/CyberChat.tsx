import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { MessageCircleIcon, XIcon, SendIcon, RabbitIcon } from './Icons';

export const CyberChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Connection established. The rabbit hole awaits. How can I assist you with RK\'s profile?',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Prepare history for API (excluding timestamps)
    const history = messages.map(m => ({ role: m.role, text: m.text }));
    
    // Add current user message to history being sent
    history.push({ role: 'user', text: input });

    const responseText = await sendMessageToGemini(input, history);

    const botMessage: ChatMessage = {
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full bg-cyber-green text-black shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open Chat"
      >
        <MessageCircleIcon className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-96 h-[500px] bg-cyber-gray border border-cyber-border rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          
          {/* Header */}
          <div className="bg-cyber-dark p-4 border-b border-cyber-border flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-cyber-green/10 rounded-full border border-cyber-green/30">
                <RabbitIcon className="w-5 h-5 text-cyber-green" />
              </div>
              <span className="font-mono text-cyber-green font-bold tracking-wide">WhiteRabbit</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <XIcon />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm custom-scrollbar bg-opacity-50 bg-black">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-cyber-green text-black'
                      : 'bg-cyber-dark border border-cyber-border text-gray-300'
                  }`}
                >
                  {/* Branding inside the message bubble for the model */}
                  {msg.role === 'model' && (
                    <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-gray-700/50">
                      <RabbitIcon className="w-4 h-4 text-cyber-green" />
                      <span className="text-xs font-bold text-cyber-green uppercase tracking-wider">WhiteRabbit</span>
                    </div>
                  )}
                  
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  
                  <span className={`text-[10px] mt-2 block text-right ${msg.role === 'user' ? 'text-black/60' : 'text-gray-500'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-cyber-dark border border-cyber-border p-4 rounded-lg flex flex-col space-y-2 min-w-[120px]">
                  <div className="flex items-center space-x-2 mb-1">
                      <RabbitIcon className="w-3 h-3 text-cyber-green" />
                      <span className="text-[10px] font-bold text-cyber-green uppercase">Thinking</span>
                  </div>
                  <div className="flex space-x-1 pl-1">
                    <div className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-bounce delay-150"></div>
                    <div className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-cyber-dark border-t border-cyber-border">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask the white rabbit..."
                className="flex-1 bg-cyber-gray border border-cyber-border text-white rounded-md px-4 py-2 focus:outline-none focus:border-cyber-green font-mono text-sm placeholder-gray-600"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-cyber-green text-black p-2 rounded-md hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/10"
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};