import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useRef } from 'react';
import Tab from '@/components/Desktop/Window/Tab';
// import { AvailableWindows, WindowSize } from '@/stores/windows';
import { useWindowsStore } from '@/stores/windows';
import WindowLayout from '@/components/Layouts/WindowLayout';
import { type DraggableData, type Position, Rnd } from 'react-rnd';
import { IAvailableWindows } from '@/stores/windows';
import tw from 'twin.macro';
import { useLocalStorage } from 'react-localstorage-helper';

type Props = { children: React.ReactNode, window: IAvailableWindows };

function Window({ children, window: cWindow }: Props) {
    const nodeRef = useRef<HTMLDivElement>(null);
    const [closeOpacity, setCloseOpacity] = useState(false);
    const [minimizeAnimation, toggleMinimizeAnimation] = useState<boolean>();
    const { updateWindowSize, updateWindowPos, updateActiveWindow } = useWindowsStore();
    const windowOrder = useMemo(() => cWindow.window.order, [cWindow.window.order]);

    const [initialWidth, saveInitialWidth] = useLocalStorage<string>(`${cWindow.window.name}.size.width`, `${cWindow.window.size?.width || 990}`);
    const [initialHeight, saveInitialHeight] = useLocalStorage<string>(`${cWindow.window.name}.size.height`, `${cWindow.window.size?.height || 990}`);
    const [initialXPos, saveInitialXPos] = useLocalStorage<string>(`${cWindow.window.name}.pos.x`, `${cWindow.window.pos?.x || 0}`);
    const [initialYPos, saveInitialYPos] = useLocalStorage<string>(`${cWindow.window.name}.pos.y`, `${cWindow.window.pos?.y || 0}`);

    const handleActiveWindow = () => updateActiveWindow(cWindow.window.name);
    const handleWindowDrag = useCallback((p: { x: number, y: number }) => {
        updateWindowPos(cWindow.window.name, { x: p.x, y: p.y });

        if (p.y && p.y != 0) {
            saveInitialYPos(`${p.y}`);
        }

        if (p.x && p.x != 0) {
            saveInitialXPos(`${p.x}`);
        }
    }, []);

    const handleWindowResize = useCallback((ref: HTMLElement, p?: { x: number, y: number }) => {
        updateWindowSize(cWindow.window.name, {
            // width: delta.width,
            // height: delta.height
            width: ref.offsetWidth,
            height: ref.offsetHeight,
        });

        if (ref.offsetWidth && ref.offsetWidth != 0) {
            saveInitialWidth(`${ref.offsetWidth}`);
        }

        if (ref.offsetHeight && ref.offsetHeight != 0) {
            saveInitialHeight(`${ref.offsetHeight}`);
        }

        if (p) {
            handleWindowDrag(p);
        }
    }, []);

    return (
        <Rnd
            default={{ 
                width: !cWindow.window.fullscreen ? initialWidth : window.innerWidth - 2,
                height: !cWindow.window.fullscreen ? initialHeight : window.innerHeight - 50, 
                x: !cWindow.window.fullscreen ? parseInt(initialXPos) : 0, 
                y: !cWindow.window.fullscreen ? parseInt(initialYPos) : 0,
            }}
            size={{ 
                width: !cWindow.window.fullscreen ? initialWidth : window.innerWidth - 2, 
                height: !cWindow.window.fullscreen ? initialHeight : window.innerHeight - 50
            }}
            position={{ 
                x: !cWindow.window.fullscreen ? parseInt(initialXPos) : 0,
                y: !cWindow.window.fullscreen ? parseInt(initialYPos) : 0,
            }}
            enableResizing={!cWindow.window.fullscreen}
            disableDragging={cWindow.window.fullscreen}
            onMouseDown={handleActiveWindow}

            onDragStart={(_e, d) => handleWindowDrag(d)}
            onDragStop={(_e, d) => handleWindowDrag(d)}
            onDrag={(_e, d) => handleWindowDrag(d)}

            onResizeStart={(_e, _direction, ref) => handleWindowResize(ref)}
            onResizeStop={(_e, _direction, ref, _delta, position) => handleWindowResize(ref, position)}
            onResize={(_e, _direction, ref, _delta, position) => handleWindowResize(ref, position)}

            minWidth={208}
            minHeight={130}

            css={[
                tw`transition-all duration-[150ms] ease-out`,
            ]}
            style={{
                zIndex: 60 - windowOrder,
            }}
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