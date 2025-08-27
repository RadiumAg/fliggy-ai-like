import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface State {
  session: Array<Session>
}

interface Session {
  sessionId: string
  data: {
    answer: string
  }
}

const useSessionStore = create(immer(combine({
  session: [] as Session[],
}, (set, get) => ({
  addSession(data: Session) {
    set(state => ({
      session: [...state.session, data],
    }));
  },
  updateSession(sessionId: string, data: Session['data']) {
    set((state: State) => {
      const sessionIndex = state.session.findIndex(item => item.sessionId === sessionId);
      state.session[sessionIndex].data = data;
    });
  },
  getSession() {
    return get().session;
  },
}))));

export {
  useSessionStore,
};
