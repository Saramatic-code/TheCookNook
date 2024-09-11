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

        return () => setIsLoggingOut(false); // Cleanup to handle component unmount
    }, [router]);

    return (
        <div className="wrapper flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 items-center justify-center p-6">
                {isLoggingOut ? (
                    <div className="text-center">
                        <p className="text-xl font-semibold text-gray-700">Logging you out...</p>
                        <div className="mt-4">
                            <div className="loader"></div> {/* Simple CSS loader */}
                        </div>
                    </div>
                ) : null}
            </div>
            <Footer />
            <style jsx>{`
                .loader {
                    border: 4px solid #f3f3f3; 
                    border-top: 4px solid #3498db;
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
