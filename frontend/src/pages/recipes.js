// src/pages/recipes.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import recipes from '../data/dummydata'; // Import the dummy data

export default function RecipesPage() {
    return (
        <div className="wrapper">
            <Navbar />
            <div className="main-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
            <Footer />
        </div>
    );
}
