import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-mutedPink text-[#696969] py-12 w-full mt-auto">
            <div className="container mx-auto px-6 flex flex-col items-center space-y-6">
                {/* Get in Touch Section */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-sm max-w-lg mx-auto mb-8">Feel free to reach out to us on social media or sign up for our newsletter to stay updated.</p>

                    {/* Social Media Icons with Bounce Effect */}
                    <div className="flex justify-center space-x-4 mb-8">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <svg className="h-6 w-6 fill-current text-[#4267B2] hover:text-primary-dark hover:animate-bounce transition-all duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M22.675 0H1.325C.594 0 0 .594 0 1.325v21.351C0 23.407.594 24 1.325 24H12.82v-9.294H9.692v-3.62h3.128V8.413c0-3.1 1.892-4.788 4.655-4.788 1.325 0 2.463.099 2.796.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.762v2.31h3.588l-.467 3.62h-3.121V24h6.116c.73 0 1.324-.594 1.324-1.324V1.325C24 .594 23.407 0 22.675 0z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <svg className="h-6 w-6 fill-current text-[#1DA1F2] hover:text-primary-dark hover:animate-bounce transition-all duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.555-2.005.959-3.127 1.184-.897-.958-2.178-1.555-3.594-1.555-2.723 0-4.928 2.205-4.928 4.93 0 .39.045.765.127 1.124-4.093-.205-7.725-2.165-10.15-5.144-.423.725-.664 1.562-.664 2.475 0 1.708.87 3.216 2.191 4.099-.807-.026-1.566-.247-2.229-.616v.062c0 2.385 1.697 4.374 3.946 4.827-.413.112-.849.172-1.296.172-.315 0-.623-.03-.923-.086.623 1.951 2.432 3.374 4.576 3.412-1.676 1.311-3.791 2.096-6.086 2.096-.395 0-.786-.023-1.17-.067 2.176 1.394 4.768 2.209 7.548 2.209 9.142 0 14.307-7.721 14.307-14.415 0-.219-.004-.436-.014-.653.983-.708 1.833-1.597 2.507-2.607z" />
                            </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <svg className="h-6 w-6 fill-current text-[#C13584] hover:text-primary-dark hover:animate-bounce transition-all duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.333 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.333-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.332.015 7.052.073c-1.29.059-2.51.338-3.516 1.344C2.533 2.679 2.255 3.899 2.196 5.188.015 8.332 0 8.741 0 12s.015 3.668.073 4.948c.059 1.29.338 2.51 1.344 3.516.975.975 2.195 1.255 3.484 1.314C8.332 23.985 8.741 24 12 24s3.668-.015 4.948-.073c1.29-.059 2.51-.338 3.516-1.344.975-.975 1.255-2.195 1.314-3.484.058-1.28.073-1.689.073-4.948s-.015-3.668-.073-4.948c-.059-1.29-.338-2.51-1.344-3.516-.975-.975-2.195-1.255-3.484-1.314C15.668.015 15.259 0 12 0zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0-2.882 1.44 1.44 0 0 0 0 2.882z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Boxes Section with Pink Shadow */}
                <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-12">
                    {/* Contact Me Box */}
                    <div className="bg-white p-6 rounded-lg shadow-[0_10px_20px_-10px_rgba(105,105,105,0.75)]
 flex flex-col items-center">
                        <h3 className="text-lg font-bold mb-2">Contact Me</h3>
                        <p className="text-sm mb-4">Send us an email for inquiries.</p>
                        <p className="text-primary-dark">contact@example.com</p>
                    </div>

                    {/* Newsletter Signup Box */}
                    <div className="bg-white p-6 rounded-lg shadow-[0_10px_20px_-10px_rgba(105,105,105,0.75)]
 flex flex-col items-center">
                        <h3 className="text-lg font-bold mb-2">Newsletter</h3>
                        <p className="text-sm mb-4">Sign up to receive the latest updates.</p>
                        <form className="flex flex-col items-center">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:border-primary"
                            />
                            <button
                                type="submit"
                                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-all"
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>

                {/* Logo and Back to Top Section */}
                <div className="flex flex-col items-center text-center mt-8">
                    <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm text-primary-dark hover:underline mb-4">
                        Back to Top
                    </a>
                    <img src="/logo.png" alt="Logo" className="h-12 w-12 md:h-16 md:w-16" />
                    <p className="text-sm md:text-base mt-2">© 2024 Healthy Recipes. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
