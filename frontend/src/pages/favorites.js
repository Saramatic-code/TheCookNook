import Navbar from '../components/navbar';

export default function Favorites() {
    return (
        <div>
            <Navbar />
            <h1 className="text-4xl font-bold text-center mt-8 text-primary-dark">Favorites</h1>
            <p className="text-center mt-4 text-primary-dark">This is where your favorite recipes will be displayed.</p>
        </div>
    );
}
