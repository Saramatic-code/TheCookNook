// src/pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function Register() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState('/default-profile.png');
    const [receiveSMSNotifications, setReceiveSMSNotifications] = useState(true);

    const handleRegister = () => {
        const userData = {
            username,
            email,
            password,
            phoneNumber,
            bio,
            profileImage,
            account_settings: {
                receive_sms_notifications: receiveSMSNotifications,
            }
        };

        localStorage.setItem('user', JSON.stringify(userData));
        alert('Registration successful!');
        router.push('/login'); // Redirect to login page
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
        <div className="wrapper flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-1 items-center justify-center p-4">
                <div className="main-content max-w-lg w-full mx-auto p-8 bg-white text-gray-700 rounded-lg shadow-lg space-y-6">
                    <h1 className="text-3xl font-bold text-center text-primary">Register</h1>

                    {/* Profile Image Upload */}
                    <div className="flex flex-col items-center mb-6">
                        <Image
                            src={profileImage}
                            alt="Profile Pic"
                            className="rounded-full"
                            width={96}
                            height={96}
                        />
                        <button className="mt-4 p-2 bg-primary-light text-primary-dark rounded hover:bg-primary transition-colors">
                            <label className="cursor-pointer">
                                Change Profile Picture
                                <input type="file" onChange={handleImageUpload} className="hidden" />
                            </label>
                        </button>
                    </div>

                    {/* Form Fields */}
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Username"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Email"
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-sm text-primary hover:text-primary-dark focus:outline-none"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Bio"
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />

                    {/* SMS Notifications Checkbox */}
                    <div className="flex items-center mt-4">
                        <label className="mr-2">Receive SMS Notifications:</label>
                        <input
                            type="checkbox"
                            checked={receiveSMSNotifications}
                            onChange={(e) => setReceiveSMSNotifications(e.target.checked)}
                            className="focus:ring-primary"
                        />
                    </div>

                    {/* Register Button */}
                    <button
                        onClick={handleRegister}
                        className="w-full p-3 mt-6 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition-colors"
                    >
                        Register
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
