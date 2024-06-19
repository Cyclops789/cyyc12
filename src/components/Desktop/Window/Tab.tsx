import { IAvailableWindows, useWindowsStore } from '@/stores/windows';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faWindowRestore } from '@fortawesome/free-regular-svg-icons';
import { faWindowRestore as faWindowRestoreSolid } from '@fortawesome/free-solid-svg-icons';
import { useCommandsStore } from '@/stores/commands';
import tw from 'twin.macro';

type Props = { window: IAvailableWindows };

function Tab({ window }: Props) {
    const { toggleWindow, updateActiveWindow, toggleWindowMinimize, toggleWindowFullScreen } = useWindowsStore();
    const { setCommands } = useCommandsStore();

    return (
        <div
            onDoubleClick={() => toggleWindowFullScreen(window.window.name, !window.window.fullscreen)} 
            css={tw`flex justify-between cursor-default bg-red-600`} className={'dragHandler'}
        >
            <div css={tw`bg-red-600 w-full h-[30px] flex justify-center items-center`}>
                <span css={tw`capitalize`}>{window.window.name}</span>
            </div>
            <div css={tw`flex space-x-2 items-center mr-1`}>
                <button
                    onClick={() => {
                        setTimeout(() => {
                            toggleWindowMinimize(window.window.name, "enabled");
                            updateActiveWindow(undefined);
                        }, 200);
                    }}
                    css={tw`bg-white w-[20px] h-[20px] rounded-full flex justify-center items-center`}
                >
                    <div css={tw`bg-black rounded h-[1.5px] w-[10px]`} />
                </button>
                <button
                    onClick={() => toggleWindowFullScreen(window.window.name, !window.window.fullscreen)}
                    css={tw`bg-white w-[20px] h-[20px] rounded-full flex justify-center items-center`}
                >
                    <FontAwesomeIcon css={tw`text-[10px]`} icon={!window.window.fullscreen ? faWindowRestore : faWindowRestoreSolid} />
                </button>
                <button
                    onClick={() => {
                        setTimeout(() => {
                            toggleWindow(window.window.name, false);
                            updateActiveWindow(undefined);
                            if (window.window.name === 'terminal') setCommands([]);
                        }, 200);
                    }}
                    css={tw`bg-white w-[20px] h-[20px] rounded-full flex justify-center items-center`}
                >
                    <FontAwesomeIcon css={tw`text-[10px]`} icon={faX} />
                </button>
            </div>
        </div>
    )
}

export default Tab;