import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTerminal } from '@fortawesome/free-solid-svg-icons'
import { useGeneralStore } from '@/stores/general';
import DesktopIcon from './DesktopIcon';
import { AvailableWindows } from '@/stores/general';

function Desktop() {

    return (
        <div className={'z-[9] fixed top-4 left-4 w-screen h-screen'}>
            <div className={'space-y-[25px]'}>
                <DesktopIcon title={'portfolio'} className={''}>
                    <FontAwesomeIcon
                        className='text-[43px]'
                        icon={faUser}
                    />
                </DesktopIcon>
                <DesktopIcon title={'terminal'} className={'h-[65px] w-[65px] mt-3'}>
                    <FontAwesomeIcon className='text-[40px]' icon={faTerminal} />
                </DesktopIcon>
            </div>
        </div>
    )
}

export default Desktop;