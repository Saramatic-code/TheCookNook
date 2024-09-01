import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-mutedPink text-center text-[#696969] py-4 relative w-full mt-auto">
            <div className="flex flex-col items-center">
                <img src="/logo.png" alt="Logo" className="h-10 w-10 mb-2" />
                <p>© 2024 Healthy Recipes. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
