import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser.js';
import { Button } from '../../components/Button/Button.jsx';
import { Input, Label } from '../../components/Input/Input.jsx';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card/Card.jsx';
import styles from './LoginPage.module.css';

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, error: contextError } = useUser();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [localError, setLocalError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        // Validation
        if (!username.trim()) {
            setLocalError('Username is required');
            return;
        }

        if (!password) {
            setLocalError('Password is required');
            return;
        }

        setIsSubmitting(true);

        try {
            await login(username, password);
            navigate('/home');
        } catch (err) {
            setLocalError(contextError || 'Login failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1 className={styles.title}>🍸 Shaken & Stirred</h1>
                    <p className={styles.subtitle}>Discover your favorite cocktails</p>
                </div>

                <Card className={styles.card}>
                    <CardHeader>
                        <CardTitle>Sign In</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            {localError && (
                                <ErrorMessage
                                    message={localError}
                                    onDismiss={() => setLocalError('')}
                                />
                            )}

                            <div className={styles.formGroup}>
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                disabled={isSubmitting}
                                className={styles.submitBtn}
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign In'}
                            </Button>
                        </form>

                        <div className={styles.footer}>
                            <p>
                                Don't have an account?{' '}
                                <Link to="/register" className={styles.link}>
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}