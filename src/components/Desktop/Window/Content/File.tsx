import tw from 'twin.macro';
import { allowedExtensions } from '@/helpers/foldersHelper';
import { Editor } from '@/components/Global/Editor';
import { useFoldersStore } from '@/stores/folders';

function File() {
    const { currentSelectedFile } = useFoldersStore();
    return (
        <div css={tw`bg-black w-full h-full cursor-text overflow-hidden rounded-b-lg`}>
            {currentSelectedFile && (
                currentSelectedFile.ext === '.json' || currentSelectedFile.ext === '.txt' && (
                    <Editor
                        data={'Test Test Test'}
                        language={currentSelectedFile.ext.replace('.', '')}
                    />
                )
            )}
        </div>
    )
}

export default File;