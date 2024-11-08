// src/components/RecipeCard.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import api from '../api/axios';


const RecipeCard = ({ recipe, onFavoriteChange }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isCooked, setIsCooked] = useState(false);

    useEffect(() => {
        // Fetch initial favorite and cooked status from backend
        const fetchStatuses = async () => {
            try {
                const [favoriteResponse, cookedResponse] = await Promise.all([
                    api.get(`/user/favorites/${recipe.id}`),
                    api.get(`/user/cookingHistory/${recipe.id}`)
                ]);

                setIsFavorite(favoriteResponse.data.isFavorite);
                setIsCooked(cookedResponse.data.isCooked);
            } catch (error) {
                console.error('Error fetching favorite or cooked status:', error);
            }
        };

        fetchStatuses();
    }, [recipe.id]);

    const handleFavoriteClick = async () => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        let oldFavorites = JSON.parse(localStorage.getItem('oldFavorites')) || [];

        if (isFavorite) {
            favorites = favorites.filter((favRecipe) => favRecipe.id !== recipe.id);
            oldFavorites.push(recipe);

            try {
                localStorage.setItem('oldFavorites', JSON.stringify(oldFavorites));
                // Send request to remove from favorites on backend
                await api.post(`/user/favorites/remove/${recipe.id}`);
            } catch (e) {
                console.error('Error updating old favorites:', e);
            }
        } else {
            const essentialRecipe = {
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
            };
            favorites.push(essentialRecipe);

            try {
                // Send request to add to favorites on backend
                await api.post(`/user/favorites/add/${recipe.id}`);
            } catch (e) {
                console.error('Error adding to favorites on backend:', e);
            }
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

    const handleCookedClick = async () => {
        let cookingHistory = JSON.parse(localStorage.getItem('cookingHistory')) || [];

        if (isCooked) {
            cookingHistory = cookingHistory.filter((cookedRecipe) => cookedRecipe.id !== recipe.id);

            try {
                // Send request to remove from cooking history on backend
                await api.post(`/user/cookingHistory/remove/${recipe.id}`);
            } catch (e) {
                console.error('Error removing from cooking history on backend:', e);
            }
        } else {
            const cookedRecipe = {
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
            };
            cookingHistory.push(cookedRecipe);

            try {
                // Send request to add to cooking history on backend
                await api.post(`/user/cookingHistory/add/${recipe.id}`);
            } catch (e) {
                console.error('Error adding to cooking history on backend:', e);
            }
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

    const prepTimeValue = recipe.prep_time_value || 'N/A';
    const prepTimeUnit = recipe.prep_time_unit || '';
    const cookTimeValue = recipe.cook_time_value || 'N/A';
    const cookTimeUnit = recipe.cook_time_unit || '';

    const tags = recipe.tags || [];

    return (
        <Link href={`/recipes/${recipe.id}`} legacyBehavior>
            <a className="recipe-card block bg-[#F5F5F5] p-2 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg max-w-md mx-auto">
                <div className="w-full h-48 overflow-hidden rounded-t-lg flex items-center justify-center">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="object-cover h-full w-full"
                    />
                </div>
                <div className="p-4 flex flex-col items-center">
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

                    <div className="flex justify-center items-center mt-2">
                        <p className="text-[#C0C0C0]">
                            {prepTimeValue !== 'N/A' ? (
                                <>Prep Time: {prepTimeValue} {prepTimeUnit} | </>
                            ) : 'Prep Time: N/A | '}
                            {cookTimeValue !== 'N/A' ? (
                                <>Cook Time: {cookTimeValue} {cookTimeUnit} | </>
                            ) : 'Cook Time: N/A | '}
                            Servings: {recipe.servings}
                        </p>

                    </div>

                    <div className="flex flex-wrap justify-center mt-2">
                        {tags.map((tag, index) => (
                            <span key={index} className="bg-[#fcebed] text-[#696969] px-2 py-1 rounded-lg m-1">
                                {tag.name || tag} {/* Handle tag as an object or string */}
                            </span>
                        ))}
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default RecipeCard;
