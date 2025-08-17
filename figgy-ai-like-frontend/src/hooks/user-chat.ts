import React from 'react';
import { chat } from '@/services/chat';

function useChat() {
  const handleChat = React.useCallback((question: string) => {
    chat(question).then();
  }, []);

  return {
    handleChat,
  };
}

export { useChat };
