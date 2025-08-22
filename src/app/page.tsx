'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import PromptCard from '@/components/PromptCard';
import FilterControls from '@/components/FilterControls';

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


  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4 text-center">AI Prompt Database</h1>
      <p className="text-zinc-400 text-center mb-8">Find the perfect prompt for any task.</p>

      {/* 3. Pass the state and handler functions to the controls */}
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
          {/* 4. We now map over the filteredPrompts state */}
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
            />
          ))}
        </div>
      )}
    </main>
  );
}