import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHome, faMusic, faVideo, faCamera, faDesktop, faFile, faImage, faCode, faFilm } from '@fortawesome/free-solid-svg-icons';
import browser from '@/assets/json/browser.json';

interface Folder {
    icon: IconProp;
}

export interface IBrowserIndex {
    name: string;
    files: {
        name: string;
        size: string;
        staticPath: string;
        type: 'file' | 'folder';
        ext: string;
    }[] | [];
};

type FoldersStructure = {
    [path: string]: Folder;
};

type allowedIcons = '.png' | '.jpg' | '.jpeg' | '.webp' | '.json' | '.mp4' | '.mp3';

export const foldersStructure: FoldersStructure = {
    "desktop": {
        icon: faHome,
    },
    "music": {
        icon: faMusic,
    },
    "pictures": {
        icon: faCamera,
    },
    "videos": {
        icon: faVideo,
    },
} as const;

export const foldersContent = browser as IBrowserIndex[];

export const getExtentionIcon = (ext: allowedIcons): IconProp => {
    if(ext === '.jpeg' || ext === '.jpg' || ext === '.png' || ext === '.webp') {
        return faImage;
    }

    if(ext === '.json') {
        return faCode;
    }

    if(ext === '.mp4') {
        return faFilm;
    }

    if(ext === '.mp3') {
        return faMusic;
    }

    return faFile;
}