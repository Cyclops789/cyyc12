import tw, { styled } from 'twin.macro'
import { useWindowsStore } from '@/stores/windows'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCommandsStore } from '@/stores/commands';
import { useFoldersStore } from '@/stores/folders';
import Cat from '@/assets/cat.svg?react';
import { lazy, useState } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { getExtentionIcon } from '@/helpers/foldersHelper';
import useThemeStore from '@/styles/useThemeStore';

const StartMenu = lazy(() => import('@/components/Desktop/TaskBar/StartMenu'));

const CurrentPlayingMusic = styled.div`
    white-space: nowrap;
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);

    -moz-animation: my-animation 12s linear infinite;
    -webkit-animation: my-animation 12s linear infinite;
    animation: my-animation 12s linear infinite;


    /* for Firefox */
    @-moz-keyframes my-animation {
        from {
            -moz-transform: translateX(100%);
        }
        to {
            -moz-transform: translateX(-100%);
        }
    }

    /* for Chrome */
    @-webkit-keyframes my-animation {
        from {
            -webkit-transform: translateX(100%);
        }
        to {
            -webkit-transform: translateX(-100%);
        }
    }

    @keyframes my-animation {
        from {
            -moz-transform: translateX(100%);
            -webkit-transform: translateX(100%);
            transform: translateX(100%);
        }
        to {
            -moz-transform: translateX(-100%);
            -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
        }
    }
`;

const TaskBarButton = styled.div`
    ${tw`w-[35px] h-[35px] rounded flex justify-center items-center bg-base-900/90`} 
`;

const SmallTaskCloseButton = styled.div`
    ${tw`border border-transparent rounded cursor-pointer`}
    &:hover {
        ${tw`border-base-700`}
    }

    &:active {
        ${tw`bg-base-700/30`}
    }
`;

const WindowSmallTaskManager = styled.div`
    ${tw`flex justify-center items-center ml-[5px] mb-[5px] h-[85px] w-[95%] border border-transparent rounded p-1 cursor-pointer`}

    &:hover {
        ${tw`bg-base-400/20 border-base-700`}
    }
`;

