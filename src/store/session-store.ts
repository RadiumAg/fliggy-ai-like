import type { AgentTypeEnum, MessageType, Role, StreamStatusEnum } from '@/utils/type';
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
  addSession(options: Partial<Session>) {
    set(state => ({
      session: [...state.session, options],
    }));
  },
  addSessionContent(content: Partial<Content>) {
    set((state) => {
      const session = state.session.at(-1);
      session?.content.push(content);
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
