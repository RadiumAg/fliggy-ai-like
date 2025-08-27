import React, { useRef } from 'react';
import { shallow } from 'zustand/shallow';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import { chatWithFetch } from '@/services/chat';
import { useSessionStore } from '@/store/session-store';

function useChat() {
  const isStart = useRef(false);
  const { setSession, updateSession } = useStoreWithEqualityFn(useSessionStore, (state) => {
    const { addSession, updateSession } = state;
    return {
      addSession,
      updateSession,
    };
  }, shallow);

  const handleChat = React.useCallback((question: string) => {
    chatWithFetch({ chat: question }, {
      onData: (data) => {
        const sessionData = JSON.parse(data);

        console.info('[DEBUG] onData data', JSON.parse(sessionData));

        if (!isStart.current) {
          isStart.current = true;
          setSession(sessionData);
        }
        else {
          updateSession();
        }
      },
      onFinish() {
        isStart.current = false;
      },
      onError() {
        isStart.current = false;
      },
    });
  }, []);

  return {
    handleChat,
  };
}

export { useChat };
