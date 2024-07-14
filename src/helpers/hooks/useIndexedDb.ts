import { useEffect, useState } from 'react';

type Props = { schema: string };

export function useIndexedDbState({ schema }: Props): IDBDatabase | null {
    const [schemaObject, setSchemaObject] = useState<IDBDatabase | null>(null);

    useEffect(() => {
        const db = window.indexedDB.open(schema, 3);

        db.onerror = () => console.error(`Failed to load indexedDB for schema: ${schema} `, db.error);
        db.onsuccess = () => setSchemaObject(db.result);

        return () => {
            db.result.close();
        }
    }, [schema]);

    return schemaObject;
}