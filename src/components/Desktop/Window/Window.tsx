import React, { memo, useCallback, useEffect, useMemo } from 'react'
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
    const { updateWindowSize, updateWindowPos, updateActiveWindow, toggleWindowMinimize } = useWindowsStore();

    const windowOrder = useMemo(() => cWindow.window.order, [cWindow.window.order]);
    //const minimizeAnimation = useMemo(() => cWindow.window.minimize, [cWindow.window.minimize]);

    const [initialWidth, saveInitialWidth] = useLocalStorage<string>(`${cWindow.window.name}.size.width`, `${cWindow.window.size?.width || 990}`);
    const [initialHeight, saveInitialHeight] = useLocalStorage<string>(`${cWindow.window.name}.size.height`, `${cWindow.window.size?.height || 490}`);
    const [initialXPos, saveInitialXPos] = useLocalStorage<string>(`${cWindow.window.name}.pos.x`, `${cWindow.window.pos?.x || 331}`);
    const [initialYPos, saveInitialYPos] = useLocalStorage<string>(`${cWindow.window.name}.pos.y`, `${cWindow.window.pos?.y || 205}`);

    const handleActiveWindow = () => updateActiveWindow(cWindow.window.name);

    const handleWindowDrag = useCallback((p: { x: number, y: number }) => {
        updateWindowPos(cWindow.window.name, { x: p.x, y: p.y });
        saveInitialYPos(`${p.y}`);
        saveInitialXPos(`${p.x}`);
    }, []);

    const handleWindowResize = useCallback((ref: HTMLElement, p?: { x: number, y: number }) => {
        updateWindowSize(cWindow.window.name, { width: ref.offsetWidth, height: ref.offsetHeight });

        if (ref.offsetWidth && ref.offsetWidth != 0) saveInitialWidth(`${ref.offsetWidth}`);
        if (ref.offsetHeight && ref.offsetHeight != 0) saveInitialHeight(`${ref.offsetHeight}`);
        if (p) handleWindowDrag(p);
    }, []);

    useEffect(() => {
        if(nodeRef.current) {
            if(cWindow.window.minimize === "enabled") {
                nodeRef.current.style.opacity = '0';
                nodeRef.current.style.transform = 'scale(0.95)';

                setTimeout(() => {
                    (nodeRef.current as any).style.transform = 'scale(1)';
                    (nodeRef.current as any).style.display = 'none';
                }, 150);
            } else if(cWindow.window.minimize === "disabled") {
                nodeRef.current.style.opacity = '1';
                nodeRef.current.style.transform = 'scale(1.05)';

                setTimeout(() => {
                    (nodeRef.current as any).style.transform = 'scale(1)';
                    (nodeRef.current as any).style.display = '';
                }, 150);
            } else {
                toggleWindowMinimize(cWindow.window.name, undefined);
            }
        }
    }, [cWindow.window.minimize, nodeRef.current]);

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

            css={[ tw`transition-all duration-[150ms] ease-out` ]}
            style={{ zIndex: 60 - windowOrder }}
            dragHandleClassName={'dragHandler'}
        >
            <div
                ref={nodeRef}
                css={[
                    tw`border-2 border-red-600 rounded-lg cursor-none h-full w-full transform-gpu transition-all duration-[200ms] ease-out`,
                ]}
            >
                <Tab {...{ window: cWindow }} />
                <WindowLayout>
                    {children}
                </WindowLayout>
            </div>
        </Rnd>
    );
}

export default memo(Window);