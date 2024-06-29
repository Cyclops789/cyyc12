import tw, { styled } from 'twin.macro'
import { useWindowsStore } from '@/stores/windows'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCommandsStore } from '@/stores/commands';
import StartMenu from '@/components/Desktop/TaskBar/StartMenu';
import debianLogo from '@/assets/debian.png';
import { useEffect, useState } from 'react';

const TaskBarButton = styled.div`
    ${tw`w-[35px] h-[35px] rounded flex justify-center items-center bg-red-900/90`} 
`;

function TaskBar() {
    const { windows, activeWindow, updateActiveWindow, toggleWindow, toggleWindowMinimize } = useWindowsStore();
    const { setCommands } = useCommandsStore();

    const [isStartMenuSticky, setStartMenuSticky] = useState<boolean>(false);

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
                                    if (gWindow.window.minimize === "enabled") {
                                        toggleWindowMinimize(gWindow.window.name, "disabled");
                                        updateActiveWindow(gWindow.window.name);
                                    } else {
                                        toggleWindowMinimize(gWindow.window.name, "enabled");
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
        </>
    )
}

export default TaskBar;