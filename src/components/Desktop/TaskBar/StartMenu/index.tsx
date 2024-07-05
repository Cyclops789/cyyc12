import { useWindowsStore } from '@/stores/windows';
import { useState, type Dispatch, type SetStateAction } from 'react';
import tw, { styled } from 'twin.macro';
import userProfile from '@/assets/user-profile.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faMagnifyingGlass, faPowerOff, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import Categories from './Categories';
import Programmes from './Programmes';

type Props = { isStartMenuSticky: boolean, setStartMenuSticky: Dispatch<SetStateAction<boolean>> };

const ThumbTackStick = styled.div<{ $sticky: boolean }>`
    ${tw`rounded border border-transparent w-[35px] flex justify-center items-center`}

    ${p => p.$sticky && tw`bg-red-700/30 border-red-600`}

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
    & svg {
        ${tw`w-[15px] transition-all ease-in-out duration-200`}
    }
    
    &:focus-within {
        ${tw`border-red-600`}

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

const PowerButton = styled.div`
    ${tw`flex items-center border border-transparent rounded p-1 space-x-2 cursor-pointer`}

    & svg {
        ${tw`text-white text-[25px]`}
    }

    & div {
        ${tw`text-white`}
    }

    &:hover {
        ${tw`border-red-600`}
    }

    &:active {
        ${tw`bg-red-700/30 border-red-600`}
    }
`;

function StartMenu({ isStartMenuSticky, setStartMenuSticky }: Props) {
    const { activeWindow, updateActiveWindow } = useWindowsStore();
    const [applicationsSearchQuery, setApplicationSearchQuery] = useState('');

    return (
        <div
            css={[
                tw`fixed z-[99] border-b border-b-white/25 bottom-[50px] left-0 h-0 w-[656px] rounded-tr opacity-0 bg-[rgba(42,45,50)] transition-all ease-in-out duration-200 shadow-md shadow-black`,
                (activeWindow === 'startmenu' || isStartMenuSticky) && tw`!h-[461px] !opacity-100`
            ]}>
            <div css={tw`p-2 w-full flex justify-between border-b border-b-white/25`}>
                <div css={tw`flex space-x-2`}>
                    <img css={tw`rounded-full ring-[1px] ring-white/25 max-w-[30px]`} src={userProfile} srcSet={userProfile} loading={'lazy'} alt={"userProfile"} />
                    <UserNameSpan title={'hamza@debian (Debian GNU/Linux 12 (bookworm))'}>hamza</UserNameSpan>
                </div>

                <div css={tw`flex space-x-2`}>
                    <InputSearch>
                        <FontAwesomeIcon css={tw`text-red-600 mx-2`} icon={faMagnifyingGlass} />
                        <input
                            type={"text"}
                            placeholder={'Search...'}
                            onChange={(e) => setApplicationSearchQuery(e.target.value)} value={applicationsSearchQuery}
                        />
                    </InputSearch>
                    <ThumbTackStick
                        onClick={() => {
                            updateActiveWindow('startmenu');
                            setStartMenuSticky((e) => !e);
                        }}
                        $sticky={isStartMenuSticky}
                    >
                        <FontAwesomeIcon icon={faThumbtack} />
                    </ThumbTackStick>
                </div>
            </div>
            <div css={tw`flex h-[351px]`}>
                <Categories />
                <div css={tw`h-[351px] bg-white/25 w-[1px]`} />
                <Programmes {...{ applicationsSearchQuery }} />
            </div>
            <div css={tw`border-t border-t-white/25 h-[50px]`}>
                <div css={tw`p-3 flex justify-between`}>
                    <div css={tw`flex space-x-2`}>

                    </div>

                    <div css={tw`flex space-x-2`}>
                        <PowerButton
                            onClick={() => {
                                window.location.reload();
                            }}
                        >
                            <FontAwesomeIcon icon={faArrowsRotate} />
                            <div>Restart</div>
                        </PowerButton>

                        <PowerButton
                            onClick={() => {
                                window.close();
                            }}
                        >
                            <FontAwesomeIcon icon={faPowerOff} />
                            <div>Shut Down</div>
                        </PowerButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartMenu