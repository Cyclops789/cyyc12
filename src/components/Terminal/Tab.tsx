import { useWindowsStore } from '@/stores/windows';
import { AvailableWindows } from '@/stores/windows';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useCommandsStore } from '@/stores/commands';
import tw from 'twin.macro';

type Props = { title: AvailableWindows };

function Tab({ title }: Props) {
    const { toggleWindow } = useWindowsStore();
    const { setCommands } = useCommandsStore();

    return (
        <div css={tw`flex justify-between cursor-[all-scroll] bg-red-600`} className={'handler'}>
            <div css={tw`bg-red-600 w-full h-[30px] flex justify-center items-center`}>
                <span css={tw`capitalize`}>{title}</span>
            </div>
            <div css={tw`flex space-x-2 items-center mr-1`}>
                <button
                    onClick={() => {
                        toggleWindow(title, false);
                        if(title === 'terminal') {
                            setCommands([]);
                        }
                    }}
                    css={tw`bg-white w-[20px] h-[20px] rounded-full flex justify-center items-center`}
                >
                    <FontAwesomeIcon className='text-[10px]' icon={faX} />
                </button>
            </div>
        </div>
    )
}

export default Tab;