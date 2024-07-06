import { create } from 'zustand'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Terminal from "@/components/Desktop/Window/Content/Terminal";
import Projects from "@/components/Desktop/Window/Content/Projects";
import IceFox from "@/components/Desktop/Window/Content/IceFox";
import PacMan from "@/components/Desktop/Window/Content/PacMan";
import { faTerminal, faDiagramProject, faGamepad, faGears, faUser, faGlobe, faDiceD6, faDiceFive, faGhost } from '@fortawesome/free-solid-svg-icons';

export const availableCategories = {
    categories_simple: ['games', 'development', 'personal' , 'internet'],
    categories_full: [
        {
            name: 'games',
            icon: faGamepad,
        },
        {
            name: 'development',
            icon: faGears,
        },
        {
            name: 'personal',
            icon: faUser
        },
        {
            name: 'internet',
            icon: faGlobe
        },
    ]
} as const;

export type AvailableCategories = (typeof availableCategories.categories_simple)[number];
export type AvailableWindows = 'konsole' | 'portfolio' | 'projects' | 'socials' | 'icefox' | 'pacman' | 
    /* Just to track clicks */ 'startmenu' |
    /* Just to prevent UserSelection from starting inside an icon */ 'icons'
    ;
export type WindowSize = { width: number, height: number };
export type WindowPos = { x: number, y: number };
export type WindowContainer = {
    name: AvailableWindows,
    category: AvailableCategories,
    size?: WindowSize,
    pos?: WindowPos,
    open: boolean,
    minimize?: "enabled" | "disabled",
    fullscreen: boolean,
    order: number,
    functions: {
        minimize: () => void;
        close: () => void;
    },
    smallTask: boolean;
    hoverSmallTask: boolean;
};

export interface IAvailableWindows {
    window: WindowContainer,
    windowChildren: () => React.JSX.Element,
    desktop: {
        className?: string,
        child: {
            icon: IconDefinition,
            css?: string,
        },
    }
}

export interface IGeneralStore {
    windows: IAvailableWindows[];
    activeWindow: AvailableWindows | undefined;

    updateActiveWindow: (activeWindow: AvailableWindows | undefined) => void;
    updateWindowSize: (windowName: AvailableWindows, size: WindowSize) => void;
    updateWindowPos: (windowName: AvailableWindows, pos: WindowPos) => void;

    toggleWindowHoverSmallTask: (windowName: AvailableWindows, action: boolean) => void;
    toggleWindowSmallTask: (windowName: AvailableWindows, action: boolean) => void;
    toggleWindow: (windowName: AvailableWindows, action: boolean) => void;
    toggleWindowMinimize: (windowName: AvailableWindows, action: "enabled" | "disabled" | undefined) => void;
    toggleWindowFullScreen: (windowName: AvailableWindows, action: boolean) => void;
}

