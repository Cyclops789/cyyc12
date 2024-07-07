import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHome, faDownload, faMusic, faVideo, faCamera } from '@fortawesome/free-solid-svg-icons';

interface IFoldersPlaces {
    name: string;
    icon: IconProp;
}

export const foldersPlaces: IFoldersPlaces[] = [
    {
        name: 'Home',
        icon: faHome,
    },
    {
        name: 'Music',
        icon: faMusic,
    },
    {
        name: 'Pictures',
        icon: faCamera,
    },
    {
        name: 'Videos',
        icon: faVideo,
    },
];

export const foldersStructure = {
    "/home/hamza" : {
        name: "home",

    }
}