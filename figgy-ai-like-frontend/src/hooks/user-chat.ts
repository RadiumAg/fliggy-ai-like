import React from 'react';
import { chat } from '@/services/chat';

function useChat() {
  const handleChat = React.useCallback((question: string) => {
    chat({ chat: question }).then((res) => {
      console.log(res);
    });
  }, []);

  return {
    handleChat,
  };
}

export { useChat };
