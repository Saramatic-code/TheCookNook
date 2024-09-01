import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Importing heart icons

const RecipeCard = ({ recipe }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        // Check if the recipe is already in favorites when the component mounts
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.some((favRecipe) => favRecipe.id === recipe.id));
    }, [recipe.id]);

    const handleFavoriteClick = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (isFavorite) {
            // Remove from favorites
            favorites = favorites.filter((favRecipe) => favRecipe.id !== recipe.id);
        } else {
            // Add to favorites
            const essentialRecipe = {
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
            };
            favorites.push(essentialRecipe);
        }

        // Save updated favorites to localStorage with error handling
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

    // Ensure that the time data is correctly retrieved and displayed
    const prepTimeValue = recipe.prep_time?.value || 'N/A';
    const prepTimeUnit = recipe.prep_time?.unit || '';
    const cookTimeValue = recipe.cook_time?.value || 'N/A';
    const cookTimeUnit = recipe.cook_time?.unit || '';

    const tags = recipe.tags || [];

    return (
        <Link href={`/recipes/${recipe.id}`} legacyBehavior>
            <a className="recipe-card block bg-[#F5F5F5] p-2 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
                <div className="w-full h-40 overflow-hidden rounded-t-lg flex items-center justify-center">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="recipe-image object-cover h-full w-full rounded-lg"
                    />
                </div>
                <div className="p-4">
                    <h2 className="recipe-title text-2xl font-semibold bg-[#fcebed] text-[#696969] p-2 rounded-lg text-center">
                        {recipe.title}
                    </h2>
                    <div className="flex flex-wrap justify-center mt-2">
                        {tags.map((tag, index) => (
                            <span key={index} className="bg-[#fcebed] text-[#696969] px-2 py-1 rounded-lg m-1">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="mt-2 text-center">
                        <p className="text-[#C0C0C0]">
                            {/* Displaying prep and cook times similarly to servings */}
                            {recipe.prep_time && recipe.prep_time.value !== 'N/A' ? (
                                <>Prep Time: {recipe.prep_time.value} {recipe.prep_time.unit} | </>
                            ) : 'Prep Time: N/A | '}
                            {recipe.cook_time && recipe.cook_time.value !== 'N/A' ? (
                                <>Cook Time: {recipe.cook_time.value} {recipe.cook_time.unit} | </>
                            ) : 'Cook Time: N/A | '}
                            Servings: {recipe.servings}
                        </p>
                    </div>
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleFavoriteClick();
                            }}
                            className="text-sm p-1"
                        >
                            {isFavorite ? (
                                <AiFillHeart className="text-[#F29BAA] text-lg" />
                            ) : (
                                <AiOutlineHeart className="text-[#F29BAA] text-lg" />
                            )}
                        </button>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default RecipeCard;
