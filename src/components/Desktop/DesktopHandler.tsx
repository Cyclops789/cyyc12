import React, { useEffect } from 'react'
import { useGeneralStore } from '@/stores/general'
import StartButtons from '@/components/Global/StartButtons';
import BootUp from '@/components/Terminal/BootUp';
import WindowContainer from '@/components/Desktop/Window/Window';
import { useWindowsStore } from '@/stores/windows';

type Props = { children: React.ReactNode };

function DesktopHandler({ children }: Props) {
    const { desktopStatus } = useGeneralStore();
    const { windows } = useWindowsStore();

    switch (desktopStatus) {
        case 'started':
            return (
                <>
                    <div className='z-[99]'>
                        {windows?.map((fWindow, i) =>
                            fWindow.window.open && (
                                <React.Fragment key={`${i}-${fWindow.window.name}`}>
                                    <WindowContainer window={fWindow}>
                                        <fWindow.windowChildren />
                                    </WindowContainer>
                                </React.Fragment>)
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