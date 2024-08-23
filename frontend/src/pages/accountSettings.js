import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AccountSettings() {
    return (
        <div className="wrapper flex">
            <Navbar />
            <div className="main-content max-w-xl mx-auto p-4 text-[#696969]">
                <h1 className="text-3xl font-bold mb-4">Account Settings</h1>
                <p>Here you can update your password, notification preferences, privacy settings, and delete your account.</p>
            </div>
            <Footer />
        </div>
    );
}
