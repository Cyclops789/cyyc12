import React, { useCallback, useEffect, useMemo } from 'react'
import { useWindowsStore } from '@/stores/windows';
import { Menu, Item, Separator, Submenu, useContextMenu, RightSlot } from 'react-contexify';
import 'react-contexify/ReactContexify.css';
import { DESKTOP_CONTEXT_ID } from '@/helpers/contextHelper';
import tw from 'twin.macro';
import { useGeneralStore } from '@/stores/general';
import { availableBackgrounds } from '@/stores/general';
import './ContextMenu.css';

type Props = { children: React.ReactNode };

function ContextMenu({ children }: Props) {
    const { activeWindow } = useWindowsStore();
    const { setActiveBackground, activeBackground } = useGeneralStore();
    const { show } = useContextMenu({ id: DESKTOP_CONTEXT_ID });

    const matchShortcutR = (e: KeyboardEvent): boolean => (e.key === 'r');

    const showContextMenu = useCallback((event: MouseEvent) => {
        if (activeWindow === undefined) {
            show({ event, props: { key: 'value' } });
        }
    }, [activeWindow])

    useEffect(() => {
        document.addEventListener('contextmenu', showContextMenu);
        return () => {
            document.removeEventListener('contextmenu', showContextMenu);
        }
    }, [activeWindow]);

    return (
        <>
            <Menu
                id={DESKTOP_CONTEXT_ID}
                css={tw`z-[50]`}
            >
                <Submenu label="Sort by">
                    <Item disabled id="sort.by.name" onClick={() => { }}>Name</Item>
                    <Item disabled id="sort.by.size" onClick={() => { }}>Size</Item>
                    <Item disabled id="sort.by.item-type" onClick={() => { }}>Item type</Item>
                    <Separator />
                    <Item disabled id="sort.by.asc" onClick={() => { }}>Ascending</Item>
                    <Item disabled id="sort.by.desc" onClick={() => { }}>Descending</Item>
                </Submenu>

                <Item
                    id="reload"
                    onClick={() => window.location.reload()}
                    css={tw`text-white`}
                    keyMatcher={matchShortcutR}
                >
                    Reload <RightSlot>R</RightSlot>
                </Item>

                <Separator />

                <Submenu label="Background">
                    <Submenu label="CMatrix">
                        {availableBackgrounds.map(bg => (
                            bg.startsWith('cmatrix') && 
                            <Item
                                disabled={activeBackground === bg}
                                onClick={() => setActiveBackground(bg)}
                            >
                                <span css={'text-transform:capitalize;'}>{bg.split('.')[1]}</span>
                            </Item>
                        ))}
                    </Submenu>

                </Submenu>

                <Separator />

                <Submenu label="New">
                    <Item disabled id="new.folder" onClick={() => { }}>Folder</Item>
                    <Item disabled id="new.text" onClick={() => { }}>Text file</Item>
                </Submenu>
                <Item disabled id="add.file" onClick={() => { }}>Add file</Item>
            </Menu>
            {children}
        </>
    )
}

export default ContextMenu;