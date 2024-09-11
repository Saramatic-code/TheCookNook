import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function EditProfile() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState('/default-profile.png');
    const [receiveSMSNotifications, setReceiveSMSNotifications] = useState(true);
    const [profileVisibility, setProfileVisibility] = useState('public');
    const [securityQuestion, setSecurityQuestion] = useState('What was your first pet\'s name?');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for mobile dropdown menu

    useEffect(() => {
        // Load existing profile data from localStorage
        const profileData = JSON.parse(localStorage.getItem('profile')) || {};
        setPhoneNumber(profileData.phoneNumber || '');
        setUsername(profileData.username || '');
        setEmail(profileData.email || '');
        setBio(profileData.bio || '');
        setProfileImage(profileData.profileImage || '/default-profile.png');
        setReceiveSMSNotifications(profileData.account_settings?.receive_sms_notifications ?? true);
        setProfileVisibility(profileData.account_settings?.profile_visibility ?? 'public');
        setSecurityQuestion(profileData.security?.security_question || 'What was your first pet\'s name?');
        setSecurityAnswer(profileData.security?.security_answer || '');
    }, []);

    const handleSave = () => {
        const profileData = {
            phoneNumber,
            username,
            email,
            bio,
            profileImage,
            account_settings: {
                receive_sms_notifications: receiveSMSNotifications,
                profile_visibility: profileVisibility,
            },
            security: {
                current_password: currentPassword,
                new_password: newPassword,
                security_question: securityQuestion,
                security_answer: securityAnswer,
            },
        };
        localStorage.setItem('profile', JSON.stringify(profileData));
        alert('Profile information saved!');
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBack = () => {
        router.push('/profile');
    };

    return (
        <div className="wrapper flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-col md:flex-row w-full p-4 justify-center relative space-y-4 md:space-y-0">
                {/* Dropdown Menu for Small Screens */}
                <div className="md:hidden w-full p-4">
                    <button
                        className="p-2 bg-gray-100 text-gray-700 rounded-lg shadow-md w-full text-left flex justify-between"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        Profile Settings
                        <span>{isDropdownOpen ? '▲' : '▼'}</span>
                    </button>
                    {isDropdownOpen && (
                        <ul className="bg-gray-100 mt-2 rounded-lg shadow-md p-2">
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="/profile#personal-info" className="hover:text-primary">Personal Info</a>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="/favorites" className="hover:text-primary">Favorites</a>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="/recentlyViewed" className="hover:text-primary">Recently Viewed</a>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="/savedRecipes" className="hover:text-primary">Saved Recipes</a>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="/cookingHistory" className="hover:text-primary">Cooking History</a>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="/editProfile" className="hover:text-primary">Edit Profile</a>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="/oldFavorites" className="hover:text-primary">Old Favorites</a>
                            </li>
                            <li className="cursor-pointer p-2 hover:bg-gray-200">
                                <a href="/logout" className="hover:text-primary">Logout</a>
                            </li>
                        </ul>
                    )}
                </div>

                {/* Sidebar Menu for Larger Screens */}
                <div className="hidden md:block sidebar p-4 bg-gray-100 w-1/4 mr-8 rounded-lg shadow-sm sticky top-16 h-full">
                    <h2 className="font-semibold text-lg mb-4">Profile Settings</h2>
                    <ul className="space-y-2">
                        <li className="cursor-pointer">
                            <a href="/profile#personal-info" className="hover:text-primary">Personal Info</a>
                        </li>
                        <li className="cursor-pointer">
                            <a href="/favorites" className="hover:text-primary">Favorites</a>
                        </li>
                        <li className="cursor-pointer">
                            <a href="/recentlyViewed" className="hover:text-primary">Recently Viewed</a>
                        </li>
                        <li className="cursor-pointer">
                            <a href="/savedRecipes" className="hover:text-primary">Saved Recipes</a>
                        </li>
                        <li className="cursor-pointer">
                            <a href="/cookingHistory" className="hover:text-primary">Cooking History</a>
                        </li>
                        <li className="cursor-pointer">
                            <a href="/editProfile" className="hover:text-primary">Edit Profile</a>
                        </li>
                        <li className="cursor-pointer">
                            <a href="/oldFavorites" className="hover:text-primary">Old Favorites</a>
                        </li>
                        <li className="cursor-pointer">
                            <a href="/logout" className="hover:text-primary">Logout</a>
                        </li>
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className="main-content flex-1 max-w-3xl p-6 text-[#696969] bg-white rounded-lg shadow-md space-y-6">
                    <h1 className="text-3xl font-bold mb-4 text-center">Edit Profile</h1>
                    <div className="flex flex-col items-center mb-4">
                        <img
                            src={profileImage}
                            alt="Profile Pic"
                            className="rounded-full h-24 w-24 object-cover mb-4"
                        />
                        <button className="p-2 bg-primary-light text-primary-dark rounded hover:bg-primary transition-colors mb-4">
                            <label className="cursor-pointer">
                                Change Profile Picture
                                <input type="file" onChange={handleImageUpload} className="hidden" />
                            </label>
                        </button>
                    </div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-4 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Username"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-4 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Email"
                    />
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="mt-4 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Bio"
                    />
                    <input
                        type="text"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-4 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />

                    {/* Account Settings */}
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Account Settings</h2>
                        <div className="flex items-center mb-4">
                            <label className="mr-2">Receive SMS Notifications:</label>
                            <input
                                type="checkbox"
                                checked={receiveSMSNotifications}
                                onChange={(e) => setReceiveSMSNotifications(e.target.checked)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mr-2">Profile Visibility:</label>
                            <select
                                value={profileVisibility}
                                onChange={(e) => setProfileVisibility(e.target.value)}
                                className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                    </div>

                    {/* Security Settings */}
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Security</h2>
                        <input
                            type="password"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary mt-4"
                        />
                        <input
                            type="text"
                            placeholder="Security Question"
                            value={securityQuestion}
                            onChange={(e) => setSecurityQuestion(e.target.value)}
                            className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary mt-4"
                        />
                        <input
                            type="text"
                            placeholder="Security Answer"
                            value={securityAnswer}
                            onChange={(e) => setSecurityAnswer(e.target.value)}
                            className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary mt-4"
                        />
                    </div>

                    <button onClick={handleSave} className="p-2 mt-4 bg-primary-light text-primary-dark rounded hover:bg-primary transition-colors w-full">
                        Save Profile Information
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
