// src/pages/recipes/edit-recipe/[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { FiX } from 'react-icons/fi';
import Navbar from '../../../components/Navbar';

export default function EditRecipe() {
    const router = useRouter();
    const { id } = router.query;

    const [recipe, setRecipe] = useState({
        title: '',
        prep_time_value: '',
        prep_time_unit: '',
        cook_time_value: '',
        cook_time_unit: '',
        servings: '',
        image: '',
        notes: '',
        nutrition_facts: {
            calories: '',
            fat: '',
            carbohydrates: '',
            protein: '',
            sugar: '',
        },
        ingredients: [],
        instructions: [],
        tags: [],
        categories: [],
        carousel_images: [],
    });

    const [newTag, setNewTag] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteConfirmationText, setDeleteConfirmationText] = useState('');


    useEffect(() => {
        if (id) {
            api.get(`/recipes/${id}`)
                .then((response) => {
                    const fetchedRecipe = response.data;

                    // Transform instructions to display as strings for each step
                    if (fetchedRecipe.instructions && Array.isArray(fetchedRecipe.instructions)) {
                        fetchedRecipe.instructions = fetchedRecipe.instructions.map(instruction => instruction.instruction);
                    }

                    // Map carousel images to extract URLs only
                    if (fetchedRecipe.carousel_images && Array.isArray(fetchedRecipe.carousel_images)) {
                        fetchedRecipe.carousel_images = fetchedRecipe.carousel_images.map(imageObj => imageObj.image_url);
                    }

                    setRecipe(fetchedRecipe);
                })
                .catch((error) => {
                    console.error('Error fetching recipe:', error);
                });
        }
    }, [id]);

    const handleDelete = async () => {
        try {
            await api.delete(`/recipes/${id}`);
            alert('Recipe deleted successfully!');
            router.push('/recipes'); // Redirect to recipes list after deletion
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            [name]: value,
        }));
    };

    const handleNutritionChange = (e) => {
        const { name, value } = e.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            nutrition_facts: {
                ...prevRecipe.nutrition_facts,
                [name]: value,
            },
        }));
    };

    const handleIngredientChange = (index, e) => {
        const { name, value } = e.target;
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients[index][name] = value;
        setRecipe({ ...recipe, ingredients: updatedIngredients });
    };

    const handleInstructionChange = (index, e) => {
        const updatedInstructions = [...recipe.instructions];
        updatedInstructions[index] = e.target.value;
        setRecipe({ ...recipe, instructions: updatedInstructions });
    };

    const addIngredient = () => {
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            ingredients: [...prevRecipe.ingredients, { item: '', quantity: '', notes: '' }],
        }));
    };

    const addInstruction = () => {
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            instructions: [...prevRecipe.instructions, ''],
        }));
    };

    const addTag = () => {
        if (newTag && !recipe.tags.some(tag => tag.name === newTag)) {
            setRecipe((prevRecipe) => ({
                ...prevRecipe,
                tags: [...prevRecipe.tags, { name: newTag }],
            }));
            setNewTag('');
        }
    };

    const addCategory = () => {
        if (newCategory && !recipe.categories.some(category => category.name === newCategory)) {
            setRecipe((prevRecipe) => ({
                ...prevRecipe,
                categories: [...prevRecipe.categories, { name: newCategory }],
            }));
            setNewCategory('');
        }
    };

    const addCarouselImage = (url) => {
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            carousel_images: [...prevRecipe.carousel_images, url],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editHandler();
    };

    const editHandler = async () => {
        try {
            await api.put(`/recipes/${id}`, recipe);
            router.push(`/recipes/${id}`);
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="mt-6 p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-[#696969]">Edit Recipe</h1>
                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <label className="block font-semibold text-[#696969]">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={recipe.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-[#696969]"
                        />
                    </div>

                    {/* Prep and Cook Time */}
                    <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-[#696969]">
                            <div>
                                <label className="block font-semibold">Preparation Time</label>
                                <input
                                    type="number"
                                    name="prep_time_value"
                                    value={recipe.prep_time_value}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="text"
                                    name="prep_time_unit"
                                    value={recipe.prep_time_unit}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded mt-2 text-[#696969]"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold text-[#696969]">Cook Time</label>
                                <input
                                    type="number"
                                    name="cook_time_value"
                                    value={recipe.cook_time_value}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded text-[#696969]"
                                />
                                <input
                                    type="text"
                                    name="cook_time_unit"
                                    value={recipe.cook_time_unit}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded mt-2 text-[#696969]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Servings */}
                    <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <label className="block font-semibold text-[#696969]">Servings</label>
                        <input
                            type="text"
                            name="servings"
                            value={recipe.servings}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-[#696969]"
                        />
                    </div>

                    {/* Nutrition Facts */}
                    <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <label className="block font-semibold text-[#696969]">Nutrition Facts</label>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="calories"
                                value={recipe.nutrition_facts.calories}
                                onChange={handleNutritionChange}
                                placeholder="Calories"
                                className="w-full p-2 border rounded text-[#696969]"
                            />
                            <input
                                type="text"
                                name="fat"
                                value={recipe.nutrition_facts.fat}
                                onChange={handleNutritionChange}
                                placeholder="Fat"
                                className="w-full p-2 border rounded text-[#696969]"
                            />
                            <input
                                type="text"
                                name="carbohydrates"
                                value={recipe.nutrition_facts.carbohydrates}
                                onChange={handleNutritionChange}
                                placeholder="Carbohydrates"
                                className="w-full p-2 border rounded text-[#696969]"
                            />
                            <input
                                type="text"
                                name="protein"
                                value={recipe.nutrition_facts.protein}
                                onChange={handleNutritionChange}
                                placeholder="Protein"
                                className="w-full p-2 border rounded text-[#696969]"
                            />
                            <input
                                type="text"
                                name="sugar"
                                value={recipe.nutrition_facts.sugar}
                                onChange={handleNutritionChange}
                                placeholder="Sugar"
                                className="w-full p-2 border rounded text-[#696969]"
                            />
                        </div>
                    </div>

                    {/* Recipe Image */}
                    <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <label className="block font-semibold text-[#696969]">Recipe Image</label>
                        <input
                            type="text"
                            name="image"
                            value={recipe.image}
                            onChange={handleChange}
                            placeholder="Image URL"
                            className="w-full p-2 border rounded text-[#696969]"
                        />
                    </div>

                    {/* Carousel Images */}
                    <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-[#696969]">
                        <label className="block font-semibold">Carousel Images</label>
                        <input
                            type="text"
                            placeholder="Add an image URL"
                            onKeyDown={(e) => e.key === 'Enter' && addCarouselImage(e.target.value)}
                            className="w-full p-2 border rounded text-[#696969] mt-2"
                        />
                        <div className="mt-4 flex flex-wrap gap-2">
                            {recipe.carousel_images.map((img, index) => (
                                <div key={index} className="relative">
                                    <img src={img} alt="carousel" className="h-16 w-16 object-cover rounded border border-gray-300" />
                                    <button
                                        onClick={() => setRecipe((prevRecipe) => ({
                                            ...prevRecipe,
                                            carousel_images: prevRecipe.carousel_images.filter((_, i) => i !== index),
                                        }))}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
                                    >
                                        <FiX size={10} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-[#696969]">
                        <label className="block font-semibold">Notes</label>
                        <textarea
                            name="notes"
                            value={recipe.notes}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-[#696969] mt-2"
                        />
                    </div>

                    {/* Instructions */}
                    <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-[#696969]">
                        <label className="block font-semibold">Instructions</label>
                        {recipe.instructions.map((instruction, index) => (
                            <div key={index} className="flex gap-2 mb-2 items-center">
                                <textarea
                                    value={instruction}
                                    onChange={(e) => handleInstructionChange(index, e)}
                                    placeholder={`Step ${index + 1}`}
                                    className="w-full p-2 border rounded text-[#696969]"
                                />
                                <button
                                    onClick={() => setRecipe({
                                        ...recipe,
                                        instructions: recipe.instructions.filter((_, i) => i !== index),
                                    })}
                                    className="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition"
                                >
                                    <FiX size={12} />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addInstruction}
                            className="px-4 py-2 bg-primary text-white rounded mt-2"
                        >
                            Add Instruction
                        </button>
                    </div>


                    {/* Ingredients */}
                    <div className="mb-4 text-[#696969]">
                        <label className="block font-semibold text-[#696969]">Ingredients</label>
                        {recipe.ingredients.map((ingredient, index) => (
                            <div key={index} className="mb-2 p-4 border rounded-lg bg-gray-50">
                                <div className="flex gap-2 mb-2">
                                    <div className="w-full">
                                        <label className="block text-sm font-semibold mb-1">Item</label>
                                        <input
                                            type="text"
                                            name="item"
                                            placeholder="Ingredient Item"
                                            value={ingredient.item}
                                            onChange={(e) => handleIngredientChange(index, e)}
                                            className="w-full p-2 border rounded text-[#696969]"
                                        />
                                    </div>
                                    <div className="w-1/4">
                                        <label className="block text-sm font-semibold mb-1">Quantity</label>
                                        <input
                                            type="text"
                                            name="quantity"
                                            placeholder="Quantity"
                                            value={ingredient.quantity}
                                            onChange={(e) => handleIngredientChange(index, e)}
                                            className="w-full p-2 border rounded text-[#696969]"
                                        />
                                    </div>
                                    <div className="w-1/4">
                                        <label className="block text-sm font-semibold mb-1">Measurement</label>
                                        <input
                                            type="text"
                                            name="measurement"
                                            placeholder="Measurement"
                                            value={ingredient.measurement || ''}
                                            onChange={(e) => handleIngredientChange(index, e)}
                                            className="w-full p-2 border rounded text-[#696969]"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-full">
                                        <label className="block text-sm font-semibold mb-1">Notes</label>
                                        <input
                                            type="text"
                                            name="notes"
                                            placeholder="Additional Notes"
                                            value={ingredient.notes}
                                            onChange={(e) => handleIngredientChange(index, e)}
                                            className="w-full p-2 border rounded text-[#696969]"
                                        />
                                    </div>
                                    <button
                                        onClick={() => setRecipe((prevRecipe) => ({
                                            ...prevRecipe,
                                            ingredients: prevRecipe.ingredients.filter((_, i) => i !== index),
                                        }))}
                                        className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                                    >
                                        <FiX size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addIngredient} className="px-4 py-2 bg-primary text-white rounded mt-2">
                            Add Ingredient
                        </button>
                    </div>


                    {/* Categories */}
                    <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-[#696969]">
                        <label className="block font-semibold">Categories</label>
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addCategory()}
                            placeholder="Add a category"
                            className="w-full p-2 border rounded mt-2 text-[#696969]"
                        />
                        <div className="mt-4 flex flex-wrap gap-2">
                            {recipe.categories.map((category, index) => (
                                <span key={index} className="inline-flex items-center bg-gray-200 text-[#696969] px-2 py-1 rounded mr-2 mb-2">
                                    {category.name}
                                    <button
                                        onClick={() => setRecipe({ ...recipe, categories: recipe.categories.filter((c) => c.name !== category.name) })}
                                        className="ml-1 text-red-500 hover:text-red-700"
                                    >
                                        <FiX />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-[#696969]">
                        <label className="block font-semibold">Tags</label>
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addTag()}
                            placeholder="Add a tag"
                            className="w-full p-2 border rounded mt-2 text-[#696969]"
                        />
                        <div className="mt-4 flex flex-wrap gap-2">
                            {recipe.tags.map((tag, index) => (
                                <span key={index} className="inline-flex items-center bg-gray-200 text-[#696969] px-2 py-1 rounded mr-2 mb-2">
                                    {tag.name}
                                    <button onClick={() => setRecipe({ ...recipe, tags: recipe.tags.filter((t) => t.name !== tag.name) })}
                                        className="ml-1 text-red-500 hover:text-red-700">
                                        <FiX />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>


                    {/* Submit Button */}
                    <button type="submit" className="px-6 py-2 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition-colors mt-4">
                        Save Changes
                    </button>
                </form>

                {/* Delete Button */}
                <div className="flex justify-center mt-6">
                    <button
                        type="button"
                        onClick={() => setConfirmDelete(true)}
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
                    >
                        Delete Recipe
                    </button>
                </div>

                {/* Confirmation Modal */}
                {confirmDelete && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                            <h2 className="text-xl font-bold text-center mb-4">Confirm Delete</h2>
                            <p className="text-center mb-4">
                                Are you sure you want to delete this recipe? This action cannot be undone.
                                Please type <span className="font-semibold">DELETE</span> to confirm.
                            </p>
                            <input
                                type="text"
                                value={deleteConfirmationText}
                                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                                placeholder="Type DELETE"
                                className="w-full p-2 border rounded mb-4"
                            />
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
                                    disabled={deleteConfirmationText !== 'DELETE'}
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={() => setConfirmDelete(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}
