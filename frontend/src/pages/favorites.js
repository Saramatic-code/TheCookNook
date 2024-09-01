import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';

export default function Favorites() {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    useEffect(() => {
        const fetchFavorites = () => {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            setFavoriteRecipes(favorites);
        };

        // Initial fetch of favorites
        fetchFavorites();

        // Update favorites whenever the localStorage changes
        window.addEventListener('storage', fetchFavorites);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('storage', fetchFavorites);
    }, []);

    return (
        <div className="wrapper">
            <Navbar />
            <div className="main-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {favoriteRecipes.length > 0 ? (
                    favoriteRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))
                ) : (
                    <p className="text-center text-[#696969]">No favorite recipes found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}
