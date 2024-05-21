import React from 'react'
import { AvailableWindows } from '@/stores/windows';
import { useWindowsStore } from '@/stores/windows';
import { useCommandsStore } from '@/stores/commands';
import tw from 'tailwind-styled-components';

const Button = tw.button`
    w-full
    h-full 
    rounded-lg 
    bg-[repeating-linear-gradient(to_top,#400605_0%,#CF1512_128%)] 
    hover:bg-[repeating-linear-gradient(to_top,#310504_0%,#970F0D_128%)] 
    active:hover:bg-[repeating-linear-gradient(to_top,#310504_0%,#970F0D_128%)]
`

type Props = { children: React.ReactNode, title: AvailableWindows, style?: React.CSSProperties | undefined };

function DesktopIcon({ children, style, title }: Props) {
    const { windows, toggleWindow } = useWindowsStore();
    const { setCommands } = useCommandsStore();

    return (
        <div className='w-[65px] h-[65px]'>
            <Button
                {...{
                    onClick: () => {
                        if (!windows.some(window => window.window.open)) {
                            toggleWindow(title, true);
                        } else {
                            toggleWindow(title, false);
                            if (title === 'terminal') {
                                setCommands([]);
                            }
                        }
                    },
                    style
                }}
            >
                <div className={"p-2"}>
                    {children}
                </div>
            </Button>
            <div className='text-center capitalize text-white text-xs mt-1'>{title}</div>
        </div>
    )
}



export default DesktopIcon;