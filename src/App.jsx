import {useContext} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {UserContext} from "./contexts/UserContext.jsx";

// PAGES
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import HomePage from './pages/Home/HomePage';
import {Layout} from './components/Layout/Layout';
import AccessDenied from './pages/AccessDenied/AccessDenied';
import SearchPage from './pages/Search/SearchPage';
import ResultsPage from './pages/Results/ResultsPage';
import CocktailDetailPage from './pages/CocktailDetail/CocktailDetailPage';
import RandomCocktailPage from './pages/RandomCocktail/RandomCocktailPage';
import CategoriesPage from './pages/Categories/CategoriesPage';
import FavoritesPage from './pages/Favorites/FavoritesPage';
import ProfilePage from './pages/Profile/ProfilePage';
import NotFound from "./components/NotFound/NotFound.jsx";

function App() {
    const {user, isLoading} = useContext(UserContext);

    // Protected route component


    return (
        <BrowserRouter>
            <Routes>
                {/* PUBLIC ROUTES */}
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/unauthorized" element={<AccessDenied/>}/>
                <Route path="/not-found" element={<NotFound/>}/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;