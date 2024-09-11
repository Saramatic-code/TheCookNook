import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';

export default function OldFavorites() {
    const router = useRouter();
    const [oldFavorites, setOldFavorites] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for mobile dropdown menu

    useEffect(() => {
        // Fetch favorites and old favorites from localStorage
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const storedOldFavorites = JSON.parse(localStorage.getItem('oldFavorites')) || [];

        // Filter oldFavorites to include only those not in current favorites
        const unfavoredRecipes = storedOldFavorites.filter(
            (oldFavRecipe) => !storedFavorites.some((favRecipe) => favRecipe.id === oldFavRecipe.id)
        );

        setOldFavorites(unfavoredRecipes);
    }, []);

    // Close the sidebar when the route changes
    useEffect(() => {
        const handleRouteChange = () => {
            setIsDropdownOpen(false);
        };

        router.events.on('routeChangeStart', handleRouteChange);
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router]);

    return (
        <div className="wrapper flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-col md:flex-row w-full p-4 justify-center relative space-y-4 md:space-y-0">
                {/* Dropdown Menu for Small Screens */}
                <div className="md:hidden w-full p-4">
                    <button
                        className="p-2 bg-gray-100 text-gray-700 rounded-lg shadow-md w-full text-left flex justify-between"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        Profile Settings
                        <span>{isDropdownOpen ? '▲' : '▼'}</span>
                    </button>
                    {isDropdownOpen && (
                        <ul className="bg-gray-100 mt-2 rounded-lg shadow-md p-2">
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="/profile#personal-info" className="hover:text-primary">Personal Info</a>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="/favorites" className="hover:text-primary">Favorites</a>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="/recentlyViewed" className="hover:text-primary">Recently Viewed</a>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="/savedRecipes" className="hover:text-primary">Saved Recipes</a>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="/cookingHistory" className="hover:text-primary">Cooking History</a>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="/editProfile" className="hover:text-primary">Edit Profile</a>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="/oldFavorites" className="hover:text-primary">Old Favorites</a>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="/logout" className="hover:text-primary">Logout</a>
                            </li>
                        </ul>
                    )}
                </div>

                {/* Sidebar Menu for Larger Screens */}
                <div className="hidden md:block sidebar p-4 bg-gray-100 w-1/4 mr-8 rounded-lg shadow-sm sticky top-16 h-full">
                    <h2 className="font-semibold text-lg mb-4">Profile Settings</h2>
                    <ul className="space-y-2">
                        <li className="cursor-pointer">
                            <a href="/profile#personal-info" className="hover:text-primary">Personal Info</a>
                        </li>
                        <li className="cursor-pointer">
                            <a href="/favorites" className="hover:text-primary">Favorites</a>
                        </li>
                        <li className="cursor-pointer">
                            <a href="/recentlyViewed" className="hover:text-primary">Recently Viewed</a>
                        </li>
                        <li className="cursor-pointer">
                            <a href="/savedRecipes" className="hover:text-primary">Saved Recipes</a>
                        </li>
                        <li className="cursor-pointer">
                            <a href="/cookingHistory" className="hover:text-primary">Cooking History</a>
                        </li>
                        <li className="cursor-pointer">
                            <a href="/editProfile" className="hover:text-primary">Edit Profile</a>
                        </li>
                        <li className="cursor-pointer">
                            <a href="/oldFavorites" className="hover:text-primary">Old Favorites</a>
                        </li>
                        <li className="cursor-pointer">
                            <a href="/logout" className="hover:text-primary">Logout</a>
                        </li>
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className="main-content flex-1 max-w-3xl p-6 text-[#696969] bg-white rounded-lg shadow-md space-y-6">
                    <h1 className="text-3xl font-bold mb-6 text-center">Old Favorites</h1>
                    {oldFavorites.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {oldFavorites.map((recipe) => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-lg mt-6">No old favorite recipes found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
