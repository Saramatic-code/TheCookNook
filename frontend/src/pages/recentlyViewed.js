// src/pages/recentlyViewed.js
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import Sidebar from '../components/Sidebar';
import Image from 'next/image';

export default function RecentlyViewed() {
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const storedRecentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

        // Remove duplicates by `id`
        const uniqueRecentlyViewed = storedRecentlyViewed.filter(
            (recipe, index, self) =>
                index === self.findIndex((r) => r.id === recipe.id)
        );

        setRecentlyViewed(uniqueRecentlyViewed);
    }, []);

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
                    <h1 className="text-3xl font-bold text-center mb-8 text-[#696969]">Recently Viewed Recipes</h1>

                    {recentlyViewed.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recentlyViewed.map((recipe) => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-4">
                            <p className="text-center text-lg mt-4 text-[#696969]">
                                Oops! Looks like you haven't been browsing much. Dive in and explore some delicious recipes! 🍲🥗🍕
                            </p>
                            <Image
                                src="/image_emptypg.png"
                                alt="No recently viewed recipes"
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
