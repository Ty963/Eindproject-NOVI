import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button.jsx';
import styles from './AccessDenied.module.css';

export default function AccessDenied() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.icon}>🚫</div>
                <h1 className={styles.title}>Access Denied</h1>
                <p className={styles.message}>
                    You don't have permission to view this page.
                    Please login or check your credentials.
                </p>
                <div className={styles.actions}>
                    <Button
                        onClick={() => navigate('/')}
                        variant="primary"
                    >
                        Go to Login
                    </Button>
                    <Button
                        onClick={() => navigate(-1)}
                        variant="ghost"
                    >
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
}