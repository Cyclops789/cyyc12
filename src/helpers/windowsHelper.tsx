import React from "react";
import { AvailableWindows } from "@/stores/general";
import Terminal from "@/components/Desktop/Window/Content/Terminal";
import Projects from "@/components/Desktop/Window/Content/Projects";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faTerminal, faDiagramProject } from '@fortawesome/free-solid-svg-icons'

interface IAvailableWindows {
    title: AvailableWindows,
    windowChildren: React.ReactNode,
    desktop: {
        className?: string,
        child: {
            icon: IconDefinition,
            className?: string,
        },
    }
}

export const fWindows: IAvailableWindows[] = [
    {
        title: 'projects',
        windowChildren: <Projects />,
        desktop: {
            className: '',
            child: {
                icon: faDiagramProject,
                className: 'text-[40px]',
            },
        }
    },
    {
        title: 'terminal',
        windowChildren: <Terminal />,
        desktop: {
            className:'h-[65px] w-[65px] mt-3',
            child: {
                icon: faTerminal,
                className: 'text-[40px]',
            },
        }
    },
];

export const getAvailableWindows = (windows: AvailableWindows[]): IAvailableWindows[] => {
    const availableWindows = fWindows.filter(fWindow => windows.find((window) => window.toLowerCase() === fWindow.title.toLowerCase()) !== undefined);

    return availableWindows;
}