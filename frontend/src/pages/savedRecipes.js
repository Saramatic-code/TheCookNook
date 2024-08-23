import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SavedRecipes() {
    return (
        <div className="wrapper flex">
            <Navbar />
            <div className="main-content max-w-xl mx-auto p-4 text-[#696969]">
                <h1 className="text-3xl font-bold mb-4">Saved Recipes</h1>
                <p>List of saved recipes will be displayed here.</p>
            </div>
            <Footer />
        </div>
    );
}
