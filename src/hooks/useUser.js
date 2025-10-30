import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext.jsx';

export function useUser() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used inside UserProvider');
    }

    return context;
}