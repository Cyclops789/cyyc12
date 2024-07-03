import { useEffect, useRef } from 'react'
import tw from 'twin.macro';

const loadPacManAssets = async () => {
    try {
        await import(/* @vite-ignore */ '@/assets/js/pacman.js');
    } catch (error) {
    }
};

function Doom() {
    const pacmanRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (async () => {
            await loadPacManAssets().then(() => {
                if (pacmanRef.current && typeof (window as any).Pacman !== 'undefined') {
                    window.setTimeout(() => {
                        (window as any).PACMAN.init(pacmanRef.current, "./");
                    }, 0);
                }
            })
        })();
    }, [pacmanRef]);

    return (
        <div css={tw`bg-[rgb(21,29,36)] w-full h-full cursor-auto overflow-hidden`}>
            <div ref={pacmanRef}></div>
        </div>
    )
}

export default Doom;