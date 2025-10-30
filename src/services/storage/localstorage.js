// src/services/storage/localStorage.js

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

/**
 * Token Management
 */
export function saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function hasToken() {
    return !!localStorage.getItem(TOKEN_KEY);
}

/**
 * User Data Management
 */

export function saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
    const data = localStorage.getItem(USER_KEY);
    try {
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Failed to parse user data:', error);
        return null;
    }
}

export function removeUser() {
    localStorage.removeItem(USER_KEY);
}

export function hasUser() {
    return !!localStorage.getItem(USER_KEY);
}