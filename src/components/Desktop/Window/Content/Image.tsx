import tw from 'twin.macro';
import { useFoldersStore } from '@/stores/folders';
import { useMemo } from 'react';

function File() {
    const { getFileOfType, selectedFiles } = useFoldersStore();
    const file = useMemo(() => getFileOfType(['.jpeg', '.png', '.jpg', '.webp']), [selectedFiles]);

    return (
        <div css={tw`bg-black w-full h-full cursor-auto overflow-hidden rounded-b-lg flex justify-center`}>
            {file && (
                <img
                    loading={'lazy'}
                    src={file.staticPath}
                    alt={file.name}
                    srcSet={file.staticPath}
                />
            )}
        </div>
    )
}

export default File;