import { useRef, useState, useEffect, useMemo } from 'react';
import * as monaco from 'monaco-editor';
import Editor, { useMonaco } from '@monaco-editor/react';
import EditorJson from '@/assets/json/EditorTheme.json';
import tw from 'twin.macro';
import { useFoldersStore } from '@/stores/folders';
import type { File } from '@/helpers/foldersHelper';

interface NewFile extends File { data: string; };

export default function EditorEditor() {
    const { getFileOfType } = useFoldersStore();
    const file = getFileOfType(['.json', '.txt']) as NewFile | null;

    useEffect(() => {
        if (file) {
            fetch(file.staticPath).then(async (res) => {
                if (res.ok) {
                    file.data = await res.text();
                } else {
                    file.data = "";
                }
            });
        }
    }, [file]);

    // useEffect(() => {
    //     if (!editorRef.current && monacoEl.current && file) {
    //         // We dont need to give it a type since vite already 
    //         // converts json format into javascript object
    //         console.log('file', file);
    //         editorRef.current = monaco.editor.create(monacoEl.current, { value: file?.data, language: file?.ext.replace('.', ''), theme: "dracula", automaticLayout: true });
    //     }
    //     return () => editorRef.current?.dispose();
    // }, [monacoEl.current, editorRef.current, file]);

    return (
        file &&
        <Editor
            css={tw`w-full h-full`}
            defaultLanguage={file.ext.replace('.', '')}
            defaultValue={file.data}
            onMount={(e) => {
                try {
                    monaco.editor.defineTheme('dracula', EditorJson as any);
                    monaco.editor.setTheme('dracula');
                    const model = e.getModel();
                    
                    if (model) {
                        model.setValue(file.data);
                    } else {
                        console.log("Model is empty");
                    }
                } catch (error) {
                    console.log('ERROR IN ONMOUNT: ', error);
                }
            }}
        />
    );
};