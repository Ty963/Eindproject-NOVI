import axios from 'axios';

const COCKTAIL_API_URL = import.meta.env.VITE_COCKTAIL_API;

export const cocktailApi = {
    /**
     * SEARCH BY NAME - Adapted from your axiosFetchInformation("name", query)
     * Returns: array of cocktails matching name
     * Throws: Error if search fails
     */
    async searchByName(name) {
        console.log('[cocktailApi.searchByName] Searching for:', name);

        try {
            const response = await axios.get(
                `${COCKTAIL_API_URL}/search.php?s=${encodeURIComponent(name)}`
            );

            const drinks = response.data.drinks || [];
            console.log('[cocktailApi.searchByName] Found:', drinks.length, 'results');
            return drinks;
        } catch (error) {
            console.error('[cocktailApi.searchByName] Failed:', error.message);
            throw error;
        }
    },

    /**
     * SEARCH BY INGREDIENT - Adapted from your axiosFetchSimpleData("ingredient", query)
     * Returns: array of cocktails with this ingredient
     * Throws: Error if search fails
     */

    async searchByIngredient(ingredient) {
        console.log('[cocktailApi.searchByIngredient] Searching for:', ingredient);

        try {
            const response = await axios.get(
                `${COCKTAIL_API_URL}/filter.php?i=${encodeURIComponent(ingredient)}`
            );

            const drinks = response.data.drinks || [];
            console.log('[cocktailApi.searchByIngredient] Found:', drinks.length, 'results');
            return drinks;
        } catch (error) {
            console.error('[cocktailApi.searchByIngredient] Failed:', error.message);
            throw error;
        }
    },

    /**
     * GET BY CATEGORY - Adapted from your axiosFetchSimpleData("category", query)
     * Returns: array of cocktails in this category
     * Throws: Error if search fails
     */

    async getByCategory(category) {
        console.log('[cocktailApi.getByCategory] Getting category:', category);

        try {
            const response = await axios.get(
                `${COCKTAIL_API_URL}/filter.php?c=${encodeURIComponent(category)}`
            );

            const drinks = response.data.drinks || [];
            console.log('[cocktailApi.getByCategory] Found:', drinks.length, 'results');
            return drinks;
        } catch (error) {
            console.error('[cocktailApi.getByCategory] Failed:', error.message);
            throw error;
        }
    },

    /**
     * GET BY ID - Adapted from your axiosFetchInformation("id", query)
     * Returns: single cocktail object with full details
     * Throws: Error if cocktail not found
     */

    async getById(id) {
        console.log('[cocktailApi.getById] Fetching ID:', id);

        try {
            const response = await axios.get(
                `${COCKTAIL_API_URL}/lookup.php?i=${id}`
            );

            const drink = response.data.drinks?.[0];
            if (!drink) {
                console.warn('[cocktailApi.getById] No drink found for ID:', id);
                return null;
            }

            console.log('[cocktailApi.getById] Found:', drink.strDrink);
            return drink;
        } catch (error) {
            console.error('[cocktailApi.getById] Failed:', error.message);
            throw error;
        }
    },

    /**
     * GET RANDOM COCKTAIL - Adapted from your fetchRandomItem()
     * Returns: single random cocktail with full details
     * Throws: Error if request fails
     */

    async getRandomCocktail() {
        console.log('[cocktailApi.getRandomCocktail] Fetching random cocktail...');

        try {
            const response = await axios.get(
                `${COCKTAIL_API_URL}/random.php`
            );

            const drink = response.data.drinks?.[0];
            if (!drink) {
                console.error('[cocktailApi.getRandomCocktail] Invalid response format');
                throw new Error('Invalid API response format');
            }

            console.log('[cocktailApi.getRandomCocktail] Got:', drink.strDrink);
            return drink;
        } catch (error) {
            console.error('[cocktailApi.getRandomCocktail] Failed:', error.message);
            throw error;
        }
    },

    /**
     * GET CATEGORIES - Adapted from your axiosFetchCategories()
     * Returns: array of category names
     * Throws: Error if request fails
     */
    
    async getCategories() {
        console.log('[cocktailApi.getCategories] Fetching categories...');

        try {
            const response = await axios.get(
                `${COCKTAIL_API_URL}/list.php?c=list`
            );

            const drinks = response.data.drinks || [];
            const categories = drinks.map(item => item.strCategory);

            console.log('[cocktailApi.getCategories] Found:', categories.length, 'categories');
            return categories;
        } catch (error) {
            console.error('[cocktailApi.getCategories] Failed:', error.message);
            throw error;
        }
    }
};