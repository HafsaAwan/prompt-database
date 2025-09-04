'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import PromptCard from '@/components/PromptCard';
import FilterControls from '@/components/FilterControls';
import toast from 'react-hot-toast';

// Defines the 'shape' or type for a single prompt object.
type Prompt = {
  id: number;
  title: string;
  prompt_text: string;
  category: string;
  use_case: string;
};

export default function HomePage() {
  // State to hold all prompts fetched from the database once.
  const [allPrompts, setAllPrompts] = useState<Prompt[]>([]);
  // State to hold the prompts that are currently visible after filtering.
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  // State to manage the loading indicator.
  const [loading, setLoading] = useState(true);
  // State to keep track of which prompts the current user has saved.
  const [savedPromptIds, setSavedPromptIds] = useState<Set<number>>(new Set());

  // State for the search term, which will now be passed to FilterControls.
  const [searchTerm, setSearchTerm] = useState('');
  // State for the selected category, controlled by the FilterControls component.
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // This effect runs only once when the page loads to fetch all initial data.
  useEffect(() => {
    const fetchData = async () => {
      // Fetch all prompts from the Supabase 'prompts' table.
      const { data: promptsData, error: promptsError } = await supabase.from('prompts').select('*');
      if (promptsError) {
        console.error('Error fetching prompts:', promptsError);
      } else if (promptsData) {
        setAllPrompts(promptsData);
        setFilteredPrompts(promptsData); // Initially, all prompts are visible.
      }

      // Check if a user is logged in.
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // If a user exists, fetch their saved prompts.
        const { data: savedData, error: savedError } = await supabase
          .from('saved_prompts').select('prompt_id').eq('user_id', user.id);
        if (savedError) {
          console.error('Error fetching saved prompts:', savedError);
        } else if (savedData) {
          // Store the IDs of saved prompts in a Set for quick lookups.
          setSavedPromptIds(new Set(savedData.map(item => item.prompt_id)));
        }
      }
      // Set loading to false once all data is fetched.
      setLoading(false);
    };
    fetchData();
  }, []);

  // This effect re-runs anytime the filters (searchTerm, selectedCategory) or the base prompts change.
  useEffect(() => {
    let prompts = [...allPrompts]; // Start with a fresh copy of all prompts.

    // Apply the category filter based on the FilterControls component.
    if (selectedCategory !== 'All Categories') {
      prompts = prompts.filter(p => p.category === selectedCategory);
    }
    
    // Apply the search filter after the category filter.
    if (searchTerm) {
      prompts = prompts.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.prompt_text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Update the visible prompts.
    setFilteredPrompts(prompts);
  }, [searchTerm, selectedCategory, allPrompts]);

  // This function is passed down to each PromptCard to handle the save action.
  const handleSave = async (promptId: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('You must be logged in to save a prompt.');
      return;
    }
    // Attempt to insert a new row into the 'saved_prompts' table.
    const { error } = await supabase.from('saved_prompts').insert({
      user_id: user.id,
      prompt_id: promptId,
    });

    if (error) {
      // If there's an error (e.g., duplicate), show an error message.
      toast.error('This prompt is already saved.');
    } else {
      // If successful, update the local state to reflect the change immediately.
      setSavedPromptIds(prevIds => new Set(prevIds).add(promptId));
      toast.success('Prompt saved successfully!');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section 
        id="hero" 
        className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      >
        <h1 className="font-poppins font-bold text-4xl md:text-6xl text-text-primary leading-tight md:leading-snug max-w-4xl">
          Discover, Save, and Supercharge Your Ideas with AI Prompts
        </h1>
        <p className="mt-6 text-lg text-text-secondary max-w-3xl mx-auto">
          A curated database of powerful prompts to spark creativity and productivity
        </p>
      </section>

      {/* This container holds all content that appears below the hero */}
      <div className="container mx-auto px-8 md:px-16 pb-24 ">
        
        {/* The newly designed FilterControls component is now rendered here. */}
        {/* We pass all the necessary state and functions down to it as props. */}
        <FilterControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categories={['All Categories', ...new Set(allPrompts.map(p => p.category))]}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* The prompt grid, which is updated by the filters above. */}
        {loading ? (
          <p className="text-center text-text-secondary">Loading prompts...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                id={prompt.id}
                title={prompt.title}
                prompt_text={prompt.prompt_text}
                category={prompt.category}
                use_case={prompt.use_case}
                variant="home"
                isSaved={savedPromptIds.has(prompt.id)}
                onSave={handleSave}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}