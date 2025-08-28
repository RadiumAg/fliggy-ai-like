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
  addSession(data: Session) {
    set(state => ({
      session: [...state.session, data],
    }));
  },
  updateSession(systemMessageId: string, data: Session) {
    set((state: State) => {
      const sessionIndex = state.session.findIndex(item => item.systemMessageId
        === systemMessageId,
      );
      state.session[sessionIndex] = data;
    });
  },
  getSession() {
    return get().session;
  },
}))));

export {
  useSessionStore,
};
