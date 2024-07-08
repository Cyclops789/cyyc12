import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHome, faMusic, faVideo, faCamera } from '@fortawesome/free-solid-svg-icons';

interface Folder {
    name: string;
    icon: IconProp;
}

type FoldersStructure = {
    [path: string]: Folder;
};

export const foldersStructure: FoldersStructure = {
    "/home/hamza": {
        name: "home",
        icon: faHome,
    },
    "/home/hamza/music": {
        name: "music",
        icon: faMusic,
    },
    "/home/hamza/pictures": {
        name: "pictures",
        icon: faCamera,
    },
    "/home/hamza/videos": {
        name: "videos",
        icon: faVideo,
    },
} as const;