import { create } from 'zustand';
import { generateAIResponse } from '../lib/openai';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

type ChatStore = {
  messages: Message[];
  isLoading: boolean;
  addMessage: (content: string, sender: 'user' | 'ai') => void;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isLoading: false,
  addMessage: (content, sender) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: crypto.randomUUID(),
          content,
          sender,
          timestamp: new Date(),
        },
      ],
    })),
  sendMessage: async (content: string) => {
    set({ isLoading: true });
    get().addMessage(content, 'user');
    
    try {
      const aiResponse = await generateAIResponse(content);
      get().addMessage(aiResponse, 'ai');
    } catch (error) {
      console.error('Error in chat:', error);
      get().addMessage("I'm having trouble responding right now. Could you try again?", 'ai');
    } finally {
      set({ isLoading: false });
    }
  },
  clearMessages: () => set({ messages: [] }),
}));