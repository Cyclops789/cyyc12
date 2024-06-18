import React, { memo, useEffect, useState } from 'react'
import { useRef } from 'react';
import Tab from '@/components/Desktop/Window/Tab';
// import { AvailableWindows, WindowSize } from '@/stores/windows';
import { useWindowsStore } from '@/stores/windows';
import WindowLayout from '@/components/Layouts/WindowLayout';
import { Rnd } from 'react-rnd';
import { IAvailableWindows } from '@/stores/windows';
import tw from 'twin.macro';
import { useLocalStorage } from 'react-localstorage-helper';

type Props = { children: React.ReactNode, window: IAvailableWindows };

function Window({ children, window: cWindow }: Props) {
    const nodeRef = useRef<HTMLDivElement>(null);
    const [closeOpacity, setCloseOpacity] = useState(false);
    const [minimizeAnimation, toggleMinimizeAnimation] = useState<boolean>();

    const { updateWindowSize, updateWindowPos, updateActiveWindow, activeWindow } = useWindowsStore();

    const [initialWidth, saveInitialWidth] = useLocalStorage<string>(`${cWindow.window.name}.size.width`, `${cWindow.window.size?.width || 990}`);
    const [initialHeight, saveInitialHeight] = useLocalStorage<string>(`${cWindow.window.name}.size.height`, `${cWindow.window.size?.height || 990}`);
    const [initialXPos, saveInitialXPos] = useLocalStorage<string>(`${cWindow.window.name}.pos.x`, `${cWindow.window.pos?.x || 0}`);
    const [initialYPos, saveInitialYPos] = useLocalStorage<string>(`${cWindow.window.name}.pos.y`, `${cWindow.window.pos?.y || 0}`);

    const handleActiveWindow = () => updateActiveWindow(cWindow.window.name);

    useEffect(() => {
        if (nodeRef && nodeRef.current) {
            nodeRef.current.addEventListener('mousedown', handleActiveWindow);
        }

        return () => {
            if (nodeRef && nodeRef.current) {
                nodeRef.current.removeEventListener('mousedown', handleActiveWindow);
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
            enableResizing={!cWindow.window.fullscreen}
            disableDragging={cWindow.window.fullscreen}
            onDragStop={(_e, d) => {
                updateWindowPos(cWindow.window.name, { x: d.x, y: d.y })

                if (d.y && d.y != 0) {
                    saveInitialYPos(`${d.y}`);
                }

                if (d.x && d.x != 0) {
                    saveInitialXPos(`${d.x}`);
                }
            }}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onResizeStop={(_e, _direction, _ref, delta, _position) => {
                updateWindowSize(cWindow.window.name, {
                    // width: delta.width,
                    // height: delta.height

                    width: _ref.offsetWidth,
                    height: _ref.offsetHeight,
                });
                

                if (delta.width && delta.width != 0) {
                    saveInitialWidth(`${delta.width}`);
                }

                if (delta.height && delta.height != 0) {
                    saveInitialHeight(`${delta.height}`);
                }
            }}
            minWidth={208}
            minHeight={130}
            css={[
                tw`transition-all duration-[150ms] ease-out`,
                activeWindow === window.window.name ? tw`z-[99]` : tw`z-[98]`,
            ]}
            dragHandleClassName={'handler'}
        >
            <div
                ref={nodeRef}
                css={[
                    tw`border-2 border-red-600 rounded-lg cursor-none h-full w-full transform-gpu transition-all duration-[150ms] ease-out`,
                    closeOpacity && tw`opacity-0 scale-95`,
                    minimizeAnimation && tw`opacity-0 scale-95`,
                    (minimizeAnimation === false) && tw`opacity-100 scale-100`,
                ]}
            >
                <Tab {...{ window: cWindow, setCloseOpacity, toggleMinimizeAnimation }} />
                <WindowLayout>
                    {children}
                </WindowLayout>
            </div>
        </Rnd>
    );
}

export default memo(Window);