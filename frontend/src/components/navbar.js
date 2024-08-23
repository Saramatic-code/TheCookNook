import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-mutedPink p-4 relative">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/" legacyBehavior>
                        <a>
                            <img
                                src="/logo.png"
                                alt="Healthy Recipes Logo"
                                style={{ height: '50px', width: '50px' }}
                                className="mr-4"
                            />
                        </a>
                    </Link>
                    <span className="text-2xl font-semibold text-[#696969]">Healthy Recipes</span>
                </div>

                {/* Hamburger Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-secondary focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>

                {/* Links for Desktop */}
                <div className="hidden md:flex space-x-8">
                    <Link href="/" legacyBehavior>
                        <a className="text-[#696969] hover:text-primary-dark">Home</a>
                    </Link>
                    <Link href="/recipes" legacyBehavior>
                        <a className="text-[#696969] hover:text-primary-dark">Recipes</a>
                    </Link>
                    <Link href="/favorites" legacyBehavior>
                        <a className="text-[#696969] hover:text-primary-dark">Favorites</a>
                    </Link>
                    <Link href="/login" legacyBehavior>
                        <a className="text-[#696969] hover:text-primary-dark">Login</a>
                    </Link>
                    <Link href="/signup" legacyBehavior>
                        <a className="text-[#696969] hover:text-primary-dark">Signup</a>
                    </Link>
                    <Link href="/profile" legacyBehavior>
                        <a className="text-[#696969] hover:text-primary-dark">Profile</a>
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-mutedPink shadow-lg z-20">
                    <Link href="/" legacyBehavior>
                        <a className="block px-4 py-2 text-secondary hover:text-primary-dark">Home</a>
                    </Link>
                    <Link href="/recipes" legacyBehavior>
                        <a className="block px-4 py-2 text-secondary hover:text-primary-dark">Recipes</a>
                    </Link>
                    <Link href="/favorites" legacyBehavior>
                        <a className="block px-4 py-2 text-secondary hover:text-primary-dark">Favorites</a>
                    </Link>
                    <Link href="/login" legacyBehavior>
                        <a className="block px-4 py-2 text-secondary hover:text-primary-dark">Login</a>
                    </Link>
                    <Link href="/signup" legacyBehavior>
                        <a className="block px-4 py-2 text-secondary hover:text-primary-dark">Signup</a>
                    </Link>
                    <Link href="/profile" legacyBehavior>
                        <a className="block px-4 py-2 text-secondary hover:text-primary-dark">Profile</a>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
