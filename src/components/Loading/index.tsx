import React, { useEffect, useState } from 'react'
import Cat from '@/assets/cat.svg?react';
import { useGeneralStore } from '@/stores/general';
import tw from 'twin.macro';

type Props = { children: React.ReactNode };

function Loading({ children }: Props) {
    const { setDesktopStatus, desktopStatus } = useGeneralStore();
    const [loaded, setLoaded] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 1700);
        setTimeout(() => {
            setHidden(true);
        }, 2000);
    }, [desktopStatus]);

    return (
        <>
            <div
                css={[
                    tw`fixed z-[9999] h-screen w-screen flex justify-center items-center space-x-2 bg-black transition-all ease-in-out duration-700`,
                    loaded && tw`h-0 opacity-0`,
                    hidden && tw`hidden`
                ]}
            >
                <Cat
                    css={tw`w-[40%] lg:w-[20%]`}
                />
                <div
                    css={[
                        tw`text-[#842020] text-5xl lg:text-9xl`,
                    ]}
                >
                    Cyyc12
                </div>
            </div>
            {loaded && children}
        </>
    )
}

export default Loading;