// components/ParallaxBackground.tsx
'use client';

import { useEffect, useRef } from 'react';

interface ParallaxBackgroundProps {
  imageUrl: string;
  children?: React.ReactNode;
  speed?: number;
  height?: string;
  className?: string;
}

export default function ParallaxBackground({
  imageUrl,
  children,
  speed = 0.3,
  height = 'h-screen',
  className = ''
}: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imageRef.current) return;

      const scrolled = window.scrollY;
      const rate = scrolled * speed;
      
      imageRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${height} ${className}`}
    >
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}