import { useEffect, useRef } from 'react'
import tw from 'twin.macro';
import { loadAssets } from '@/helpers/assetsHelper';

declare global {
    interface Window {
        PACMAN: {
            init: (wrapper: HTMLDivElement, root: string) => void;
            destroy: () => void;
        } | undefined;
        rPACMAN: () => void;
    }
}

function Pacman() {
    const pacmanRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (async () => {
            await loadAssets('@/assets/js/pacman.js', 'pacman').then(() => {
                if (pacmanRef.current) {
                    try {
                        window.rPACMAN();
                    } finally {
                        window.PACMAN?.init(pacmanRef.current, "./");  
                    }
                }
            })
        })();

        return () => {
            window.PACMAN?.destroy();
        }
    }, [pacmanRef]);
    
    return (
        <div css={tw`bg-custom1 w-full h-full cursor-auto overflow-hidden`}>
            {/* 
                Currently there is a bug where the sounds are getting played twice when you close / open pacman window 
                Probably because the audio instances doesnt get destroyed, still working on it.
            */}
            <div ref={pacmanRef}></div>
        </div>
    )
}

export default Pacman;