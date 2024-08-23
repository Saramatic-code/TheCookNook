import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Footer from '../components/Footer';

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        // Perform logout operations (e.g., clear tokens, etc.)
        alert('You have been logged out.');
        router.push('/login');  // Redirect to login page
    }, [router]);

    return null;  // Or a loading spinner while logging out
}
