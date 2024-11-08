// src/components/Sidebar.js
import Link from 'next/link';
import { FaUser, FaHeart, FaClock, FaUtensils, FaEdit, FaBook, FaCog } from 'react-icons/fa';

export default function Sidebar({ isDropdownOpen, toggleDropdown }) {
    return (
        <div className="relative z-50">
            {/* Mobile Dropdown */}
            <div className="md:hidden w-full px-4 flex justify-center">
                <button
                    className="p-4 bg-primary-light text-gray-700 rounded-lg shadow-lg flex items-center space-x-2 text-lg font-semibold"
                    onClick={toggleDropdown}
                >
                    <span>Menu</span>
                    <span>{isDropdownOpen ? '▲' : '▼'}</span>
                </button>
                {isDropdownOpen && (
                    <ul
                        className="absolute top-14 w-3/4 bg-white rounded-lg shadow-lg p-3 space-y-3 z-50"
                        style={{ zIndex: 1000 }}
                    >
                        <SidebarLinks />
                    </ul>
                )}
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block p-6 bg-white w-64 mr-10 rounded-lg shadow-xl sticky top-24">
                <h2 className="font-bold text-2xl mb-6 text-gray-800">Profile Settings</h2>
                <ul className="space-y-5">
                    <SidebarLinks />
                </ul>
            </div>
        </div>
    );
}

function SidebarLinks() {
    return (
        <>
            {/* Profile Links at the Top */}
            <li className="flex items-center space-x-4 cursor-pointer text-gray-800 hover:text-primary transition duration-200 hover:scale-105">
                <FaUser className="text-xl" />
                <Link href="/profile" className="text-lg font-medium">Profile</Link>
            </li>
            <li className="flex items-center space-x-4 cursor-pointer text-gray-800 hover:text-primary transition duration-200 hover:scale-105">
                <FaEdit className="text-xl" />
                <Link href="/editProfile" className="text-lg font-medium">Edit Profile</Link>
            </li>
            <li className="flex items-center space-x-4 cursor-pointer text-gray-800 hover:text-primary transition duration-200 hover:scale-105">
                <FaCog className="text-xl" />
                <Link href="/accountSettings" className="text-lg font-medium">Account Settings</Link>
            </li>

            {/* Other Links */}
            <li className="flex items-center space-x-4 cursor-pointer text-gray-800 hover:text-primary transition duration-200 hover:scale-105">
                <FaHeart className="text-xl" />
                <Link href="/favorites" className="text-lg font-medium">Favorites</Link>
            </li>
            <li className="flex items-center space-x-4 cursor-pointer text-gray-800 hover:text-primary transition duration-200 hover:scale-105">
                <FaClock className="text-xl" />
                <Link href="/recentlyViewed" className="text-lg font-medium">Recently Viewed</Link>
            </li>
            <li className="flex items-center space-x-4 cursor-pointer text-gray-800 hover:text-primary transition duration-200 hover:scale-105">
                <FaUtensils className="text-xl" />
                <Link href="/cookingHistory" className="text-lg font-medium">Cooking History</Link>
            </li>
            <li className="flex items-center space-x-4 cursor-pointer text-gray-800 hover:text-primary transition duration-200 hover:scale-105">
                <FaBook className="text-xl" />
                <Link href="/savedRecipes" className="text-lg font-medium">Saved Recipes</Link>
            </li>
            <li className="flex items-center space-x-4 cursor-pointer text-gray-800 hover:text-primary transition duration-200 hover:scale-105">
                <FaBook className="text-xl" />
                <Link href="/oldFavorites" className="text-lg font-medium">Old Favorites</Link>
            </li>
        </>
    );
}
