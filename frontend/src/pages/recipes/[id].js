// src/pages/recipes/[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import recipes from '../../data/dummydata'; // Import the dummy data

export default function RecipeDetail() {
    const router = useRouter();
    const { id } = router.query;
    const recipe = recipes.find((r) => r.id.toString() === id);

    if (!recipe) return <p>Recipe not found</p>;

    return (
        <div className="wrapper">
            <Navbar />
            <div className="main-content p-4">
                <img src={recipe.image} alt={recipe.title} className="recipe-image w-full h-72 object-cover rounded-lg" />
                <h1 className="text-4xl font-bold mt-4">{recipe.title}</h1>
                <p className="mt-2">{recipe.prep_time} | {recipe.cook_time} | Servings: {recipe.servings}</p>
                <h2 className="text-2xl font-semibold mt-4">Ingredients</h2>
                <ul className="list-disc list-inside mt-2">
                    {recipe.ingredients.map((ing, index) => (
                        <li key={index}>{ing.quantity} {ing.item} - {ing.notes}</li>
                    ))}
                </ul>
                <h2 className="text-2xl font-semibold mt-4">Instructions</h2>
                <ol className="list-decimal list-inside mt-2">
                    {recipe.instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>
            <Footer />
        </div>
    );
}
