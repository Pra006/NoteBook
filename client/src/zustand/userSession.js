import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSession = create(persist(
    (set)=>({
        user: null,
        setUser: (user) => set({ user }),
        logout:()=> set({ user: null })
    }),
    {name: "session"}
))