// src/pages/logout.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Logout() {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(true);

    useEffect(() => {
        // Simulate a logout operation
        setTimeout(() => {
            alert('You have been logged out.');
            router.push('/login'); // Redirect to login page
        }, 1000); // Simulate a delay for logging out

        return () => setIsLoggingOut(false); // Optional cleanup for component unmount
    }, [router]);

    return (
        <div className="wrapper flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-1 items-center justify-center p-6">
                {isLoggingOut ? (
                    <div className="text-center">
                        <p className="text-xl font-semibold text-gray-700">Logging you out...</p>
                        <div className="mt-4">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-primary"></div> {/* Tailwind spinner */}
                        </div>
                    </div>
                ) : null}
            </div>
            <Footer />
        </div>
    );
}
