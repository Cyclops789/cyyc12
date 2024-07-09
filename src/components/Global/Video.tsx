import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { useRef, useEffect, useMemo } from 'react';
import type Player from 'video.js/dist/types/player';
import { useWindowsStore } from '@/stores/windows';
import tw, { styled } from 'twin.macro';

const StyledVideoPlayer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  .video-js {
    height: 100%;
  }
`;

type Props = { source: string, extension: string };

function Video({ source, extension }: Props) {
    const videoRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<Player | null>(null);
    const { windows } = useWindowsStore();
    const cWindow = windows.find(cWindow => cWindow.window.name === 'file');
    const windowWidth = useMemo(() => cWindow?.window.size?.width, [cWindow?.window.size?.width]);
    const isWindowFullScreen = useMemo(() => cWindow?.window.fullscreen, [cWindow?.window.fullscreen]);

    useEffect(() => {
        if (!playerRef.current) {
            const videoElement = document.createElement("video-js");

            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current?.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, {}, () => {
                videojs.log('Player is ready');
            });

            player.autoplay(true);
            player.controls(true);
            player.responsive(true);
            player.muted(true);

            player.width(windowWidth || 990);

            player.src({ 
                src: source, 
                type: extension === '.mp4' ? 'video/mp4' : extension === '.mp3' && 'audio/mp3' 
            });
        } else {
            if (isWindowFullScreen) {
                playerRef.current.width(window.innerWidth - 2);
            } else {
                playerRef.current.width(windowWidth);
            }
        }
    }, [videoRef, source, windowWidth, isWindowFullScreen]);

    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);


    return (
        <div data-vjs-player>
            <StyledVideoPlayer
                ref={videoRef}
                css={tw`h-full w-full`}
            />
        </div>
    )
}

export default Video