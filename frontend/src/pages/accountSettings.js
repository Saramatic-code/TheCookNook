import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

export default function AccountSettings() {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

    const handleDelete = () => {
        // Logic for account deletion
        alert("Account deleted successfully!");
        setConfirmDelete(false);
    };

    return (
        <div className="wrapper flex flex-col min-h-screen bg-pink-100">
            <Navbar />
            <div className="flex flex-col md:flex-row w-full p-4 justify-center space-y-4 md:space-y-0">

                {/* Sidebar Component */}
                <Sidebar className="md:w-64 w-full md:mr-8 sticky top-24" />

                {/* Main Content Area */}
                <div className="flex-1 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
                    <h1 className="text-3xl font-bold text-center text-[#696969] mb-4">Account Settings</h1>
                    <p className="text-center text-[#696969] mb-6">Here you can update your password, notification preferences, privacy settings, and delete your account.</p>

                    {/* Password Update */}
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2 text-[#696969]">Update Password</h2>
                        <input
                            type="password"
                            placeholder="Current Password"
                            className="w-full p-2 mb-4 border rounded text-[#696969]"
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full p-2 mb-4 border rounded text-[#696969]"
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="w-full p-2 border rounded text-[#696969]"
                        />
                    </div>

                    {/* Notification Preferences */}
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2 text-[#696969]">Notification Preferences</h2>
                        <div className="flex items-center space-x-3">
                            <label className="text-[#696969]">Receive Email Notifications</label>
                            <input type="checkbox" className="transform scale-125" />
                        </div>
                        <div className="flex items-center space-x-3 mt-4">
                            <label className="text-[#696969]">Receive SMS Notifications</label>
                            <input type="checkbox" className="transform scale-125" />
                        </div>
                    </div>

                    {/* Privacy Settings */}
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2 text-[#696969]">Privacy Settings</h2>
                        <select className="w-full p-2 border rounded text-[#696969]">
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>

                    {/* Centered Delete Account Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => setConfirmDelete(true)}
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition"
                        >
                            Delete Account
                        </button>
                    </div>

                    {/* Confirmation Modal */}
                    {confirmDelete && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                                <h2 className="text-xl font-bold text-center mb-4">Confirm Account Deletion</h2>
                                <p className="text-center mb-4">
                                    Are you sure you want to delete your account? This action cannot be undone.
                                    Please type <span className="font-semibold">DELETE</span> to confirm.
                                </p>
                                <input
                                    type="text"
                                    value={deleteConfirmationText}
                                    onChange={(e) => setDeleteConfirmationText(e.target.value)}
                                    placeholder="Type DELETE"
                                    className="w-full p-2 border rounded mb-4"
                                />
                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
                                        disabled={deleteConfirmationText !== 'DELETE'}
                                    >
                                        Yes, Delete
                                    </button>
                                    <button
                                        onClick={() => setConfirmDelete(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-400 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
