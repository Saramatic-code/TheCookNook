import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const RecipeCard = ({ recipe, onFavoriteChange }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isCooked, setIsCooked] = useState(false);

    useEffect(() => {
        // Check if the recipe is already in favorites when the component mounts
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.some((favRecipe) => favRecipe.id === recipe.id));

        // Check if the recipe is already in cooking history when the component mounts
        const cookingHistory = JSON.parse(localStorage.getItem('cookingHistory')) || [];
        setIsCooked(cookingHistory.some((cookedRecipe) => cookedRecipe.id === recipe.id));
    }, [recipe.id]);

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

            if (onFavoriteChange) {
                onFavoriteChange(recipe.id, !isFavorite);
            }
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                console.error('LocalStorage limit exceeded. Please clear some data.');
                alert('Failed to save favorite: localStorage limit exceeded.');
            }
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

    const prepTimeValue = recipe.prep_time?.value || 'N/A';
    const prepTimeUnit = recipe.prep_time?.unit || '';
    const cookTimeValue = recipe.cook_time?.value || 'N/A';
    const cookTimeUnit = recipe.cook_time?.unit || '';

    const tags = recipe.tags || [];

    return (
        <Link href={`/recipes/${recipe.id}`} legacyBehavior>
            <a className="recipe-card block bg-[#F5F5F5] p-2 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg max-w-md mx-auto">
                {/* Image Container with fixed size */}
                <div className="w-full h-48 overflow-hidden rounded-t-lg flex items-center justify-center">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="object-cover h-full w-full"
                    />
                </div>
                <div className="p-4 flex flex-col items-center">
                    {/* Title with fixed height */}
                    <h2 className="recipe-title text-xl font-semibold bg-[#fcebed] text-[#696969] p-2 rounded-lg text-center line-clamp-2 h-14 overflow-hidden">
                        {recipe.title}
                    </h2>

                    <div className="flex justify-center mt-4 space-x-4">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleCookedClick();
                            }}
                            className={`text-sm p-1 rounded ${isCooked
                                ? 'bg-accent-yellow text-[#696969] hover:bg-accent-yellow'
                                : 'bg-accent-teal text-[#696969] hover:bg-accent-teal'
                                }`}
                        >
                            {isCooked ? 'Cooked' : 'Cook Now'}
                        </button>
                    </div>

                    {/* Time and servings section */}
                    <div className="flex justify-center items-center mt-2">
                        <p className="text-[#C0C0C0]">
                            {recipe.prep_time && recipe.prep_time.value !== 'N/A' ? (
                                <>Prep Time: {recipe.prep_time.value} {recipe.prep_time.unit} | </>
                            ) : 'Prep Time: N/A | '}
                            {recipe.cook_time && recipe.cook_time.value !== 'N/A' ? (
                                <>Cook Time: {recipe.cook_time.value} {recipe.cook_time.unit} | </>
                            ) : 'Cook Time: N/A | '}
                            Servings: {recipe.servings}
                        </p>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleFavoriteClick();
                            }}
                            className="text-sm p-1 ml-2"
                        >
                            {isFavorite ? (
                                <AiFillHeart className="text-[#F29BAA] text-lg" />
                            ) : (
                                <AiOutlineHeart className="text-[#F29BAA] text-lg" />
                            )}
                        </button>
                    </div>

                    <div className="flex flex-wrap justify-center mt-2">
                        {tags.map((tag, index) => (
                            <span key={index} className="bg-[#fcebed] text-[#696969] px-2 py-1 rounded-lg m-1">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default RecipeCard;
