import tw, { styled } from 'twin.macro';
import { useBrowserHistoryStore } from '@/stores/browserHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faArrowRotateRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { IframeHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';

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
        ${tw`flex justify-center items-center  w-[30px] h-[30px]`}
    }

    & svg {
        ${tw`text-white transition-all ease-in-out duration-150`}
    }
`;

const InputSearchContainer = styled.div`
    ${tw`transition-all ease-in-out duration-150 mx-4 flex h-[85%] w-[70%] items-center bg-black/50 p-2 rounded-md border-2 border-transparent`}

    &:focus-within {
        ${tw`border-red-700`}
    }

    & input {
        ${tw`focus:ring-0 outline-none bg-transparent text-white/80 w-full`}
    }
`;

function Projects() {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const reloadRef = useRef<SVGSVGElement>(null);
    const [iframeLoading, setIframeLoading] = useState(false);
    const { searchLinksHistory, currentLink, setCurrentLink, addLinkHistory, setSearchPlaceHolder, searchPlaceHolder } = useBrowserHistoryStore();

    const reloadOrCancelIframe = () => {
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
                    iframeRef.current!.setAttribute('src', currentLink.link);
                }, 150);
            }
        }
    };

    const changeIframeLink = () => {
        if(iframeRef.current) {
            addLinkHistory(searchPlaceHolder);
            iframeRef.current.setAttribute('src', searchPlaceHolder);
        }
    }

    const goForward = () => {
        if(iframeRef.current) {
            const tIndex = (searchLinksHistory.length - 1) - currentLink.index;
            setCurrentLink({
                index: tIndex,
                link: searchLinksHistory[tIndex],
            });
            setSearchPlaceHolder(searchLinksHistory[tIndex]);
            iframeRef.current.setAttribute('src', searchLinksHistory[tIndex]);
        }
    };

    const goBack = () => {
        if(iframeRef.current) {
            const tIndex = (searchLinksHistory.length - 1) + currentLink.index;
            setCurrentLink({
                index: tIndex,
                link: searchLinksHistory[tIndex],
            });
            setSearchPlaceHolder(searchLinksHistory[tIndex]);
            iframeRef.current.setAttribute('src', searchLinksHistory[tIndex]);
        }
    };

    useEffect(() => {
        const handleLoadStart = () => setIframeLoading(true);
        const handleLoad = () => setIframeLoading(false);

        if (iframeRef.current) {
            iframeRef.current.addEventListener('loadstart', handleLoadStart);
            iframeRef.current.addEventListener('load', handleLoad);
        }
    
        return () => {
            if (iframeRef.current) {
                iframeRef.current.removeEventListener('loadstart', handleLoadStart);
                iframeRef.current.removeEventListener('load', handleLoad);
            }
        };
    }, [iframeRef]);

    useEffect(() => setSearchPlaceHolder(currentLink.link), [currentLink.link]);
    useEffect(() => console.log('searchLinksHistory', searchLinksHistory), [searchLinksHistory])

    return (
        <div css={tw`bg-[rgb(21,29,36)] w-full h-full cursor-auto overflow-hidden rounded-b-lg`}>
            <HeaderSearch>
                <div
                    css={tw`mx-3 flex items-center gap-x-1`}
                >
                    <ActionButton
                        onClick={goBack}
                        disabled={searchLinksHistory.length === 1}
                    >
                        <div>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </div>
                    </ActionButton>

                    <ActionButton
                        onClick={goForward}
                        disabled={!(currentLink.index > (searchLinksHistory.length-1))}
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
            <iframe
                ref={iframeRef}
                src={searchLinksHistory[0]}
                referrerPolicy={"no-referrer"}
                css={tw`w-full h-full`}
                sandbox={"allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"}
            />
        </div>
    )
}

export default Projects