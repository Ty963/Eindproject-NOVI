import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button.jsx';
import styles from './NotFound.module.css';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.icon}>🍸</div>
                <h1 className={styles.errorCode}>404</h1>
                <h2 className={styles.title}>Page Not Found</h2>
                <p className={styles.message}>
                    Oops! Looks like this cocktail recipe got lost at the bar.
                    The page you're looking for doesn't exist.
                </p>
                <div className={styles.actions}>
                    <Button
                        onClick={() => navigate('/home')}
                        variant="primary"
                    >
                        🏠 Go Home
                    </Button>
                    <Button
                        onClick={() => navigate(-1)}
                        variant="ghost"
                    >
                        ← Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
}