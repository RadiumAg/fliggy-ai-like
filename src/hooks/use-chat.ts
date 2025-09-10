import { useMemoizedFn } from 'ahooks';
import React from 'react';
import shortid from 'shortid';
import { shallow } from 'zustand/shallow';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import { chatWithFetch } from '@/services/chat';
import { useSessionStore } from '@/store/session-store';
import { dataFormat } from '@/utils/data';

function useChat() {
  const isStart = React.useRef(false);
  const { addSession, getSession } = useStoreWithEqualityFn(useSessionStore, (state) => {
    const { addSession, getSession } = state;

    return {
      addSession,
      getSession,
    };
  }, shallow);

  const handleChat = useMemoizedFn((question: string) => {
    // 添加问题
    addSession({
      id: shortid.generate(),
      role: 'user',
      content: [{
        id: shortid.toString(),
        type: 'markdown',
        message: question,
      }],
    });

    const newSessionId = shortid.generate();

    chatWithFetch({ chat: question }, {
      onData: (data) => {
        const sessionList = getSession();
        const sessionData = dataFormat(JSON.parse(data.result), sessionList.at(-1));

        if (sessionData.agentType == null)
          return;

        if (!isStart.current) {
          isStart.current = true;

          addSession({
            ...sessionData,
            id: newSessionId,
          });
        }
        else {
        }
      },
      onFinish() {
        isStart.current = false;
      },
      onError() {
        isStart.current = false;
      },
    });
  });

  return {
    handleChat,
  };
}

export { useChat };
