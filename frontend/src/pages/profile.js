import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Profile() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [bio, setBio] = useState('A passionate cook and food lover.');
    const [profileImage, setProfileImage] = useState('/default-profile.png');
    const [dob, setDob] = useState('1990-01-01');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');

    const handleSave = () => {
        if (phoneNumber || username || email || bio || profileImage !== '/default-profile.png') {
            localStorage.setItem('phoneNumber', phoneNumber);
            alert('Thank you for updating your profile!');
        } else {
            alert('No updates were made.');
        }
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

    const removeProfileImage = () => {
        setProfileImage('/default-profile.png');
    };

    return (
        <div className="wrapper flex">
            <Navbar />
            <div className="flex flex-row w-full p-4 justify-center">
                {/* Sidebar Menu */}
                <div className="sidebar p-4 bg-gray-100 w-1/6 mr-4">
                    <h2 className="font-semibold text-lg mb-4">Profile Settings</h2>
                    <ul>
                        <li className="mb-2 cursor-pointer">
                            <a href="#personal-info">Personal Info</a>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <a href="/favorites">Favorites</a>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <a href="/recentlyViewed">Recently Viewed</a>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <a href="/uploadedRecipes">Uploaded Recipes</a>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <a href="/savedRecipes">Saved Recipes</a>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <a href="/cookingHistory">Cooking History</a>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <a href="/logout">Logout</a>
                        </li>
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className="main-content max-w-3xl mx-auto p-8 text-[#696969] bg-white rounded-lg shadow-md flex-grow">
                    {/* Personal Info Section */}
                    <div id="personal-info" className="mb-8">
                        <h1 className="text-3xl font-bold mb-4">Personal Info</h1>
                        <img
                            src={profileImage}
                            alt="Profile Pic"
                            className="mx-auto rounded-full h-24 w-24 object-cover mb-4"
                        />

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-4 p-2 border rounded w-full"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-4 p-2 border rounded w-full"
                        />
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="mt-4 p-2 border rounded w-full"
                        />
                        <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="mt-4 p-2 border rounded w-full"
                        />
                    </div>

                    {/* Account Settings Section */}
                    <div id="account-settings" className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
                        <div className="w-full max-w-md space-y-4">
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                                Date of Birth
                            </label>
                            <input
                                id="dob"
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                className="p-2 border rounded w-full"
                            />
                        </div>


                        <div className="w-full max-w-md space-y-4 mt-8">
                            <h2 className="text-2xl font-bold">Security Settings</h2>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-2 border rounded w-full"
                                placeholder="Current Password"
                            />
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="p-2 border rounded w-full"
                                placeholder="New Password"
                            />
                            <input
                                type="text"
                                value={securityQuestion}
                                onChange={(e) => setSecurityQuestion(e.target.value)}
                                className="p-2 border rounded w-full"
                                placeholder="Security Question"
                            />
                            <input
                                type="text"
                                value={securityAnswer}
                                onChange={(e) => setSecurityAnswer(e.target.value)}
                                className="p-2 border rounded w-full"
                                placeholder="Security Answer"
                            />
                        </div>
                    </div>

                    {/* Profile Picture Management */}
                    <div className="flex justify-center space-x-4 mt-8">
                        <button className="p-2 bg-[#F29BAA] text-white rounded hover:bg-[#D17384]">
                            <label htmlFor="file-upload" className="cursor-pointer">
                                Change Profile Picture
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </button>
                        <button onClick={removeProfileImage} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
                            Remove Profile Picture
                        </button>
                        <button onClick={handleSave} className="p-2 bg-[#F29BAA] text-white rounded hover:bg-[#D17384]">
                            Save Profile Information
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
