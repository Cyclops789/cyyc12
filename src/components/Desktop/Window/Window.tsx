import React, { useState } from 'react'
import { useRef } from 'react';
import ReactDraggable from 'react-draggable';
import Tab from '@/components/Terminal/Tab';
import { AvailableWindows, WindowSize } from '@/stores/windows';
import { Resizable } from 're-resizable';
import { useWindowsStore } from '@/stores/windows';
import WindowLayout from '@/components/Layouts/WindowLayout';
import { Rnd } from 'react-rnd';
import { IAvailableWindows } from '@/stores/windows';

type Props = { children: React.ReactNode, window: IAvailableWindows };

function Window({ children, window }: Props) {
    const nodeRef = useRef(null);
    const { updateWindowSize, updateWindowPos } = useWindowsStore();

    return (
        <Rnd
            default={{ 
                width: window.window.size?.width || 990, 
                height: window.window.size?.height || 490, 
                x: window.window.pos?.x || 0, 
                y: window.window.pos?.y || 0 
            }}
            position={{ x: window.window.pos?.x || 0, y: window.window.pos?.y || 0 }}
            onDragStop={(e, d) => { updateWindowPos(window.window.name ,{ x: d.x, y: d.y }) }}
            onResizeStop={(e, direction, ref, delta, position) => {
                updateWindowSize(window.window.name, {
                    width: delta.width,
                    height: delta.height
                });
            }}
            className='z-[99]'
            dragHandleClassName={'handler'}
        >
            <div
                ref={nodeRef}
                className={'border-2 border-red-600 rounded-lg no-cursor h-full'}
            >
                <Tab {...{ title: window.window.name }} />
                <WindowLayout>
                    {children}
                </WindowLayout>
            </div>
        </Rnd>
    );
}

export default Window;