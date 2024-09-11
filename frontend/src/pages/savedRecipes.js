import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SavedRecipes() {
    return (
        <div className="wrapper flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 items-center justify-center p-4">
                <div className="main-content max-w-3xl w-full mx-auto p-6 text-[#696969] bg-white rounded-lg shadow-md space-y-4">
                    <h1 className="text-3xl font-bold mb-4 text-center">Saved Recipes</h1>
                    <p className="text-center">List of saved recipes will be displayed here.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
