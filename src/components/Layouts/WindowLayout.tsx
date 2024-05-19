import React from 'react'

type Props = { children: React.ReactNode };

function WindowLayout({ children }: Props) {
    return (
        <div className={'w-[80vw] h-[80vh]'}>
            {children}
        </div>
    )
}

export default WindowLayout