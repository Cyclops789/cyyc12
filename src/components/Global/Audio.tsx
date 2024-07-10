import { useEffect, useMemo, useRef } from "react";
import type Webamp from "webamp";
import { useFoldersStore } from "@/stores/folders";
import { useWindowsStore } from "@/stores/windows";

declare global {
    interface Window {
        Webamp: typeof Webamp;
        WebAmpRef: Webamp;
    }
}

export const loadWebampAssets = async () => {
    try {
        await import(/* @vite-ignore */ '@/assets/js/webamp.js');
    } catch (error) {
        console.error('Could not import webamp assets!', error)
    }
};

function WebampPlayer() {
    const divRef = useRef<HTMLDivElement | null>(null);
    const webamp = useRef<Webamp | null>(null);
    const webNodeRef = useRef<HTMLDivElement | null>(null);

    const { currentSelectedFile } = useFoldersStore();
    const { windows, updateActiveWindow } = useWindowsStore();
    const WebAmpWindowOrder = useMemo(() => windows[6].window.order, [windows[6].window.order])

    const conf = {
        initialTracks: [
            {
                metaData: {
                    artist: "",
                    title: currentSelectedFile?.name.split('.')[0]
                },
                url: currentSelectedFile?.staticPath
            }
        ]
    };

    useEffect(() => {
        const updateWebAmpWindowOrder = () => updateActiveWindow('webamp');
        if (!webamp.current && divRef.current) {
            (async () => {
                await loadWebampAssets().then(() => {
                    if (typeof window.Webamp !== 'undefined') {
                        if (divRef.current) {
                            // @ts-ignore this is valid
                            webamp.current = window.WebAmpRef = new window.Webamp(conf);
                            webamp.current.renderWhenReady(divRef.current).then(() => {
                                const node = webNodeRef.current = document.querySelector('#webamp');
                                if (node) {
                                    console.log('[WEBAMP] Node was found, appending')
                                    divRef.current?.appendChild(node);

                                    webNodeRef.current?.addEventListener('click', updateWebAmpWindowOrder);
                                } else {
                                    console.log('[WEBAMP] Node was not found')
                                }
                            });
                        }
                    } else {
                        console.log('window.Webamp is undefined')
                    }
                })
            })();
        }

        return () => {
            webNodeRef.current?.removeEventListener('click', updateWebAmpWindowOrder);
            webamp.current?.dispose();
        };
    }, [divRef]);

    useEffect(() => {
        if(webNodeRef.current) webNodeRef.current.style.zIndex = `${60 - WebAmpWindowOrder}`;
    }, [webNodeRef.current, WebAmpWindowOrder])

    if (typeof window.Webamp !== 'undefined' && !window.Webamp.browserIsSupported()) {
        return <div>Webamp is not supported in this browser</div>;
    }

    return (
        <div 
            ref={divRef}
        />
    );
}

export default WebampPlayer;