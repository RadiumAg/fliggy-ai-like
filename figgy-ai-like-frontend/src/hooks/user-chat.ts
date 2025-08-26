import React from 'react';
import { chatWithFetch } from '@/services/chat';

function useChat() {
  const handleChat = React.useCallback((question: string) => {
    chatWithFetch({ chat: question }, {
      onData: (data) => {
        console.log('data', data);
      },
    });
  }, []);

  return {
    handleChat,
  };
}

export { useChat };
