'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import PromptCard from '@/components/PromptCard';
import FilterControls from '@/components/FilterControls';
import toast from 'react-hot-toast';

type Prompt = {
  id: number;
  title: string;
  prompt_text: string;
  category: string;
  use_case: string;
};

export default function HomePage() {
  const [allPrompts, setAllPrompts] = useState<Prompt[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedPromptIds, setSavedPromptIds] = useState<Set<number>>(new Set());

  // 1. State for our filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // This effect runs only once to fetch all the initial data
  useEffect(() => {
    const fetchData = async () => {
      const { data: allPrompts, error: promptsError } = await supabase.from('prompts').select('*');
      if (promptsError) console.error('Error fetching prompts:', promptsError);
      else if (allPrompts) {
        setAllPrompts(allPrompts);
        setFilteredPrompts(allPrompts); // Initially, show all prompts
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: saved, error: savedError } = await supabase
          .from('saved_prompts').select('prompt_id').eq('user_id', user.id);
        if (savedError) console.error('Error fetching saved prompts:', savedError);
        else if (saved) setSavedPromptIds(new Set(saved.map(item => item.prompt_id)));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // 2. This effect runs whenever the filters or the original prompts change
  useEffect(() => {
    let prompts = [...allPrompts];

    // Apply search filter
    if (searchTerm) {
      prompts = prompts.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.prompt_text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All Categories') {
      prompts = prompts.filter(p => p.category === selectedCategory);
    }

    setFilteredPrompts(prompts);
  }, [searchTerm, selectedCategory, allPrompts]);

  // The logic for saving a prompt now lives on the homepage.
  const handleSave = async (promptId: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('You must be logged in to save a prompt.');
      return;
    }
    const { error } = await supabase.from('saved_prompts').insert({
      user_id: user.id,
      prompt_id: promptId,
    });

    if (error) {
      toast.error('This prompt is already saved.');
    } else {
      // Instead of reloading, we just update our state!
      setSavedPromptIds(prevIds => new Set(prevIds).add(promptId));
      toast.success('Prompt saved successfully!');
    }
  };
  return (
    <>
      {/* THEME UPDATE: Hero Section with a medium blue background and shadow */}
      <div className="bg-[#2E4F64] shadow-2xl">
        <div className="container mx-auto text-center py-16 md:py-20 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            AI Prompt Database
          </h1>
          <p className="text-lg md:text-xl text-sky-100 max-w-3xl mx-auto">
            Unlock the full potential of AI. Browse, save, and use the best prompts for any task.
          </p>
        </div>
      </div>

      {/* Main Content Area (on the main light blue background) */}
      <div className="container mx-auto p-4 md:p-8">
        <FilterControls 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={['All Categories', ...new Set(allPrompts.map(p => p.category))]}
        />

        {loading ? (
          <p className="text-center">Loading prompts...</p>
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