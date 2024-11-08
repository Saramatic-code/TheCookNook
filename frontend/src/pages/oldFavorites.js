// src/pages/oldFavorites.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import Sidebar from '../components/Sidebar';
import Image from 'next/image';

export default function OldFavorites() {
    const router = useRouter();
    const [oldFavorites, setOldFavorites] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        // Fetch old favorites and filter out current favorites
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const storedOldFavorites = JSON.parse(localStorage.getItem('oldFavorites')) || [];

        const unfavoredRecipes = storedOldFavorites.filter(
            (oldFavRecipe) => !storedFavorites.some((favRecipe) => favRecipe.id === oldFavRecipe.id)
        );

        setOldFavorites(unfavoredRecipes);
    }, []);

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
        <div className="wrapper flex flex-col min-h-screen bg-pink-100"> {/* Light pink background */}
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
                    <h1 className="text-3xl font-bold text-center mb-8 text-[#696969]">Old Favorites</h1>

                    {oldFavorites.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {oldFavorites.map((recipe) => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-4">
                            <p className="text-center text-lg mt-4 text-[#696969]">
                                No old favorites yet! Maybe you're just too loyal to your current recipes! 🥰🍲🍝
                            </p>
                            <Image
                                src="/image_emptypg.png"
                                alt="No old favorites"
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
