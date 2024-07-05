import { IAvailableWindows, useWindowsStore } from '@/stores/windows';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faSquareFull } from '@fortawesome/free-regular-svg-icons';
import tw from 'twin.macro';

type Props = { window: IAvailableWindows, handleWindowClose: () => void, handleWindowMinimize: () => void };

function Tab({ window, handleWindowClose, handleWindowMinimize }: Props) {
    const { toggleWindowFullScreen } = useWindowsStore();

    return (
        <div
            onDoubleClick={() => window.window.name !== 'pacman' && toggleWindowFullScreen(window.window.name, !window.window.fullscreen)} 
            css={tw`flex justify-between cursor-default bg-red-700`} className={'dragHandler'}
        >
            <div css={tw`bg-red-700 w-full h-[30px] flex justify-center items-center`}>
                <span css={tw`capitalize text-white`}>{window.window.name}</span>
            </div>

            <div css={tw`flex space-x-2 items-center mr-1`}>
                <button
                    onClick={handleWindowMinimize}
                    css={tw`hover:text-black hover:bg-white text-white bg-transparent w-[25px] h-[25px] rounded-full flex justify-center items-center`}
                >
                    <FontAwesomeIcon css={tw`text-[13px] p-1 rounded-full`} icon={faChevronDown} />
                </button>
                <button
                    onClick={() => window.window.name !== 'pacman' && toggleWindowFullScreen(window.window.name, !window.window.fullscreen)}
                    css={tw`hover:text-black hover:bg-white text-white bg-transparent w-[25px] h-[25px] rounded-full flex justify-center items-center`}
                >
                    <FontAwesomeIcon css={[ tw`text-[13px] p-1 rounded-full`, window.window.fullscreen && tw`rotate-45 p-1.5 text-[10px]` ]} icon={!window.window.fullscreen ? faChevronUp : faSquareFull} />
                </button>

                <button
                    onClick={handleWindowClose}
                    css={tw`hover:text-black hover:bg-white text-white bg-transparent w-[25px] h-[25px] rounded-full flex justify-center items-center`}
                >
                    <FontAwesomeIcon css={tw`text-[13px] px-1.5 py-1 rounded-full`} icon={faX} />
                </button>
            </div>
        </div>
    )
}

export default Tab;