import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DesktopIcon from './DesktopIcon';
import { fWindows } from '@/helpers/windowsHelper';

function Desktop() {
    return (
        <div className={'z-[9] fixed top-4 left-4 w-screen h-screen'}>
            <div className={'space-y-[25px]'}>
                {fWindows.map((fWindow) => (
                    <DesktopIcon title={fWindow.title} className={fWindow.desktop.className}>
                        <FontAwesomeIcon className={fWindow.desktop.child.className} icon={fWindow.desktop.child.icon} />
                    </DesktopIcon>
                ))}
            </div>
        </div>
    )
}

export default Desktop;