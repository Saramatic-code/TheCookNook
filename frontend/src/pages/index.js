import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';

export default function Home() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get('/api/recipes')
            .then((response) => {
                const serverRecipes = response.data;
                const localRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
                const allRecipes = [...serverRecipes, ...localRecipes];
                const uniqueRecipes = allRecipes.filter((recipe, index, self) =>
                    index === self.findIndex((r) => r.id === recipe.id)
                );
                setRecipes(uniqueRecipes);
            })
            .catch((error) => {
                console.error('Error fetching recipes:', error);
            });
    }, []);


    return (
        <div className="wrapper flex flex-col min-h-screen">
            <Navbar />
            <div className="main-content flex-1 max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-[#696969]">Explore Recipes</h1>
                {recipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes.slice(0, 10).map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-lg text-[#696969] mt-10">No recipes available at the moment. Please check back later.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}
