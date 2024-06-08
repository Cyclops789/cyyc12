import React from 'react'
import { useGeneralStore } from '@/stores/general'
import StartButtons from '@/components/Global/StartButtons';
import BootUp from '@/components/Terminal/BootUp';
import WindowContainer from '@/components/Desktop/Window/Window';
import { useWindowsStore } from '@/stores/windows';
import tw from 'twin.macro';

type Props = { children: React.ReactNode };

function DesktopHandler({ children }: Props) {
    const { desktopStatus } = useGeneralStore();
    const { windows } = useWindowsStore();

    switch (desktopStatus) {
        case 'started':
            return (
                <>
                    <div css={tw`z-[99]`}>
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
                <div css={tw`p-3`}>
                    <BootUp />
                </div>
            );

        case 'stopped':
            return (
                <div css={tw`w-screen h-screen flex justify-center items-center`}>
                    <StartButtons />
                </div>
            );
    }
}

export default DesktopHandler