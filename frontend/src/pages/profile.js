import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import Sidebar from '../components/Sidebar';
import Link from 'next/link';
import Image from 'next/image';
import api from '../api/axios';

import { FaHeart, FaClock, FaUtensils } from 'react-icons/fa';

export default function Profile() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
        const fetchProfileData = async () => {
            try {
                const profileResponse = await api.get('/profile');
                setProfile(profileResponse.data);

                const favoritesResponse = await api.get('/favorites');
                setFavorites(favoritesResponse.data);

                const recentlyViewedResponse = await api.get('/recentlyViewed');
                setRecentlyViewed(recentlyViewedResponse.data);

                const cookingHistoryResponse = await api.get('/cookingHistory');
                setCookingHistory(cookingHistoryResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProfileData();
    }, []);

    const toggleVisibility = async () => {
        const updatedVisibility = profile.account_settings.profile_visibility === 'public' ? 'private' : 'public';
        setProfile((prevProfile) => ({
            ...prevProfile,
            account_settings: {
                ...prevProfile.account_settings,
                profile_visibility: updatedVisibility,
            },
        }));
        try {
            await api.put('/profile/visibility', { profile_visibility: updatedVisibility });
        } catch (error) {
            console.error('Error updating visibility:', error);
        }
    };

    return (
        <div className="wrapper flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-col md:flex-row w-full p-4 justify-center space-y-4 md:space-y-0 bg-gray-50">
                {/* Sidebar Menu for Larger Screens */}
                <Sidebar isDropdownOpen={isDropdownOpen} toggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)} />

                {/* Main Content Area */}
                <div className="main-content max-w-3xl mx-auto p-4 space-y-8 bg-white rounded-lg shadow-lg">
                    {/* Personal Info Display */}
                    <div id="personal-info" className="p-6 bg-gradient-to-br from-primary-light to-white shadow-md rounded-lg mb-8">
                        <h1 className="text-3xl font-bold mb-4 text-gray-800">Personal Info</h1>
                        <div className="flex flex-col md:flex-row items-center md:space-x-6 mb-4">
                            <Image
                                src={profile.profileImage}
                                alt="Profile Pic"
                                className="rounded-full h-24 w-24 object-cover mb-4 md:mb-0"
                                width={96}
                                height={96}
                            />
                            <div className="flex flex-col space-y-2">
                                <p className="text-lg font-semibold text-gray-700">Name: {profile.username}</p>
                                <p className="text-lg text-gray-600">Email: {profile.email}</p>
                                <p className="text-lg text-gray-600">Bio: {profile.bio}</p>
                                <p className="text-lg text-gray-600">Phone: {profile.phoneNumber}</p>
                                <p className="text-lg text-gray-600">Receive SMS Notifications: {profile.account_settings?.receive_sms_notifications ? 'Yes' : 'No'}</p>
                                <div className="flex items-center space-x-2">
                                    <p className="text-lg text-gray-600">Profile Visibility: {profile.account_settings?.profile_visibility}</p>
                                    <button
                                        onClick={toggleVisibility}
                                        className="ml-4 px-2 py-1 border border-primary text-primary rounded hover:bg-primary-light transition"
                                    >
                                        Toggle Visibility
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Display for Favorites, Recently Viewed, and Cooking History */}
                    {renderSection("Favorites", favorites, "/favorites", FaHeart, "No favorite recipes yet? It’s time to show your taste buds some love! ❤️")}
                    {renderSection("Recently Viewed", recentlyViewed, "/recentlyViewed", FaClock, "Seems like you haven’t been exploring! Check out some recipes and we’ll keep track here ⏱️")}
                    {renderSection("Cooking History", cookingHistory, "/cookingHistory", FaUtensils, "Your kitchen adventures await! Start cooking and let’s fill up this history 🥘")}
                </div>
            </div>
            <Footer />
        </div>
    );
}

function renderSection(title, items, link, Icon, emptyMessage) {
    return (
        <div className="p-6 bg-white shadow-md rounded-lg mb-8 cursor-pointer transition duration-200 hover:shadow-xl hover:bg-gray-50">
            <div className="flex items-center mb-4">
                <Icon className="text-primary text-3xl mr-4" />
                <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
            </div>
            {items.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {items.slice(0, 3).map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">{emptyMessage}</p>
            )}
            <Link href={link}>
                <p className="text-primary mt-4 text-center font-semibold">See All {title}</p>
            </Link>
        </div>
    );
}
