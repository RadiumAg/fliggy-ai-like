import { useMemoizedFn } from 'ahooks';
import React, { useRef } from 'react';
import shortid from 'shortid';
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

  const handleChat = useMemoizedFn((question: string) => {
    // 添加问题
    addSession({ id: shortid.generate(), role: 'user', content: [{ type: 'markdown', message: question }] });

    // chatWithFetch({ chat: question }, {
    //   onData: (data) => {
    //     const sessionData = JSON.parse(data.result);

    //     if (sessionData.agentType == null)
    //       return;

    //     if (!isStart.current) {
    //       isStart.current = true;
    //       addSession({ role: 'bot', content: sessionData });
    //     }
    //     else {
    //       if (data.seq)
    //         updateSession(sessionData.systemMessageId, data);
    //     }
    //   },
    //   onFinish() {
    //     isStart.current = false;
    //   },
    //   onError() {
    //     isStart.current = false;
    //   },
    // });
  });

  return {
    handleChat,
  };
}

export { useChat };
