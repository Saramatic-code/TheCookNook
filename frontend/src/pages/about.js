import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function About() {
    return (
        <div
            className="wrapper flex flex-col min-h-screen bg-center bg-no-repeat lg:bg-cover"
            style={{
                backgroundImage: "url('/about_background2.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
            <Navbar />
            <main
                className="flex-grow flex items-center justify-center px-6 py-12 lg:bg-[url('/about_background.png')]"
                style={{
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="max-w-3xl w-full text-[#696969] space-y-12 md:space-y-8 px-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-10" style={{ fontFamily: "Playwrite CO, cursive", color: "#696969" }}>
                        A Place Where Recipes Bring Us Together
                    </h1>

                    {/* First paragraph with an image to the right */}
                    <div className="flex flex-col md:flex-row items-start mb-10 space-y-6 md:space-y-0 md:space-x-6">
                        <p className="leading-relaxed text-justify indent-6 md:w-3/4" style={{ fontFamily: "Playwrite CO, cursive", color: "#696969" }}>
                            "The Cook Nook" was born out of a deep desire to preserve family history and share cherished memories with loved ones. My mom has a treasure trove of family recipes passed down through generations—some even written in Italian. These recipes aren’t just about food; they represent moments of family togetherness, holidays, and special occasions that are etched in our hearts.
                        </p>
                        <div className="md:w-1/4 mx-auto md:mx-0">
                            <Image
                                src="/familypic1.png"
                                alt="Family Cooking"
                                width={200}
                                height={200}
                                className="rounded-xl shadow-lg"
                                style={{ backgroundColor: "#f5e6d7", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1), 0px 0px 6px rgba(245, 230, 215, 0.4)" }}
                            />
                        </div>
                    </div>

                    {/* Second paragraph with an image to the left */}
                    <div className="flex flex-col md:flex-row items-start mb-10 space-y-6 md:space-y-0 md:space-x-6">
                        <div className="md:w-1/4 mx-auto md:mx-0">
                            <Image
                                src="/familypic2.png"
                                alt="Family Cooking"
                                width={200}
                                height={200}
                                className="rounded-xl shadow-lg"
                                style={{ backgroundColor: "#f5e6d7", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1), 0px 0px 6px rgba(245, 230, 215, 0.4)" }}
                            />
                        </div>
                        <p className="leading-relaxed text-justify indent-6 md:w-3/4" style={{ fontFamily: "Playwrite CO, cursive", color: "#696969" }}>
                            Over the years, the paper copies of these recipes began to show their age—some got separated, others became soiled from use in the kitchen. While paper is a wonderful way to store these precious heirlooms, time has shown us that it's not always the most reliable.
                        </p>
                    </div>

                    {/* Third paragraph with another image to the right */}
                    <div className="flex flex-col md:flex-row items-start mb-10 space-y-6 md:space-y-0 md:space-x-6">
                        <p className="leading-relaxed text-justify indent-6 md:w-3/4" style={{ fontFamily: "Playwrite CO, cursive", color: "#696969" }}>
                            "The Cook Nook" is more than just a recipe website; it's a place to connect with family and friends over the love of cooking. It allows us to digitize our cherished recipes, store images of old recipe pages, and even offer specific permissions so that the most treasured family recipes remain just that—family treasures.
                        </p>
                        <div className="md:w-1/4 mx-auto md:mx-0">
                            <Image
                                src="/familypic3.png"
                                alt="Family Cooking"
                                width={200}
                                height={200}
                                className="rounded-xl shadow-lg"
                                style={{ backgroundColor: "#f5e6d7", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1), 0px 0px 6px rgba(245, 230, 215, 0.4)" }}
                            />
                        </div>
                    </div>

                    {/* Remaining paragraphs without images */}
                    <p className="leading-relaxed text-justify indent-6" style={{ fontFamily: "Playwrite CO, cursive", color: "#696969" }}>
                        I remember growing up cooking, baking, and making chocolates with three generations of my family. The feeling of togetherness, of creating something with love alongside my mom and grandma, is one of my most treasured memories. "The Cook Nook" is my way of offering that feeling to others, even when we can't be physically together.
                    </p>

                    <p className="leading-relaxed text-justify indent-6" style={{ fontFamily: "Playwrite CO, cursive", color: "#696969" }}>
                        Beyond my family, I want to share this experience with others who are like-minded—those who want to share, create, and build stronger relationships through the simple joy of cooking. Whether you’re looking to connect with loved ones, organize your own family recipes, or create new dishes with friends from afar, "The Cook Nook" makes it possible with just a click of a button.
                    </p>

                    {/* Closing paragraph with larger font */}
                    <p className="text-center mt-10 text-2xl md:text-3xl font-semibold" style={{ fontFamily: "Playwrite CO, cursive", color: "#696969" }}>
                        Welcome to "The Cook Nook"—a community where family, friends, and food come together to create lasting bonds. Let's cook, share, and build memories, one recipe at a time.
                    </p>

                    {/* Signature with tagline */}
                    <div className="flex flex-col items-end mt-5 space-y-1">
                        <p className="text-lg md:text-2xl italic text-right" style={{ fontFamily: "Playwrite CO, cursive", color: "#696969" }}>
                            With Lots of Love, xoxo
                        </p>
                        <Image
                            src="/Mysignature.png"
                            alt="Signature"
                            width={150}
                            height={70}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
