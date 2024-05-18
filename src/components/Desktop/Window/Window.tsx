import React from 'react'
import { useRef } from 'react';
import ReactDraggable from 'react-draggable';
import Tab from '@/components/Terminal/Tab';
import { AvailableWindows } from '@/stores/general';

type Props = { children: React.ReactNode, title: AvailableWindows };

function Window({ children, title }: Props) {
    const nodeRef = useRef(null);

    return (
        <ReactDraggable handle={'.handler'} nodeRef={nodeRef}>
            <div 
                ref={nodeRef}
                className={'border-2 border-red-600 rounded-lg no-cursor'}
            >
                <Tab 
                    title={title} 
                />
                {children}
            </div>
        </ReactDraggable>
    );
}

export default Window;