import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';

export default function CookingHistory() {
    const router = useRouter();
    const [cookingHistory, setCookingHistory] = useState([]);

    useEffect(() => {
        // Fetch cooking history from localStorage
        const storedCookingHistory = JSON.parse(localStorage.getItem('cookingHistory')) || [];
        setCookingHistory(storedCookingHistory);
    }, []);

    const handleBack = () => {
        router.push('/profile');
    };

    return (
        <div className="wrapper flex">
            <Navbar />
            <div className="flex flex-row w-full p-4 justify-center">
                {/* Sidebar Menu */}
                <div className="sidebar p-4 bg-gray-100 w-1/6 mr-8 rounded-lg shadow-sm sticky top-16 h-full">
                    <h2 className="font-semibold text-lg mb-4">Profile Settings</h2>
                    <ul>
                        <li className="mb-2 cursor-pointer">
                            <button onClick={handleBack} className="text-blue-500 hover:underline">← Back to Profile</button>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <a href="/profile#personal-info">Personal Info</a>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <a href="/favorites">Favorites</a>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <a href="/recentlyViewed">Recently Viewed</a>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <a href="/savedRecipes">Saved Recipes</a>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <a href="/cookingHistory">Cooking History</a>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <a href="/accountSettings">Account Settings</a>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <a href="/logout">Logout</a>
                        </li>
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className="main-content max-w-xl mx-auto p-6 text-[#696969] bg-white rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-6">Cooking History</h1>
                    {cookingHistory.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {cookingHistory.map((recipe) => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))}
                        </div>
                    ) : (
                        <p>No cooking history found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
