import { create } from 'zustand';

type InitialState = {
    activeFilter: string,
    activeSocialNetwork: string,
    setActiveFilter: (filter: string) => void,
    setActiveSocialNetwork: (activeSocialNetwork: string) => void,
}

export const useUiStore = create<InitialState>((set) => ({
    activeFilter: "all",
    activeSocialNetwork: "YouTube Shorts",
    setActiveFilter: (activeFilter: string) => {
        set((state) => ({ ...state, activeFilter}));
        console.log(activeFilter);
    },
    setActiveSocialNetwork: (activeSocialNetwork: string) => {
        set((state) => ({...state, activeSocialNetwork}))
    }
}))