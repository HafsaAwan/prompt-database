 

'use client';

// This is a new component to display categories visually.
export default function BrowseSection() {
  
  // A sample list of categories. We can make this dynamic later if needed.
  const categories = [
    { name: 'Creative Writing', icon: '✍️', count: 234 },
    { name: 'Business', icon: '💼', count: 189 },
    { name: 'Marketing', icon: '📈', count: 156 },
    { name: 'Coding', icon: '💻', count: 298 },
    { name: 'Design', icon: '🎨', count: 167 },
    { name: 'Education', icon: '📚', count: 203 },
  ];

  return (
    // The main container for this new section.
    // `py-16` adds vertical space to separate it from the trending section.
    <section id="browse" className="py-16">
      
      {/* Section Heading */}
      <div className="text-center mb-12">
        <h2 className="font-poppins font-bold text-3xl text-text-primary">
          Browse by Vibe, Category, or Use Case
        </h2>
        <p className="text-text-secondary mt-1">
          Find the perfect prompt for your specific needs
        </p>
      </div>

      {/* Grid container for the category cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {/* We map over the categories array to create a card for each one */}
        {categories.map((category) => (
          // Each card is a clickable link (currently points to '#')
          // It uses the 'group' utility for hover effects
          <a href="#" key={category.name} className="group relative block text-center">
            
            {/* This div creates the blue glow that appears on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-secondary to-accent-primary rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-300"></div>

            {/* This is the main card with the glassy style */}
            <div className="relative bg-glass-bg border border-glass-border rounded-2xl p-6 h-full transition-all duration-300">
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className="font-poppins font-semibold text-text-primary mb-1">
                {category.name}
              </h3>
              <p className="text-text-secondary text-sm">
                {category.count} prompts
              </p>
            </div>

          </a>
        ))}
      </div>
    </section>
  );
}