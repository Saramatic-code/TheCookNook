import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';

export default function Profile() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        bio: '',
        phoneNumber: '',
        profileImage: '/default-profile.png',
        account_settings: {
            receive_sms_notifications: true,
            profile_visibility: 'public',
        },
    });
    const [favorites, setFavorites] = useState([]);
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [cookingHistory, setCookingHistory] = useState([]);

    useEffect(() => {
        // Fetch profile data from localStorage
        const storedProfile = JSON.parse(localStorage.getItem('profile')) || {};
        setProfile({
            ...profile,
            ...storedProfile,
            account_settings: {
                ...profile.account_settings,
                ...(storedProfile.account_settings || {}),
            },
        });

        // Fetch other data from localStorage
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);

        const storedRecentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        setRecentlyViewed(storedRecentlyViewed);

        const storedCookingHistory = JSON.parse(localStorage.getItem('cookingHistory')) || [];
        setCookingHistory(storedCookingHistory);
    }, []);

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
                                <a href="#personal-info" className="hover:text-primary">Personal Info</a>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="#favorites" className="hover:text-primary">Favorites</a>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="#recentlyViewed" className="hover:text-primary">Recently Viewed</a>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="#cookingHistory" className="hover:text-primary">Cooking History</a>
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
                            <a href="#personal-info" className="hover:text-primary">Personal Info</a>
                        </li>
                        <li className="cursor-pointer">
                            <a href="#favorites" className="hover:text-primary">Favorites</a>
                        </li>
                        <li className="cursor-pointer">
                            <a href="#recentlyViewed" className="hover:text-primary">Recently Viewed</a>
                        </li>
                        <li className="cursor-pointer">
                            <a href="#cookingHistory" className="hover:text-primary">Cooking History</a>
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
                <div className="main-content max-w-3xl mx-auto p-4 space-y-8">
                    {/* Personal Info Display */}
                    <div id="personal-info" className="p-6 bg-white shadow-md rounded-lg mb-8">
                        <h1 className="text-3xl font-bold mb-4">Personal Info</h1>
                        <div className="flex flex-col md:flex-row items-center md:space-x-6 mb-4">
                            <img
                                src={profile.profileImage}
                                alt="Profile Pic"
                                className="rounded-full h-24 w-24 object-cover mb-4 md:mb-0"
                            />
                            <div className="flex flex-col space-y-2">
                                <p className="text-lg font-semibold">Name: {profile.username}</p>
                                <p className="text-lg">Email: {profile.email}</p>
                                <p className="text-lg">Bio: {profile.bio}</p>
                                <p className="text-lg">Phone: {profile.phoneNumber}</p>
                                <p className="text-lg">Receive SMS Notifications: {profile.account_settings?.receive_sms_notifications ? 'Yes' : 'No'}</p>
                                <p className="text-lg">Profile Visibility: {profile.account_settings?.profile_visibility}</p>
                            </div>
                        </div>
                    </div>

                    {/* Favorites */}
                    <div id="favorites" className="p-6 bg-white shadow-md rounded-lg mb-8">
                        <h1 className="text-3xl font-bold mb-4">Favorites</h1>
                        {favorites.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {favorites.map((recipe) => (
                                    <RecipeCard key={recipe.id} recipe={recipe} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center">No favorite recipes found.</p>
                        )}
                    </div>

                    {/* Recently Viewed */}
                    <div id="recentlyViewed" className="p-6 bg-white shadow-md rounded-lg mb-8">
                        <h1 className="text-3xl font-bold mb-4">Recently Viewed</h1>
                        {recentlyViewed.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {recentlyViewed.map((recipe) => (
                                    <RecipeCard key={recipe.id} recipe={recipe} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center">No recently viewed recipes found.</p>
                        )}
                    </div>

                    {/* Cooking History */}
                    <div id="cookingHistory" className="p-6 bg-white shadow-md rounded-lg mb-8">
                        <h1 className="text-3xl font-bold mb-4">Cooking History</h1>
                        {cookingHistory.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cookingHistory.map((recipe) => (
                                    <RecipeCard key={recipe.id} recipe={recipe} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center">No cooking history found.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
