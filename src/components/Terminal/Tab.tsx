import { IAvailableWindows, useWindowsStore } from '@/stores/windows';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faWindowRestore } from '@fortawesome/free-regular-svg-icons';
import { useCommandsStore } from '@/stores/commands';
import tw from 'twin.macro';

type Props = { 
    window: IAvailableWindows, 
    setCloseOpacity: React.Dispatch<React.SetStateAction<boolean>>,
    toggleMinimizeAnimation: React.Dispatch<React.SetStateAction<boolean | undefined>>,
};

function Tab({ window, setCloseOpacity, toggleMinimizeAnimation }: Props) {
    const { toggleWindow, updateActiveWindow, toggleWindowResize } = useWindowsStore();
    const { setCommands } = useCommandsStore();

    return (
        <div css={tw`flex justify-between cursor-[all-scroll] bg-red-600`} className={'handler'}>
            <div css={tw`bg-red-600 w-full h-[30px] flex justify-center items-center`}>
                <span css={tw`capitalize`}>{window.window.name}</span>
            </div>
            <div css={tw`flex space-x-2 items-center mr-1`}>
                <button
                    onClick={() => {
                        setCloseOpacity(true);
                        setTimeout(() => {
                            toggleWindowResize(window.window.name, false);
                            toggleMinimizeAnimation(true);
                        }, 200);
                    }}
                    css={tw`bg-white w-[20px] h-[20px] rounded-full flex justify-center items-center`}
                >
                    <div css={tw`bg-black rounded h-[1.5px] w-[10px]`} />
                </button>
                <button
                    onClick={() => {
                        setCloseOpacity(true);
                        setTimeout(() => {
                            toggleWindow(window.window.name, false);
                            updateActiveWindow(undefined);
                            if(window.window.name === 'terminal') {
                                setCommands([]);
                            }
                        }, 200)
                    }}
                    css={tw`bg-white w-[20px] h-[20px] rounded-full flex justify-center items-center`}
                >
                    <FontAwesomeIcon css={tw`text-[10px]`} icon={faWindowRestore} />
                </button>
                <button
                    onClick={() => {
                        setCloseOpacity(true);
                        setTimeout(() => {
                            toggleWindow(window.window.name, false);
                            updateActiveWindow(undefined);
                            if(window.window.name === 'terminal') {
                                setCommands([]);
                            }
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