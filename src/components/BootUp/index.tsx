import { useEffect } from 'react';
import { useGeneralStore } from '@/stores/general';
import tw from 'twin.macro';

function BootUp() {
    const { dummyTerminalTextBootUp, addBootUpTerminalText, BootUpTerminalTexts, setDesktopStatus, desktopStatus, setBootUpTerminalText } = useGeneralStore();
    let i = 0;

    const onStart = () => {
        setTimeout(() => {
            const currentDummyText = dummyTerminalTextBootUp[i];
            addBootUpTerminalText(currentDummyText);
            i++;
            if (i < dummyTerminalTextBootUp.length) {
                onStart()
            } else {
                setDesktopStatus('started');
                setBootUpTerminalText([]);
            }
        }, 200);
    }

    useEffect(() => {
        if (desktopStatus === 'starting') onStart();
    }, [desktopStatus]);

    useEffect(() => {
        if (BootUpTerminalTexts?.length > 0) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }, [BootUpTerminalTexts]);

    return (
        BootUpTerminalTexts && (
            <div>
                {BootUpTerminalTexts.map((t, i) => <div key={`${t}-${i}`} css={tw`text-white`}>{'['} <span css={tw`text-green-600`}>OK</span>  {']'} <span>{t}</span></div>)}
            </div>
        )
    )
}

export default BootUp;