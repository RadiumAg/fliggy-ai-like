import type { AgentTypeEnum, MessageType, Role, StreamStatusEnum } from '@/utils/type';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface State {
  session: Array<Session>
}

interface Session {
  id: string
  role: Role
  agentType: AgentTypeEnum
  status: StreamStatusEnum
  systemMessageId: string
  userMessageId: string
  content: { type: MessageType, message: string, components: string[] }[]
}

const useSessionStore = create(immer(combine({
  session: [] as Session[],
}, (set, get) => ({
  addSession(options: Partial<Session>) {
    const { role, content: data } = options;

    set(state => ({
      session: [...state.session, {
        role,
        data,
      }],
    }));
  },
  updateSession(systemMessageId: string, data: Session) {
    set((state: State) => {
      const sessionIndex = state.session.findIndex(item => item.systemMessageId
        === systemMessageId,
      );
      state.session[sessionIndex].content.push(data);
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
