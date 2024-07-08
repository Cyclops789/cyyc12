import { useEffect, useState } from 'react';

type Props = { schema: string };

export function useIndexedDbState({ schema }: Props): IDBOpenDBRequest | null {
    const [schemaObject, setSchemaObject] = useState<IDBOpenDBRequest | null>(null);

    useEffect(() => {
        const db = window.indexedDB.open(schema, 3);

        db.onerror = () => console.log(`Failed to load indexedDB for schema: ${schema} `, db.error);
        db.onsuccess = () => setSchemaObject(db);
    }, [schema]);

    return schemaObject;
}