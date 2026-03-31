'use client';

import { useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const PromotionalBanner = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[500px] overflow-hidden bg-fixed bg-center bg-cover bg-no-repeat mt-20"
            style={{ backgroundImage: "url('/img/slide-05.jpg')" }}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-6">
                {!isPlaying ? (
                    <>
                        {/* Heading */}
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-2xl z-10">
                            Need Fast & Secure Broadband? Use Orange Communication & The Real Network.
                        </h2>
                        {/* Two Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 z-10">
                            <button
                                className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
                                aria-label="Explore Our Plans"
                            >
                                Explore Our Plans
                            </button>
                            <button
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
                                aria-label="Call us"
                            >
                                +8001771585899
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="relative w-full max-w-4xl aspect-video z-20 mx-auto">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsPlaying(false)}
                            className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all z-30"
                            aria-label="Close video"
                        >
                            <FaTimes className="text-xl" />
                        </button>

                        {/* Autoplay YouTube Video */}
                        <iframe
                            className="w-full h-full border-0 rounded-2xl shadow-lg"
                            src="https://www.youtube.com/embed/df_Od5pIpEU?autoplay=1&mute=1"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 z-0" />
        </section>
    );
};

export default PromotionalBanner;