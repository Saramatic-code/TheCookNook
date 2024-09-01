import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';

export default function Home() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/recipes/')
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
        <div className="wrapper">
            <Navbar />
            <div className="main-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {recipes.slice(0, 10).map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
            <Footer />
        </div>
    );
}
