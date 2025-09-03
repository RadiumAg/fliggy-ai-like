import React from 'react';
import { shallow } from 'zustand/shallow';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import { useSessionStore } from '@/store/session-store';
import MessageWrapper from '../render-stream/message-wrapper';

const ChatContainer: React.FC = () => {
  const sessionList = useStoreWithEqualityFn(
    useSessionStore,
    (store) => {
      return store.getSession();
    },
    shallow,
  );

  console.log('[DEBUG] sessionList', sessionList);

  const renderCompoent = React.useMemo(() => {
    return sessionList.map((sessionData) => {
      const { role, data } = sessionData;

      return <MessageWrapper key={sessionData.id} data={data} role={role} />;
    });
  }, [sessionList]);

  return <div>{renderCompoent}</div>;
};

export default ChatContainer;
