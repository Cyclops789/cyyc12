export const loadAssets = async (path: string, name: string) => {
    try {
        await import(/* @vite-ignore */ path);
    } catch (error) {
        console.error(`Could not import ${name} assets!`, error);
    }
};