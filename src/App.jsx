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
import NotFound from "./pages/NotFound/NotFound.jsx";

function App() {
    const {user, isLoading} = useContext(UserContext);

    // Protected route component
    function ProtectedRoute({element}) {
        if (isLoading) {
            return <div>Loading...</div>;
        }
        return user ? element : <Navigate to="/unauthorized"/>;
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* PUBLIC ROUTES */}
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/unauthorized" element={<AccessDenied/>}/>
                <Route path="/not-found" element={<NotFound/>}/>

                {/* PROTECTED ROUTES */}
                <Route path="/home" element={<ProtectedRoute element={<Layout><HomePage/></Layout>}/>}/>
                <Route path="/search" element={<ProtectedRoute element={<Layout><SearchPage/></Layout>}/>}/>
                <Route path="/results" element={<ProtectedRoute element={<Layout><ResultsPage/></Layout>}/>}/>
                <Route path="/cocktail/:id"
                       element={<ProtectedRoute element={<Layout><CocktailDetailPage/></Layout>}/>}/>
                <Route path="/random" element={<ProtectedRoute element={<Layout><RandomCocktailPage/></Layout>}/>}/>
                <Route path="/categories" element={<ProtectedRoute element={<Layout><CategoriesPage/></Layout>}/>}/>
                <Route path="/favorites" element={<ProtectedRoute element={<Layout><FavoritesPage/></Layout>}/>}/>
                <Route path="/profile" element={<ProtectedRoute element={<Layout><ProfilePage/></Layout>}/>}/>

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/not-found"/>}/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;