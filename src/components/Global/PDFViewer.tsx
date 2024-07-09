import { memo, useMemo } from 'react';
import { Document, Page } from 'react-pdf';
import printJS from 'print-js';
import tw, { styled } from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileImport } from '@fortawesome/free-solid-svg-icons';

type Props = { source: string, name: string };

const ActionButton = styled.div`
    ${tw`p-2 bg-transparent flex justify-center items-center rounded-full cursor-pointer`}

    &:hover{
        ${tw`bg-white/10`}
    }

    &:active{
        ${tw`bg-white/50`}
    }
`;

function PDFViewer({ source, name }: Props) {

    const printDoc = async () => {
        printJS({
            printable: source,
            type: "pdf",
        })
    }

    const downloadDoc = async () => {
        const link = document.createElement("a");

        link.href = source;
        link.download = name;

        link.click();
    }

    return (
        <div
            css={tw`h-full w-full bg-secondary overflow-y-auto text-white`}
        >
            <div css={tw`h-[50px] w-full bg-primary border-b border-b-white/10 flex justify-between items-center p-3`}>
                <div css={tw`capitalize`}>
                    {name.split('.')[0]}
                </div>

                <div
                    css={tw`flex space-x-2`}
                >
                    <ActionButton
                        onClick={downloadDoc}
                    >
                        <FontAwesomeIcon icon={faDownload} />
                    </ActionButton>
                    <ActionButton
                        onClick={printDoc}
                    >
                        <FontAwesomeIcon icon={faFileImport} />
                    </ActionButton>
                </div>
            </div>

            <div css={tw`flex justify-center`}>
                <Document 
                    file={{ url: source }}
                >
                    <Page pageNumber={1} />
                </Document>
            </div>
        </div>
    );
}

export default memo(PDFViewer);