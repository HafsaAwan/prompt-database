'use client';

import toast from 'react-hot-toast';

type PromptCardProps = {
  id: number;
  title: string;
  prompt_text: string;
  category: string;
  use_case: string;
  variant: 'home' | 'saved';
  isSaved?: boolean;
  onSave?: (promptId: number) => void;
  onRemove?: (promptId: number) => void;
};

// A simple SVG icon for the "Copy" button
const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

export default function PromptCard({ 
  id, 
  title, 
  prompt_text, 
  category, 
  use_case: _useCase, 
  variant, 
  isSaved,
  onSave,
  onRemove,
}: PromptCardProps) {

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt_text).then(() => {
      toast.success('Prompt copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
      toast.error('Failed to copy prompt.');
    });
  };

  return (
    // The 'group' class enables the glow effect on hover
    <div className="group relative h-full">
      {/* This div creates the blue glow that appears on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-secondary to-accent-primary rounded-2xl blur opacity-0 group-hover:opacity-10 transition duration-300"></div>
      
      {/* This is the main card with the glassy style */}
      <div className="relative bg-glass-bg border border-glass-border rounded-2xl p-6 flex flex-col h-full transition-all duration-300 group-hover:-translate-y-1">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-poppins font-bold text-lg text-text-primary group-hover:text-accent-primary transition-colors">{title}</h2>
          <button 
            onClick={handleCopy}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-white/20 rounded-full transition-colors"
            aria-label="Copy prompt text"
          >
            <CopyIcon />
          </button>
        </div>
        
        <p className="text-text-secondary mb-4 flex-grow line-clamp-3">{prompt_text}</p>
        
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-glass-border">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-white/10 text-accent-primary text-xs font-semibold px-2.5 py-1 rounded-full">
              {category}
            </span>
          </div>
          
          {/* This logic determines whether to show a 'Save' or 'Remove' button */}
          {variant === 'home' ? (
            isSaved ? (
              <span className="text-sm text-text-secondary/60 font-semibold cursor-not-allowed">
                Saved
              </span>
            ) : (
              <button onClick={() => onSave && onSave(id)} className="text-sm text-accent-primary font-semibold hover:text-text-primary">
                Save
              </button>
            )
          ) : (
            <button onClick={() => onRemove && onRemove(id)} className="text-sm text-red-400 font-semibold hover:text-red-300">
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}