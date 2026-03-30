'use client'
import { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

interface CarouselItem {
    id: number;
    title: string;
    description: string;
    image: string;
    ctaText?: string;
    ctaLink?: string;
}

const Carousel = () => {
    // Sample carousel items with images (using Unsplash placeholder images)
    const carouselItems: CarouselItem[] = [
        {
            id: 1,
            title: 'Mountain Adventure',
            description: 'Explore the breathtaking mountain ranges and enjoy nature at its finest.',
            image: '/img/slide-01.jpg',
            ctaText: 'Explore Mountains',
            ctaLink: '#',
        },
        {
            id: 2,
            title: 'Beach Paradise',
            description: 'Relax on pristine beaches with crystal clear waters and white sand.',
            image: '/img/slide-02.jpg',
            ctaText: 'Visit Beaches',
            ctaLink: '#',
        },
        {
            id: 3,
            title: 'City Lights',
            description: 'Experience the vibrant nightlife and modern architecture of metropolitan cities.',
            image: '/img/slide-03.jpg',
            ctaText: 'Explore Cities',
            ctaLink: '#',
        },
        {
            id: 4,
            title: 'Forest Serenity',
            description: 'Discover peace and tranquility in the heart of ancient forests.',
            image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            ctaText: 'Visit Forests',
            ctaLink: '#',
        },
        {
            id: 5,
            title: 'Northern Lights',
            description: 'Witness the magical aurora borealis in arctic regions.',
            image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            ctaText: 'See Auroras',
            ctaLink: '#',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Auto-play interval in milliseconds
    const AUTO_PLAY_INTERVAL = 5000;

    // Minimum swipe distance
    const minSwipeDistance = 50;

    // Preload images
    useEffect(() => {
        const preloadImages = () => {
            const imagePromises = carouselItems.map((item) => {
                return new Promise((resolve, reject) => {
                    const img = new window.Image();
                    img.src = item.image;
                    img.onload = resolve;
                    img.onerror = reject;
                });
            });

            Promise.all(imagePromises)
                .then(() => setIsLoading(false))
                .catch(() => setIsLoading(false));
        };

        preloadImages();
    }, []);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? carouselItems.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === carouselItems.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, carouselItems.length]);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    // Auto-play functionality
    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isAutoPlaying) {
            intervalId = setInterval(() => {
                goToNext();
            }, AUTO_PLAY_INTERVAL);
        }

        // Cleanup interval on unmount or when isAutoPlaying changes
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isAutoPlaying, goToNext]);

    // Touch handlers for mobile swipe
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        // Pause auto-play on touch start
        setIsAutoPlaying(false);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            goToNext();
        } else if (isRightSwipe) {
            goToPrevious();
        }
        
        // Restart auto-play after a delay
        setTimeout(() => {
            setIsAutoPlaying(true);
        }, 3000);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            goToPrevious();
        } else if (e.key === 'ArrowRight') {
            goToNext();
        }
    };

    return (
        <div
            className="relative overflow-hidden w-full transition-all duration-700"
            
        >
            {/* Loading Indicator */}
            {isLoading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-100 rounded-2xl">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading carousel...</p>
                    </div>
                </div>
            )}

            {/* Carousel Container */}
            <div
                className="relative overflow-hidden"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="region"
                aria-label="Image carousel"
            >
                {/* Slides */}
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {carouselItems.map((item) => (
                        <div
                            key={item.id}
                            className="w-full shrink-0 relative"
                        >
                            {/* Image with overlay */}
                            <div className="relative h-96 md:h-96 lg:h-200 xl:h-200">
                                {/* Next.js Image component for optimized loading */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                                        className="object-cover"
                                        priority={item.id === 1}
                                    />
                                </div>

                                {/* Dark overlay for better text readability */}
                                <div className="absolute inset-0 bg-black/40"></div>

                                {/* Gradient overlay for text */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                                {/* Content */}
                                <div className="relative h-full flex flex-col items-center justify-center p-4 md:p-8 text-white">
                                    <div className="max-w-3xl text-center">
                                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 drop-shadow-lg">
                                            {item.title}
                                        </h2>
                                        <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 drop-shadow-md">
                                            {item.description}
                                        </p>
                                        {item.ctaText && (
                                            <a
                                                href={item.ctaLink}
                                                className="inline-block px-6 py-3 md:px-8 md:py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                                                aria-label={`${item.ctaText} - ${item.title}`}
                                            >
                                                {item.ctaText}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 group"
                    aria-label="Previous slide"
                >
                    <FaChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-gray-800" />
                </button>

                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 group"
                    aria-label="Next slide"
                >
                    <FaChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-gray-800" />
                </button>

                {/* Slide Indicators - Mobile Optimized */}
                <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-2 sm:space-x-3">
                    {carouselItems.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className="focus:outline-none transition-all duration-300"
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            <div className="relative">
                                {/* Background circle */}
                                <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                                    currentIndex === index
                                        ? 'bg-white scale-125'
                                        : 'bg-white/50 hover:bg-white/70'
                                    }`} />

                                {/* Active indicator ring animation */}
                                {currentIndex === index && (
                                    <div className="absolute inset-0 -m-0.5 sm:-m-1 border border-white rounded-full animate-ping opacity-50" />
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Current Slide Indicator */}
                <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm md:text-base shadow-lg">
                    <span className="font-semibold">{currentIndex + 1}</span>
                    <span className="mx-1">/</span>
                    <span>{carouselItems.length}</span>
                </div>
            </div>

            {/* Mobile Instructions */}
            <div className="mt-4 text-center text-gray-600 text-sm md:hidden">
                <p className="flex items-center justify-center gap-2">
                    <span>Swipe to navigate</span>
                    <span className="text-xs opacity-70">•</span>
                    <span>Tap dots for slides</span>
                </p>
            </div>
        </div>
    );
};

export default Carousel;