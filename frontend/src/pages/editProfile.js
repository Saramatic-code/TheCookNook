import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Image from 'next/image';

export default function EditProfile() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState('/default-profile.png');
    const [receiveSMSNotifications, setReceiveSMSNotifications] = useState(true);
    const [profileVisibility, setProfileVisibility] = useState('public');
    const [securityQuestion, setSecurityQuestion] = useState("What was your first pet's name?");
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const profileData = JSON.parse(localStorage.getItem('profile')) || {};
        setPhoneNumber(profileData.phoneNumber || '');
        setUsername(profileData.username || '');
        setEmail(profileData.email || '');
        setBio(profileData.bio || '');
        setProfileImage(profileData.profileImage || '/default-profile.png');
        setReceiveSMSNotifications(profileData.account_settings?.receive_sms_notifications ?? true);
        setProfileVisibility(profileData.account_settings?.profile_visibility ?? 'public');
        setSecurityQuestion(profileData.security?.security_question || "What was your first pet's name?");
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

    return (
        <div className="wrapper flex flex-col min-h-screen bg-pink-100">
            <Navbar />
            <div className="flex flex-col md:flex-row w-full p-4 justify-center space-y-4 md:space-y-0">

                {/* Sidebar Component */}
                <Sidebar
                    isDropdownOpen={isDropdownOpen}
                    toggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="md:w-64 w-full sticky top-24 md:mr-8"
                />

                {/* Main Content Area */}
                <div className="flex-1 max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
                    <h1 className="text-2xl font-bold text-center text-[#696969] mb-4">Edit Profile</h1>

                    <form>
                        {/* Profile Image */}
                        <div className="flex flex-col items-center mb-6">
                            <Image
                                src={profileImage}
                                alt="Profile Pic"
                                className="rounded-full h-32 w-32 object-cover mb-4 border-4 border-primary shadow-md"
                                width={128}
                                height={128}
                            />
                            <button className="p-2 px-4 bg-primary-light text-primary-dark rounded-full hover:bg-primary transition-colors font-semibold">
                                <label className="cursor-pointer">
                                    Change Profile Picture
                                    <input type="file" onChange={handleImageUpload} className="hidden" />
                                </label>
                            </button>
                        </div>

                        {/* User Information */}
                        <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
                            <h2 className="text-xl font-semibold text-[#696969]">User Information</h2>
                            <div>
                                <label className="block font-semibold text-gray-800">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-2 border rounded text-gray-700"
                                    placeholder="Username"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold text-[#696969]">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 border rounded text-gray-700"
                                    placeholder="Email"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold text-[#696969]">Bio</label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="w-full p-2 border rounded text-gray-700"
                                    placeholder="Bio"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold text-[#696969]">Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter your phone number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full p-2 border rounded text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Account Settings */}
                        <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <h2 className="text-xl font-semibold mb-2 text-[#696969]">Account Settings</h2>
                            <div className="flex items-center mb-4 space-x-3">
                                <label className="text-[#696969]">Receive SMS Notifications:</label>
                                <input
                                    type="checkbox"
                                    checked={receiveSMSNotifications}
                                    onChange={(e) => setReceiveSMSNotifications(e.target.checked)}
                                    className="transform scale-125"
                                />
                            </div>
                            <label className="text-[#696969]">Profile Visibility:</label>
                            <select
                                value={profileVisibility}
                                onChange={(e) => setProfileVisibility(e.target.value)}
                                className="w-full p-2 border rounded mt-2 text-[#696969]"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>

                        {/* Security Settings */}
                        <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <h2 className="text-xl font-semibold mb-2 text-[#696969]">Security</h2>
                            <input
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full p-2 border rounded mb-4 text-gray-700"
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-2 border rounded mb-4 text-[#696969]"
                            />
                            <input
                                type="text"
                                placeholder="Security Question"
                                value={securityQuestion}
                                onChange={(e) => setSecurityQuestion(e.target.value)}
                                className="w-full p-2 border rounded mb-4 text-[#696969]"
                            />
                            <input
                                type="text"
                                placeholder="Security Answer"
                                value={securityAnswer}
                                onChange={(e) => setSecurityAnswer(e.target.value)}
                                className="w-full p-2 border rounded mb-4 text-[#696969]"
                            />
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            className="w-full p-3 bg-primary text-white rounded font-semibold hover:bg-primary-dark transition-colors mt-6"
                        >
                            Save Profile Information
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
