import React from 'react'
import { useWindowsStore } from '@/stores/windows';
import { AvailableWindows } from '@/stores/windows';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useCommandsStore } from '@/stores/commands';

type Props = { title: AvailableWindows };

function Tab({ title }: Props) {
    const { toggleWindow } = useWindowsStore();
    const { setCommands } = useCommandsStore();

    return (
        <div className="flex justify-between cursor-[all-scroll] bg-red-600 handler">
            <div className="bg-red-600 w-full h-[30px] flex justify-center items-center">
                <span className={'capitalize'}>{title}</span>
            </div>
            <div className='flex space-x-2 items-center mr-1'>
                <button
                    onClick={() => {
                        toggleWindow(title, false);
                        if(title === 'terminal') {
                            setCommands([]);
                        }
                    }}
                    className={'bg-white w-[20px] h-[20px] rounded-full flex justify-center items-center'}
                >
                    <FontAwesomeIcon className='text-[10px]' icon={faX} />
                </button>
            </div>
        </div>
    )
}

export default Tab;