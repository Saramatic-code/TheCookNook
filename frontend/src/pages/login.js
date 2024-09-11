import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Perform login operations (e.g., validate credentials)
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.email === email && storedUser.password === password) {
            alert('Login successful!');
            router.push('/profile');  // Redirect to profile page
        } else {
            alert('Invalid email or password.');
        }
    };

    return (
        <div className="wrapper flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 items-center justify-center p-4">
                <div className="main-content max-w-3xl w-full mx-auto p-6 text-[#696969] bg-white rounded-lg shadow-md space-y-4">
                    <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-4 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-4 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Password"
                    />
                    <button onClick={handleLogin} className="p-2 mt-6 bg-primary-light text-primary-dark rounded hover:bg-primary transition-colors w-full">
                        Login
                    </button>
                    <p className="text-center mt-4">
                        Don't have an account? <a href="/register" className="text-primary hover:underline">Register here</a>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
