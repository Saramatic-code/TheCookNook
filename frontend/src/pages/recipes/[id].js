import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function RecipeDetail() {
    const router = useRouter();
    const { id } = router.query;

    const [recipes, setRecipes] = useState([]);
    const [shoppingList, setShoppingList] = useState([]);

    useEffect(() => {
        if (id) {
            // Fetch server recipes
            axios.get('http://127.0.0.1:8000/recipes/')
                .then((response) => {
                    const serverRecipes = response.data;

                    // Fetch local recipes
                    const localRecipes = JSON.parse(localStorage.getItem('recipes')) || [];

                    // Combine recipes, avoiding duplicates
                    const allRecipes = [...serverRecipes, ...localRecipes];
                    const uniqueRecipes = allRecipes.filter((recipe, index, self) =>
                        index === self.findIndex((r) => r.id === recipe.id)
                    );

                    setRecipes(uniqueRecipes);
                })
                .catch((error) => {
                    console.error('Error fetching recipes:', error);
                });
        }
    }, [id]);

    const recipe = recipes.find((r) => r.id.toString() === id);

    if (!recipe) {
        console.log('Recipe not found with id:', id);
        return <p>Recipe not found</p>;
    }

    const addToShoppingList = (ingredient) => {
        setShoppingList([...shoppingList, ingredient]);
    };

    const sendShoppingList = async () => {
        const response = await fetch('/api/send-sms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ shoppingList }),
        });

        if (response.ok) {
            alert('Shopping list sent to your phone!');
        } else {
            alert('Failed to send the shopping list.');
        }
    };

    const prepTimeValue = recipe.prep_time?.value ? recipe.prep_time.value : 'N/A';
    const prepTimeUnit = recipe.prep_time?.unit ? recipe.prep_time.unit : '';
    const cookTimeValue = recipe.cook_time?.value ? recipe.cook_time.value : 'N/A';
    const cookTimeUnit = recipe.cook_time?.unit ? recipe.cook_time.unit : '';

    const nutritionFacts = recipe.nutrition_facts || {};

    return (
        <div className="wrapper">
            <Navbar />
            <div className="main-content p-4 flex flex-col items-center pb-24">
                <div className="max-w-3xl w-full text-[#696969]">
                    <img src={recipe.image} alt={recipe.title} className="recipe-image w-full h-72 object-cover rounded-lg" />
                    <h1 className="text-4xl font-bold mt-4 text-center bg-mutedPink">{recipe.title}</h1>

                    {/* Tags Section */}
                    <div className="flex flex-wrap justify-center mt-2">
                        {recipe.tags.map((tag, index) => (
                            <span key={index} className="bg-mutedPink text-secondary px-2 py-1 rounded-lg m-1">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Displaying prep_time and cook_time */}
                    <p className="mt-2 text-center">
                        Prep Time: {prepTimeValue} {prepTimeUnit} |
                        Cook Time: {cookTimeValue} {cookTimeUnit} |
                        Servings: {recipe.servings}
                    </p>

                    <h2 className="text-2xl font-semibold mt-4">Ingredients</h2>
                    <ul className="list-disc list-inside mt-2 space-y-4">
                        {recipe.ingredients.map((ing, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <span>{ing.quantity} {ing.item} - {ing.notes}</span>
                                <button
                                    onClick={() => addToShoppingList(ing)}
                                    className="ml-4 px-3 py-1 bg-primary text-background font-semibold rounded hover:bg-primary-dark transition-colors"
                                >
                                    Add to List
                                </button>
                            </li>
                        ))}
                    </ul>

                    <h2 className="text-2xl font-semibold mt-4">Instructions</h2>
                    <ul className="list-inside mt-2">
                        {recipe.instructions.map((step, index) => (
                            <li key={index} className="mt-2"><span className="font-bold">{index + 1}.</span> {step}</li>
                        ))}
                    </ul>

                    {/* Nutritional Facts */}
                    <h2 className="text-2xl font-semibold mt-4">Nutritional Facts</h2>
                    {Object.keys(nutritionFacts).length > 0 ? (
                        <ul className="list-disc list-inside mt-2">
                            {Object.entries(nutritionFacts).map(([key, value]) => (
                                <li key={key}>{key}: {value}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-xs mt-2">No nutritional facts available.</p>
                    )}

                    {/* Shopping List Button */}
                    <button
                        onClick={sendShoppingList}
                        className="mt-4 px-4 py-2 bg-primary text-background font-semibold rounded hover:bg-primary-dark transition-colors"
                    >
                        Send Shopping List to Phone
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
