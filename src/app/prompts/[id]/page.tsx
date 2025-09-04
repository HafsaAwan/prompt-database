'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // 1. Import useParams
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import Link from 'next/link';

// Defines the 'shape' or type for a single prompt object.
type Prompt = {
  id: number;
  title: string;
  prompt_text: string;
  category: string;
  use_case: string;
};

// The component no longer receives `params` as a prop.
export default function PromptDetailPage() {
  // 2. We get the params object using the hook.
  const params = useParams<{ id: string }>();
  // 3. We safely get the id, handling cases where it might be an array.
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(true);

  const handleCopy = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt.prompt_text).then(() => {
        toast.success('Prompt copied to clipboard!');
      });
    }
  };

  useEffect(() => {
    // Return early if the id isn't available yet.
    if (!id) return;
    
    const fetchPrompt = async () => {
      // 4. We use the stable `id` variable in our query.
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching prompt:', error);
      } else if (data) {
        setPrompt(data);
      }
      setLoading(false);
    };

    fetchPrompt();
  // 5. The effect now depends on the `id` from the hook.
  }, [id]);

  if (loading) {
    return <p className="text-center py-24">Loading prompt...</p>;
  }
  
  if (!prompt) {
    return <p className="text-center py-24">Prompt not found.</p>;
  }

  // The rest of your JSX remains the same.
  return (
    <div className="container mx-auto px-8 md:px-16 py-24">
      <div className="max-w-3xl mx-auto">
        
        <Link href="/#browse" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
          &larr; Back to all prompts
        </Link>
        
        <div className="mt-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-white/10 text-accent-primary text-xs font-semibold px-2.5 py-1 rounded-full">
              {prompt.category}
            </span>
            <span className="bg-white/10 text-accent-secondary text-xs font-semibold px-2.5 py-1 rounded-full">
              {prompt.use_case}
            </span>
          </div>
          <h1 className="font-poppins font-bold text-4xl text-text-primary mt-3">
            {prompt.title}
          </h1>
        </div>

        <div className="mt-8 p-6 bg-glass-bg border border-glass-border rounded-2xl">
          <p className="whitespace-pre-wrap text-text-secondary">{prompt.prompt_text}</p>
        </div>

        <div className="mt-8 flex items-center space-x-4">
          <button 
            onClick={handleCopy}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-background-start bg-accent-primary hover:opacity-90 transition-opacity"
          >
            Copy Prompt
          </button>
        </div>
      </div>
    </div>
  );
}