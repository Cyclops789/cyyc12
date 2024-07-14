import React, { Suspense, memo, useCallback, useMemo, useState } from 'react'
import { useRef } from 'react';
import Tab from '@/components/Desktop/Window/Tab';
import { useWindowsStore } from '@/stores/windows';
import WindowLayout from '@/components/Layouts/WindowLayout';
import { Rnd } from 'react-rnd';
import { IAvailableWindows } from '@/stores/windows';
import tw from 'twin.macro';
import { usePersistedLocatedState } from '@/helpers/hooks/usePersistedLocatedState';
import { useCommandsStore } from '@/stores/commands';
import { useBrowserHistoryStore } from '@/stores/browserHistory';
import { DEFAULT_HISTORY_URL } from '@/helpers/historyHelper';

type Props = { children: React.ReactNode, window: IAvailableWindows };

function Window({ children, window: cWindow }: Props) {
    const nodeRef = useRef<HTMLDivElement>(null);
    const [hideRnd, setHideRnd] = useState(false);

    const { activeWindow, updateWindowSize, updateWindowPos, updateActiveWindow, toggleWindowMinimize, toggleWindow } = useWindowsStore();
    const { setCommands } = useCommandsStore();
    const { setLinksHistory, setCurrentLink } = useBrowserHistoryStore();

    const windowOrder = useMemo(() => cWindow.window.order, [cWindow.window.order]);

    const [initialWidth, saveInitialWidth] = usePersistedLocatedState(`${cWindow.window.name}.size.width`, `${cWindow.window.size?.width ?? 990}`);
    const [initialHeight, saveInitialHeight] = usePersistedLocatedState(`${cWindow.window.name}.size.height`, `${cWindow.window.size?.height ?? 490}`);
    const [initialXPos, saveInitialXPos] = usePersistedLocatedState(`${cWindow.window.name}.pos.x`, `${cWindow.window.pos?.x ?? 331}`);
    const [initialYPos, saveInitialYPos] = usePersistedLocatedState(`${cWindow.window.name}.pos.y`, `${cWindow.window.pos?.y ?? 205}`);

    const handleActiveWindow = () => updateActiveWindow(cWindow.window.name);
    const handleResizeFade = useCallback((type: 'in' | 'out') => {
        if (nodeRef.current) {
            switch (type) {
                case 'in':
                    nodeRef.current.style.opacity = '0';
                    nodeRef.current.style.transform = `scale(0.95)`;

                    setTimeout(() => {
                        if (!nodeRef.current) return;
                        nodeRef.current.style.transform = `scale(1)`;
                        nodeRef.current.style.display = 'none';
                        setHideRnd(true);
                    }, 100);
                    break;

                case 'out':
                    nodeRef.current.style.opacity = '1';
                    nodeRef.current.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        if (!nodeRef.current) return;
                        nodeRef.current.style.transform = 'scale(1)';
                        nodeRef.current.style.display = '';
                        setHideRnd(false);
                    }, 100);
                    break;

                default:
                    toggleWindowMinimize(cWindow.window.name, undefined);
                    break;
            }
        }
    }, [nodeRef.current]);

    const handleWindowDrag = useCallback((_: any, p: { x: number, y: number }) => {
        updateWindowPos(cWindow.window.name, { x: p.x, y: p.y });
        saveInitialYPos(`${p.y}`);
        saveInitialXPos(`${p.x}`);
    }, []);

    const handleWindowResize = useCallback((ref: HTMLElement, p?: { x: number, y: number }) => {
        updateWindowSize(cWindow.window.name, { width: ref.offsetWidth, height: ref.offsetHeight });

        if (ref.offsetWidth) saveInitialWidth(`${ref.offsetWidth}`);
        if (ref.offsetHeight) saveInitialHeight(`${ref.offsetHeight}`);
        if (p) handleWindowDrag(null, p);
    }, []);

    const handleWindowClose = cWindow.window.functions.close = useCallback(() => {
        handleResizeFade('in');
        setTimeout(() => {
            toggleWindow(cWindow.window.name, false);
            updateActiveWindow(undefined);

            switch (cWindow.window.name) {
                case 'konsole':
                    setCommands([]);
                    break;

                case 'icefox':
                    setLinksHistory([DEFAULT_HISTORY_URL]);
                    setCurrentLink(DEFAULT_HISTORY_URL);
                    break;

                case 'pacman':
                    try {
                        window.PACMAN?.destroy();
                    } catch (error) {
                        console.error("There was an error destroying pacman window:", error);
                    } finally {
                        break;
                    }

                case 'webamp':
                    try {
                        window.WebAmpRef.close();
                    } catch (error) {
                        console.error("There was an error closing webamp window:", error);
                    } finally {
                        break;
                    }
            }
        }, 200);
    }, [cWindow.window.name]);

    const handleWindowMinimize = cWindow.window.functions.minimize = useCallback(() => {
        handleResizeFade((cWindow.window.minimize === 'enabled') ? 'out' : 'in');
        toggleWindowMinimize(cWindow.window.name, (cWindow.window.minimize === 'enabled') ? 'disabled' : 'enabled');
        updateActiveWindow((cWindow.window.minimize === 'enabled') ? cWindow.window.name : undefined);

        if (cWindow.window.name === 'webamp') {
            try {
                if (cWindow.window.minimize === 'enabled') {
                    window.WebAmpRef.reopen();
                } else {
                    window.WebAmpRef.close();
                }
            } catch (error) {
                console.error("There was an error closing webamp window:", error);
            }
        }
    }, [cWindow.window.minimize]);

    return (
        !cWindow.window.ignore?.window ?
            <Rnd
                size={{
                    width: !cWindow.window.fullscreen ? cWindow.window.size?.width ?? 990 : window.innerWidth - 2,
                    height: !cWindow.window.fullscreen ? cWindow.window.size?.height ?? 490 : window.innerHeight - 50
                }}
                position={{
                    x: !cWindow.window.fullscreen ? cWindow.window.pos?.x ?? 331 : 0,
                    y: !cWindow.window.fullscreen ? cWindow.window.pos?.y ?? 205 : 0,
                }}

                enableResizing={!cWindow.window.fullscreen && cWindow.window.name !== 'pacman'}
                disableDragging={cWindow.window.fullscreen}
                onMouseDown={handleActiveWindow}

                onDragStart={handleWindowDrag}
                onDragStop={handleWindowDrag}
                onDrag={handleWindowDrag}

                onResizeStart={(_e, _direction, ref) => handleWindowResize(ref)}
                onResizeStop={(_e, _direction, ref, _delta, position) => handleWindowResize(ref, position)}
                onResize={(_e, _direction, ref, _delta, position) => handleWindowResize(ref, position)}

                minWidth={208}
                minHeight={130}

                css={[tw`shadow-md shadow-black rounded-lg transition-all duration-[150ms] ease-out`, hideRnd && tw`!hidden`]}
                style={{ zIndex: 60 - windowOrder }}
                dragHandleClassName={'dragHandler'}
                resizeGrid={[50, 50]}
            >
                <div
                    ref={nodeRef}
                    css={[
                        tw`border-2 cursor-none border-base-700 h-full w-full transform-gpu overflow-hidden transition-[width,height,opacity] duration-[200ms] ease-out`,
                        cWindow.window.fullscreen ? tw`rounded-t-lg` : tw`rounded-lg`,
                        (activeWindow !== cWindow.window.name) && tw`bg-base-800 border-base-800`,
                    ]}
                >
                    <Tab {...{ window: cWindow, handleWindowClose, handleWindowMinimize }} />
                    <WindowLayout>
                        {children}
                    </WindowLayout>
                </div>
            </Rnd>
            :
            <Suspense>{children}</Suspense>
    );
}

export default memo(Window);