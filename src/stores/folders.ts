import { create } from 'zustand';
import type { IBrowserIndex, File } from '@/helpers/foldersHelper';
export type allowedFolders = "desktop" | "music" | "pictures" | "videos" | "documents";

export interface IFoldersStore {
    currentSelectedFile: File | null;
    currentFolder: allowedFolders;
    currentFolderBrowseIndex: IBrowserIndex | null;

    setCurrentFolder: (currentFolder: allowedFolders) => void;
    setCurrentSelectedFile: (currentSelectedFile: File) => void;
    setCurrentFolderBrowserIndex: (currentFolderBrowseIndex: IBrowserIndex | null) => void;
}

export const useFoldersStore = create<IFoldersStore>((set) => ({
    currentSelectedFile: null,
    currentFolder: "desktop",
    currentFolderBrowseIndex: null,
    foldersBrowserHistory: [],

    setCurrentFolder: (currentFolder) => set(() => ({ currentFolder })),
    setCurrentSelectedFile: (currentSelectedFile) => set(() => ({ currentSelectedFile })),
    setCurrentFolderBrowserIndex: (currentFolderBrowseIndex) => set(() => ({ currentFolderBrowseIndex })),
}));