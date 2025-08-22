'use client';

import { supabase } from '@/lib/supabase';

// 1. Add 'isSaved' to our type definition. It's a boolean (true or false).
type PromptCardProps = {
  id: number;
  title: string;
  prompt_text: string;
  category: string;
  use_case: string;
  variant: 'home' | 'saved';
  isSaved?: boolean; // The '?' makes it an optional prop
};

export default function PromptCard({ id, title, prompt_text, category, use_case, variant, isSaved }: PromptCardProps) {
  
  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('You must be logged in to save a prompt.');
      return;
    }
    const { error } = await supabase.from('saved_prompts').insert({
      user_id: user.id,
      prompt_id: id,
    });
    if (error) {
      alert('Error saving prompt: ' + error.message);
    } else {
      alert('Prompt saved successfully!');
      // We'll make this update the UI without a full reload later
      window.location.reload();
    }
  };

  const handleRemove = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('You must be logged in to remove a prompt.');
      return;
    }
    const { error } = await supabase
      .from('saved_prompts')
      .delete()
      .eq('user_id', user.id)
      .eq('prompt_id', id);

    if (error) {
      alert('Error removing prompt: ' + error.message);
    } else {
      alert('Prompt removed successfully!');
      window.location.reload();
    }
  };

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 flex flex-col h-full">
      <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
      <p className="text-zinc-400 mb-4 flex-grow">{prompt_text}</p>
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-zinc-700">
        <span className="bg-zinc-700 text-zinc-300 text-xs font-semibold px-2.5 py-1 rounded">
          {category}
        </span>

        {/* This is our logic switch */}
        {variant === 'home' ? (
          // If we are on the homepage...
          isSaved ? (
            // ...and the prompt is already saved, show a disabled button
            <button 
              disabled
              className="text-sm text-zinc-500 cursor-not-allowed"
            >
              Saved
            </button>
          ) : (
            // ...and the prompt is NOT saved, show the active Save button
            <button 
              onClick={handleSave}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Save
            </button>
          )
        ) : (
          // If we are on the 'saved' page, show the Remove button
          <button 
            onClick={handleRemove}
            className="text-sm text-red-400 hover:text-red-300"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}