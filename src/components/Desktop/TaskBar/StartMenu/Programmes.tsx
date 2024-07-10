import { useCommandsStore } from '@/stores/commands';
import { useGeneralStore } from '@/stores/general';
import { AvailableWindows, useWindowsStore } from '@/stores/windows';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo, useCallback, useMemo } from 'react';
import tw, { styled } from 'twin.macro';

type Props = { applicationsSearchQuery: string };

const ApplicationContainer = styled.div`
    ${tw`text-white h-[90px] w-[90px] flex items-center justify-center border border-transparent rounded cursor-pointer`}

    &:hover {
        ${tw`border-base-600 bg-base-600/20`}
    }
`;

function Programmes({ applicationsSearchQuery }: Props) {
    const { windows: gWindows, toggleWindow, updateActiveWindow } = useWindowsStore();
    const { activeMenuCategory } = useGeneralStore();
    const { setCommands } = useCommandsStore();
    const targetedApplication = useMemo(() => applicationsSearchQuery, [applicationsSearchQuery]);

    const openWindow = useCallback((windowName: AvailableWindows) => {
        toggleWindow(windowName, true);
        updateActiveWindow(windowName);
        if (windowName === 'konsole') {
            setCommands(['cat', 'help']);
        }
    }, []);

    return (
        <div css={tw`w-[60%] grid grid-cols-4 gap-x-2 p-2 h-full`}>
            {gWindows.filter(gWindow => !gWindow.window.hidden.startMenu).map((gWindow) => (
                (activeMenuCategory === gWindow.window.category || activeMenuCategory === null) &&
                (
                    (targetedApplication !== '' && gWindow.window.name.toLowerCase().substring(0, targetedApplication.length) === targetedApplication.toLowerCase()) ? (
                        <ApplicationContainer
                            onClick={() => openWindow(gWindow.window.name)}
                            key={gWindow.window.name}
                            draggable
                        >
                            <div>
                                <div css={tw`flex justify-center`}>
                                    <FontAwesomeIcon css={tw`text-base-600 text-[40px]`} icon={gWindow.desktop.child.icon} />
                                </div>
                                <div css={tw`capitalize text-sm`}>{gWindow.window.name}</div>
                            </div>
                        </ApplicationContainer>
                    ) : (targetedApplication === '') && (
                        <ApplicationContainer
                            onClick={() => openWindow(gWindow.window.name)}
                            key={gWindow.window.name}
                            draggable
                        >
                            <div>
                                <div css={tw`flex justify-center`}>
                                    <FontAwesomeIcon css={tw`text-base-600 text-[40px]`} icon={gWindow.desktop.child.icon} />
                                </div>
                                <div css={tw`capitalize text-sm`}>{gWindow.window.name}</div>
                            </div>
                        </ApplicationContainer>
                    )
                )

            ))}
        </div>
    )
}

export default memo(Programmes);