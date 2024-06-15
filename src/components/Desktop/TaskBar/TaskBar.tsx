import React from 'react'
import tw, { styled } from 'twin.macro'
import { useWindowsStore } from '@/stores/windows'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TaskBarButton = styled.div`
    ${tw`w-[35px] h-[35px] rounded flex justify-center items-center bg-red-900/90`} 
`;

function TaskBar() {
    const { windows, activeWindow, updateActiveWindow, toggleWindow, toggleWindowMinimize } = useWindowsStore();

    return (
        <div css={tw`fixed z-[99] bottom-0 left-0 h-[50px] w-screen bg-[#2a2d32]`}>
            <div css={tw`pl-[7px] flex space-x-3`}>
                <div css={tw`relative w-[40px] h-[50px] flex justify-center items-center hover:cursor-pointer hover:brightness-125`}>
                    <div css={[
                        tw`absolute top-0 w-full h-[2px] bg-red-600`,
                    ]} />
                    <img css={tw` w-[33px]`} src={'/debian.png'} alt={"start-button-image"} />
                </div>

                {windows?.map((gWindow, index) => (
                    <div
                        key={`${index}-${gWindow.window.name}`}
                        title={gWindow.window.name}
                        css={[
                            tw`relative w-[50px] h-[50px] flex justify-center items-center hover:brightness-125`,
                            gWindow.window.open && tw`bg-[#494c51]`,
                        ]}
                        onClick={() => {
                            if (!gWindow.window.open) {
                                toggleWindow(gWindow.window.name, true);
                                updateActiveWindow(gWindow.window.name);
                            } else {
                                if (gWindow.window.minimize) {
                                    toggleWindowMinimize(gWindow.window.name, false);
                                    updateActiveWindow(gWindow.window.name);
                                } else {
                                    toggleWindowMinimize(gWindow.window.name, true);
                                    updateActiveWindow(undefined);
                                }
                            }
                        }}
                    >
                        <div css={[
                            tw`absolute top-0 w-full h-[2px] bg-transparent`,
                            activeWindow === gWindow.window.name && tw`bg-red-600`,
                        ]}>

                        </div>
                        <TaskBarButton>
                            <FontAwesomeIcon icon={gWindow.desktop.child.icon} />
                        </TaskBarButton>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default TaskBar;