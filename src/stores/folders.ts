import { create } from 'zustand';
import type { IBrowserIndex, File } from '@/helpers/foldersHelper';
export type allowedFolders = "desktop" | "music" | "pictures" | "videos" | "documents";

export interface IFoldersStore {
    currentMusicFile: File | null;
    currentSelectedFile: File | null;
    currentFolder: allowedFolders;

    setCurrentFolder: (currentFolder: allowedFolders) => void;
    setCurrentMusicFile: (currentMusicFile: File) => void;
    setCurrentSelectedFile: (currentSelectedFile: File) => void;
}

export const useFoldersStore = create<IFoldersStore>((set) => ({
    currentMusicFile: null,
    currentSelectedFile: null,
    currentFolder: "desktop",
    foldersBrowserHistory: [],

    setCurrentFolder: (currentFolder) => set(() => ({ currentFolder })),
    setCurrentSelectedFile: (currentSelectedFile) => set(() => ({ currentSelectedFile })),
    setCurrentMusicFile: (currentMusicFile) => set(() => ({ currentMusicFile })),
}));