import styles from './Card.module.css';

export function Card({ children, className = '', onClick, ...props }) {
    return (
        <div
            className={`${styles.card} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className = '' }) {
    return (
        <div className={`${styles.cardHeader} ${className}`}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className = '' }) {
    return (
        <h3 className={`${styles.cardTitle} ${className}`}>
            {children}
        </h3>
    );
}

export function CardContent({ children, className = '' }) {
    return (
        <div className={`${styles.cardContent} ${className}`}>
            {children}
        </div>
    );
}