import { useGeneralStore } from '@/stores/general';
import CMatrix from './CMatrix';

function index() {
    const { activeBackground } = useGeneralStore();

    switch(true) {
        case activeBackground.startsWith('cmatrix'): {
            return <CMatrix color={activeBackground.split('.')[1]} />
        }
    }
}

export default index