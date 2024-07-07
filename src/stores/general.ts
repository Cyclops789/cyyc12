import { create } from 'zustand'
import { AvailableCategories } from './windows';

export type DesktopActions   = 'start' | 'restart' | 'stop' | null;
export type DeskTopStatus    = 'started' | 'starting' | 'loading' | 'stopping'  | 'stopped';
export const availableBackgrounds = [
    'cmatrix.green',
    'cmatrix.white',
    'cmatrix.orange',
    'cmatrix.yellow',
    'cmatrix.red',
] as const;
export type AvailableBackgrounds = (typeof availableBackgrounds)[number];


export interface IGeneralStore {
    desktopStatus: DeskTopStatus;
    desktopAction: DesktopActions;
    activeBackground: AvailableBackgrounds;
    showBootUp: boolean;
    openTerminal: boolean;
    
    ShutDownTerminalTexts: string[],
    BootUpTerminalTexts: string[],
    
    dummyTerminalTextShutDown: string[];
    dummyTerminalTextBootUp: string[];

    isUserSelectionActive: boolean;
    activeMenuCategory: AvailableCategories | null;
    
    setActiveMenuCategory: (activeMenuCategory: AvailableCategories | null) => void;
    setIsUserSelectionActive: (isUserSelectionActive: boolean) => void;
    setDesktopAction: (desktopAction: DesktopActions) => void;
    setDesktopStatus: (desktopStatus: DeskTopStatus) => void;
    setActiveBackground: (activeBackground: AvailableBackgrounds) => void;

    setShutDownTerminalText: (ShutDownTerminalTexts: string[]) => void;
    addShutDownTerminalText: (ShutDownTerminalText: string) => void;

    setBootUpTerminalText: (BootUpTerminalTexts: string[]) => void;
    addBootUpTerminalText: (BootUpTerminalText: string) => void;
}


export const useGeneralStore = create<IGeneralStore>((set) => ({
    desktopStatus: 'stopped',
    desktopAction: null,
    activeBackground: 'cmatrix.red',
    showBootUp: false,
    openTerminal: false,
    
    ShutDownTerminalTexts: [],
    BootUpTerminalTexts: [],

    dummyTerminalTextBootUp: [
        "Found device VMware Virtual_S 2.",
        "Activating swap /dev/disk/by-uuid/8ed17f08-eb8c-4374-bc43-b3ee4dabc875. Found device VMware_Virtual_S 1.",
        "Mounting boot...",
        "Activated swap /dev/disk/by-uuid/8ed17f08-eb8c-4374-bc43-b3ee4dabc875. Reached target Swaps.",
        "Mounting Temporary Directory /tmp...",
        "Mounted Temporary Directory /tmp.",
        "Mounted /boot.",
        "Reached target Local File Systems.",
        "Starting Automatic Boot Loader Update...",
        "Starting Create Volatile Files and Directories...",
        "Finished Automatic Boot Loader Update.",
        "Finished Create Volatile Files and Directories. Starting Record System Boot/Shutdown in UTMP... Finished Record System Boot/Shutdown in UTMP.",
        "Reached target System Initialization.",
        "Started Daily verification of password and group files. Started Daily Cleanup of Temporary Directories.",
        "Reached target Timer Units.",
        "Listening on D-Bus System Message Bus Socket.",
        "Reached target Socket Units.",
        "Reached target Basic System.",
        "Started D-Bus System Message Bus.",
        "Starting Network Manager...",
        "Starting User Login Management...",
        "Started Verify integrity of password and group files.",
        "Started User Login Management.",
        "Started Network Manager.",
        "Reached target Network.",
        "Starting Permit User Sessions...",
        "Finished Permit User Sessions.",
        "Started Getty on tty1.",
        "Reached target Login Prompts.",
        "Reached target Multi-User System.",
        "Reached target Graphical Interface.",
        "Starting Hostname Service...",
        "Started Hostname Service.",
        "Listening on Load/Save RF Kill Switch Status /dev/rfkill Watch. Starting Network Manager Script Dispatcher Service...",
        "Started Network Manager Script Dispatcher Service.",
    ],
    dummyTerminalTextShutDown: [
        "Found device VMware Virtual_S 2.",
        "Deactivating swap /dev/disk/by-uuid/8ed17f08-eb8c-4374-bc43-b3ee4dabc875. Found device VMware_Virtual_S 1.",
        "Unmounting boot...",
        "Dactivated swap /dev/disk/by-uuid/8ed17f08-eb8c-4374-bc43-b3ee4dabc875. Reached target Swaps.",
        "Unmounting Temporary Directory /tmp...",
        "Unmounted Temporary Directory /tmp.",
        "Unmounted /boot.",
        "Reached target Local File Systems.",
        "Stopping Automatic Boot Loader Update...",
        "Stopping Create Volatile Files and Directories...",
        "Finished Automatic Boot Loader Update.",
        "Finished Create Volatile Files and Directories. Stopping Record System Boot/Shutdown in UTMP... Finished Record System Boot/Shutdown in UTMP.",
        "Reached target System Initialization.",
        "Stopped Daily verification of password and group files. Stopped Daily Cleanup of Temporary Directories.",
        "Reached target Timer Units.",
        "Listening on D-Bus System Message Bus Socket.",
        "Reached target Socket Units.",
        "Reached target Basic System.",
        "Stopped D-Bus System Message Bus.",
        "Stopping Network Manager...",
        "Stopping User Login Management...",
        "Stopped Verify integrity of password and group files.",
        "Stopped User Login Management.",
        "Stopped Network Manager.",
        "Reached target Network.",
        "Stopping Permit User Sessions...",
        "Finished Permit User Sessions.",
        "Stopped Getty on tty1.",
        "Reached target Login Prompts.",
        "Reached target Multi-User System.",
        "Reached target Graphical Interface.",
        "Stopping Hostname Service...",
        "Stopped Hostname Service.",
        "Stopped listening on Load/Save RF Kill Switch Status /dev/rfkill Watch. Stopping Network Manager Script Dispatcher Service...",
        "Stopped Network Manager Script Dispatcher Service.",
    ],
    activeMenuCategory: null,
    isUserSelectionActive: false,

    setIsUserSelectionActive: (isUserSelectionActive) => set(() => ({ isUserSelectionActive })),
    setActiveMenuCategory: (activeMenuCategory) => set(() => ({ activeMenuCategory })),

    setDesktopAction: (desktopAction) => set(() => ({ desktopAction })),
    setDesktopStatus: (desktopStatus) => set(() => ({ desktopStatus })),
    setActiveBackground: (activeBackground) => set(() => ({ activeBackground })),

    setBootUpTerminalText: (BootUpTerminalTexts) => set(() => ({ BootUpTerminalTexts })),
    addBootUpTerminalText: (BootUpTerminalText) => set(({ BootUpTerminalTexts }) => ({ BootUpTerminalTexts: [...BootUpTerminalTexts as string[], BootUpTerminalText] })),

    setShutDownTerminalText: (ShutDownTerminalTexts) => set(() => ({ ShutDownTerminalTexts })),
    addShutDownTerminalText: (ShutDownTerminalText) => set(({ ShutDownTerminalTexts }) => ({ ShutDownTerminalTexts: [...ShutDownTerminalTexts as string[], ShutDownTerminalText] })),
}));