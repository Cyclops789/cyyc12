import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DesktopIcon from './DesktopIcon';
import { twj } from "tw-to-css";
import { useWindowsStore } from '@/stores/windows';

function Desktop() {
    const { windows } = useWindowsStore();

    return (
        <div className={'z-[9] fixed top-4 left-4 w-screen h-screen'}>
            <div className={'space-y-[35px]'}>
                {windows.map((fWindow, index) => (
                    <DesktopIcon key={`${index}-${fWindow.window.name}`} title={fWindow.window.name} style={twj(fWindow.desktop.className || '')}>
                        <FontAwesomeIcon style={twj(fWindow.desktop.child.className || '')} icon={fWindow.desktop.child.icon} />
                    </DesktopIcon>
                ))}
            </div>
        </div>
    )
}

export default Desktop;