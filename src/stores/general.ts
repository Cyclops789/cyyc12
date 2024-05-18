import { create } from 'zustand'

export type AvailableWindows = 'terminal' | 'portfolio' | 'projects' | 'socials';
export type DesktopActions   = 'start' | 'restart' | 'stop' | null;
export type DeskTopStatus    = 'started' | 'starting' | 'stopped' | 'stopping';

export interface IGeneralStore {
    desktopStatus: DeskTopStatus;
    desktopAction: DesktopActions;
    showBootUp: boolean;
    openTerminal: boolean;
    terminalTexts: string[];
    dummyTerminalText: string[];
    windows: AvailableWindows[];

    setWindows: (windows: AvailableWindows[]) => void;
    addWindow: (window: AvailableWindows) => void;
    removeWindow: (window: AvailableWindows) => void;
    setDesktopAction: (desktopAction: DesktopActions) => void;
    setDesktopStatus: (desktopStatus: DeskTopStatus) => void;
    setShowBootUp: (showBootUp: boolean) => void;
    setOpenTerminal: (openTerminal: boolean) => void;
    setTerminalText: (terminalTexts: string[]) => void;
    addTerminalText: (terminalText: string) => void;
}

const filterWindows = (windows: AvailableWindows[], windowToRemove: AvailableWindows): AvailableWindows[] => {
    return windows.filter((fWindow) => fWindow.toLowerCase() !== windowToRemove.toLowerCase())
}

export const useGeneralStore = create<IGeneralStore>((set) => ({
    desktopStatus: 'stopped',
    desktopAction: null,
    showBootUp: false,
    openTerminal: false,
    terminalTexts: [],
    dummyTerminalText: [
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
    windows: [],

    setDesktopAction: (desktopAction) => set(() => ({ desktopAction })),
    setDesktopStatus: (desktopStatus) => set(() => ({ desktopStatus })),

    setShowBootUp: (showBootUp) => set(() => ({ showBootUp })),
    setOpenTerminal: (openTerminal) => set(() => ({ openTerminal })),
    setTerminalText: (terminalTexts) => set(() => ({ terminalTexts })),
    addTerminalText: (terminalText) => set(({ terminalTexts }) => ({ terminalTexts: [...terminalTexts as string[], terminalText] })),

    setWindows: (windows) => set(() => ({ windows })),
    addWindow: (window) => set(({ windows }) => ({ windows: [...windows as AvailableWindows[], window] })),
    removeWindow: (window) => set(({ windows }) => ({ windows: filterWindows(windows, window) })),
}));