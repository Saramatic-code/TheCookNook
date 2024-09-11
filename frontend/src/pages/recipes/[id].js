import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Importing heart icons

export default function RecipeDetail() {
    const router = useRouter();
    const { id } = router.query;

    const [recipes, setRecipes] = useState([]);
    const [shoppingList, setShoppingList] = useState([]);
    const [isCooked, setIsCooked] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false); // State for favorite

    useEffect(() => {
        if (id) {
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
        }
    }, [id]);

    const recipe = recipes.find((r) => r.id.toString() === id);

    useEffect(() => {
        if (recipe) {
            let updatedRecentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
            updatedRecentlyViewed = updatedRecentlyViewed.filter((r) => r.id !== recipe.id);
            updatedRecentlyViewed.unshift(recipe);
            localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecentlyViewed.slice(0, 10)));

            const cookingHistory = JSON.parse(localStorage.getItem('cookingHistory')) || [];
            setIsCooked(cookingHistory.some((cookedRecipe) => cookedRecipe.id === recipe.id));

            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            setIsFavorite(favorites.some((favRecipe) => favRecipe.id === recipe.id));
        }
    }, [recipe]);

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

    const handleCookedClick = () => {
        let cookingHistory = JSON.parse(localStorage.getItem('cookingHistory')) || [];

        if (isCooked) {
            cookingHistory = cookingHistory.filter((cookedRecipe) => cookedRecipe.id !== recipe.id);
        } else {
            const cookedRecipe = {
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
            };
            cookingHistory.push(cookedRecipe);
        }

        try {
            localStorage.setItem('cookingHistory', JSON.stringify(cookingHistory));
            setIsCooked(!isCooked);
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                console.error('LocalStorage limit exceeded. Please clear some data.');
                alert('Failed to update cooking history: localStorage limit exceeded.');
            }
        }
    };

    const handleFavoriteClick = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        let oldFavorites = JSON.parse(localStorage.getItem('oldFavorites')) || [];

        if (isFavorite) {
            favorites = favorites.filter((favRecipe) => favRecipe.id !== recipe.id);
            oldFavorites.push(recipe);
            localStorage.setItem('oldFavorites', JSON.stringify(oldFavorites));
        } else {
            const essentialRecipe = {
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
            };
            favorites.push(essentialRecipe);
        }

        try {
            localStorage.setItem('favorites', JSON.stringify(favorites));
            setIsFavorite(!isFavorite);
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                console.error('LocalStorage limit exceeded. Please clear some data.');
                alert('Failed to save favorite: localStorage limit exceeded.');
            }
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

                    {/* Cook Now Button and Favorite Icon */}
                    <div className="flex justify-center mt-4 space-x-4">
                        <button
                            onClick={handleCookedClick}
                            className={`px-4 py-2 font-semibold rounded transition-colors ${isCooked ? 'bg-accent-yellow text-[#696969] hover:bg-accent-yellow' : 'bg-accent-teal text-[#696969] hover:bg-accent-teal'
                                }`}
                        >
                            {isCooked ? 'Cooked' : 'Cook Now'}
                        </button>


                    </div>

                    {/* Displaying prep_time and cook_time */}
                    <p className="mt-2 text-center">
                        Prep Time: {prepTimeValue} {prepTimeUnit} |
                        Cook Time: {cookTimeValue} {cookTimeUnit} |
                        Servings: {recipe.servings}

                    </p>

                    <div className="flex justify-center items-center">
                        <button
                            onClick={handleFavoriteClick}
                            className="text-sm p-1"
                        >
                            {isFavorite ? (
                                <AiFillHeart className="text-[#F29BAA] text-lg" />
                            ) : (
                                <AiOutlineHeart className="text-[#F29BAA] text-lg" />
                            )}
                        </button>
                    </div>



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

                    <div className="flex flex-col md:flex-row justify-center mt-6 space-y-2 md:space-y-0 md:space-x-4">
                        <button
                            onClick={sendShoppingList}
                            className="px-4 py-2 bg-primary text-background font-semibold rounded hover:bg-primary-dark transition-colors"
                        >
                            Send Shopping List to Phone
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
