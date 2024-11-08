// src/pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleLogin = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.email === email && storedUser.password === password) {
            alert('Login successful!');
            router.push('/profile');
        } else {
            alert('Invalid email or password.');
        }
    };

    return (
        <div className="wrapper flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-1 items-center justify-center p-4">
                <div className="main-content max-w-lg w-full mx-auto p-8 text-gray-700 bg-white rounded-lg shadow-lg space-y-6">
                    <h1 className="text-3xl font-bold text-center text-primary">Login</h1>
                    <div className="space-y-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Email"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-sm text-primary hover:text-primary-dark focus:outline-none"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={handleLogin}
                        className="w-full p-3 mt-4 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition-colors"
                    >
                        Login
                    </button>
                    <p className="text-center mt-4 text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" legacyBehavior>
                            <a className="text-primary hover:underline">Register here</a>
                        </Link>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
