import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHome, faMusic, faVideo, faCamera, faDesktop, faFile, faImage, faCode, faFilm, faFolder, faFilePdf, faFileText } from '@fortawesome/free-solid-svg-icons';
import browser from '@/assets/json/browser.json';
import { faFileLines } from "@fortawesome/free-regular-svg-icons";

interface Folder {
    icon: IconProp;
}

export type File = {
    name: string;
    size: string;
    staticPath: string;
    type: 'file' | 'folder';
    ext: allowedExtensions;
}

export interface IBrowserIndex {
    name: string;
    files: File[] | [];
};

type FoldersStructure = {
    [path: string]: Folder;
};

export type allowedExtensions = 
// Images
'.png' | '.jpg' | '.jpeg' | '.webp' | 

// Videos
'.mp4' |

// Sounds
'.mp3' |

// Text or ReadAble files
'.json' | '.pdf' | '.txt';

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
    "documents": {
        icon: faFileLines
    }
} as const;

export const foldersContent = browser as IBrowserIndex[];

export const getExtentionIcon = (ext: allowedExtensions | string, type?: 'file' | 'folder'): IconProp => {
    if(type && type === 'folder') {
        return faFolder;
    }

    if(ext === '.jpeg' || ext === '.jpg' || ext === '.png' || ext === '.webp') {
        return faImage;
    }

    if(ext === '.json') {
        return faCode;
    }

    if(ext === '.pdf') {
        return faFilePdf;
    }

    if(ext === '.txt') {
        return faFileText;
    }

    if(ext === '.mp4') {
        return faFilm;
    }

    if(ext === '.mp3') {
        return faMusic;
    }

    return faFile;
}