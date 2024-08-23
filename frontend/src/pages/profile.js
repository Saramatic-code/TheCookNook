import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Profile() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [bio, setBio] = useState('A passionate cook and food lover.');
    const [profileImage, setProfileImage] = useState('/default-profile.png');

    const handleSave = () => {
        localStorage.setItem('phoneNumber', phoneNumber);
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

    const removeProfileImage = () => {
        setProfileImage('/default-profile.png');
    };

    const sendTestSMS = async () => {
        const response = await fetch('/api/send-sms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber }),
        });

        if (response.ok) {
            alert('Test SMS sent!');
        } else {
            alert('Failed to send SMS.');
        }
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
                            <a href="/profile#personal-info">Personal Info</a>
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
                            <a href="/accountSettings">Account Settings</a>
                        </li>
                        <li className="mb-2 cursor-pointer">
                            <a href="/logout">Logout</a>
                        </li>
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className="main-content max-w-xl mx-auto p-4 text-[#696969]">
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

                    <div className="flex justify-center space-x-4 mt-8">
                        <button className="p-2 bg-[#F29BAA] text-white rounded hover:bg-[#D17384]">
                            Change Profile Picture
                            <input type="file" onChange={handleImageUpload} className="hidden" />
                        </button>
                        <button onClick={removeProfileImage} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
                            Remove Profile Picture
                        </button>
                    </div>

                    <div className="flex flex-col items-center space-y-4 mt-8">
                        <button onClick={handleSave} className="p-2 bg-[#F29BAA] text-white rounded hover:bg-[#D17384]">
                            Save Profile Information
                        </button>
                        <button onClick={sendTestSMS} className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
                            Send Test SMS
                        </button>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
