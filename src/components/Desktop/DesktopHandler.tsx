import React, { useEffect } from 'react'
import { useGeneralStore } from '@/stores/general'
import { getAvailableWindows } from '@/helpers/windowsHelper';
import WindowContainer from './Window/Window';
import BootUp from '../Terminal/BootUp';
import StartButtons from '../Global/StartButtons';

type Props = { children: React.ReactNode };

function DesktopHandler({ children }: Props) {
    const { windows, desktopStatus } = useGeneralStore();


    switch (desktopStatus) {
        case 'started':
            return (
                <>
                    <div className='z-[99] fixed top-0 right-0'>
                        {getAvailableWindows(windows)?.map((fWindow, i) =>
                            <WindowContainer title={fWindow.title}>
                                <React.Fragment key={`${i}-${fWindow.title}`}>
                                    {fWindow.children}
                                </React.Fragment>
                            </WindowContainer>
                        )}
                    </div>
                    {children}
                </>
            )

        case 'starting':
            return (<BootUp />);

        case 'stopped':
            return (
                <div className={'w-screen h-screen flex justify-center items-center'}>
                    <StartButtons />
                </div>
            );
    }
}

export default DesktopHandler