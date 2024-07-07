import { useEffect } from 'react';
import { useGeneralStore } from '@/stores/general';
import { useWindowsStore } from '@/stores/windows';
import tw from 'twin.macro';

function ShutDown() {
    const { dummyTerminalTextShutDown, addShutDownTerminalText, ShutDownTerminalTexts, setDesktopStatus, desktopStatus, setShutDownTerminalText } = useGeneralStore();
    const { updateActiveWindow, windows } = useWindowsStore();

    let i = 0;

    const onStop = () => {
        setTimeout(() => {
            const currentDummyText = dummyTerminalTextShutDown[i];
            addShutDownTerminalText(currentDummyText);
            i++;
            if (i < dummyTerminalTextShutDown.length) {
                onStop();
            } else {
                setDesktopStatus('stopped');
                updateActiveWindow(undefined);
                setShutDownTerminalText([]);

                windows.map((cWindow) => cWindow.window.open && cWindow.window.functions?.close());
            }
        }, 90);
    }

    useEffect(() => {
        if (desktopStatus === 'stopping') onStop();
    }, [desktopStatus]);

    useEffect(() => {
        if (ShutDownTerminalTexts?.length > 0) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }, [ShutDownTerminalTexts]);

    return (
        ShutDownTerminalTexts && (
            <div>
                {ShutDownTerminalTexts.map((t, i) => <div key={`${t}-${i}`} css={tw`text-white`}>{'['} <span css={tw`text-yellow-600`}>OK</span>  {']'} <span>{t}</span></div>)}
            </div>
        )
    )
}

export default ShutDown;