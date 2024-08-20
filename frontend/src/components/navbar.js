import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-mutedPink p-4 relative">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        src="/logo.png"
                        alt="Healthy Recipes Logo"
                        style={{ height: '50px', width: '50px' }}
                        className="mr-4"
                    />
                    <span className="text-2xl font-semibold text-secondary">Healthy Recipes</span>
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
                    <a href="/" className="text-secondary hover:text-primary-dark">Home</a>
                    <a href="/recipes" className="text-secondary hover:text-primary-dark">Recipes</a>
                    <a href="/favorites" className="text-secondary hover:text-primary-dark">Favorites</a>
                    <a href="/login" className="text-secondary hover:text-primary-dark">Login</a>
                    <a href="/signup" className="text-secondary hover:text-primary-dark">Signup</a>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-mutedPink shadow-lg z-20">
                    <a href="/" className="block px-4 py-2 text-secondary hover:text-primary-dark">Home</a>
                    <a href="/recipes" className="block px-4 py-2 text-secondary hover:text-primary-dark">Recipes</a>
                    <a href="/favorites" className="block px-4 py-2 text-secondary hover:text-primary-dark">Favorites</a>
                    <a href="/login" className="block px-4 py-2 text-secondary hover:text-primary-dark">Login</a>
                    <a href="/signup" className="block px-4 py-2 text-secondary hover:text-primary-dark">Signup</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
