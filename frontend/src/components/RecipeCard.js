\import Link from 'next/link';

const RecipeCard = ({ recipe, id }) => {
    return (
        <div className="border p-4 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
            <p><strong>Prep Time:</strong> {recipe.prep_time}</p>
            <p><strong>Cook Time:</strong> {recipe.cook_time}</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>
            <p><strong>Categories:</strong> {recipe.categories.join(', ')}</p>
            <div className="mt-4">
                <h3 className="font-semibold">Ingredients:</h3>
                <ul className="list-disc list-inside">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient.quantity} {ingredient.item} ({ingredient.notes})
                        </li>
                    ))}
                </ul>
            </div>
            <Link href={`/recipes/${id}`}>
                <a className="text-primary hover:text-primary-dark mt-4 inline-block">View Recipe</a>
            </Link>
        </div>
    );
};

export default RecipeCard;
