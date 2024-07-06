import tw, { styled } from 'twin.macro';
import { useBrowserHistoryStore } from '@/stores/browserHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faArrowRotateRight, faXmark, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { bookMarks } from '@/stores/browserHistory';
import { isValidURL } from '@/helpers/historyHelper';

const HeaderSearch = styled.div`
    ${tw`w-full h-[45px] bg-white/10 border-b border-b-white/10 flex items-center gap-x-4`}
`;

const ActionButton = styled.button`
    ${tw`rounded`}

    &:disabled {
        & svg {
            ${tw`text-white/30`}
        }
    }

    &:hover:enabled {
        ${tw`bg-white/10`}
    }
    & div {
        ${tw`flex justify-center items-center w-[30px] h-[30px]`}
    }

    & svg {
        ${tw`text-white transition-all ease-in-out duration-150`}
    }
`;

const BookMarkButton = styled.button`
    ${tw`rounded`}

    &:disabled {
        & svg {
            ${tw`text-white/30`}
        }
    }

    &:hover:enabled {
        ${tw`bg-white/10`}
    }
    & div:first-child {
        ${tw`text-white flex gap-x-1 items-center w-full h-[30px]`}

        & div {
            ${tw`mr-1`}
        }
    }

    & svg {
        ${tw`ml-1 text-white transition-all ease-in-out duration-150`}
    }
`;

const InputSearchContainer = styled.div`
    ${tw`transition-all ease-in-out duration-150 mx-4 flex h-[85%] w-[70%] items-center bg-black/50 p-2 rounded-md border-2 border-transparent`}

    &:focus-within {
        ${tw`border-red-700`}
    }

    & input {
        ${tw`(focus:ring-0 outline-none)! bg-transparent text-white/80 w-full`}
    }
`;

function IceFox() {
    const reloadRef = useRef<SVGSVGElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [iframeLoading, setIframeLoading] = useState<boolean>(false);
    const [searchPlaceHolder, setSearchPlaceHolder] = useState<string>('');
    const { searchLinksHistory, currentLink, setCurrentLink, addLinkHistory } = useBrowserHistoryStore();

    const currentLinkIndex = useMemo(
        (): number => searchLinksHistory.findIndex(
            (searchLinkHistory) => (searchLinkHistory === currentLink) 
                && searchLinkHistory
    ), [currentLink, searchLinksHistory]);

    const reloadOrCancelIframe = useCallback(() => {
        if(iframeRef.current && reloadRef.current) {
            if(iframeLoading) {
                reloadRef.current.style.rotate = '';
                setIframeLoading(false);
                iframeRef.current.setAttribute('src', 'about:blank');
            } else {
                reloadRef.current.style.rotate = '90deg';
                setTimeout(() => {
                    reloadRef.current!.style.rotate = '';
                    setIframeLoading(true);
                    iframeRef.current!.removeAttribute('src');
                    iframeRef.current!.setAttribute('src', currentLink);
                }, 150);
            }
        }
    }, []);

    const changeIframeLink = useCallback((link?: string) => {
        if(iframeRef.current) {
            const newLink = link || searchPlaceHolder;
            
            if(!isValidURL(newLink)) return;
            if(searchLinksHistory.includes(newLink)) return;
            
            addLinkHistory(newLink);
            setCurrentLink(newLink);
            
            iframeRef.current.setAttribute('src', newLink);
        }
    }, [iframeRef.current, searchPlaceHolder]);

    const goForward = useCallback(() => {
        if(iframeRef.current) {
            const newLink = searchLinksHistory[(currentLinkIndex + 1) >= searchLinksHistory.length ? currentLinkIndex : (currentLinkIndex + 1)] || currentLink;

            setCurrentLink(newLink);
            setSearchPlaceHolder(newLink);
            iframeRef.current.setAttribute('src', newLink);
        }
    }, [iframeRef.current, searchLinksHistory, currentLink]);

    const goBack = useCallback(() => {
        if(iframeRef.current) {
            const newLink = searchLinksHistory[(currentLinkIndex - 1) === -1 ? 0 : (currentLinkIndex - 1)] || currentLink;

            setCurrentLink(newLink);
            setSearchPlaceHolder(newLink);
            iframeRef.current.setAttribute('src', newLink);
        }
    }, [iframeRef.current, searchLinksHistory, currentLink]);

    useEffect(() => {
        const handleLoadStart = () => setIframeLoading(true);
        const handleLoad = () => setIframeLoading(false);

        if (iframeRef.current) {
            iframeRef.current.addEventListener('loadstart', handleLoadStart);
            iframeRef.current.addEventListener('load', handleLoad);
        }
    
        return () => {
            if (iframeRef.current) {
                iframeRef.current?.removeEventListener('loadstart', handleLoadStart);
                iframeRef.current?.removeEventListener('load', handleLoad);
            }
        };
    }, [iframeRef]);

    useEffect(() => setSearchPlaceHolder(currentLink), [currentLink]);

    return (
        <div css={tw`bg-[rgb(21,29,36)] w-full h-full cursor-auto overflow-hidden rounded-b-lg`}>
            <HeaderSearch css={tw`border-b-transparent`}>
                <div
                    css={tw`mx-3 flex items-center gap-x-1`}
                >
                    <ActionButton
                        onClick={goBack}
                        disabled={currentLinkIndex === 0 || searchLinksHistory.length === 1}
                    >
                        <div>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </div>
                    </ActionButton>

                    <ActionButton
                        onClick={goForward}
                        disabled={currentLinkIndex === (searchLinksHistory.length-1)}
                    >
                        <div>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </ActionButton>

                    <ActionButton onClick={reloadOrCancelIframe}>
                        <div>
                            <FontAwesomeIcon 
                                ref={reloadRef} 
                                icon={!iframeLoading ? faArrowRotateRight : faXmark} 
                            />
                        </div>
                    </ActionButton>
                </div>

                <InputSearchContainer>
                    <input
                        value={searchPlaceHolder}
                        onChange={(e) => setSearchPlaceHolder(e.target.value)}
                        onKeyDown={(e) => {
                            if(e.key === 'Enter') changeIframeLink();
                        }}
                    />
                </InputSearchContainer>
            </HeaderSearch>
            <HeaderSearch
                css={tw`h-[35px] pl-2 items-start`}
            >
                {bookMarks.map((bookMark) => (
                    <BookMarkButton 
                        key={bookMark}
                        onClick={() => changeIframeLink(bookMark)}
                    >
                        <div>
                            <FontAwesomeIcon icon={faGlobe} />

                            <div css={tw`text-xs`}>{bookMark}</div>
                        </div>
                    </BookMarkButton>
                ))}

            </HeaderSearch>
            <iframe
                ref={iframeRef}
                src={currentLink}
                referrerPolicy={"no-referrer"}
                css={tw`w-full h-full`}
                sandbox={"allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"}
            />
        </div>
    )
}

export default IceFox;