import React, { useEffect, type RefObject } from 'react';
import { useWindowsStore } from '@/stores/windows';
import { ReactMouseSelect } from 'react-mouse-select';
import './UserSelectionHandler.css'
import { useGeneralStore } from '@/stores/general';
type Props = { children: React.ReactNode, selectAbleContainerRef: RefObject<HTMLDivElement> };

function UserSelectionHandler({ children, selectAbleContainerRef }: Props) {
    const { activeWindow } = useWindowsStore();
    const { setIsUserSelectionActive } = useGeneralStore();

    return (
        <>
            {(activeWindow === undefined) && 
                <ReactMouseSelect
                    containerRef={selectAbleContainerRef}
                    
                    frameClassName={`UserSelectionHandler`}
                    itemClassName={`UserSelectionItem`}

                    startSelectionCallback={() => setIsUserSelectionActive(true)}
                    finishSelectionCallback={() => setIsUserSelectionActive(false)}
                    
                    saveSelectAfterFinish
                />
            }
            {children}
        </>
    )
}

export default UserSelectionHandler;