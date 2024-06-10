import { IAvailableWindows, useWindowsStore } from '@/stores/windows';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useCommandsStore } from '@/stores/commands';
import tw from 'twin.macro';

type Props = { window: IAvailableWindows };

function Tab({ window }: Props) {
    const { toggleWindow } = useWindowsStore();
    const { setCommands } = useCommandsStore();

    return (
        <div css={tw`flex justify-between cursor-[all-scroll] bg-red-600`} className={'handler'}>
            <div css={tw`bg-red-600 w-full h-[30px] flex justify-center items-center`}>
                <span css={tw`capitalize`}>{window.window.name}</span>
            </div>
            <div css={tw`flex space-x-2 items-center mr-1`}>
                <button
                    onClick={() => {
                        toggleWindow(window.window.name, false);
                        if(window.window.name === 'terminal') {
                            setCommands([]);
                        }
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