import React from 'react'
import tw from 'twin.macro';
// import { type WindowSize } from '@/stores/windows';

type Props = { children: React.ReactNode};

function WindowLayout({ children }: Props) {

    return (
        <div css={tw`w-full h-[calc(100%-30px)]`}>
            {children}
        </div>
    )
}

export default WindowLayout