import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DesktopIcon from './DesktopIcon';
import { fWindows } from '@/helpers/windowsHelper';
import { twj } from "tw-to-css";

function Desktop() {
    return (
        <div className={'z-[9] fixed top-4 left-4 w-screen h-screen'}>
            <div className={'space-y-[35px]'}>
                {fWindows.map((fWindow, index) => (
                    <DesktopIcon key={`${index}-${fWindow.title}`} title={fWindow.title} style={twj(fWindow.desktop.className || '')}>
                        <FontAwesomeIcon style={twj(fWindow.desktop.child.className || '')} icon={fWindow.desktop.child.icon} />
                    </DesktopIcon>
                ))}
            </div>
        </div>
    )
}

export default Desktop;