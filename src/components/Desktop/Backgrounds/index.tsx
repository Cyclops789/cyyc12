import { useGeneralStore } from '@/stores/general';
import CMatrix from '@/components/Desktop/Backgrounds/CMatrix';
import useThemeStore from '@/styles/useThemeStore';
import { useEffect } from 'react';

function index() {
    const { activeBackground, setActiveBackground } = useGeneralStore();
    const { baseColor } = useThemeStore();

    useEffect(() => {
        if(baseColor) setActiveBackground(`cmatrix.${baseColor as "red" | "green" | "orange" | "yellow"}`);
    }, [baseColor]);

    switch(true) {
        case activeBackground.startsWith('cmatrix'): {
            return <CMatrix color={activeBackground.split('.')[1]} />
        }
    }
}

export default index;