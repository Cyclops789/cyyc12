import React, { useEffect } from 'react'
import { useRef } from 'react';
import Tab from '@/components/Terminal/Tab';
// import { AvailableWindows, WindowSize } from '@/stores/windows';
import { useWindowsStore } from '@/stores/windows';
import WindowLayout from '@/components/Layouts/WindowLayout';
import { Rnd } from 'react-rnd';
import { IAvailableWindows } from '@/stores/windows';
import tw from 'twin.macro';
import { useLocalStorage } from 'react-localstorage-helper';

type Props = { children: React.ReactNode, window: IAvailableWindows };

function Window({ children, window }: Props) {
    const nodeRef = useRef<HTMLDivElement>(null);
    const { updateWindowSize, updateWindowPos, updateActiveWindow, activeWindow } = useWindowsStore();

    const [initialWidth, saveInitialWidth] = useLocalStorage<string>(`${window.window.name}.size.width`, `${window.window.size?.width || 990}`);
    const [initialHeight, saveInitialHeight] = useLocalStorage<string>(`${window.window.name}.size.height`, `${window.window.size?.height || 990}`);
    const [initialXPos, saveInitialXPos] = useLocalStorage<string>(`${window.window.name}.pos.x`, `${window.window.pos?.x || 0}`);
    const [initialYPos, saveInitialYPos] = useLocalStorage<string>(`${window.window.name}.pos.y`, `${window.window.pos?.y || 0}`);

    const handleActiveWindow = () => updateActiveWindow(window.window.name);

    useEffect(() => {
        if(nodeRef && nodeRef.current) {
            nodeRef.current.addEventListener('mousedown', handleActiveWindow);
        }

        return () => {
            if(nodeRef && nodeRef.current) {
                nodeRef.current && nodeRef.current.removeEventListener('mousedown', handleActiveWindow);
            }  
        };
    }, [nodeRef])

    return (
        <Rnd
            default={{ 
                width: initialWidth, 
                height: initialHeight, 
                x: parseInt(initialXPos), 
                y: parseInt(initialYPos)
            }}
            onDragStop={(_e, d) => { 
                updateWindowPos(window.window.name, { x: d.x, y: d.y })

                if(d.y && d.y != 0) {
                    saveInitialYPos(`${d.y}`);
                }

                if(d.x && d.x != 0) {
                    saveInitialXPos(`${d.x}`);
                }
            }}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onResizeStop={(_e, _direction, _ref, delta, _position) => {
                updateWindowSize(window.window.name, {
                    width: delta.width,
                    height: delta.height
                });

                if(delta.width && delta.width != 0) {
                    saveInitialWidth(`${delta.width}`);
                }

                if(delta.height && delta.height != 0) {
                    saveInitialHeight(`${delta.height}`);
                }
            }}
            minWidth={130}
            minHeight={130}
            css={[
                activeWindow === window.window.name ? tw`z-[99]` : tw`z-[98]`
            ]}
            dragHandleClassName={'handler'}
        >
            <div
                ref={nodeRef}
                css={tw`border-2 border-red-600 rounded-lg cursor-none h-full`}
            >
                <Tab {...{ window }} />
                <WindowLayout>
                    {children}
                </WindowLayout>
            </div>
        </Rnd>
    );
}

export default Window;