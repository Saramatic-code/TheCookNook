import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-mutedPink p-4">
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

                <div className="hidden md:flex space-x-8">
                    <a href="/" className="text-secondary hover:text-primary-dark">Home</a>
                    <a href="/contact" className="text-secondary hover:text-primary-dark">Contact Us</a>
                    <a href="/login" className="text-secondary hover:text-primary-dark">Login</a>
                    <a href="/signup" className="text-secondary hover:text-primary-dark">Signup</a>
                    <a href="/favorites" className="text-secondary hover:text-primary-dark">Favorites</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
