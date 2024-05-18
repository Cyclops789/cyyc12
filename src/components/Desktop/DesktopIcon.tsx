import React from 'react'
import { AvailableWindows } from '@/stores/general';
import { useGeneralStore } from '@/stores/general';
import { useCommandsStore } from '@/stores/commands';

type Props = { children: React.ReactNode, title: AvailableWindows, className?: string };

function DesktopIcon({ children, className, title }: Props) {
    const { addWindow, removeWindow, windows } = useGeneralStore();
    const { setCommands } = useCommandsStore();

    return (
        <div className='w-[65px] h-[65px]'>
            <button 
                onClick={() => {
                    if(!windows.find(window => window === title)) {
                        addWindow(title)
                    } else {
                        removeWindow(title)
                        if(title === 'terminal') {
                            setCommands([]);
                        }
                    }
                }} 
                className={`${className} w-full h-full rounded-lg bg-[repeating-linear-gradient(to_top,#400605_0%,#CF1512_128%)] hover:bg-[repeating-linear-gradient(to_top,#310504_0%,#970F0D_128%)] active:hover:bg-[repeating-linear-gradient(to_top,#310504_0%,#970F0D_128%)] `}
            >
                <div className={"p-2"}>
                    {children}
                </div>
            </button>
            <div className='text-center capitalize text-white text-xs mt-1'>{title}</div>
        </div>
    )
}



export default DesktopIcon;