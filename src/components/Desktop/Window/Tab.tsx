import { IAvailableWindows, useWindowsStore } from '@/stores/windows';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useCommandsStore } from '@/stores/commands';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faSquareFull } from '@fortawesome/free-regular-svg-icons';
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
                <span css={tw`capitalize text-white`}>{window.window.name}</span>
            </div>

            <div css={tw`flex space-x-2 items-center mr-1`}>
                <button
                    onClick={() => {
                        setTimeout(() => {
                            toggleWindowMinimize(window.window.name, "enabled");
                            updateActiveWindow(undefined);
                        }, 200);
                    }}
                    css={tw`hover:text-black hover:bg-white text-white bg-transparent w-[25px] h-[25px] rounded-full flex justify-center items-center`}
                >
                    <FontAwesomeIcon css={tw`text-[13px] p-1 rounded-full`} icon={faChevronDown} />
                </button>
                <button
                    onClick={() => toggleWindowFullScreen(window.window.name, !window.window.fullscreen)}
                    css={tw`hover:text-black hover:bg-white text-white bg-transparent w-[25px] h-[25px] rounded-full flex justify-center items-center`}
                >
                    <FontAwesomeIcon css={[ tw`text-[13px] p-1 rounded-full`, window.window.fullscreen && tw`rotate-45 p-1.5 text-[10px]` ]} icon={!window.window.fullscreen ? faChevronUp : faSquareFull} />
                </button>

                <button
                    onClick={() => {
                        setTimeout(() => {
                            toggleWindow(window.window.name, false);
                            updateActiveWindow(undefined);
                            if (window.window.name === 'konsole') setCommands([]);
                        }, 200);
                    }}
                    css={tw`hover:text-black hover:bg-white text-white bg-transparent w-[25px] h-[25px] rounded-full flex justify-center items-center`}
                >
                    <FontAwesomeIcon css={tw`text-[13px] px-1.5 py-1 rounded-full`} icon={faX} />
                </button>
            </div>
        </div>
    )
}

export default Tab;