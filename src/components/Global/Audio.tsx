import { useEffect, useMemo, useRef, useState } from "react";
import type Webamp from "webamp";
import { useFoldersStore } from "@/stores/folders";
import { useWindowsStore } from "@/stores/windows";
import { loadWebAmpAssets } from "@/helpers/assetsHelper";

declare global {
    interface Window {
        Webamp: typeof Webamp;
        WebAmpRef: Webamp;
    }
}

function WebampPlayer() {
    const divRef = useRef<HTMLDivElement | null>(null);
    const webamp = useRef<Webamp | null>(null);
    const webNodeRef = useRef<HTMLDivElement | null>(null);
    const [isRendered, setIsRendered] = useState(false);

    const { currentMusicFile } = useFoldersStore();
    const { windows, updateActiveWindow } = useWindowsStore();
    const WebAmpWindowOrder = useMemo(() => windows[6].window.order, [windows[6].window.order])

    const conf = {
        initialTracks: [
            {
                metaData: {
                    artist: "",
                    title: currentMusicFile?.name.split('.')[0]
                },
                url: currentMusicFile?.staticPath
            }
        ]
    };

    useEffect(() => {
        if (!webamp.current && divRef.current) {
            (async () => {
                await loadWebAmpAssets().then(() => {
                    if (typeof window.Webamp !== 'undefined') {
                        if (divRef.current) {
                            // @ts-ignore this is valid
                            webamp.current = window.WebAmpRef = new window.Webamp(conf);
                            webamp.current.renderWhenReady(divRef.current).finally(() => setIsRendered(true));
                            webamp.current.onClose(() => updateActiveWindow(undefined));
                        }
                    } else {
                        console.log('window.Webamp is undefined');
                    }
                })
            })();
        }

        return () => {
            webamp.current?.dispose();
        };
    }, [divRef]);

    useEffect(() => {
        const updateWebAmpWindowOrder = () => updateActiveWindow('webamp');
        if (isRendered) {
            setTimeout(() => {
                webNodeRef.current = document.querySelector('#webamp');
                if (webNodeRef.current) {
                    console.log('[WEBAMP] Node was found, appending');

                    webNodeRef.current.style.zIndex = `${60-WebAmpWindowOrder}`;
                    webNodeRef.current.style.transitionProperty = `width,height,opacity`;
                    webNodeRef.current.style.transitionTimingFunction = `cubic-bezier(0.4, 0, 0.2, 1)`;
                    webNodeRef.current.style.transitionDuration = `150ms`;

                    webNodeRef.current.addEventListener('mousedown', updateWebAmpWindowOrder);
                } else {
                    console.log('[WEBAMP] Node was not found');
                }
            }, 200);
        };

        return () => {
            webNodeRef.current?.removeEventListener('mousedown', updateWebAmpWindowOrder);
        }
    }, [webNodeRef.current, isRendered]);

    if (typeof window.Webamp !== 'undefined' && !window.Webamp.browserIsSupported()) {
        return <div>Webamp is not supported in this browser</div>;
    };

    useEffect(() => {
        if (webNodeRef.current) webNodeRef.current.style.zIndex = `${60-WebAmpWindowOrder}`;
    }, [webNodeRef.current, WebAmpWindowOrder]);

    return (
        <div
            ref={divRef}
        />
    );
}

export default WebampPlayer;