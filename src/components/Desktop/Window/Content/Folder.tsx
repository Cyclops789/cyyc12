import tw, { styled } from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { foldersStructure, foldersContent } from '@/helpers/foldersHelper';
import { useFoldersStore, type allowedFolders } from '@/stores/folders';
import { useEffect } from 'react';

const PlaceRow = styled.div<{ $selected: boolean }>`
    ${tw`flex space-x-2 cursor-pointer items-center bg-transparent p-1 rounded`}

    ${(p) => p.$selected && tw`bg-red-500/10`}

    &:hover {
        ${tw`bg-red-500/10`}
    }

    & svg {
        ${tw`text-[20px] text-red-900`}
    }

    & div {
        ${tw`text-white`}
    }
`;

function Folder() {
    const { currentFolder, currentFolderBrowseIndex, setCurrentFolder, setCurrentFolderBrowserIndex } = useFoldersStore();

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
                css={tw`bg-primary h-full w-[250px] border-r border-r-red-500`}
            >
                <div
                    css={tw`h-[50px] w-full`}
                >

                </div>
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
                    css={tw`bg-primary border-b border-b-red-500 h-[50px] w-full`}
                >
                    <div
                        css={tw`p-2 gap-2`}
                    >
                        {currentFolderBrowseIndex?.files.map((file) => (
                            <div
                                key={file.name}
                            >

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Folder;