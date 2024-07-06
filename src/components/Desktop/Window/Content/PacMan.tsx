import { useEffect, useRef } from 'react'
import tw from 'twin.macro';

declare global {
    interface Window {
        PACMAN: {
            init: (wrapper: HTMLDivElement, root: string) => void;
            destroy: () => void;
        } | undefined;
        rPACMAN: () => void;
    }
}

export const loadPacManAssets = async () => {
    try {
        await import(/* @vite-ignore */ '@/assets/js/pacman.js');
    } catch (error) {
        throw new Error('Could not import pacman assets!')
    }
};

function Pacman() {
    const pacmanRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (async () => {
            await loadPacManAssets().then(() => {
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
        <div css={tw`bg-[rgb(21,29,36)] w-full h-full cursor-auto overflow-hidden`}>
            {/* Currently there is a bug where the sounds are getting played twice when you close / open pacman window */}
            <div ref={pacmanRef}></div>
        </div>
    )
}

export default Pacman;