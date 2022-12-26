import create from 'zustand';
import jwt_decode from "jwt-decode";

interface LoginState {
  user: any;
  loadingFromToken: boolean;
  setUser: (user: any) => void;
  setToken: (token : any) => void;
  loadFromToken: () => void;
  logout: () => void;
  errorInput: any;
  setErorInput: (errorInput: any) => void;
}

const useUserStore = create<LoginState>((set) => ({
  user: undefined,
  errorInput: null,
  loadingFromToken: true,
  setUser: (user) => set({ user, loadingFromToken: false }),

  loadFromToken: () => {
    const token = localStorage.getItem("token");
    set({
      user: token ? jwt_decode(token) : undefined,
      loadingFromToken: false,
    });
  },

  setToken: (token: any) => {
    localStorage.setItem("token", token);

    set((state) => ({
      user: {
        ...(state.user || {}),
        ...jwt_decode(token),
      },
    }));
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      user: undefined,
    });
  },

  setErorInput: (error) => {
    set({
      errorInput: error,
    })
  }
}));

export default useUserStore;
