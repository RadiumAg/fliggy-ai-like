import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface State {
  session: Array<Session>
}

interface Session {
  sessionId: string
  systemMessageId: string
  userMessageId: string
  scene: string
  role: string
  status: string
  data: Record<string, any>
}

const useSessionStore = create(immer(combine({
  session: [] as Session[],
}, (set, get) => ({
  addSession(options: { role: string, data: Session }) {
    const { role, data } = options;

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
      state.session[sessionIndex].data.push(data);
    });
  },
  getSession() {
    return get().session;
  },
}))));

export {
  useSessionStore,
};
