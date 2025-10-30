import styles from './Button.module.css';

export function Button({
                           onClick,
                           children,
                           type = 'button',
                           variant = 'primary',
                           disabled = false,
                           className = ''
                       }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${styles.button} ${styles[variant]} ${className} ${
                disabled ? styles.disabled : ''
            }`}
        >
            {children}
        </button>
    );
}