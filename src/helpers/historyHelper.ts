export const DEFAULT_HISTORY_URL = 'https://www.google.com/webhp?igu=1';

export const isValidURL = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
}