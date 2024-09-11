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

    const handleFavoriteChange = (id, isFavorite) => {
        if (!isFavorite) {
            setFavoriteRecipes((prevFavorites) =>
                prevFavorites.filter((recipe) => recipe.id !== id)
            );
        }
    };

    return (
        <div className="wrapper flex flex-col min-h-screen">
            <Navbar />
            <div className="main-content flex-1 max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-[#696969]">My Favorite Recipes</h1>
                {favoriteRecipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favoriteRecipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} onFavoriteChange={handleFavoriteChange} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-lg text-[#696969] mt-10">No favorite recipes found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}
