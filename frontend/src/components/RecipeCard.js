// src/components/RecipeCard.js
import Link from 'next/link';

const RecipeCard = ({ recipe }) => {
    return (
        <Link href={`/recipes/${recipe.id}`}>
            <div className="recipe-card cursor-pointer p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img src={recipe.image} alt={recipe.title} className="recipe-image w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                    <h2 className="recipe-title text-2xl font-semibold">{recipe.title}</h2>
                    <p className="mt-2 text-gray-600">{recipe.prep_time} | {recipe.cook_time} | Servings: {recipe.servings}</p>
                </div>
            </div>
        </Link>
    );
};

export default RecipeCard;
