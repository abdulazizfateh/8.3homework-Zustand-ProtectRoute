import { create } from 'zustand'

type Store = {
    token: string | null
    userID: string | null
    saveToken: (payload: string) => void
    saveUserID: (payload: number) => void
}

export const useStore = create<Store>()((set) => ({
    token: localStorage.getItem("token") || null,
    userID: localStorage.getItem("user_id"),

    saveToken: (payload) => {
        localStorage.setItem("token", payload);
        return set(() => ({ token: payload }))
    },
    saveUserID: (payload) => {
        localStorage.setItem("user_id", JSON.stringify(payload))
        return set(() => ({ userID: payload.toString() }))
    }
}))