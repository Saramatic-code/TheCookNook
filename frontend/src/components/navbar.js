import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = () => {
            setIsOpen(false);
        };

        router.events.on('routeChangeStart', handleRouteChange);
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-mutedPink py-2 px-4">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center relative">
                {/* Logo and Site Title */}
                <div className="flex items-center">
                    <Link href="/" legacyBehavior>
                        <a className="flex items-center">
                            {/* Display both parts of the logo side by side */}
                            <img
                                src="/logo_p1.png"
                                alt="The Cook Nook Logo Part 1"
                                className="h-12 w-auto mr-2"
                            />
                            {/* HTML for logo part 2 */}
                            <div className="ml-2 text-center flex flex-col items-center text-[#696969]">
                                <div className="text-3xl font-belleza">The Cook Nook</div>
                                <div className="text-sm font-josefin-italic italic">Connecting with Flavors</div>
                            </div>
                        </a>
                    </Link>
                </div>

                {/* Hamburger Menu Button for Mobile */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-secondary focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-8">
                    <Link href="/" legacyBehavior>
                        <a className="text-[#696969] hover:text-primary-dark transition-colors text-lg">Home</a>
                    </Link>
                    <Link href="/myRecipes" legacyBehavior>
                        <a className="text-[#696969] hover:text-primary-dark transition-colors text-lg">My Recipes</a>
                    </Link>
                    <Link href="/addRecipe" legacyBehavior>
                        <a className="text-[#696969] hover:text-primary-dark transition-colors text-lg">Add Recipe</a>
                    </Link>
                    <Link href="/favorites" legacyBehavior>
                        <a className="text-[#696969] hover:text-primary-dark transition-colors text-lg">Favorites</a>
                    </Link>
                    <Link href="/login" legacyBehavior>
                        <a className="text-[#696969] hover:text-primary-dark transition-colors text-lg">Login</a>
                    </Link>
                    <Link href="/register" legacyBehavior>
                        <a className="text-[#696969] hover:text-primary-dark transition-colors text-lg">Register</a>
                    </Link>
                    <Link href="/profile" legacyBehavior>
                        <a className="text-[#696969] hover:text-primary-dark transition-colors text-lg">Profile</a>
                    </Link>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-mutedPink shadow-lg z-20">
                        <Link href="/" legacyBehavior>
                            <a className="block px-4 py-2 text-secondary hover:text-primary-dark transition-colors" onClick={toggleMenu}>Home</a>
                        </Link>
                        <Link href="/myRecipes" legacyBehavior>
                            <a className="block px-4 py-2 text-secondary hover:text-primary-dark transition-colors" onClick={toggleMenu}>My Recipes</a>
                        </Link>
                        <Link href="/addRecipe" legacyBehavior>
                            <a className="block px-4 py-2 text-secondary hover:text-primary-dark transition-colors" onClick={toggleMenu}>Add Recipe</a>
                        </Link>
                        <Link href="/favorites" legacyBehavior>
                            <a className="block px-4 py-2 text-secondary hover:text-primary-dark transition-colors" onClick={toggleMenu}>Favorites</a>
                        </Link>
                        <Link href="/login" legacyBehavior>
                            <a className="block px-4 py-2 text-secondary hover:text-primary-dark transition-colors" onClick={toggleMenu}>Login</a>
                        </Link>
                        <Link href="/register" legacyBehavior>
                            <a className="block px-4 py-2 text-secondary hover:text-primary-dark transition-colors" onClick={toggleMenu}>Register</a>
                        </Link>
                        <Link href="/profile" legacyBehavior>
                            <a className="block px-4 py-2 text-secondary hover:text-primary-dark transition-colors" onClick={toggleMenu}>Profile</a>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
