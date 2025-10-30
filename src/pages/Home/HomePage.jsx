import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button.jsx';
import styles from './HomePage.module.css';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <h1 className={styles.title}>Welcome to Shaken & Stirred</h1>
                <p className={styles.subtitle}>
                    Explore thousands of cocktail recipes from around the world
                </p>

                <div className={styles.actions}>
                    <Button
                        onClick={() => navigate('/search')}
                        variant="primary"
                        className={styles.btn}
                    >
                        🔍 Search Cocktails
                    </Button>
                    <Button
                        onClick={() => navigate('/categories')}
                        variant="secondary"
                        className={styles.btn}
                    >
                        📂 Browse Categories
                    </Button>
                    <Button
                        onClick={() => navigate('/random')}
                        variant="ghost"
                        className={styles.btn}
                    >
                        🎲 Random Cocktail
                    </Button>
                </div>
            </div>

            <div className={styles.features}>
                <div className={styles.feature}>
                    <h3>🔍 Smart Search</h3>
                    <p>Find cocktails by name or ingredient</p>
                </div>
                <div className={styles.feature}>
                    <h3>❤️ Save Favorites</h3>
                    <p>Keep track of your favorite drinks</p>
                </div>
                <div className={styles.feature}>
                    <h3>🎲 Random Discovery</h3>
                    <p>Discover new cocktails instantly</p>
                </div>
            </div>
        </div>
    );
}