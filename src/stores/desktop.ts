import { create } from 'zustand';

export type sortBy = "name" | "category";
export type sortMethods = "asc" | "desc";

export interface IDesktopStore {
    sortBy: sortBy;
    sortMethod: sortMethods | null;

    setSortBy: (by: sortBy) => void;
    setSortMethod: (method: sortMethods) => void;
};

export const useDesktopStore = create<IDesktopStore>((set) => ({
    sortBy: "name",
    sortMethod: null,

    setSortBy: (by) => set(() => ({ sortBy: by })),
    setSortMethod: (method) => set(() => ({ sortMethod: method })),
}));