export const useWindowsStore = create<IGeneralStore>((set) => ({
    windows: [
        {
            window: {
                name: 'projects',
                category: 'personal',
                open: false,
                minimize: undefined,
                fullscreen: false,
                order: 1,
                functions: {
                    minimize: () => { },
                    close: () => { },
                },
                smallTask: false,
                hoverSmallTask: false,
            },
            windowChildren: Projects,
            desktop: {
                className: '',
                child: {
                    icon: faDiagramProject,
                    css: 'font-size:40px;',
                },
            }
        },
        {
            window: {
                name: 'konsole',
                category: 'development',
                open: false,
                minimize: undefined,
                fullscreen: false,
                order: 2,
                functions: {
                    minimize: () => { },
                    close: () => { },
                },
                smallTask: false,
                hoverSmallTask: false,
            },
            windowChildren: Terminal,
            desktop: {
                className: 'h-[65px] w-[65px]',
                child: {
                    icon: faTerminal,
                    css: 'font-size:40px;',
                },
            }
        },
        {
            window: {
                name: 'icefox',
                category: 'internet',
                open: false,
                minimize: undefined,
                fullscreen: false,
                order: 3,
                functions: {
                    minimize: () => { },
                    close: () => { },
                },
                smallTask: false,
                hoverSmallTask: false,
            },
            windowChildren: IceFox,
            desktop: {
                className: 'h-[65px] w-[65px]',
                child: {
                    icon: faDiceD6,
                    css: 'font-size:40px;',
                },
            }
        },
        {
            window: {
                name: 'pacman',
                category: 'games',
                open: false,
                minimize: undefined,
                fullscreen: false,
                order: 4,
                size: {
                    width: 352,
                    height: 460,
                },
                functions: {
                    minimize: () => { },
                    close: () => { },
                },
                smallTask: false,
                hoverSmallTask: false,
            },
            windowChildren: PacMan,
            desktop: {
                className: 'h-[65px] w-[65px]',
                child: {
                    icon: faGhost,
                    css: 'font-size:40px;',
                },
            }
        },
    ],
    activeWindow: undefined,

    updateActiveWindow: (activeWindow) => set((state) => {
        if (activeWindow !== undefined) {
            const newWindows = state.windows.map((nWindow) => {
                if (nWindow.window.name === activeWindow) {
                    return { ...nWindow, window: { ...nWindow.window, order: 0 } };
                } else {
                    return { ...nWindow, window: { ...nWindow.window, order: nWindow.window.order + 1 } };
                }
            });

            return {
                ...state,
                windows: newWindows,
                activeWindow: activeWindow,
            };
        } else {
            return {
                activeWindow: undefined,
            };
        }
    }),

    updateWindowSize: (windowName, data) => set((state) => {
        const index = state.windows.findIndex((window) => window.window.name === windowName);
        if (index !== -1) {
            const updatedWindows = [
                ...state.windows.slice(0, index),
                { ...state.windows[index], window: { ...state.windows[index].window, size: data } },
                ...state.windows.slice(index + 1),
            ];

            return { windows: updatedWindows };
        }

        return state;
    }),
    updateWindowPos: (windowName, data) => set((state) => {
        const index = state.windows.findIndex((window) => window.window.name === windowName);
        if (index !== -1) {
            const updatedWindows = [
                ...state.windows.slice(0, index),
                { ...state.windows[index], window: { ...state.windows[index].window, pos: data } },
                ...state.windows.slice(index + 1),
            ];

            return { windows: updatedWindows };
        }

        return state;
    }),
    toggleWindow: (windowName, action) => set((state) => {
        const index = state.windows.findIndex((window) => window.window.name === windowName);
        if (index !== -1) {
            const updatedWindows = [
                ...state.windows.slice(0, index),
                { ...state.windows[index], window: { ...state.windows[index].window, open: action } },
                ...state.windows.slice(index + 1),
            ];

            return { windows: updatedWindows };
        }

        return state;
    }),
    toggleWindowMinimize: (windowName, action) => set((state) => {
        const index = state.windows.findIndex((window) => window.window.name === windowName);
        if (index !== -1) {
            const updatedWindows = [
                ...state.windows.slice(0, index),
                { ...state.windows[index], window: { ...state.windows[index].window, minimize: action } },
                ...state.windows.slice(index + 1),
            ];

            return { windows: updatedWindows };
        }

        return state;
    }),
    toggleWindowFullScreen: (windowName, action) => set((state) => {
        const index = state.windows.findIndex((window) => window.window.name === windowName);
        if (index !== -1) {
            const updatedWindows = [
                ...state.windows.slice(0, index),
                { ...state.windows[index], window: { ...state.windows[index].window, fullscreen: action } },
                ...state.windows.slice(index + 1),
            ];

            return { windows: updatedWindows };
        }

        return state;
    }),
    toggleWindowSmallTask: (windowName, action) => set((state) => {
        const index = state.windows.findIndex((window) => window.window.name === windowName);
        if (index !== -1) {
            const updatedWindows = [
                ...state.windows.slice(0, index),
                { ...state.windows[index], window: { ...state.windows[index].window, smallTask: action } },
                ...state.windows.slice(index + 1),
            ];

            return { windows: updatedWindows };
        }

        return state;
    }),
    toggleWindowHoverSmallTask: (windowName, action) => set((state) => {
        const index = state.windows.findIndex((window) => window.window.name === windowName);
        if (index !== -1) {
            const updatedWindows = [
                ...state.windows.slice(0, index),
                { ...state.windows[index], window: { ...state.windows[index].window, hoverSmallTask: action } },
                ...state.windows.slice(index + 1),
            ];

            return { windows: updatedWindows };
        }

        return state;
    }),
}));