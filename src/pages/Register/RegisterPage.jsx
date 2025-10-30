// src/pages/Register/RegisterPage.jsx
import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUser } from '../../hooks/useUser.js';
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
    const { register: registerUser, login } = useUser();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        shouldFocusError: true,
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            dob: "",
        },
    });

    // Helper: check if date string (YYYY-MM-DD) is >= 18 years old from today
    function isAtLeast18(dateString) {
        if (!dateString) return false;
        let parts = dateString.split("-");
        let y = parseInt(parts[0], 10);
        let m = parseInt(parts[1], 10);
        let d = parseInt(parts[2], 10);
        if (isNaN(y) || isNaN(m) || isNaN(d)) return false;
        let dob = new Date(y, m - 1, d);
        let today = new Date();
        let eighteen = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        return dob <= eighteen;
    }

    function validateEmail(value) {
        return /\S+@\S+\.\S+/.test(value) || "Enter a valid email";
    }

    function validateDOB(value) {
        return isAtLeast18(value) || "You must be at least 18";
    }

    function validateConfirmPassword(value) {
        return value === watch("password") || "Passwords do not match";
    }

    // Called when the form is valid
    async function onSubmit(data) {
        console.log('[RegisterPage] Starting registration...');

        try {
            // Register user (info field empty for now)
            await registerUser(data.username, data.email, data.password, "");
            console.log('[RegisterPage] Registration successful, now logging in...');

            // Automatically log them in
            await login(data.username, data.password);
            console.log('[RegisterPage] Login successful, navigating to /home');

            navigate('/home');
        } catch (error) {
            console.error('[RegisterPage] Registration/login failed:', error);

            // Show the actual backend error message
            const errorMessage = error.response?.data?.message || error.response?.data || error.message || 'Registration failed';
            alert('Registration failed: ' + errorMessage);
        }
    }

    // Called when the form is invalid (on submit)
    function onInvalid(formErrors) {
        const messages = Object.keys(formErrors).map((key) => {
            const e = formErrors[key];
            return e && e.message ? e.message : `${key} is invalid`;
        });
        alert(messages.join("\n"));
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.box}>
                <h2 className={styles.registerTitle}>
                    Create your account
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit, onInvalid)}
                    noValidate
                    className={styles.registerForm}
                >
                    {/* Email */}
                    <input
                        id="email"
                        className={styles.inputField}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="Email"
                        aria-invalid={errors.email ? "true" : "false"}
                        {...register("email", {
                            required: "Email is required",
                            validate: validateEmail,
                        })}
                    />

                    {/* Username */}
                    <input
                        id="username"
                        className={styles.inputField}
                        type="text"
                        autoComplete="username"
                        placeholder="Username"
                        aria-invalid={errors.username ? "true" : "false"}
                        {...register("username", {
                            required: "Username is required",
                        })}
                    />

                    {/* Password */}
                    <input
                        id="password"
                        className={styles.inputField}
                        type="password"
                        autoComplete="new-password"
                        placeholder="Password"
                        aria-invalid={errors.password ? "true" : "false"}
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />

                    {/* Confirm Password */}
                    <input
                        id="confirmPassword"
                        className={styles.inputField}
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirm password"
                        aria-invalid={errors.confirmPassword ? "true" : "false"}
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: validateConfirmPassword,
                        })}
                    />

                    {/* Date of Birth */}
                    <input
                        id="dob"
                        className={styles.inputField}
                        type="date"
                        placeholder="YYYY-MM-DD"
                        aria-invalid={errors.dob ? "true" : "false"}
                        {...register("dob", {
                            required: "Date of birth is required",
                            validate: validateDOB,
                        })}
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.loginButton}
                    >
                        {isSubmitting ? "Submitting..." : "Create account"}
                    </button>

                    <div className={styles.sendoff}>
                        <p>
                            Already registered? <NavLink to="/">Sign in</NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}