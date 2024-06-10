import React from 'react'
import { AvailableWindows } from '@/stores/windows';
import { useWindowsStore } from '@/stores/windows';
import { useCommandsStore } from '@/stores/commands';
import tw, { styled } from 'twin.macro';
import { CSSProp } from 'styled-components';

const Button = styled.button`
    ${tw`w-full h-full rounded-lg`} 

    background: repeating-linear-gradient(to top, #400605 0%, #CF1512 128%);
  
    &:hover {
      background: repeating-linear-gradient(to top, #310504 0%, #970F0D 128%);
    }
  
    &:active:hover {
      background: repeating-linear-gradient(to top, #310504 0%, #970F0D 128%);
    }
`

type Props = { children: React.ReactNode, title: AvailableWindows, css?: CSSProp | undefined };

function DesktopIcon({ children, css, title }: Props) {
    const { toggleWindow } = useWindowsStore();
    const { setCommands } = useCommandsStore();

    return (
        <div css={tw`w-[65px] h-[65px]`}>
            <Button
                {...{
                    onClick: () => {
                        toggleWindow(title, true);
                        if (title === 'terminal') {
                            setCommands([]);
                        }
                    },
                    css
                }}
            >
                <div css={tw`p-2`}>
                    {children}
                </div>
            </Button>
            <div css={tw`text-center capitalize text-white text-xs mt-1`}>{title}</div>
        </div>
    )
}



export default DesktopIcon;