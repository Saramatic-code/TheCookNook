import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SearchBar from './SearchBar';
import api from '../api/axios';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuExpanded, setIsMenuExpanded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileImage, setProfileImage] = useState('/default-profile.png');
    const router = useRouter();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await api.get('/auth/status');
                if (response.data.isLoggedIn) {
                    setIsLoggedIn(true);
                    setProfileImage(response.data.profileImage || '/default-profile.png');
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };
        checkLoginStatus();
    }, []);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const toggleNestedMenu = () => setIsMenuExpanded((prev) => !prev);

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            setIsLoggedIn(false);
            router.push('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className="bg-mutedPink py-3 shadow-md relative z-30">
            <div className="container mx-auto max-w-screen-xl flex justify-between items-center px-4">
                {/* Logo and Site Title */}
                <div className="flex items-center space-x-2">
                    <Link href="/" legacyBehavior>
                        <a className="flex items-center">
                            <Image src="/TheCookNook2.png" alt="The Cook Nook Logo" width={60} height={45} />
                            <div className="ml-2 text-center hidden md:block">
                                <div className="text-2xl font-belleza text-[#696969]">The Cook Nook</div>
                                <div className="text-xs italic font-josefin-italic text-[#696969]">A Recipe for Connection</div>
                            </div>
                        </a>
                    </Link>
                </div>

                {/* Centered Search Bar */}
                <div className="flex-grow flex justify-center mx-4">
                    <div className="w-full max-w-md">
                        <SearchBar />
                    </div>
                </div>

                {/* Profile Image as Main Menu Button for Mobile */}
                <div className="md:hidden relative">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <Image src={profileImage} alt="Profile" width={40} height={40} className="rounded-full" />
                    </button>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/" className="text-[#696969] hover:text-primary-dark transition-colors text-lg">Home</Link>
                    <Link href="/about" className="text-[#696969] hover:text-primary-dark transition-colors text-lg">About</Link>
                    <Link href="/myRecipes" className="text-[#696969] hover:text-primary-dark transition-colors text-lg">My Recipes</Link>
                    <Link href="/addRecipe" className="text-[#696969] hover:text-primary-dark transition-colors text-lg">Add Recipe</Link>
                    <Link href="/favorites" className="text-[#696969] hover:text-primary-dark transition-colors text-lg">Favorites</Link>

                    {/* Profile Image and Dropdown for Desktop */}
                    <div className="relative">
                        <button onClick={toggleMenu} className="focus:outline-none">
                            <Image src={profileImage} alt="Profile" width={30} height={30} className="rounded-full" />
                        </button>
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg py-2 z-10">
                                {isLoggedIn ? (
                                    <>
                                        <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-mutedPink transition-colors">Profile</Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-mutedPink transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" className="block px-4 py-2 text-gray-700 hover:bg-mutedPink transition-colors">Login</Link>
                                        <Link href="/register" className="block px-4 py-2 text-gray-700 hover:bg-mutedPink transition-colors">Signup</Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full right-0 w-40 bg-mutedPink shadow-lg z-20 py-4">
                    {/* "Menu" item for Nested Links */}
                    <div className="flex flex-col items-center space-y-2 mb-4">
                        <button
                            onClick={toggleNestedMenu}
                            className="text-gray-700 hover:bg-mutedPink px-4 py-2 rounded-lg transition-colors w-full text-center"
                        >
                            Menu
                        </button>
                        {isMenuExpanded && (
                            <div className="w-full text-center">
                                <Link href="/" className="block px-4 py-2 text-secondary hover:text-primary-dark transition-colors" onClick={toggleMenu}>
                                    Home
                                </Link>
                                <Link href="/about" className="block px-4 py-2 text-secondary hover:text-primary-dark transition-colors" onClick={toggleMenu}>
                                    About
                                </Link>
                                <Link href="/myRecipes" className="block px-4 py-2 text-secondary hover:text-primary-dark transition-colors" onClick={toggleMenu}>
                                    My Recipes
                                </Link>
                                <Link href="/addRecipe" className="block px-4 py-2 text-secondary hover:text-primary-dark transition-colors" onClick={toggleMenu}>
                                    Add Recipe
                                </Link>
                                <Link href="/favorites" className="block px-4 py-2 text-secondary hover:text-primary-dark transition-colors" onClick={toggleMenu}>
                                    Favorites
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Login/Profile Links */}
                    <div className="flex flex-col items-center space-y-2 mt-2">
                        {isLoggedIn ? (
                            <>
                                <Link href="/profile" className="text-gray-700 hover:bg-mutedPink px-4 py-2 rounded-lg transition-colors" onClick={toggleMenu}>
                                    Profile
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        toggleMenu();
                                    }}
                                    className="text-gray-700 hover:bg-mutedPink px-4 py-2 w-full text-center rounded-lg transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-700 hover:bg-mutedPink px-4 py-2 rounded-lg transition-colors" onClick={toggleMenu}>
                                    Login
                                </Link>
                                <Link href="/register" className="text-gray-700 hover:bg-mutedPink px-4 py-2 rounded-lg transition-colors" onClick={toggleMenu}>
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
