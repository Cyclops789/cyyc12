import tw from 'twin.macro';
import { useFoldersStore } from '@/stores/folders';
import { useEffect, useState } from 'react';

import Editor from '@/components/Global/Editor';
import Video from '@/components/Global/Video';
import PDFViewer from '@/components/Global/PDFViewer';

function File() {
    const { currentSelectedFile: file } = useFoldersStore();
    const [readAbleFileData, setReadAbleFileData] = useState<string>();

    useEffect(() => {
        if (file && (file.ext === '.json' || file.ext === '.txt')) {
            fetch(file.staticPath).then(async (res) => {
                setReadAbleFileData(await res.text());
            })
        }
    }, [file]);

    return (
        <div css={tw`bg-black w-full h-full cursor-auto overflow-hidden rounded-b-lg flex justify-center`}>
            {file && (
                (file.ext === '.json' || file.ext === '.txt') && readAbleFileData ? (
                    <Editor
                        data={readAbleFileData}
                        language={file.ext.replace('.', '')}
                    />
                ) : (file.ext === '.jpeg' || file.ext === '.png' || file.ext === '.jpg' || file.ext === '.webp') ? (
                    <img
                        src={file.staticPath}
                        alt={file.name}
                        srcSet={file.staticPath}
                    />
                ) : (file.ext === '.mp4' || file.ext === '.mp3') ? (
                    <Video
                        source={file.staticPath}
                        extension={file.ext}
                    />
                ) : (file.ext === '.pdf') && (
                    <PDFViewer source={file.staticPath} name={file.name} />
                )
            )}
        </div>
    )
}

export default File;