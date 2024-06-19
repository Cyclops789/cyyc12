import React from 'react'
import tw from 'twin.macro';

type Props = { children: React.ReactNode};

function WindowLayout({ children }: Props) {
    return (
        <div css={tw`w-full h-[calc(100%-30px)] select-text`}>
            {children}
        </div>
    )
}

export default WindowLayout