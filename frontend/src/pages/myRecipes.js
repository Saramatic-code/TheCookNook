import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function myRecipes() {
    return (
        <div>
            <Navbar />
            <h1 className="text-4xl font-bold text-center mt-8 text-primary-dark ">My Recipes</h1>
            <p className="text-center mt-4 text-[#696969] ">My Recipes list will go here .</p>
        </div>
    );
}
