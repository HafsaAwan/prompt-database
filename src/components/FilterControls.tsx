'use client';

import React from 'react';

// 1. Define the "shape" of the props this component expects to receive.
// It needs the current values of the filters and the functions to change them.
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
    <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Search Input */}
        <div className="md:col-span-2">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full bg-slate-50 border-slate-300 rounded-md py-2 px-4 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition"
            placeholder="Search for prompts..."
            // 2. The input's value is now controlled by the state from the homepage.
            value={searchTerm}
            // 3. When the user types, we call the function passed down from the homepage
            //    to update the searchTerm in the parent component's state.
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="sr-only">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="block w-full bg-slate-50 border-slate-300 rounded-md py-2 px-4 text-slate-900 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition"
            value={selectedCategory}
            // When the user selects a new category, we update the parent's state.
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {/* We now dynamically create the list of options from the categories
                array that was passed down from the homepage. */}
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}