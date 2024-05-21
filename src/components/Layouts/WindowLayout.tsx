import React, { useEffect } from 'react'
// import { type WindowSize } from '@/stores/windows';

type Props = { children: React.ReactNode};

function WindowLayout({ children }: Props) {

    return (
        <div className='w-full h-[calc(100%-30px)]'>
            {children}
        </div>
    )
}

export default WindowLayout