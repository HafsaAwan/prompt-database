export default function Footer() {
  return (
    // Main footer container with a subtle background and a soft top border.
    <footer className="mt-auto bg-background-start/50 border-t border-glass-border">
      <div className="container mx-auto px-8 md:px-16 py-12 text-center">
        
        {/* Your personal brand and message, now centered. */}
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold font-poppins text-text-primary">AI Did This ✨</h2>
          <p className="text-sm text-text-secondary">Made with ☕, curiosity, and a touch of ninja magic 🥷</p>
          <p className="text-sm text-text-secondary">Brought to life by Hafsa Awan— your friendly Ninja Coder.</p>
          <p className="text-sm text-text-secondary italic">Every spark here is powered by AI, but guided with heart.</p>
        </div>

        {/* Bottom line with copyright notice */}
        <div className="mt-8 pt-8 border-t border-glass-border">
          <p className="text-sm text-text-secondary/70">
            © 2025 AI Did This. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}