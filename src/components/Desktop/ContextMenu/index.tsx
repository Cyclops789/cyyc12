import React, { useCallback, useEffect } from 'react'
import { useWindowsStore } from '@/stores/windows';
import { Menu, Item, Separator, Submenu, useContextMenu, RightSlot } from 'react-contexify';
import 'react-contexify/ReactContexify.css';
import { DESKTOP_CONTEXT_ID } from '@/helpers/contextHelper';
import tw from 'twin.macro';
import { useGeneralStore } from '@/stores/general';
import { availableBackgrounds } from '@/stores/general';
import useThemeStore from "@/styles/useThemeStore";

type Props = { children: React.ReactNode };

function ContextMenu({ children }: Props) {
    const { activeWindow, } = useWindowsStore();
    const { baseColor, setBaseColor } = useThemeStore();
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
                                key={bg}
                            >
                                <span css={'text-transform:capitalize;'}>{bg.split('.')[1]}</span>
                            </Item>
                        ))}
                    </Submenu>

                </Submenu>
                <Submenu label="Theme">
                    {["red", "yellow", "orange", "green"].map((color) => (
                        <Item
                            disabled={baseColor === color}
                            key={color}
                            onClick={() => {
                                setBaseColor(color);
                                window.location.reload();
                            }}
                        >
                            <span css={tw`capitalize`}>{color}</span>
                        </Item>
                    ))}
                </Submenu>
            </Menu>
            {children}
        </>
    )
}

export default ContextMenu;