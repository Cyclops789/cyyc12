import React, { useRef } from 'react';
import { useWindowsStore } from '@/stores/windows';
import { ReactMouseSelect } from 'react-mouse-select';
import './UserSelectionHandler.css'
type Props = { children: React.ReactNode };

function UserSelectionHandler({ children }: Props) {
    const containerRef = useRef<HTMLElement>(null);
    const { activeWindow } = useWindowsStore();

    return (
        <>
            {(activeWindow === undefined) && 
                <ReactMouseSelect
                    containerRef={containerRef}
                    frameClassName={`UserSelectionHandler`}
                />
            }
            {children}
        </>
    )
}

export default UserSelectionHandler;