import { type RefObject, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DesktopIcon from './DesktopIcon';
import { useWindowsStore } from '@/stores/windows';
import tw from 'twin.macro';

type Props = { selectAbleContainerRef: RefObject<HTMLDivElement> };

function Desktop({ selectAbleContainerRef }: Props) {
    const { windows } = useWindowsStore();
    const desktopRef = useRef<HTMLDivElement>(null);
    const { updateActiveWindow } = useWindowsStore();

    return (
        <div 
          ref={desktopRef}
          onMouseDown={() => updateActiveWindow(undefined)} 
          css={tw`z-[9] fixed w-screen h-screen`}
        >
            <div ref={selectAbleContainerRef} css={tw`h-screen`}>
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