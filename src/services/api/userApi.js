import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Helper function to get headers
function getHeaders() {
    const token = localStorage.getItem('auth_token');
    console.log('[getHeaders] Building headers...');
    console.log('[getHeaders] Token exists:', !!token);
    console.log('[getHeaders] API_KEY exists:', !!API_KEY);

    const headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY,
        ...(token && {Authorization: `Bearer ${token}`})
    };

    console.log('[getHeaders] Final headers:', headers);
    return headers;
}

export const userApi = {

    /**
     * LOGIN - Adapted from your authenticateUser()
     * Returns: { token: string, user: object }
     * Throws: Error if login fails
     */

    async login(username, password) {
        console.log('═══════════════════════════════════════');
        console.log('[userApi.login] 🔐 STARTING LOGIN');
        console.log('[userApi.login] Username:', username);
        console.log('[userApi.login] Password length:', password?.length);
        console.log('[userApi.login] API_URL:', API_URL);

        try {
            console.log('[userApi.login] 📤 Sending POST request to:', `${API_URL}/users/authenticate`);

            const requestBody = {
                username,
                password
            };
            console.log('[userApi.login] Request body:', requestBody);

            const response = await axios.post(
                `${API_URL}/users/authenticate`,
                requestBody,
                {headers: getHeaders()}
            );

            console.log('[userApi.login] ✅ Response received!');
            console.log('[userApi.login] Response status:', response.status);
            console.log('[userApi.login] Response data (RAW):', response.data);
            console.log('[userApi.login] Response data keys:', Object.keys(response.data));

            // Check if JWT token exists in response
            const token = response.data.jwt;
            console.log('[userApi.login] 🔑 Extracting JWT token...');
            console.log('[userApi.login] Token exists:', !!token);
            console.log('[userApi.login] Token (first 20 chars):', token?.substring(0, 20) + '...');

            if (!token) {
                console.error('[userApi.login] ❌ NO JWT in response!');
                console.error('[userApi.login] Response data was:', response.data);
                throw new Error('No token received from server');
            }

            console.log('[userApi.login] 👤 Extracting user data...');
            console.log('[userApi.login] response.data.email:', response.data.email);
            console.log('[userApi.login] response.data.info (FAVORITES):', response.data.info);
            console.log('[userApi.login] response.data.authorities:', response.data.authorities);

            const userData = {
                username: username,
                email: response.data.email || '',
                info: response.data.info || '',
                authorities: response.data.authorities || []
            };

            console.log('[userApi.login] 📦 Constructed user object:', userData);
            console.log('[userApi.login] User has email?', !!userData.email);
            console.log('[userApi.login] User has favorites (info)?', !!userData.info);
            console.log('[userApi.login] Favorites value:', userData.info);

            const returnValue = {
                token: token,
                user: userData
            };

            console.log('[userApi.login] 🎉 Login successful! Returning:', returnValue);
            console.log('═══════════════════════════════════════');

            return returnValue;
        } catch (error) {
            console.error('═══════════════════════════════════════');
            console.error('[userApi.login] ❌ LOGIN FAILED!');
            console.error('[userApi.login] Error type:', error.constructor.name);
            console.error('[userApi.login] Error message:', error.message);
            console.error('[userApi.login] Error response status:', error.response?.status);
            console.error('[userApi.login] Error response data:', error.response?.data);
            console.error('[userApi.login] Full error:', error);
            console.error('═══════════════════════════════════════');
            throw error;
        }
    },

    /**
     * REGISTER - Adapted from your createUser()
     * Returns: registered user data
     * Throws: Error if registration fails
     */

    async register(username, email, password, info = '') {
        console.log('═══════════════════════════════════════');
        console.log('[userApi.register] 📝 STARTING REGISTRATION');
        console.log('[userApi.register] Username:', username);
        console.log('[userApi.register] Email:', email);
        console.log('[userApi.register] Password length:', password?.length);
        console.log('[userApi.register] Info (favorites):', info);

        try {
            const requestBody = {
                username,
                email,
                password,
                info,
                authorities: [{authority: 'USER'}]
            };

            console.log('[userApi.register] 📤 Request body:', requestBody);
            console.log('[userApi.register] Sending POST to:', `${API_URL}/users`);

            const response = await axios.post(
                `${API_URL}/users`,
                requestBody,
                {headers: getHeaders()}
            );

            console.log('[userApi.register] ✅ Response received!');
            console.log('[userApi.register] Response status:', response.status);
            console.log('[userApi.register] Response data:', response.data);
            console.log('[userApi.register] 🎉 Registration successful!');
            console.log('═══════════════════════════════════════');

            return response.data;
        } catch (error) {
            console.error('═══════════════════════════════════════');
            console.error('[userApi.register] ❌ REGISTRATION FAILED!');
            console.error('[userApi.register] Error:', error.response?.data || error.message);
            console.error('═══════════════════════════════════════');
            throw error;
        }
    },

    /**
     * GET USER BY USERNAME
     * Gets ALL user data including email and favorites
     * Returns: user data object
     * Throws: Error if user not found
     */

    async getUserByUsername(username) {
        console.log('═══════════════════════════════════════');
        console.log('[userApi.getUserByUsername] 👤 FETCHING USER DATA');
        console.log('[userApi.getUserByUsername] Username:', username);
        console.log('[userApi.getUserByUsername] Endpoint:', `${API_URL}/users/${username}`);

        try {
            console.log('[userApi.getUserByUsername] 📤 Sending GET request...');

            const response = await axios.get(
                `${API_URL}/users/${username}`,
                {headers: getHeaders()}
            );

            console.log('[userApi.getUserByUsername] ✅ Response received!');
            console.log('[userApi.getUserByUsername] Response status:', response.status);
            console.log('[userApi.getUserByUsername] Response data (RAW):', response.data);
            console.log('[userApi.getUserByUsername] Response data type:', typeof response.data);
            console.log('[userApi.getUserByUsername] Response data keys:', Object.keys(response.data));

            console.log('[userApi.getUserByUsername] 🔍 DESTRUCTURING USER DATA:');
            console.log('[userApi.getUserByUsername]   ├─ username:', response.data.username);
            console.log('[userApi.getUserByUsername]   ├─ email:', response.data.email);
            console.log('[userApi.getUserByUsername]   ├─ info (FAVORITES):', response.data.info);
            console.log('[userApi.getUserByUsername]   ├─ password:', response.data.password ? '[HIDDEN]' : 'undefined');
            console.log('[userApi.getUserByUsername]   └─ authorities:', response.data.authorities);

            console.log('[userApi.getUserByUsername] ✅ Email exists?', !!response.data.email);
            console.log('[userApi.getUserByUsername] ✅ Favorites (info) exists?', !!response.data.info);
            console.log('[userApi.getUserByUsername] 📊 Favorites value:', response.data.info);

            if (response.data.info) {
                console.log('[userApi.getUserByUsername] 🍹 Parsing favorites...');
                const favoritesArray = response.data.info.split(',').map(id => id.trim());
                console.log('[userApi.getUserByUsername] Favorites as array:', favoritesArray);
                console.log('[userApi.getUserByUsername] Number of favorites:', favoritesArray.length);
            } else {
                console.log('[userApi.getUserByUsername] ⚠️ NO FAVORITES FOUND (info is empty/null)');
            }

            console.log('[userApi.getUserByUsername] 🎉 Success! Returning user data');
            console.log('═══════════════════════════════════════');

            return response.data;
        } catch (error) {
            console.error('═══════════════════════════════════════');
            console.error('[userApi.getUserByUsername] ❌ FETCH FAILED!');
            console.error('[userApi.getUserByUsername] Error status:', error.response?.status);
            console.error('[userApi.getUserByUsername] Error data:', error.response?.data);
            console.error('[userApi.getUserByUsername] Error message:', error.message);
            console.error('═══════════════════════════════════════');
            throw error;
        }
    },

    /**
     * GET USER FAVORITES (Info Field)
     * Uses the /info endpoint to get ONLY the favorites string
     * Returns: string of comma-separated IDs
     * Throws: Error if user not found
     */

    async getUserFavorites(username) {
        console.log('═══════════════════════════════════════');
        console.log('[userApi.getUserFavorites] 🍹 FETCHING FAVORITES ONLY');
        console.log('[userApi.getUserFavorites] Username:', username);
        console.log('[userApi.getUserFavorites] Endpoint:', `${API_URL}/users/${username}/info`);

        try {
            console.log('[userApi.getUserFavorites] 📤 Sending GET request...');

            const response = await axios.get(
                `${API_URL}/users/${username}/info`,
                {headers: getHeaders()}
            );

            console.log('[userApi.getUserFavorites] ✅ Response received!');
            console.log('[userApi.getUserFavorites] Response status:', response.status);
            console.log('[userApi.getUserFavorites] Response data (RAW):', response.data);
            console.log('[userApi.getUserFavorites] Response data type:', typeof response.data);
            console.log('[userApi.getUserFavorites] Favorites string:', response.data);

            if (response.data) {
                const favoritesArray = response.data.split(',').map(id => id.trim());
                console.log('[userApi.getUserFavorites] 🍹 Favorites as array:', favoritesArray);
                console.log('[userApi.getUserFavorites] Number of favorites:', favoritesArray.length);
            } else {
                console.log('[userApi.getUserFavorites] ⚠️ No favorites found');
            }

            console.log('[userApi.getUserFavorites] 🎉 Success! Returning favorites');
            console.log('═══════════════════════════════════════');

            return response.data;
        } catch (error) {
            console.error('═══════════════════════════════════════');
            console.error('[userApi.getUserFavorites] ❌ FETCH FAILED!');
            console.error('[userApi.getUserFavorites] Error:', error.response?.status, error.response?.data);
            console.error('═══════════════════════════════════════');
            throw error;
        }
    },

    /**
     * UPDATE USER PROFILE
     * Updates user data including favorites list
     * Returns: updated user data
     * Throws: Error if update fails
     */

    async updateUserProfile(queriedUsername, newUsername, newEmail, newPassword, newInfo) {
        console.log('═══════════════════════════════════════');
        console.log('[userApi.updateUserProfile] 📝 UPDATING USER PROFILE');
        console.log('[userApi.updateUserProfile] Queried username:', queriedUsername);
        console.log('[userApi.updateUserProfile] New username:', newUsername);
        console.log('[userApi.updateUserProfile] New email:', newEmail);
        console.log('[userApi.updateUserProfile] New password:', newPassword ? '[PROVIDED]' : '[NOT PROVIDED]');
        console.log('[userApi.updateUserProfile] New info (favorites):', newInfo);

        try {
            const requestBody = {
                username: newUsername,
                email: newEmail,
                password: newPassword,
                info: newInfo,
                authorities: [
                    {
                        authority: "USER"
                    }
                ]
            };

            console.log('[userApi.updateUserProfile] 📤 Request body:', requestBody);
            console.log('[userApi.updateUserProfile] Sending PUT to:', `${API_URL}/users/${queriedUsername}`);

            const response = await axios.put(
                `${API_URL}/users/${queriedUsername}`,
                requestBody,
                {headers: getHeaders()}
            );

            console.log('[userApi.updateUserProfile] ✅ Response received!');
            console.log('[userApi.updateUserProfile] Response status:', response.status);
            console.log('[userApi.updateUserProfile] Response data:', response.data);
            console.log('[userApi.updateUserProfile] Updated user email:', response.data.email);
            console.log('[userApi.updateUserProfile] Updated user info (favorites):', response.data.info);
            console.log('[userApi.updateUserProfile] 🎉 Update successful!');
            console.log('═══════════════════════════════════════');

            return response.data;
        } catch (error) {
            console.error('═══════════════════════════════════════');
            console.error('[userApi.updateUserProfile] ❌ UPDATE FAILED!');
            console.error('[userApi.updateUserProfile] Error:', error.response?.data || error.message);
            console.error('═══════════════════════════════════════');
            throw error;
        }
    },

    /**
     * UPDATE FAVORITES
     * Sends list of favorite cocktail IDs to backend
     * Returns: updated user data
     * Throws: Error if update fails
     */

    async updateUserFavorites(username, favoriteIds) {
        console.log('═══════════════════════════════════════');
        console.log('[userApi.updateUserFavorites] 🍹 UPDATING FAVORITES');
        console.log('[userApi.updateUserFavorites] Username:', username);
        console.log('[userApi.updateUserFavorites] New favorites (raw):', favoriteIds);
        console.log('[userApi.updateUserFavorites] Favorites type:', typeof favoriteIds);

        try {
            // Get current user data to preserve other fields
            console.log('[userApi.updateUserFavorites] 📥 STEP 1: Getting current user data...');
            const currentUser = await this.getUserByUsername(username);

            console.log('[userApi.updateUserFavorites] Current user data received:');
            console.log('[userApi.updateUserFavorites]   ├─ username:', currentUser.username);
            console.log('[userApi.updateUserFavorites]   ├─ email:', currentUser.email);
            console.log('[userApi.updateUserFavorites]   ├─ OLD info (favorites):', currentUser.info);
            console.log('[userApi.updateUserFavorites]   └─ authorities:', currentUser.authorities);

            const requestBody = {
                username: currentUser.username,
                email: currentUser.email,
                password: currentUser.password,
                info: favoriteIds,  // NEW favorites
                authorities: currentUser.authorities || [{authority: "USER"}]
            };

            console.log('[userApi.updateUserFavorites] 📤 STEP 2: Sending update...');
            console.log('[userApi.updateUserFavorites] Request body:', requestBody);
            console.log('[userApi.updateUserFavorites] OLD favorites:', currentUser.info);
            console.log('[userApi.updateUserFavorites] NEW favorites:', favoriteIds);

            const response = await axios.put(
                `${API_URL}/users/${username}`,
                requestBody,
                {headers: getHeaders()}
            );

            console.log('[userApi.updateUserFavorites] ✅ Response received!');
            console.log('[userApi.updateUserFavorites] Response status:', response.status);
            console.log('[userApi.updateUserFavorites] Response data:', response.data);
            console.log('[userApi.updateUserFavorites] Updated info (favorites):', response.data.info);

            if (response.data.info) {
                const favoritesArray = response.data.info.split(',').map(id => id.trim());
                console.log('[userApi.updateUserFavorites] 🍹 Favorites now:', favoritesArray);
                console.log('[userApi.updateUserFavorites] Number of favorites:', favoritesArray.length);
            }

            console.log('[userApi.updateUserFavorites] 🎉 Favorites updated successfully!');
            console.log('═══════════════════════════════════════');

            return response.data;
        } catch (error) {
            console.error('═══════════════════════════════════════');
            console.error('[userApi.updateUserFavorites] ❌ UPDATE FAVORITES FAILED!');
            console.error('[userApi.updateUserFavorites] Error:', error.response?.data || error.message);
            console.error('═══════════════════════════════════════');
            throw error;
        }
    }
};