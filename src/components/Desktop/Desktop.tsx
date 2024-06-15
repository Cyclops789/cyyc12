import { type RefObject, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DesktopIcon from './DesktopIcon';
import { useWindowsStore } from '@/stores/windows';
import tw from 'twin.macro';

type Props = { selectAbleContainerRef: RefObject<HTMLDivElement> };

function Desktop({ selectAbleContainerRef }: Props) {
    const { windows } = useWindowsStore();
    const desktopRef = useRef<HTMLDivElement>(null);
    const { updateActiveWindow } = useWindowsStore();
  
    const handleActiveWindow = (event: MouseEvent) => updateActiveWindow(undefined);
  
    useEffect(() => {
      if (desktopRef && desktopRef.current) {
        desktopRef.current.addEventListener('mousedown', handleActiveWindow);
      }
  
      return () => {
        if (desktopRef && desktopRef.current) {
          desktopRef.current && desktopRef.current.removeEventListener('mousedown', handleActiveWindow);
        }
      };
    }, [desktopRef]);

    return (
        <div ref={desktopRef} css={tw`z-[9] fixed top-4 left-4 w-screen h-screen`}>
            <div ref={selectAbleContainerRef} css={tw`space-y-[25px] h-screen`}>
                {windows.map((fWindow, index) => (
                    <DesktopIcon key={`${index}-${fWindow.window.name}`} title={fWindow.window.name} css={tw`${fWindow.desktop.className || ''}`}>
                        <FontAwesomeIcon css={`${fWindow.desktop.child.css || ''}`} icon={fWindow.desktop.child.icon} />
                    </DesktopIcon>
                ))}
            </div>
        </div>
    )
}

export default Desktop;