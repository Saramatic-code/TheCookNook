import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div className="wrapper">
            <Navbar />
            <div className="main-content">
                <h1 className="text-4xl font-bold text-primary-dark text-center mt-8">
                    Welcome to Healthy Recipes!
                </h1>
                <p className="text-center mt-4 text-primary-dark">
                    Explore our collection of healthy and delicious recipes.
                </p>
            </div>
            <Footer />
        </div>
    );
}
