import tw, { styled } from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { foldersStructure, foldersContent, getExtentionIcon } from '@/helpers/foldersHelper';
import { useFoldersStore, type allowedFolders } from '@/stores/folders';
import { useWindowsStore } from '@/stores/windows';
import { useEffect } from 'react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const PlaceRow = styled.div<{ $selected: boolean }>`
    ${tw`flex space-x-2 cursor-pointer items-center bg-transparent p-1 rounded border border-transparent`}

    ${(p) => p.$selected && tw`bg-red-500/10 border-red-800`}

    &:hover {
        ${tw`bg-red-500/10`}
    }

    & svg {
        ${tw`text-[20px] text-red-800`}
    }

    & div {
        ${tw`text-white`}
    }
`;

const PathButton = styled.div`
    ${tw`bg-transparent capitalize flex justify-center text-white items-center px-2 border-x border-x-transparent`}

    &:active {
        ${tw`border-x-red-800`}
    }

    &:hover {
        ${tw`bg-red-500/10`}
    }
    
    & svg {
        ${tw`text-[15px] text-white`}
    }
`;

const FileButton = styled.div`
    ${tw`flex space-x-1 cursor-pointer w-full`}

    &:hover .file-item {
        ${tw`bg-red-500/10`}
    }
`;

function Folder() {
    const { currentFolder, currentFolderBrowseIndex, setCurrentFolder, setCurrentFolderBrowserIndex, setCurrentSelectedFile } = useFoldersStore();
    const { toggleWindow, updateActiveWindow } = useWindowsStore();

    useEffect(
        () => setCurrentFolderBrowserIndex(
            foldersContent.find(
                folderContent => (
                    currentFolder === folderContent.name
                )
            ) || null
        ), [currentFolder]
    );

    return (
        <div css={tw`bg-custom1 w-full h-full select-none cursor-default overflow-hidden rounded-b-lg flex`}>
            <div
                css={tw`bg-primary h-full w-[250px] border-r border-r-red-500/70`}
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
                    css={tw`bg-primary border-b border-b-red-500/70 h-[50px] flex`}
                >
                    <PathButton>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </PathButton>
                    <PathButton>
                        {currentFolderBrowseIndex?.name}
                    </PathButton>
                </div>
                <div
                    css={tw`overflow-auto`}
                >
                    {currentFolderBrowseIndex?.files.map((file, index) => (
                        <FileButton
                            key={file.name}
                            css={[
                                index % 2 ? tw`bg-black/20` : tw`bg-black/10`
                            ]}
                            onClick={() => {
                                setCurrentSelectedFile(file);
                                toggleWindow('file', true);
                                updateActiveWindow('file');
                            }}
                        >
                            <div
                                css={tw`flex pl-3`}
                            >
                                <div css={[tw`h-full w-[2px] bg-gray-700`, (currentFolderBrowseIndex?.files.length - 1) === index && tw`h-[50%]`]} />
                                <div css={[tw`mt-[17px] w-[15px] h-[2px] bg-gray-700`, currentFolderBrowseIndex?.files.length === 1 && tw`mt-[16px]`]} />
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
                                        css={tw`text-red-700 text-[25px]`}
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