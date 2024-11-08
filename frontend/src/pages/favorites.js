// src/pages/favorites.js
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import Sidebar from '../components/Sidebar';
import Image from 'next/image';
import api from '../api/axios';

export default function Favorites() {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        // Fetch favorite recipes from the backend API
        const fetchFavorites = async () => {
            try {
                const response = await api.get('/user/favorites'); // Adjust to your actual endpoint
                setFavoriteRecipes(response.data); // Assuming response data is an array of favorite recipes
            } catch (error) {
                console.error('Error fetching favorite recipes:', error);
            }
        };

        // Initial fetch of favorites
        fetchFavorites();
    }, []);

    const handleFavoriteChange = (id, isFavorite) => {
        if (!isFavorite) {
            setFavoriteRecipes((prevFavorites) =>
                prevFavorites.filter((recipe) => recipe.id !== id)
            );
        }
    };

    return (
        <div className="wrapper flex flex-col min-h-screen bg-pink-100">
            <Navbar />
            <div className="flex flex-col md:flex-row w-full p-4 justify-center space-y-4 md:space-y-0">

                {/* Sidebar Component */}
                <Sidebar
                    isDropdownOpen={isDropdownOpen}
                    toggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="md:w-64 w-full md:mr-8 sticky top-24"
                />

                {/* Main Content Area with Recipe Grid */}
                <div className="flex-1 max-w-6xl mx-auto p-6 text-[#696969] space-y-6">
                    <h1 className="text-3xl font-bold text-center mb-8 text-[#696969]">My Favorite Recipes</h1>

                    {favoriteRecipes.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {favoriteRecipes.map((recipe) => (
                                <RecipeCard key={recipe.id} recipe={recipe} onFavoriteChange={handleFavoriteChange} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-4">
                            <p className="text-center text-lg mt-4 text-[#696969]">
                                Your favorites list is currently empty! Add some tasty recipes to your favorites for quick access. 🌮🍜🍕
                            </p>
                            <Image
                                src="/image_emptypg.png"
                                alt="No favorite recipes"
                                width={500}
                                height={500}
                                className="rounded-3xl opacity-80 max-w-full md:max-w-2xl"
                            />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
