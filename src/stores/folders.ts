import { create } from 'zustand';
import type { File, allowedExtensions } from '@/helpers/foldersHelper';
export type allowedFolders = "desktop" | "music" | "pictures" | "videos" | "documents";

export interface IFoldersStore {
    selectedFiles: File[];
    currentFolder: allowedFolders;

    getFileOfType: (exts: allowedExtensions[]) => File | null;
    setCurrentFolder: (currentFolder: allowedFolders) => void;
    setSelectedFiles: (selectedFiles: File[]) => void;
    addSelectedFile: (selectedFile: File) => void;
    removeSelectedFile: (selectedFile: File) => void;
}

export const useFoldersStore = create<IFoldersStore>((set, get) => ({
    selectedFiles: [],
    currentFolder: "desktop",

    getFileOfType: (exts) => {
        let file: File | null = null;
        let files = get().selectedFiles;

        try {
            for (let index = 0; index < exts.length; index++) {
                const ext = exts[index];
                let tmpFile = files.find((file) => file.ext === ext);
                if(tmpFile) {
                    file = tmpFile;
                    break;
                }
            }  
        } finally {
            return file;
        }        
    },
    setCurrentFolder: (currentFolder) => set(() => ({ currentFolder })),
    setSelectedFiles: (selectedFiles) => set(() => ({ selectedFiles })),
    addSelectedFile: (selectedFile) => set(({ selectedFiles }) => (!selectedFiles.find((file) => file.name === selectedFile.name)) ? ({ selectedFiles: [selectedFile].concat(selectedFiles) }) : ({ selectedFiles })),
    removeSelectedFile: (selectedFile) => set(({ selectedFiles }) => ({ selectedFiles: selectedFiles.filter((file) => file.name !== selectedFile.name) })),
}));