import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { instance } from '../libs/axios';

type AuthStore = {
  accessToken: string | undefined;
  currentProfileId: string | undefined;
  isAuth: boolean;
}

type AuthActions = {
  setAccessToken: (accessToken: string | undefined) => void;
  setCurrentProfileId: (profileId: string | undefined) => void;
  clearAccessToken: () => void;
}

export const useAuthStore = create<AuthStore & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        accessToken: undefined,
        currentProfileId: undefined,
        isAuth: false,
        setAccessToken: (accessToken: string | undefined) => {
          instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          return set({ accessToken, isAuth: true });
        },
        clearAccessToken: () => {
          delete instance.defaults.headers.common["Authorization"];
          return set({ accessToken: undefined, isAuth: false });
        },
        setCurrentProfileId: (profileId: string | undefined) => {
          return set({ currentProfileId: profileId });
        },
      }),
      {
        name: 'auth-store',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    {
      name: 'auth-store',
      enabled: !import.meta.env.PROD,
    }
  )
);
