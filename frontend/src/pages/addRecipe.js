import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AddRecipe() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [servings, setServings] = useState(1);
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([{ item: '', quantity: '', notes: '' }]);
    const [instructions, setInstructions] = useState(['']);
    const [nutritionFacts, setNutritionFacts] = useState({ calories: '', fat: '', carbohydrates: '', protein: '' });

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { item: '', quantity: '', notes: '' }]);
    };

    const handleAddInstruction = () => {
        setInstructions([...instructions, '']);
    };

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = ingredients.map((ingredient, i) =>
            i === index ? { ...ingredient, [field]: value } : ingredient
        );
        setIngredients(newIngredients);
    };

    const handleInstructionChange = (index, value) => {
        const newInstructions = instructions.map((instruction, i) =>
            i === index ? value : instruction
        );
        setInstructions(newInstructions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecipe = {
            id: Date.now(),
            title,
            image,
            prep_time: prepTime,
            cook_time: cookTime,
            servings,
            categories,
            ingredients,
            instructions,
            nutrition_facts: nutritionFacts,
            tags: [], // Will be added later
            total_cost: {}, // Will be added later
        };
        console.log(newRecipe);
        // You can save the newRecipe to your backend or state management store
    };

    return (
        <div className="wrapper flex">
            <Navbar />
            <div className="main-content max-w-xl mx-auto p-4 text-[#696969]">
                <h1 className="text-3xl font-bold mb-4">Add a New Recipe</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-semibold">Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-2 p-2 border rounded w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold">Image URL:</label>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="mt-2 p-2 border rounded w-full"
                            required
                        />
                    </div>

                    <div className="flex justify-between mb-4">
                        <div className="flex-1 mr-2">
                            <label className="block font-semibold">Prep Time:</label>
                            <input
                                type="text"
                                value={prepTime}
                                onChange={(e) => setPrepTime(e.target.value)}
                                className="mt-2 p-2 border rounded w-full"
                                required
                            />
                        </div>
                        <div className="flex-1 ml-2">
                            <label className="block font-semibold">Cook Time:</label>
                            <input
                                type="text"
                                value={cookTime}
                                onChange={(e) => setCookTime(e.target.value)}
                                className="mt-2 p-2 border rounded w-full"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold">Servings:</label>
                        <input
                            type="number"
                            value={servings}
                            onChange={(e) => setServings(e.target.value)}
                            className="mt-2 p-2 border rounded w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold">Categories:</label>
                        <input
                            type="text"
                            value={categories}
                            onChange={(e) => setCategories(e.target.value.split(','))}
                            className="mt-2 p-2 border rounded w-full"
                            placeholder="Enter categories separated by commas"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold">Ingredients:</label>
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="flex mb-2">
                                <input
                                    type="text"
                                    value={ingredient.item}
                                    onChange={(e) => handleIngredientChange(index, 'item', e.target.value)}
                                    placeholder="Item"
                                    className="p-2 border rounded mr-2 flex-1"
                                    required
                                />
                                <input
                                    type="text"
                                    value={ingredient.quantity}
                                    onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                                    placeholder="Quantity"
                                    className="p-2 border rounded mr-2 flex-1"
                                    required
                                />
                                <input
                                    type="text"
                                    value={ingredient.notes}
                                    onChange={(e) => handleIngredientChange(index, 'notes', e.target.value)}
                                    placeholder="Notes"
                                    className="p-2 border rounded flex-1"
                                />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddIngredient} className="p-2 bg-[#F29BAA] text-white rounded hover:bg-[#D17384] mt-2">
                            Add Ingredient
                        </button>
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold">Instructions:</label>
                        {instructions.map((instruction, index) => (
                            <div key={index} className="mb-2">
                                <textarea
                                    value={instruction}
                                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                                    placeholder={`Step ${index + 1}`}
                                    className="p-2 border rounded w-full"
                                    required
                                />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddInstruction} className="p-2 bg-[#F29BAA] text-white rounded hover:bg-[#D17384] mt-2">
                            Add Instruction
                        </button>
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold">Nutrition Facts:</label>
                        <div className="flex mb-2">
                            <input
                                type="text"
                                value={nutritionFacts.calories}
                                onChange={(e) => setNutritionFacts({ ...nutritionFacts, calories: e.target.value })}
                                placeholder="Calories"
                                className="p-2 border rounded mr-2 flex-1"
                            />
                            <input
                                type="text"
                                value={nutritionFacts.fat}
                                onChange={(e) => setNutritionFacts({ ...nutritionFacts, fat: e.target.value })}
                                placeholder="Fat"
                                className="p-2 border rounded mr-2 flex-1"
                            />
                            <input
                                type="text"
                                value={nutritionFacts.carbohydrates}
                                onChange={(e) => setNutritionFacts({ ...nutritionFacts, carbohydrates: e.target.value })}
                                placeholder="Carbohydrates"
                                className="p-2 border rounded flex-1"
                            />
                            <input
                                type="text"
                                value={nutritionFacts.protein}
                                onChange={(e) => setNutritionFacts({ ...nutritionFacts, protein: e.target.value })}
                                placeholder="Protein"
                                className="p-2 border rounded flex-1"
                            />
                        </div>
                    </div>

                    <button type="submit" className="p-2 bg-[#F29BAA] text-white rounded hover:bg-[#D17384] mt-4 w-full">
                        Submit Recipe
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}
