import React, { Suspense } from 'react'
import tw from 'twin.macro';

type Props = { children: React.ReactNode};

function WindowLayout({ children }: Props) {
    return (
        <div css={tw`w-full h-[calc(100%-30px)] bg-black select-all cursor-auto`}>
            <Suspense 
                fallback={
                    <div css={tw`h-full w-full flex justify-center items-center`}>
                        <div css={tw`text-white`}>
                            Working on it ...
                        </div>
                    </div>
                }
            >
                {children}
            </Suspense>
        </div>
    )
}

export default WindowLayout