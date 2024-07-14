// assets path doesnt rename on build time when you pass them 
// as pure string, so its important to wrap the functions first

export const loadWebAmpAssets = async () => {
    try {
        await import(/* @vite-ignore */ '@/assets/js/webamp.js');
    } catch (error) {
        console.error(`Could not import webamp assets!`, error);
    }
};

export const loadPacManAssets = async () => {
    try {
        await import(/* @vite-ignore */ '@/assets/js/pacman.js');
    } catch (error) {
        console.error(`Could not import pacman assets!`, error);
    }
};

export const loadBrowserDetectorAssets = async () => {
    try {
        await import(/* @vite-ignore */ '@/assets/js/browser.js');
    } catch (error) {
        console.error(`Could not import browser assets!`, error);
    }
};