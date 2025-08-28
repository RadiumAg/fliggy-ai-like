import React, { useRef } from 'react';
import { shallow } from 'zustand/shallow';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import { chatWithFetch } from '@/services/chat';
import { useSessionStore } from '@/store/session-store';

function useChat() {
  const isStart = useRef(false);
  const { addSession, updateSession } = useStoreWithEqualityFn(useSessionStore, (state) => {
    const { addSession, updateSession } = state;

    return {
      addSession,
      updateSession,
    };
  }, shallow);

  const handleChat = React.useCallback((question: string) => {
    chatWithFetch({ chat: question }, {
      onData: (data) => {
        const sessionData = JSON.parse(data.result);

        console.log('[DEBUG]', sessionData);

        if (!isStart.current) {
          isStart.current = true;
          addSession(sessionData);
        }
        else {
          if (data.seq)
            updateSession(sessionData.systemMessageId, data);
        }
      },
      onFinish() {
        isStart.current = false;
      },
      onError() {
        isStart.current = false;
      },
    });
  }, [addSession, updateSession]);

  return {
    handleChat,
  };
}

export { useChat };
