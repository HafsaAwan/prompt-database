'use client';

import React from 'react';

// The props this component expects. We've re-added the search-related props.
type FilterControlsProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
};


export default function FilterControls({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
}: FilterControlsProps) {
  return (
    <section id="browse" className="bg-background-start/70 backdrop-blur-md border border-glass-border rounded-3xl p-8 mb-16 animate-fadeInUp">
      
      {/* Section Heading */}
      <div className="text-center mb-12">
        <h2 className="font-poppins font-bold text-3xl text-text-primary">
          Browse by Vibe, Category, or Use Case
        </h2>
      </div>

      {/* Grid container for the category cards */}
      <div className="flex justify-center flex-wrap gap-4 mb-10">
        {/* The component now maps over the dynamic categories from your database */}
        {categories.map((category) => (
          <button 
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="group relative block text-center"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-secondary to-accent-primary rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
            <div className={`relative bg-glass-bg border rounded-2xl p-6 h-full flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1 ${selectedCategory === category ? 'border-accent-primary' : 'border-glass-border'}`}>
              
              {/* CHANGE: The iconMap and icon div have been removed */}
              <h3 className={`font-poppins font-semibold text-sm ${selectedCategory === category ? 'text-accent-primary' : 'text-text-primary'}`}>
                {category}
              </h3>

            </div>
          </button>
        ))}
      </div>
      
      {/* Search Bar */}
      <div className="relative max-w-2xl w-full mx-auto">
          <input
            type="text"
            placeholder="Or search for something specific..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-glass-bg border border-glass-border rounded-full py-3 pl-6 pr-4 text-text-primary placeholder:text-text-secondary focus:ring-2 focus:ring-accent-primary focus:outline-none transition-all duration-300"
          />
      </div>
    </section>
  );
}