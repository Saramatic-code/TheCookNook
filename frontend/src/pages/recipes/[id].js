// src/pages/recipes/[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from '../../api/axios';



export default function RecipeDetail() {
    const router = useRouter();
    const { id } = router.query;

    const [recipe, setRecipe] = useState(null);
    const [shoppingList, setShoppingList] = useState([]);
    const [isCooked, setIsCooked] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (id) {
            api.get(`/recipes/${id}`)
                .then((response) => {
                    setRecipe(response.data);
                    setCurrentImageIndex(0); // Reset to the first image when data is loaded
                })
                .catch((error) => {
                    console.error('Error fetching recipe:', error);
                });
        }
    }, [id]);

    useEffect(() => {
        if (recipe) {
            const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
            recentlyViewed.unshift(recipe);
            localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed.slice(0, 10)));

            const cookingHistory = JSON.parse(localStorage.getItem('cookingHistory')) || [];
            setIsCooked(cookingHistory.some((cookedRecipe) => cookedRecipe.id === recipe.id));

            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            setIsFavorite(favorites.some((favRecipe) => favRecipe.id === recipe.id));
        }
    }, [recipe]);

    const addToShoppingList = (ingredient) => {
        setShoppingList((prevList) => [...prevList, ingredient]);
    };

    const handleCookedClick = () => setIsCooked(!isCooked);
    const handleFavoriteClick = () => setIsFavorite(!isFavorite);

    const nextImage = () => {
        if (recipe?.carousel_images?.length > 1) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % recipe.carousel_images.length);
        }
    };

    const prevImage = () => {
        if (recipe?.carousel_images?.length > 1) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + recipe.carousel_images.length) % recipe.carousel_images.length);
        }
    };

    if (!recipe) return <p className="text-center text-xl mt-8">Loading recipe...</p>;

    const { prep_time_value, prep_time_unit, cook_time_value, cook_time_unit, nutrition_facts, notes, carousel_images } = recipe;

    return (
        <div className="wrapper">
            <Navbar />
            <div className="main-content p-6 flex flex-col items-center">
                <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md">
                    <Image
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-72 object-cover rounded-lg"
                        width={500}
                        height={300}
                        priority
                    />
                    <h1 className="text-4xl font-bold mt-6 text-center text-[#696969]">{recipe.title}</h1>

                    <div className="flex justify-center mt-6 space-x-4">
                        <button
                            onClick={handleCookedClick}
                            className={`px-4 py-2 font-semibold rounded transition-colors ${isCooked
                                ? 'bg-accent-yellow text-[#696969] hover:bg-accent-yellow-dark'
                                : 'bg-accent-teal text-[#696969] hover:bg-accent-teal-dark'
                                }`}
                        >
                            {isCooked ? 'Cooked' : 'Cook Now'}
                        </button>
                        <button onClick={handleFavoriteClick} className="text-lg p-1">
                            {isFavorite ? (
                                <AiFillHeart className="text-[#F29BAA] text-2xl" />
                            ) : (
                                <AiOutlineHeart className="text-[#F29BAA] text-2xl" />
                            )}
                        </button>
                        <button
                            onClick={() => router.push(`/recipes/edit-recipe/${id}`)}
                            className="px-4 py-2 font-semibold text-[#696969] bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                        >
                            Edit Recipe
                        </button>
                    </div>


                    <p className="mt-4 text-center text-lg text-[#696969]">
                        Prep Time: {prep_time_value || 'N/A'} {prep_time_unit} | Cook Time: {cook_time_value || 'N/A'} {cook_time_unit} | Servings: {recipe.servings}
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 text-center text-[#696969]">Ingredients</h2>
                    <ul className="list-disc list-inside mt-4 space-y-4 px-8 text-[#696969]">
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

                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => alert("Shopping list sent to phone!")}
                            className="px-6 py-2 bg-primary text-background font-semibold rounded hover:bg-primary-dark transition-colors"
                        >
                            Send Shopping List to Phone
                        </button>
                    </div>

                    <h2 className="text-2xl font-semibold mt-8 text-center text-[#696969]">Instructions</h2>
                    <ul className="list-inside mt-4 space-y-2 px-8 text-[#696969]">
                        {recipe.instructions.map((step, index) => (
                            <li key={index} className="flex items-start">
                                <span className="font-bold mr-2">{step.step_number}.</span>
                                <span>{step.instruction}</span>
                            </li>
                        ))}
                    </ul>

                    {notes && (
                        <div className="mt-6 px-8">
                            <h2 className="text-2xl font-semibold text-center text-[#696969]">Notes</h2>
                            <p className="mt-2 text-gray-700 bg-gray-100 p-4 rounded-lg">{notes}</p>
                        </div>
                    )}

                    <h2 className="text-2xl font-semibold mt-8 text-center text-[#696969]">Nutritional Facts</h2>
                    {Object.keys(nutrition_facts || {}).length > 0 ? (
                        <ul className="grid grid-cols-3 gap-4 mt-4 px-8 text-[#696969]">
                            <li>Total Calories: {nutrition_facts.calories ? `${nutrition_facts.calories} kcal` : 'N/A'}</li>
                            <li>Total Fat: {nutrition_facts.fat ? `${nutrition_facts.fat} g` : 'N/A'}</li>
                            <li>Total Carbs: {nutrition_facts.carbohydrates ? `${nutrition_facts.carbohydrates} g` : 'N/A'}</li>
                            <li>Protein: {nutrition_facts.protein ? `${nutrition_facts.protein} g` : 'N/A'}</li>
                            <li>Sugars: {nutrition_facts.sugar ? `${nutrition_facts.sugar} g` : 'N/A'}</li>
                        </ul>
                    ) : (
                        <p className="text-xs mt-2 text-center">No nutritional facts available.</p>
                    )}

                    {carousel_images && carousel_images.length > 0 && (
                        <div className="carousel-container mt-8 px-8">
                            <h2 className="text-2xl font-semibold text-center text-[#696969]">Gallery</h2>
                            <div className="relative mt-4 flex items-center justify-center">
                                {carousel_images.length > 1 && (
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-2 text-[#696969] hover:text-gray-800"
                                    >
                                        <FaChevronLeft size={24} />
                                    </button>
                                )}
                                <div className="relative w-64 h-64 rounded-lg overflow-hidden">
                                    <Image
                                        src={carousel_images[currentImageIndex]?.image_url || recipe.image}
                                        alt={`Recipe Image ${currentImageIndex + 1}`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                </div>
                                {carousel_images.length > 1 && (
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-2 text-[#696969] hover:text-gray-800"
                                    >
                                        <FaChevronRight size={24} />
                                    </button>
                                )}
                            </div>
                            <div className="mt-2 text-center text-[#696969]">
                                <span>
                                    {currentImageIndex + 1} / {carousel_images.length}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
