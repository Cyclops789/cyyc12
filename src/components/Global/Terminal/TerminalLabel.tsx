import React from 'react'
import tw from 'twin.macro';

type Props = { children: React.ReactNode }

function TerminalLabel({ children }: Props) {
    return (
        <div 
            css={tw`bg-black w-full h-full cursor-text overflow-auto rounded-b-lg select-text`}
            onClick={() => document.getElementById("terminal")!.focus()}    
        >
            <div css={tw`p-2`}>
                {children}
            </div>
        </div>
    )
}

export default TerminalLabel;