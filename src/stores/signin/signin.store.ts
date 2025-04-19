import { create } from "zustand";

interface SigninStore {
    email: string | null;
    setEmail: (email: string) => void;

    pictureName: string | null;
    setPictureName: (pictureName: string) => void;
}

export const useSigninStore = create<SigninStore>(set => ({
    email: null,
    pictureName: null,
    setEmail: email => set({ email }),
    setPictureName: pictureName => set({ pictureName }),
}));
