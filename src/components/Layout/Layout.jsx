import { useUser } from '../../hooks/useUser.js';
import { useState, useEffect } from 'react';
import styles from './Layout.module.css';
import { Navbar } from '../Navbar/Navbar.jsx';

export function Layout({ children }) {
    const { user, logout } = useUser();
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setIsDarkMode(savedTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
        document.documentElement.classList.toggle('light', !newMode);
    };

    return (
        <div className={styles.layout}>
            <Navbar user={user} onLogout={logout} onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <main className={styles.main}>{children}</main>
        </div>
    );
}