function TaskBar() {
    const { windows, activeWindow, updateActiveWindow, toggleWindow, toggleWindowSmallTask, toggleWindowHoverSmallTask } = useWindowsStore();
    const [isStartMenuSticky, setStartMenuSticky] = useState<boolean>(false);
    const { setCommands, commands } = useCommandsStore();
    const { currentMusicFile, currentSelectedFile } = useFoldersStore();
    const { rbgAt700 } = useThemeStore();

    return (
        <>
            <StartMenu {...{ isStartMenuSticky, setStartMenuSticky }} />
            <div css={tw`fixed z-[99] bottom-0 left-0 h-[50px] w-screen bg-secondary`}>
                <div css={tw`pl-[7px] flex space-x-3`}>
                    <div
                        onClick={() => updateActiveWindow(activeWindow !== 'startmenu' ? 'startmenu' : undefined)}
                        css={tw`overflow-hidden relative w-[40px] h-[50px] flex justify-center items-center hover:cursor-pointer`}
                    >
                        <div css={[
                            tw`absolute -top-1 w-full h-[3px] bg-base-700`,
                            (activeWindow === 'startmenu' || isStartMenuSticky) && tw`!top-0`
                        ]} />
                        <Cat fill={rbgAt700} css={tw`w-[33px]`} />
                    </div>

                    {windows?.filter((gWindow) => !gWindow.window.hidden.taskBar).map((gWindow, index) => (
                        <div
                            onMouseEnter={() => {
                                toggleWindowHoverSmallTask(gWindow.window.name, true);
                            }}
                            onMouseLeave={() => {
                                toggleWindowHoverSmallTask(gWindow.window.name, false);
                                toggleWindowSmallTask(gWindow.window.name, false);
                            }}
                            css={tw`relative`}
                            key={gWindow.window.name}
                        >

                            {gWindow.window.open && (
                                <div
                                    css={[
                                        tw`absolute rounded bottom-[50px] right-[-60px] bg-primary h-0 overflow-hidden transition-all ease-in-out duration-150 opacity-0 w-[170px]`,
                                        `box-shadow:0px 0px 0px rgba(0, 0, 0, 0.5),0px -1px 8px rgba(0, 0, 0, 0.5);`,
                                        gWindow.window.smallTask && tw`h-[140px] opacity-100`,
                                    ]}
                                >
                                    <div css={tw`p-3 flex justify-between items-center`}>
                                        <div css={tw`flex items-center space-x-1`}>
                                            <div css={tw`text-white text-sm capitalize`}>
                                                {gWindow.window.name}
                                            </div>
                                            {gWindow.window.name === "konsole" && (
                                                <>
                                                    <div css={tw`text-white text-sm font-extralight`}>
                                                        -
                                                    </div>
                                                    <div css={tw`text-slate-400 text-xs font-extralight`}>
                                                        {commands?.[(commands?.length || 1) - 1]}
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <SmallTaskCloseButton
                                            onClick={() => gWindow.window.functions.close()}
                                        >
                                            <div css={tw`px-1`}>
                                                <FontAwesomeIcon css={tw`text-base-700`} icon={faXmark} />
                                            </div>
                                        </SmallTaskCloseButton>
                                    </div>

                                    <WindowSmallTaskManager
                                        onClick={() => {
                                            if (gWindow.window.minimize === 'enabled') {
                                                gWindow.window.functions.minimize();
                                            }
                                            updateActiveWindow(gWindow.window.name);
                                            toggleWindowHoverSmallTask(gWindow.window.name, false);
                                            toggleWindowSmallTask(gWindow.window.name, false);
                                        }}
                                    >
                                        <div css={tw`bg-base-700/30 rounded-full w-[50px] h-[50px] flex justify-center items-center`}>
                                            <FontAwesomeIcon css={tw`text-white text-[25px]`} icon={gWindow.desktop.child.icon} />
                                        </div>
                                    </WindowSmallTaskManager>
                                </div>
                            )}

                            <div
                                onMouseEnter={() => gWindow.window.open && toggleWindowSmallTask(gWindow.window.name, true)}
                                onMouseLeave={() => gWindow.window.open && setTimeout(() => !gWindow.window.hoverSmallTask && toggleWindowSmallTask(gWindow.window.name, false), 100)}
                                key={`${index}-${gWindow.window.name}`}
                                title={gWindow.window.name.charAt(0).toUpperCase() + gWindow.window.name.slice(1)}
                                css={[
                                    tw`relative w-[50px] h-[50px] flex justify-center transition-colors ease-in-out duration-100 items-center hover:brightness-125`,
                                    gWindow.window.open && tw`bg-[#494c51]`,
                                ]}
                                onClick={() => {
                                    if (!gWindow.window.open) {
                                        toggleWindow(gWindow.window.name, true);
                                        updateActiveWindow(gWindow.window.name);
                                        if (gWindow.window.name === 'konsole') {
                                            setCommands(['cat', 'help']);
                                        }
                                    } else {
                                        gWindow.window.functions.minimize();
                                    }
                                }}
                            >
                                <div css={[
                                    tw`absolute top-0 w-full h-[2px] bg-transparent`,
                                    (gWindow.window.open && activeWindow === gWindow.window.name) && tw`bg-base-600`,
                                ]}>

                                </div>
                                <TaskBarButton>
                                    <FontAwesomeIcon icon={gWindow.desktop.child.icon} />
                                </TaskBarButton>
                            </div>
                        </div>
                    ))}

                    {windows[6].window.open &&
                        <div
                            onMouseEnter={() => {
                                toggleWindowHoverSmallTask(windows[6].window.name, true);
                            }}
                            onMouseLeave={() => {
                                toggleWindowHoverSmallTask(windows[6].window.name, false);
                                toggleWindowSmallTask(windows[6].window.name, false);
                            }}
                            css={tw`relative`}
                            key={windows[6].window.name}
                        >
                            <div
                                css={[
                                    tw`absolute rounded bottom-[50px] right-[-60px] bg-primary h-0 overflow-hidden transition-all ease-in-out duration-150 opacity-0 w-[170px]`,
                                    `box-shadow:0px 0px 0px rgba(0, 0, 0, 0.5),0px -1px 8px rgba(0, 0, 0, 0.5);`,
                                    windows[6].window.smallTask && tw`h-[140px] opacity-100`,
                                ]}
                            >
                                <div css={tw`p-3 flex justify-between items-center`}>
                                    <div css={tw`flex items-center space-x-1`}>
                                        <div css={tw`text-white text-xs capitalize overflow-hidden w-[120px]`}>
                                            <CurrentPlayingMusic>{currentMusicFile?.name ?? windows[6].window.name}</CurrentPlayingMusic>
                                        </div>
                                    </div>

                                    <SmallTaskCloseButton
                                        onClick={() => windows[6].window.functions.close()}
                                    >
                                        <div css={tw`px-1`}>
                                            <FontAwesomeIcon css={tw`text-base-700`} icon={faXmark} />
                                        </div>
                                    </SmallTaskCloseButton>
                                </div>

                                <WindowSmallTaskManager
                                    onClick={() => {
                                        if (windows[6].window.minimize === 'enabled') {
                                            windows[6].window.functions.minimize();
                                        }
                                        updateActiveWindow(windows[6].window.name);
                                        toggleWindowHoverSmallTask(windows[6].window.name, false);
                                        toggleWindowSmallTask(windows[6].window.name, false);
                                    }}
                                >
                                    <div css={tw`bg-base-700/30 rounded-full w-[50px] h-[50px] flex justify-center items-center`}>
                                        <FontAwesomeIcon css={tw`text-white text-[25px]`} icon={getExtentionIcon(currentMusicFile?.ext)} />
                                    </div>
                                </WindowSmallTaskManager>
                            </div>

                            <div
                                onMouseEnter={() => windows[6].window.open && toggleWindowSmallTask(windows[6].window.name, true)}
                                onMouseLeave={() => windows[6].window.open && setTimeout(() => !windows[6].window.hoverSmallTask && toggleWindowSmallTask(windows[6].window.name, false), 100)}
                                title={windows[6].window.name.charAt(0).toUpperCase() + windows[6].window.name.slice(1)}
                                css={[
                                    tw`relative w-[50px] h-[50px] flex justify-center transition-colors ease-in-out duration-100 items-center hover:brightness-125`,
                                    windows[6].window.open && tw`bg-[#494c51]`,
                                ]}
                                onClick={() => {
                                    if (!windows[6].window.open) {
                                        toggleWindow(windows[6].window.name, true);
                                        updateActiveWindow(windows[6].window.name);
                                        if (windows[6].window.name === 'konsole') {
                                            setCommands(['cat', 'help']);
                                        }
                                    } else {
                                        windows[6].window.functions.minimize();
                                    }
                                }}
                            >
                                <div css={[
                                    tw`absolute top-0 w-full h-[2px] bg-transparent`,
                                    (windows[6].window.open && activeWindow === windows[6].window.name) && tw`bg-base-600`,
                                ]}>

                                </div>
                                <TaskBarButton>
                                    <FontAwesomeIcon icon={getExtentionIcon(currentMusicFile?.ext)} />
                                </TaskBarButton>
                            </div>
                        </div>
                    }
                    {windows[5].window.open &&
                        <div
                            onMouseEnter={() => {
                                toggleWindowHoverSmallTask(windows[5].window.name, true);
                            }}
                            onMouseLeave={() => {
                                toggleWindowHoverSmallTask(windows[5].window.name, false);
                                toggleWindowSmallTask(windows[5].window.name, false);
                            }}
                            css={tw`relative`}
                            key={windows[5].window.name}
                        >
                            <div
                                css={[
                                    tw`absolute rounded bottom-[50px] right-[-60px] bg-primary h-0 overflow-hidden transition-all ease-in-out duration-150 opacity-0 w-[170px]`,
                                    `box-shadow:0px 0px 0px rgba(0, 0, 0, 0.5),0px -1px 8px rgba(0, 0, 0, 0.5);`,
                                    windows[5].window.smallTask && tw`h-[140px] opacity-100`,
                                ]}
                            >
                                <div css={tw`p-3 flex justify-between items-center`}>
                                    <div css={tw`flex items-center space-x-1`}>
                                        <div css={tw`text-white text-xs capitalize overflow-hidden`}>
                                            {windows[5].window.name}
                                        </div>
                                        {windows[5].window.name === "konsole" && (
                                            <>
                                                <div css={tw`text-white text-sm font-extralight`}>
                                                    -
                                                </div>
                                                <div css={tw`text-slate-400 text-xs font-extralight`}>
                                                    {commands?.[(commands?.length || 1) - 1]}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <SmallTaskCloseButton
                                        onClick={() => windows[5].window.functions.close()}
                                    >
                                        <div css={tw`px-1`}>
                                            <FontAwesomeIcon css={tw`text-base-700`} icon={faXmark} />
                                        </div>
                                    </SmallTaskCloseButton>
                                </div>

                                <WindowSmallTaskManager
                                    onClick={() => {
                                        if (windows[5].window.minimize === 'enabled') {
                                            windows[5].window.functions.minimize();
                                        }
                                        updateActiveWindow(windows[5].window.name);
                                        toggleWindowHoverSmallTask(windows[5].window.name, false);
                                        toggleWindowSmallTask(windows[5].window.name, false);
                                    }}
                                >
                                    <div css={tw`bg-base-700/30 rounded-full w-[50px] h-[50px] flex justify-center items-center`}>
                                        <FontAwesomeIcon css={tw`text-white text-[25px]`} icon={getExtentionIcon(currentSelectedFile?.ext)} />
                                    </div>
                                </WindowSmallTaskManager>
                            </div>

                            <div
                                onMouseEnter={() => windows[5].window.open && toggleWindowSmallTask(windows[5].window.name, true)}
                                onMouseLeave={() => windows[5].window.open && setTimeout(() => !windows[5].window.hoverSmallTask && toggleWindowSmallTask(windows[5].window.name, false), 100)}
                                title={windows[5].window.name.charAt(0).toUpperCase() + windows[5].window.name.slice(1)}
                                css={[
                                    tw`relative w-[50px] h-[50px] flex justify-center transition-colors ease-in-out duration-100 items-center hover:brightness-125`,
                                    windows[5].window.open && tw`bg-[#494c51]`,
                                ]}
                                onClick={() => {
                                    if (!windows[5].window.open) {
                                        toggleWindow(windows[5].window.name, true);
                                        updateActiveWindow(windows[5].window.name);
                                        if (windows[5].window.name === 'konsole') {
                                            setCommands(['cat', 'help']);
                                        }
                                    } else {
                                        windows[5].window.functions.minimize();
                                    }
                                }}
                            >
                                <div css={[
                                    tw`absolute top-0 w-full h-[2px] bg-transparent`,
                                    (windows[5].window.open && activeWindow === windows[5].window.name) && tw`bg-base-600`,
                                ]}>

                                </div>
                                <TaskBarButton>
                                    <FontAwesomeIcon icon={getExtentionIcon(currentSelectedFile?.ext)} />
                                </TaskBarButton>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default TaskBar;