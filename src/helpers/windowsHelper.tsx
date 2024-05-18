import React from "react";
import { AvailableWindows } from "@/stores/general";
import Terminal from "@/components/Desktop/Window/Content/Terminal";

interface IAvailableWindows {
    title: AvailableWindows;
    children: React.ReactNode
}

const fWindows: IAvailableWindows[] = [
    {
        title: 'terminal',
        children: <Terminal />
    }
];

export const getAvailableWindows = (windows: AvailableWindows[]): IAvailableWindows[] => {

    const availableWindows = fWindows.filter(fWindow => windows.find((window) => window.toLowerCase() === fWindow.title.toLowerCase()) !== undefined);

    return availableWindows;
}