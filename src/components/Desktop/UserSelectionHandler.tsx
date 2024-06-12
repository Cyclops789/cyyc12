import React, { useEffect, type RefObject } from 'react';
import { useWindowsStore } from '@/stores/windows';
import { ReactMouseSelect } from 'react-mouse-select';
import './UserSelectionHandler.css'
type Props = { children: React.ReactNode, selectAbleContainerRef: RefObject<HTMLDivElement> };

function UserSelectionHandler({ children, selectAbleContainerRef }: Props) {
    const { activeWindow } = useWindowsStore();

    useEffect(() => {
        console.log('activeWindow', activeWindow)
    }, [activeWindow])

    return (
        <>
            {(activeWindow === undefined) && 
                <ReactMouseSelect
                    containerRef={selectAbleContainerRef}
                    frameClassName={`UserSelectionHandler`}
                    itemClassName={`UserSelectionItem`}
                />
            }
            {children}
        </>
    )
}

export default UserSelectionHandler;