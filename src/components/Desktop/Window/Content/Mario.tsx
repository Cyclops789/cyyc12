import { CanvasHTMLAttributes, useEffect, useRef, useState } from 'react'
import tw from 'twin.macro';

declare global {
    interface Window {
        Mario: any | undefined;
        isSm64Loaded: boolean;
        rMario: () => void;
    }
}

export const loadMarioAssets = async () => {
    try {
        await import(/* @vite-ignore */ '@/assets/js/mario.js');
    } catch (error) {
        throw error;
    }
};

function Mario() {
    const marioRef = useRef<HTMLCanvasElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            await loadMarioAssets();
        })();

        return () => {
            window.Mario.exit();
        }
    }, [marioRef]);

    useEffect(() => {
        if (window.isSm64Loaded) {
            setIsLoaded(true);
        }
    }, [window.isSm64Loaded]);

    return (
        <div css={tw`bg-[rgb(21,29,36)] w-full h-full cursor-auto overflow-hidden`}>
            <canvas id={"mario"}></canvas>
        </div>
    )
}

export default Mario;