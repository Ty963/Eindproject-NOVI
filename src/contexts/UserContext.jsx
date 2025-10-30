import { createContext, useState, useEffect } from 'react';
import { userApi } from '../services/api/userApi';
import * as storage from '../services/storage/localStorage';
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = storage.getToken();
            console.log('[UserContext] Checking authentication...');
            console.log('[UserContext] Token exists:', !!token);

            if (token) {
                try {
                    // Decode JWT to extract username
                    console.log('[UserContext] 🔍 Decoding JWT token...');
                    const decoded = jwtDecode(token);
                    console.log('[UserContext] Decoded token payload:', decoded);

                    const username = decoded.sub;
                    console.log('[UserContext] Extracted username from JWT:', username);

                    if (!username) {
                        console.error('[UserContext] ❌ No username (sub) in JWT token!');
                        throw new Error('Invalid token structure - no username');
                    }

                    // Fetch ALL user data from backend using username from JWT
                    console.log('[UserContext] 📤 Fetching user data from backend...');
                    console.log('[UserContext] Calling: GET /users/' + username);

                    const userData = await userApi.getUserByUsername(username);

                    console.log('[UserContext] ✅ Successfully fetched user data:', userData);
                    console.log('[UserContext] User details:');
                    console.log('[UserContext]   ├─ username:', userData.username);
                    console.log('[UserContext]   ├─ email:', userData.email);
                    console.log('[UserContext]   ├─ info (favorites):', userData.info);
                    console.log('[UserContext]   └─ authorities:', userData.authorities);

                    // Store EVERYTHING in context (memory) ONLY
                    // NOTHING goes to localStorage except JWT
                    setUser(userData);

                    console.log('[UserContext] 🔒 ALL user data stored in memory (context) only');
                    console.log('[UserContext] 🔒 localStorage contains ONLY JWT token');
                    console.log('[UserContext] ✅ Login session persisted via JWT');
                } catch (err) {
                    console.error('[UserContext] ❌ Auth check failed:', err.message);
                    console.error('[UserContext] Full error:', err);
                    // Token might be expired or invalid
                    console.log('[UserContext] Removing invalid token...');
                    storage.removeToken();
                    setUser(null);
                }
            } else {
                console.log('[UserContext] ⚠️ No JWT token found - user not logged in');
                setUser(null);
            }
        } catch (error) {
            console.error('[UserContext] Auth check error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
            console.log('[UserContext] Auth check complete');
        }
    };

    const login = async (username, password) => {
        setError(null);

        try {
            console.log('[UserContext] Logging in:', username);

            // Call login API
            const { token, user: userData } = await userApi.login(username, password);

            console.log('[UserContext] Login response user data:', userData);
            console.log('[UserContext] User info field (favorites):', userData.info);
            console.log('[UserContext] User email:', userData.email);

            // Store ONLY JWT token in localStorage
            storage.saveToken(token);

            console.log('[UserContext] 🔒 ONLY JWT token saved to localStorage');
            console.log('[UserContext] 🔒 NO user data in localStorage');
            console.log('[UserContext] ✅ User data stored in context (memory) only');

            // Update state with full data (context/memory only)
            setUser(userData);

            console.log('[UserContext] Login successful');
            return userData;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed';
            console.error('[UserContext] Login failed:', errorMessage);
            setError(errorMessage);
            throw err;
        }
    };

    const register = async (username, email, password, info = '') => {
        setError(null);

        try {
            console.log('[UserContext] Registering:', username);

            // Register the user
            await userApi.register(username, email, password, info);

            console.log('[UserContext] Registration successful');
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed';
            console.error('[UserContext] Registration failed:', errorMessage);
            setError(errorMessage);
            throw err;
        }
    };

    const logout = () => {
        console.log('[UserContext] Logging out');

        // Clear ONLY JWT token from localStorage
        storage.removeToken();

        // NOTE: No removeUser() call because we never saved user data!

        // Clear state (memory)
        setUser(null);
        setError(null);

        console.log('[UserContext] 🔒 JWT token removed from localStorage');
        console.log('[UserContext] ✅ User data cleared from memory');
    };

    const updateUser = (updatedUserData) => {
        console.log('[UserContext] Updating user data');
        console.log('[UserContext] Previous user.info:', user?.info);
        console.log('[UserContext] New user.info:', updatedUserData.info);
        console.log('[UserContext] Email in update:', updatedUserData.email);

        // Update state (memory) ONLY - no localStorage!
        setUser(updatedUserData);

        console.log('[UserContext] 🔒 User data updated in memory only');
        console.log('[UserContext] 🔒 NO localStorage update (JWT only in localStorage)');
        console.log('[UserContext] User updated successfully');
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateUser,
        checkAuth
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}