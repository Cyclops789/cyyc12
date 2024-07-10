import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function usePersistedLocatedState<S = undefined>(
    key: string,
    defaultValue: S
): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
    const [state, setState] = useState<S | undefined>(() => {
        try {
            const item = localStorage.getItem(key);
            return item !== null ? (item as unknown as S) : defaultValue;
        } catch (e) {
            console.warn('Failed to retrieve persisted value from store.', e);
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            if (state !== undefined) {
                localStorage.setItem(key, state as unknown as string);
            }
        } catch (e) {
            console.warn('Failed to set persisted value in store.', e);
        }
    }, [key, state]);

    return [state, setState];
}