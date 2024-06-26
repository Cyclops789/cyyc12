import tw, { styled } from 'twin.macro'
import { useWindowsStore } from '@/stores/windows'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCommandsStore } from '@/stores/commands';
import StartMenu from '@/components/Desktop/TaskBar/StartMenu';
import debianLogo from '@/assets/debian.png';
import { useState } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const TaskBarButton = styled.div`
    ${tw`w-[35px] h-[35px] rounded flex justify-center items-center bg-red-900/90`} 
`;

const SmallTaskCloseButton = styled.div`
    ${tw`border border-transparent rounded cursor-pointer`}
    &:hover {
        ${tw`border-red-700`}
    }

    &:active {
        ${tw`bg-red-700/30`}
    }
`;

const WindowSmallTaskManager = styled.div`
    ${tw`flex justify-center items-center ml-[5px] mb-[5px] h-[85px] w-[95%] border border-transparent rounded p-1 cursor-pointer`}

    &:hover {
        ${tw`bg-red-400/20 border-red-700`}
    }
`;

function TaskBar() {
    const { windows, activeWindow, updateActiveWindow, toggleWindow, toggleWindowSmallTask, toggleWindowHoverSmallTask } = useWindowsStore();
    const [isStartMenuSticky, setStartMenuSticky] = useState<boolean>(false);
    const { setCommands } = useCommandsStore();

    return (
        <>
            <StartMenu {...{ isStartMenuSticky, setStartMenuSticky }} />
            <div css={tw`fixed z-[99] bottom-0 left-0 h-[50px] w-screen bg-[rgba(42,45,50,0.92)]`}>
                <div css={tw`pl-[7px] flex space-x-3`}>
                    <div
                        onClick={() => updateActiveWindow(activeWindow !== 'startmenu' ? 'startmenu' : undefined)}
                        css={tw`overflow-hidden relative w-[40px] h-[50px] flex justify-center items-center hover:cursor-pointer hover:brightness-125`}
                    >
                        <div css={[
                            tw`absolute -top-1 w-full h-[3px] bg-red-700`,
                            (activeWindow === 'startmenu' || isStartMenuSticky) && tw`!top-0`
                        ]} />
                        <img css={tw`w-[33px]`} src={debianLogo} srcSet={debianLogo} alt={"start-button-image"} />
                    </div>

                    {windows?.map((gWindow, index) => (
                        <div
                            onMouseEnter={() => {
                                toggleWindowHoverSmallTask(gWindow.window.name, true);
                            }}
                            onMouseLeave={() => {
                                toggleWindowHoverSmallTask(gWindow.window.name, false);
                                toggleWindowSmallTask(gWindow.window.name, false);
                            }}
                            css={tw`relative`}
                        >

                            {gWindow.window.open && (
                                <div
                                    css={[
                                        tw`absolute rounded bottom-[50px] right-[-60px] bg-[rgba(42,45,50)] h-0 overflow-hidden transition-all ease-in-out duration-150 opacity-0 w-[170px]`,
                                        `box-shadow:0px 0px 0px rgba(0, 0, 0, 0.5),0px -1px 8px rgba(0, 0, 0, 0.5);`,
                                        gWindow.window.smallTask && tw`h-[140px] opacity-100`,
                                    ]}
                                >
                                    <div css={tw`p-3 flex justify-between items-center`}>
                                        <div css={tw`text-white capitalize`}>
                                            {gWindow.window.name}
                                        </div>

                                        <SmallTaskCloseButton>
                                            <div css={tw`px-1`}>
                                                <FontAwesomeIcon css={tw`text-red-700`} icon={faXmark} />
                                            </div>
                                        </SmallTaskCloseButton>
                                    </div>

                                    <WindowSmallTaskManager
                                        onClick={() => {
                                            updateActiveWindow(gWindow.window.name)
                                            toggleWindowHoverSmallTask(gWindow.window.name, false);
                                            toggleWindowSmallTask(gWindow.window.name, false);
                                        }}
                                    >
                                        <div css={tw`bg-red-700/30 rounded-full w-[50px] h-[50px] flex justify-center items-center`}>
                                            <FontAwesomeIcon css={tw`text-white text-[25px]`} icon={gWindow.desktop.child.icon} />
                                        </div>
                                    </WindowSmallTaskManager>
                                </div>
                            )}

                            <div
                                onMouseEnter={() => gWindow.window.open && toggleWindowSmallTask(gWindow.window.name, true)}
                                onMouseLeave={() => gWindow.window.open && setTimeout(() => !gWindow.window.hoverSmallTask && toggleWindowSmallTask(gWindow.window.name, false), 100)}
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
                                        if (gWindow.window.name === 'konsole') {
                                            setCommands(['help']);
                                        }
                                    } else {
                                        gWindow.window.functions.minimize();
                                    }
                                }}
                            >
                                <div css={[
                                    tw`absolute top-0 w-full h-[2px] bg-transparent`,
                                    (gWindow.window.open && activeWindow === gWindow.window.name) && tw`bg-red-600`,
                                ]}>

                                </div>
                                <TaskBarButton>
                                    <FontAwesomeIcon icon={gWindow.desktop.child.icon} />
                                </TaskBarButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default TaskBar;