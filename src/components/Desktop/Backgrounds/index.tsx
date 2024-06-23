import { useGeneralStore } from '@/stores/general';
import React from 'react';
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