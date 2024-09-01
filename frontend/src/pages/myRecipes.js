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
        <div className="wrapper">
            <Navbar />
            <div className="main-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {myRecipes.length > 0 ? (
                    myRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))
                ) : (
                    <p className="text-center text-[#696969]">No recipes found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}
