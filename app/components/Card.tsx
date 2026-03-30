'use client'
import React, { useState, useEffect } from 'react';

// Define the shape of a product object
interface Product {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string;
}

const Card: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);

  // Generate a single product with real image URL
  const generateProduct = (): Product => {
    return {
      id: 1,
      title: "Eco Bottle Pro",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
      link: "/products/eco-bottle",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };
  };

  // Initialize product on component mount
  useEffect(() => {
    setProduct(generateProduct());
  }, []);

  if (!product) {
    return null; // Or a loading spinner
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">

      <div className="flex justify-center">
        {/* Single Card with SVG circle background */}
        <article className="max-w-md w-full rounded-2xl bg-[#EAEAF3] shadow-sm flex flex-col relative overflow-hidden">
          {/* SVG Circle Decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="absolute -top-20 -right-20 w-64 h-64" viewBox="0 0 200 200" fill="none">
              <circle cx="160" cy="40" r="80" fill="rgba(14, 165, 233, 0.08)" />
            </svg>
            <svg className="absolute -bottom-20 -left-20 w-80 h-80 opacity-40" viewBox="0 0 200 200" fill="none">
              <circle cx="40" cy="160" r="100" fill="rgba(14, 165, 233, 0.06)" />
            </svg>
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="90" stroke="rgba(14, 165, 233, 0.05)" strokeWidth="2" />
              <circle cx="100" cy="100" r="70" stroke="rgba(14, 165, 233, 0.05)" strokeWidth="2" />
            </svg>
          </div>

          {/* Content wrapper with padding */}
          <div className="p-8 flex flex-col h-full relative z-10">
            <div className="space-y-5 flex-1">
              {/* Image */}
              <img
                className="w-full h-44 object-cover rounded-2xl shadow-md"
                src={product.image}
                alt={product.title}
                loading="lazy"
              />
              <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">
                {product.title}
              </h3>
              <p className="text-slate-700">{product.description}</p>
            </div>

            {/* Button aligned at bottom */}
            <div className="pt-6 mt-auto">
              <a
                href={product.link}
                className="group inline-flex items-center gap-2 font-bold text-sky-600 hover:text-indigo-700 transition-colors"
              >
                <span>Learn more</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="stroke-sky-600 group-hover:stroke-indigo-700 transition-colors"
                >
                  <path d="M5 10.707L10 5.70703L5 0.707031" strokeWidth="2" />
                  <path d="M10 5.70703L0 5.70703" strokeWidth="2" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Card;