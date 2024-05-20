import React, { useEffect } from 'react'
import { useGeneralStore } from '@/stores/general'
import { getAvailableWindows } from '@/helpers/windowsHelper';
import StartButtons from '@/components/Global/StartButtons';
import BootUp from '@/components/Terminal/BootUp';
import WindowContainer from '@/components/Desktop/Window/Window';

type Props = { children: React.ReactNode };

function DesktopHandler({ children }: Props) {
    const { windows, desktopStatus } = useGeneralStore();


    switch (desktopStatus) {
        case 'started':
            return (
                <>
                    <div className='z-[99] fixed top-0 right-0'>
                        {getAvailableWindows(windows)?.map((fWindow, i) =>
                            <React.Fragment key={`${i}-${fWindow.title}`}>
                                <WindowContainer title={fWindow.title}>
                                    {fWindow.windowChildren}
                                </WindowContainer>
                            </React.Fragment>
                        )}
                    </div>
                    {children}
                </>
            )

        case 'starting':
            return (
                <div className={'p-3'}>
                    <BootUp />
                </div>
            );

        case 'stopped':
            return (
                <div className={'w-screen h-screen flex justify-center items-center'}>
                    <StartButtons />
                </div>
            );
    }
}

export default DesktopHandler