import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import recipes from '../../data/dummydata'; // Import the dummy data
import { useState } from 'react';

export default function RecipeDetail() {
    const router = useRouter();
    const { id } = router.query;
    const recipe = recipes.find((r) => r.id.toString() === id);

    const [shoppingList, setShoppingList] = useState([]);

    if (!recipe) return <p>Recipe not found</p>;

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

    return (
        <div className="wrapper">
            <Navbar />
            <div className="main-content p-4 flex flex-col items-center">
                <div className="max-w-3xl w-full text-[#696969]">
                    <img src={recipe.image} alt={recipe.title} className="recipe-image w-full h-72 object-cover rounded-lg" />
                    <h1 className="text-4xl font-bold mt-4 text-center bg-[#fcebed]">{recipe.title}</h1>

                    {/* Tags Section */}
                    <div className="flex flex-wrap justify-center mt-2">
                        {recipe.tags.map((tag, index) => (
                            <span key={index} className="bg-[#fcebed] text-[#696969] px-2 py-1 rounded-lg m-1">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <p className="mt-2 text-center">{recipe.prep_time} | {recipe.cook_time} | Servings: {recipe.servings}</p>

                    <h2 className="text-2xl font-semibold mt-4">Ingredients</h2>
                    <ul className="list-disc list-inside mt-2">
                        {recipe.ingredients.map((ing, index) => (
                            <li key={index}>
                                {ing.quantity} {ing.item} - {ing.notes}
                                <button onClick={() => addToShoppingList(ing)} className="ml-2 text-blue-500 underline">Add to Shopping List</button>
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
                    <ul className="list-disc list-inside mt-2">
                        {Object.entries(recipe.nutrition_facts).map(([key, value]) => (
                            <li key={key}>{key}: {value}</li>
                        ))}
                    </ul>

                    {/* Shopping List Button */}
                    <button onClick={sendShoppingList} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                        Send Shopping List to Phone
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
