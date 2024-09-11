import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';

export default function MyRecipes() {
    const [myRecipes, setMyRecipes] = useState([]);

    useEffect(() => {
        const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Combine saved recipes and favorites, avoiding duplicates
        const combinedRecipes = [...new Map([...savedRecipes, ...favorites].map(recipe => [recipe.id, recipe])).values()];
        setMyRecipes(combinedRecipes);
    }, []);

    return (
        <div className="wrapper flex flex-col min-h-screen">
            <Navbar />
            <div className="main-content flex-1 max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-[#696969]">My Recipes</h1>
                {myRecipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myRecipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-lg text-[#696969] mt-10">No recipes found. Start adding your favorite recipes now!</p>
                )}
            </div>
            <Footer />
        </div>
    );
}
