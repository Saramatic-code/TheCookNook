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
            <div className="flex flex-row w-full p-4">
                {/* Sidebar Menu */}
                <div className="sidebar p-4 bg-gray-100 w-1/4 mr-4">
                    <h2 className="font-semibold text-lg mb-4">Profile Settings</h2>
                    <ul>
                        <li className="mb-2"><a href="#personal-info">Personal Info</a></li>
                        <li className="mb-2"><a href="#activity">User Activity</a></li>
                        <li className="mb-2"><a href="#account-settings">Account Settings</a></li>
                        <li className="mb-2"><a href="#social-features">Social Features</a></li>
                        <li className="mb-2"><a href="#personalization">Personalization</a></li>
                        <li className="mb-2"><a href="#user-contributions">User Contributions</a></li>
                        <li className="mb-2"><a href="#stats">Statistics & Analytics</a></li>
                        <li className="mb-2"><a href="#logout">Logout</a></li>
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className="main-content flex-1 p-4 text-[#696969]">
                    <div id="personal-info" className="mb-8">
                        <h1 className="text-3xl font-bold mb-4">Personal Info</h1>
                        <img
                            src={profileImage}
                            alt="Profile Pic"
                            className="mx-auto rounded-full h-24 w-24 object-cover mb-4"
                        />
                        <button className="inline-block mb-4 text-[#696969] cursor-pointer hover:underline">
                            Change Profile Picture
                        </button>
                        <button onClick={removeProfileImage} className="mb-4 p-2 bg-red-500 text-white rounded hover:bg-red-600">
                            Remove Profile Picture
                        </button>
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

                    {/* Add the rest of the sections (activity, account settings, etc.) here */}

                    <div className="flex justify-end space-x-4 mt-8">
                        <button onClick={handleSave} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
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
