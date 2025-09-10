import type { AgentTypeEnum, MessageType, Role, StreamStatusEnum } from '@/utils/type';
import shortid from 'shortid';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface Content {
  type: MessageType
  message: string
  components: string[]
  id: string
}

interface Session {
  id: string
  role: Role
  agentType: AgentTypeEnum
  status: StreamStatusEnum
  systemMessageId: string
  userMessageId: string
  content: Partial<Content>[]
}

const useSessionStore = create(immer(combine({
  session: [] as Session[],
}, (set, get) => ({
  addSession(sessionData: Partial<Session>) {
    set((state) => {
      state.session.push(sessionData as Session);
    });
  },
  getSession() {
    return get().session;
  },
}))));

export {
  type Session,
  useSessionStore,
};
