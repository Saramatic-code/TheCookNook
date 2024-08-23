import Navbar from '../components/Navbar';

export default function RencentlyViewed() {
    return (
        <div>
            <Navbar />
            <h1 className="text-4xl font-bold text-center mt-8 text-primary-dark">Recently Viewed Recipes</h1>
            <p className="text-center mt-4 text-primary-dark">This is where your recently viewed recipes will be displayed.</p>
        </div>
    );
}
