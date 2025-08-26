import React from 'react';
import { chatWithFetch } from '@/services/chat';

function useChat() {
  const handleChat = React.useCallback((question: string) => {
    chatWithFetch({ chat: question }, {
      onData: (data) => {
        console.log('[DEBUG] onData data', JSON.parse(data.result));
      },
    });
  }, []);

  return {
    handleChat,
  };
}

export { useChat };
