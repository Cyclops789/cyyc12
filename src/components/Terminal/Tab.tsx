import React from 'react'

type Props = { initialAction: "terminal" | "desktop" | null };

function Tab({ initialAction }: Props) {
    return (
        <div className="flex justify-between">
            <div className="bg-green-800 w-full h-[30px] flex justify-center items-center">
                <span>{initialAction === 'terminal' ? '~ : zsh - Terminal' : initialAction === 'desktop' ? 'Debian 12 - Desktop' : ''} </span>
            </div>
        </div>
    )
}

export default Tab;