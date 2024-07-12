import tw, { styled } from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { foldersStructure, browserJsonPath, getExtentionIcon, IBrowserIndex, getWindowNameFromExt } from '@/helpers/foldersHelper';
import { useFoldersStore, type allowedFolders } from '@/stores/folders';
import { useWindowsStore } from '@/stores/windows';
import { useEffect, useMemo, useState } from 'react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const PlaceRow = styled.div<{ $selected: boolean }>`
    ${tw`flex space-x-2 cursor-pointer items-center bg-transparent p-1 rounded border border-transparent`}

    ${(p) => p.$selected && tw`bg-base-500/10 border-base-800`}

    &:hover {
        ${tw`bg-base-500/10`}
    }

    & svg {
        ${tw`text-[20px] text-base-800`}
    }

    & div {
        ${tw`text-white`}
    }
`;

const PathButton = styled.div`
    ${tw`bg-transparent capitalize flex justify-center text-white items-center px-2 border-x border-x-transparent`}

    &:active {
        ${tw`border-x-base-800`}
    }

    &:hover {
        ${tw`bg-base-500/10`}
    }
    
    & svg {
        ${tw`text-[15px] text-white`}
    }
`;

const FileButton = styled.div`
    ${tw`flex space-x-1 cursor-pointer w-full`}

    &:hover .file-item {
        ${tw`bg-base-500/10`}
    }
`;

function Folder() {
    const { currentFolder, setCurrentFolder, addSelectedFile } = useFoldersStore();
    const { toggleWindow, updateActiveWindow } = useWindowsStore();
    const [currentFolderBrowseIndex, setCurrentFolderBrowserIndex] = useState<IBrowserIndex[]>();
    const currentFolderFiles = useMemo(() => currentFolderBrowseIndex?.find(
        folderContent => (currentFolder === folderContent.name)
    ) || null, [currentFolderBrowseIndex, currentFolder]);

    useEffect(() => {
        fetch(browserJsonPath).then(async (res) => setCurrentFolderBrowserIndex(await res.json() as IBrowserIndex[]));
    }, []);

    return (
        <div css={tw`bg-custom1 w-full h-full select-none cursor-default overflow-hidden rounded-b-lg flex`}>
            <div
                css={tw`bg-primary h-full w-[250px] border-r border-r-base-500/70`}
            >

                <div css={tw`p-2 space-y-2 grid`}>
                    <div css={tw`text-white/50`}>Places</div>
                    {Object.keys(foldersStructure).map((key) => (
                        <PlaceRow
                            key={key}
                            $selected={key === currentFolder}
                            onClick={() => setCurrentFolder(key as allowedFolders)}
                        >
                            <FontAwesomeIcon
                                icon={foldersStructure[key].icon}
                            />
                            <div css={tw`capitalize`}>
                                {key}
                            </div>
                        </PlaceRow>
                    ))}
                </div>
            </div>

            <div
                css={tw`bg-secondary/70 h-full w-full`}
            >
                <div
                    css={tw`bg-primary border-b border-b-base-500/70 h-[50px] flex`}
                >
                    <PathButton>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </PathButton>
                    <PathButton>
                        {currentFolderFiles?.name}
                    </PathButton>
                </div>
                <div
                    css={tw`overflow-auto`}
                >
                    {currentFolderFiles && currentFolderFiles.files.map((file, index) => (
                        <FileButton
                            key={file.name}
                            css={[ index % 2 ? tw`bg-black/20` : tw`bg-black/10` ]}
                            onClick={() => {
                                try {
                                    addSelectedFile(file);
                                } finally {
                                    const mWindow = getWindowNameFromExt(file.ext);
                                    toggleWindow(mWindow, true);
                                    updateActiveWindow(mWindow);
                                }
                            }}
                        >
                            <div
                                css={tw`flex pl-3`}
                            >
                                <div css={[tw`h-full w-[2px] bg-gray-700`, (currentFolderFiles?.files.length - 1) === index && tw`h-[50%]`]} />
                                <div css={[tw`mt-[17px] w-[15px] h-[2px] bg-gray-700`, currentFolderFiles?.files.length === 1 && tw`mt-[16px]`]} />
                            </div>

                            <div
                                css={tw`flex space-x-1 w-full items-center`}
                                className={'file-item'}
                            >
                                <div
                                    css={tw`p-1`}

                                >
                                    <FontAwesomeIcon
                                        icon={getExtentionIcon(file.ext, file.type)}
                                        css={tw`text-base-700 text-[25px]`}
                                    />
                                </div>

                                <div
                                    css={tw`hover:underline text-white`}
                                >
                                    {file.name}
                                </div>
                            </div>
                        </FileButton>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Folder;