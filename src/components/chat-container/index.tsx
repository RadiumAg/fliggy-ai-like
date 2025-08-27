import { shallow } from 'zustand/shallow';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import { useSessionStore } from '@/store/session-store';

const ChatContainer: React.FC = () => {
  const sessionList = useStoreWithEqualityFn(
    useSessionStore,
    (store) => {
      return store.getSession();
    },
    shallow,
  );
  return <div></div>;
};

export default ChatContainer;
