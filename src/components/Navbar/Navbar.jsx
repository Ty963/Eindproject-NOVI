import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../../hooks/useUser.js';
import styles from './Navbar.module.css';

export function Navbar() {
    const { user, logout } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                {/* Logo */}
                <Link to="/home" className={styles.logo}>
                    <span className={styles.logoText}>🍸 Shaken & Stirred</span>
                </Link>

                {/* Desktop Navigation */}
                <div className={styles.desktopNav}>
                    <Link to="/search" className={styles.navLink}>
                        Search
                    </Link>
                    <Link to="/categories" className={styles.navLink}>
                        Categories
                    </Link>
                    <Link to="/random" className={styles.navLink}>
                        Random
                    </Link>
                    <Link to="/favorites" className={styles.navLink}>
                        Favorites
                    </Link>
                </div>

                {/* Right Section */}
                <div className={styles.rightSection}>
                    <div className={styles.userMenu}>
                        <span className={styles.username}>{user?.username || 'User'}</span>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={styles.menuBtn}
                            title="User menu"
                        >
                            ⋮
                        </button>

                        {isMenuOpen && (
                            <div className={styles.dropdown}>
                                <Link
                                    to="/profile"
                                    className={styles.dropdownItem}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className={`${styles.dropdownItem} ${styles.logout}`}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={styles.mobileMenuBtn}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className={styles.mobileMenu}>
                    <Link
                        to="/search"
                        className={styles.mobileNavLink}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Search
                    </Link>
                    <Link
                        to="/categories"
                        className={styles.mobileNavLink}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Categories
                    </Link>
                    <Link
                        to="/random"
                        className={styles.mobileNavLink}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Random
                    </Link>
                    <Link
                        to="/favorites"
                        className={styles.mobileNavLink}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Favorites
                    </Link>
                    <Link
                        to="/profile"
                        className={styles.mobileNavLink}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Profile
                    </Link>
                    <button
                        onClick={handleLogout}
                        className={`${styles.mobileNavLink} ${styles.logout}`}
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}