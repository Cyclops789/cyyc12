import React, { useEffect, type RefObject } from 'react';
import { useWindowsStore } from '@/stores/windows';
import { ReactMouseSelect } from 'react-mouse-select';
import { useGeneralStore } from '@/stores/general';
import useThemeStore from '@/styles/useThemeStore';

type Props = { children: React.ReactNode, selectAbleContainerRef: RefObject<HTMLDivElement> };

function UserSelectionHandler({ children, selectAbleContainerRef }: Props) {
    const { activeWindow } = useWindowsStore();
    const { setIsUserSelectionActive } = useGeneralStore();
    const { rbgAt600 } = useThemeStore();

    // We will need to render .UserSelectionHandler and .selected classes
    // since they will be inserted outside root element
    useEffect(() => {
        const exists = document.querySelector('#UserSelectionHandler');
        if(!exists) {
            const style = document.createElement("style");

            style.id = "UserSelectionHandler";
            style.textContent = `
                .UserSelectionHandler {
                    background: ${rbgAt600.replace(')',' / 0.2)')};
                    border-color: ${rbgAt600};
                    border-width: 1px;
                    border-radius: 5px;
                    z-index: 50;
                }
                .selected {
                    border-radius: 5px;
                    border-width: 1px;
                    background: ${rbgAt600.replace(')',' / 0.4)')};
                    border-color: ${rbgAt600};
                }
                :root {
                    --contexify-activeItem-bgColor: ${rbgAt600.replace(')',' / 0.3)')};
                    --contexify-menu-bgColor: rgb(42, 45, 50);
                    --contexify-separator-color: #4c4c4c;
                    --contexify-item-color: #fff;
                    --contexify-activeItem-color: #fff;
                    --contexify-rightSlot-color: #6f6e77;
                    --contexify-activeRightSlot-color: #fff;
                    --contexify-arrow-color: #6f6e77;
                    --contexify-activeArrow-color: #fff;
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

    return (
        <>
            {(activeWindow === undefined) &&
                <ReactMouseSelect
                    containerRef={selectAbleContainerRef}
                    frameClassName={`UserSelectionHandler`}
                    itemClassName={`UserSelectionItem`}

                    startSelectionCallback={() => setIsUserSelectionActive(true)}
                    finishSelectionCallback={() => setIsUserSelectionActive(false)}

                    saveSelectAfterFinish
                />
            }
            {children}
        </>
    )
}

export default UserSelectionHandler;