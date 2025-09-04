import Link from 'next/link';

export default function Footer() {
  return (
    // Main footer container with a subtle background and a soft top border.
    <footer className="mt-auto bg-background-start/50 border-t border-glass-border">
  <div className="container mx-auto px-8 md:px-16 py-12 text-center">
    
    {/* Personal brand + message */}
    <div className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold font-poppins text-text-primary">
        AI Did This ✨
      </h2>
      <p className="text-sm text-text-secondary">
        Powered by coffee ☕ and an unreasonable amount of curiosity 🐱
      </p>
      <p className="text-sm text-text-secondary">
        Crafted by Hafsa Awan — Ninja Coder on duty 🥷
      </p>
      <p className="text-sm text-text-secondary italic">
        Half human, half AI… but 100% heart.
      </p>

      {/* Playful warning */}
      <p className="text-sm text-accent-primary font-semibold mt-4">
        ⚠️ Warning: May spark random bursts of inspiration. ⚡
      </p>
    </div>

    {/* Copyright */}
    <div className="mt-8 pt-8 border-t border-glass-border">
       <div className="flex justify-center items-center space-x-6 mb-4">
            {/* Links to your new legal pages */}
            <Link href="/privacy" className="text-sm text-text-secondary/70 hover:text-text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-text-secondary/70 hover:text-text-primary transition-colors">Terms of Service</Link>
          </div>
      <p className="text-sm text-text-secondary/70">
        © 2025 AI Did This. All Rights Reserved.
      </p>
    </div>

  </div>
</footer>
  );
}