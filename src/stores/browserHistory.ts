import { link } from 'fs';
import { create } from 'zustand'

export type CurrentLink = {
    index: number;
    link: string;
};

export interface IBrowserHistoryStore {
    currentLink: CurrentLink;
    searchPlaceHolder: string;
    searchLinksHistory: string[];

    setCurrentLink: (currentLink: CurrentLink) => void;
    setSearchPlaceHolder: (searchPlaceHolder: string) => void;
    setLinksHistory: (searchLinksHistory: string[]) => void;
    addLinkHistory: (searchLinkHistory: string) => void;
}

export const useBrowserHistoryStore = create<IBrowserHistoryStore>((set) => ({
    currentLink: {
        index: 0,
        link: 'https://www.google.com/webhp?igu=1',
    },
    searchPlaceHolder: '',
    searchLinksHistory: ['https://www.google.com/webhp?igu=1'],

    setCurrentLink: (currentLink) => set(() => ({ currentLink })),
    setSearchPlaceHolder: (searchPlaceHolder) => set(() => ({ searchPlaceHolder })),
    setLinksHistory: (searchLinksHistory) => set(() => ({ searchLinksHistory })),
    addLinkHistory: (searchLinkHistory) => set(({ searchLinksHistory }) => ({ searchLinksHistory: [searchLinkHistory, ...searchLinksHistory || []] })),
}));