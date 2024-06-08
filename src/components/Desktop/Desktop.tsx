import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DesktopIcon from './DesktopIcon';
import { useWindowsStore } from '@/stores/windows';
import tw from 'twin.macro';

function Desktop() {
    const { windows } = useWindowsStore();

    return (
        <div css={tw`z-[9] fixed top-4 left-4 w-screen h-screen`}>
            <div css={tw`space-y-[35px]`}>
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