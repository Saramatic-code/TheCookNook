import Navbar from '../components/Navbar';

export default function Home() {
    return (
        <div>
            <Navbar />
            <h1 className="text-4xl font-bold text-primary-dark text-center mt-8">
                Welcome to Healthy Recipes!
            </h1>
            <p className="text-center mt-4 text-primary-dark">
                Explore our collection of healthy and delicious recipes.
            </p>
        </div>
    );
}
