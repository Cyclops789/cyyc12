import { create } from 'zustand';
import { type IBrowserIndex } from '@/helpers/foldersHelper';

export type allowedFolders = "desktop" | "music" | "pictures" | "videos";

export interface IFoldersStore {
    currentFolder: allowedFolders;
    currentFolderBrowseIndex: IBrowserIndex | null;

    setCurrentFolder: (currentFolder: allowedFolders) => void;
    setCurrentFolderBrowserIndex: (currentFolderBrowseIndex: IBrowserIndex | null) => void;
}

export const useFoldersStore = create<IFoldersStore>((set) => ({
    currentFolder: "desktop",
    currentFolderBrowseIndex: null,
    setCurrentFolder: (currentFolder) => set(() => ({ currentFolder })),
    setCurrentFolderBrowserIndex: (currentFolderBrowseIndex) => set(() => ({ currentFolderBrowseIndex })),
}));