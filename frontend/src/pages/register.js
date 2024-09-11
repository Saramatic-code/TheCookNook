import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Register() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState('/default-profile.png');
    const [receiveSMSNotifications, setReceiveSMSNotifications] = useState(true);

    const handleRegister = () => {
        // Save user data to localStorage or perform registration logic
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
        <div className="wrapper flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 items-center justify-center p-4">
                <div className="main-content max-w-3xl w-full mx-auto p-6 text-[#696969] bg-white rounded-lg shadow-md space-y-4">
                    <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
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
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-4 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Password"
                    />
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="mt-4 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Bio"
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-4 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="flex items-center mt-4">
                        <label className="mr-2">Receive SMS Notifications:</label>
                        <input
                            type="checkbox"
                            checked={receiveSMSNotifications}
                            onChange={(e) => setReceiveSMSNotifications(e.target.checked)}
                        />
                    </div>
                    <button onClick={handleRegister} className="p-2 mt-6 bg-primary-light text-primary-dark rounded hover:bg-primary transition-colors w-full">
                        Register
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
