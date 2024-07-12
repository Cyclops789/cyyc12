import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { useRef, useEffect, useMemo } from 'react';
import type Player from 'video.js/dist/types/player';
import { useWindowsStore } from '@/stores/windows';
import tw, { styled } from 'twin.macro';
import { useFoldersStore } from '@/stores/folders';

const StyledVideoPlayer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  .video-js {
    height: 100%;
  }
`;

function Video() {
    const videoRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<Player | null>(null);
    const { windows } = useWindowsStore();
    const { getFileOfType, selectedFiles } = useFoldersStore();
    const file = useMemo(() => getFileOfType(['.mp4']), [selectedFiles]);
    const windowWidth = useMemo(() => windows[7].window.size?.width, [windows[7].window.size?.width]);
    const isWindowFullScreen = useMemo(() => windows[7].window.fullscreen, [windows[7].window.fullscreen]);

    useEffect(() => {
        if (file) {
            if (!playerRef.current && file.ext === '.mp4') {
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
                    src: file.staticPath,
                    type: 'video/mp4',
                });
            } 
            
            if(playerRef.current){
                if (isWindowFullScreen) {
                    playerRef.current.width(window.innerWidth - 2);
                } else {
                    playerRef.current.width(windowWidth);
                }
            }
        }
    }, [videoRef, file, windowWidth, isWindowFullScreen]);

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