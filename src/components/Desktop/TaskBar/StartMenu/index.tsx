import { useWindowsStore } from '@/stores/windows';
import React, { type Dispatch, type SetStateAction } from 'react';
import tw, { styled } from 'twin.macro';
import userProfile from '@/assets/user-profile.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Categories from './Categories';
import Programmes from './Programmes';

type Props = { isStartMenuSticky: boolean, setStartMenuSticky: Dispatch<SetStateAction<boolean>> };

const ThumbTackStick = styled.div<{ sticky: boolean }>`
    ${tw`rounded border border-transparent w-[35px] flex justify-center items-center`}

    ${p => p.sticky && tw`bg-red-700/30 border-red-600`}

    &:hover {
        ${tw`border-red-600`}
    }

    & svg {
        ${tw`rotate-45 text-white text-[23px]`}
    }
`;

const InputSearch = styled.div`
    ${tw`bg-black/50 rounded border border-white/25 p-[3px]`}

    &:hover {
        ${tw`border-red-600`}
    }

    & input {
        ${tw`(outline-none focus:outline-none)! focus:ring-0 bg-transparent text-[15px] text-white`}
    }

    &:focus-within {
        ${tw`border-red-600`}
    }

    & svg {
        ${tw`w-[15px] transition-all ease-in-out duration-200`}
    }
    
    &:focus-within {
        & svg {
            ${tw`w-0 mx-0`}
        }
    }
`;

const UserNameSpan = styled.span`
    ${tw`mt-[5px] text-[15px] text-white w-[300px]`}
    
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
        visibility: hidden;
    }

    &:hover:before {
        visibility: visible;
        content: '(Debian GNU/Linux 12 (bookworm))';
        display: inline;
        font-size: 13px;
    }
`;

function StartMenu({ isStartMenuSticky, setStartMenuSticky }: Props) {
    const { activeWindow, updateActiveWindow } = useWindowsStore();

    return (
        <div
            css={[
                tw`fixed z-[99] border-b border-b-white/25 bottom-[50px] left-0 h-0 w-[656px] rounded-tr opacity-0 bg-[rgba(42,45,50)] transition-all ease-in-out duration-200`,
                (activeWindow === 'startmenu' || isStartMenuSticky) && tw`!h-[450px] !opacity-100`
            ]}>
            <div css={tw`p-2 w-full flex justify-between border-b border-b-white/25`}>
                <div css={tw`flex space-x-2`}>
                    <img css={tw`rounded-full ring-[1px] ring-white/25 max-w-[30px]`} src={userProfile} srcSet={userProfile} loading={'lazy'} alt={"userProfile"} />
                    <UserNameSpan title={'hamza@debian (Debian GNU/Linux 12 (bookworm))'}>hamza</UserNameSpan>
                </div>

                <div css={tw`flex space-x-2`}>
                    <InputSearch>
                        <FontAwesomeIcon css={tw`text-blue-600 mx-2`} icon={faMagnifyingGlass} />
                        <input type={"text"} placeholder={'Search...'} />
                    </InputSearch>
                    <ThumbTackStick 
                        onClick={() => {
                            updateActiveWindow('startmenu');
                            setStartMenuSticky((e) => !e);
                        }} 
                        sticky={isStartMenuSticky}
                    >
                        <FontAwesomeIcon icon={faThumbtack} />
                    </ThumbTackStick>
                </div>
            </div>
            <div css={tw`flex`}>
                <Categories />
            <div css={tw`h-[400px] bg-white/25 w-[1px]`} />
                <Programmes />
            </div>
        </div>
    )
}

export default StartMenu