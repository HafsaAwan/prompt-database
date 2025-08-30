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

// A simple, self-contained SVG icon for the "Copy" button
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
  use_case, 
  variant, 
  isSaved,
  onSave,
  onRemove,
}: PromptCardProps) {

  // This function handles copying the prompt text to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt_text).then(() => {
      toast.success('Prompt copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
      toast.error('Failed to copy prompt.');
    });
  };

  return (
    <div className="bg-brand-light-blue border border-cyan-200 rounded-lg p-6 flex flex-col h-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-brand-dark-blue">{title}</h2>
        {/* The new Copy button */}
        <button 
          onClick={handleCopy}
          className="p-2 text-brand-medium-blue hover:text-brand-blue hover:bg-white/50 rounded-full transition-colors"
          aria-label="Copy prompt text"
        >
          <CopyIcon />
        </button>
      </div>
      <p className="text-gray-800 mb-4 flex-grow">{prompt_text}</p>
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-cyan-300">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-white/70 text-brand-dark-blue text-xs font-semibold px-2.5 py-1 rounded-full">
            {category}
          </span>
          <span className="text-sm text-gray-700">{use_case}</span>
        </div>
        
        {variant === 'home' ? (
          isSaved ? (
            <button 
              disabled
              className="text-sm text-gray-500 cursor-not-allowed font-semibold"
            >
              Saved
            </button>
          ) : (
            <button 
              onClick={() => onSave && onSave(id)}
              className="text-sm text-brand-medium-blue font-semibold hover:text-brand-blue"
            >
              Save
            </button>
          )
        ) : (
          <button 
            onClick={() => onRemove && onRemove(id)}
            className="text-sm text-red-500 font-semibold hover:text-red-700"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
