import Link from 'next/link';

export default function Footer() {
  return (
    // The footer uses the deep blue background to frame the page
    <footer className="bg-gradient-to-t from-[#1B2B34] to-[#457b9d] mt-auto">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        {/* Personal Message */}
        <div className="max-w-2xl mx-auto mb-8">
          <p className="text-lg font-semibold text-white mb-4">
            Made with <span className="inline-block scale-110">☕</span>, curiosity, and a touch of ninja magic 🥷✨
          </p>
          <p className="text-slate-300 mb-4">
            This little corner of the web is brought to life by Hafsa — your friendly{" "}
            <span className="text-[#fca311] font-bold">Ninja Coder</span>.
          </p>
          <p className="italic text-slate-400 mb-4">
            Here, AI did this… but every idea, every spark, and every tiny detail carries a bit of my heart.
          </p>
          <p className="text-slate-300">
            Thanks for stopping by — I hope it sparks your curiosity as much as it fuels mine!
          </p>
        </div>

        {/* Wave Divider */}
        <svg className="mx-auto my-6 w-32" viewBox="0 0 1440 32">
          <path fill="#457b9d" d="M0,32L1440,0L1440,32L0,32Z"></path>
        </svg>

        {/* Footer Links */}
        <div className="mt-4 flex justify-center space-x-6">
          <Link href="#" className="text-sm hover:text-white transition-all hover:scale-110">
            Blog
          </Link>
          <Link href="#" className="text-sm hover:text-white transition-all hover:scale-110">
            About
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm mt-6 text-slate-300">&copy; 2025 AI Did This. All Rights Reserved.</p>
      </div>
    </footer>
  
  );
}
