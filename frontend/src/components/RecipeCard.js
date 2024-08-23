import Link from 'next/link';

const RecipeCard = ({ recipe }) => {
    return (
        <Link href={`/recipes/${recipe.id}`} legacyBehavior>
            <a className="recipe-card block bg-[#F5F5F5] p-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-full h-40 overflow-hidden rounded-t-lg flex items-center justify-center">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="recipe-image object-cover h-full w-full rounded-lg"
                    />
                </div>
                <div className="p-4">
                    <h2
                        className="recipe-title text-2xl font-semibold bg-[#fcebed] text-[#696969] p-2 rounded-lg text-center"
                    >
                        {recipe.title}
                    </h2>

                    {/* Tags Section */}
                    <div className="flex flex-wrap justify-center mt-2">
                        {recipe.tags.map((tag, index) => (
                            <span key={index} className="bg-[#fcebed] text-[#696969] px-2 py-1 rounded-lg m-1">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Recipe Info */}
                    <p className="mt-2 text-[#C0C0C0]">
                        {recipe.prep_time} | {recipe.cook_time} | Servings: {recipe.servings}
                    </p>
                </div>
            </a>
        </Link>
    );
};

export default RecipeCard;
