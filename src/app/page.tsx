import Link from 'next/link';

export default function HomePage() {
  return (
    // This is the main container for your new homepage.
    <section 
      id="hero" 
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
    >
      <h1 className="font-poppins font-bold text-4xl md:text-6xl text-text-primary leading-tight max-w-4xl">
        Welcome to AI Did This
      </h1>
      <p className="mt-6 text-lg text-text-secondary max-w-3xl mx-auto">
        Your new home for AI-powered tools and resources.
      </p>
      
      {/* This button links to the prompt database page we just moved. */}
      <Link 
        href="/prompts"
        className="mt-10 inline-block bg-accent-primary text-background-start px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        Explore the Prompt Database
      </Link>
    </section>
  );
}