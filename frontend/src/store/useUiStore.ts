import { create } from 'zustand';

type InitialState = {
    activeFilter: string,
    setActiveFilter: (filter: string) => void,
}

export const useUiStore = create<InitialState>((set) => ({
    activeFilter: "all",
    setActiveFilter: (activeFilter: string) => {
        set((state) => ({ ...state, activeFilter: activeFilter }));
    }
}))