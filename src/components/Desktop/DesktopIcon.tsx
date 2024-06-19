import React, { useCallback, useEffect, useRef } from 'react'
import { AvailableWindows } from '@/stores/windows';
import { useWindowsStore } from '@/stores/windows';
import { useCommandsStore } from '@/stores/commands';
import tw, { styled } from 'twin.macro';
import { CSSProp } from 'styled-components';

const Button = styled.button`
    ${tw`w-[60px] h-[60px] rounded-lg`} 
    background: repeating-linear-gradient(to top, #400605 0%, #CF1512 128%);
  
    &:active:hover {
      background: repeating-linear-gradient(to top, #310504 0%, #970F0D 128%);
    }
`;

const IconContainer = styled.div`
    ${tw`w-[80px] border border-transparent`}

    &:not(.selected):hover {
        border-radius: 5px;
        border-width: 1px;
        border-color: #DC2626; 
        background-color: #dc26261e;
    }
`;

type Props = { children: React.ReactNode, title: AvailableWindows, css?: CSSProp | undefined, className?: string };

function DesktopIcon({ children, css, title, className }: Props) {
    const iconContainerRef = useRef<HTMLDivElement>(null);
    const { toggleWindow, updateActiveWindow } = useWindowsStore();
    const { setCommands } = useCommandsStore();

    const removeSelected = useCallback(() => {
        if(iconContainerRef.current && iconContainerRef.current.classList.contains('selected')) {
            iconContainerRef.current.classList.remove('selected')
        }
    }, [iconContainerRef.current]);

    useEffect(() => {
        document.addEventListener('mousedown', removeSelected);
        return () => {
            document.removeEventListener('mousedown', removeSelected);
        }
    }, []);

    return (
        <IconContainer 
             
            className={`${className ?? ''} UserSelectionItem`}
            onMouseDown={() => updateActiveWindow(title)}
            ref={iconContainerRef} 
        >
            <div css={tw`p-2`}>
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
                    {children}
                </Button>
                <div css={tw`text-center capitalize text-white text-xs mt-3`}>{title}</div>
            </div>
        </IconContainer>
    )
}



export default DesktopIcon;