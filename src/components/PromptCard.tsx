'use client';

import { supabase } from '@/lib/supabase';

type PromptCardProps = {
  id: number;
  title: string;
  prompt_text: string;
  category: string;
  use_case: string;
  variant: 'home' | 'saved';
  isSaved?: boolean;
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
        {/* This div now displays both the category and the use_case */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-zinc-700 text-zinc-300 text-xs font-semibold px-2.5 py-1 rounded">
            {category}
          </span>
          <span className="text-sm text-zinc-500">{use_case}</span>
        </div>

        {/* This logic for the buttons is unchanged */}
        {variant === 'home' ? (
          isSaved ? (
            <button 
              disabled
              className="text-sm text-zinc-500 cursor-not-allowed"
            >
              Saved
            </button>
          ) : (
            <button 
              onClick={handleSave}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Save
            </button>
          )
        ) : (
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
