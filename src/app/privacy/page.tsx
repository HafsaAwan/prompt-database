 

export default function PrivacyPage() {
  return (
    // This container centers the content and adds padding.
    <div className="container mx-auto px-8 md:px-16 py-24">
      {/* The `prose` classes automatically style the text elements inside this div. */}
      <div className="max-w-3xl mx-auto prose prose-invert prose-headings:font-poppins prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-accent-primary">
        <h1>Privacy Policy for AI Did This</h1>
        <p><strong>Last Updated:</strong> September 4, 2025</p>
        <p>Welcome to AI Did This. This Privacy Policy explains how we collect, use, and protect your information when you visit our website and use our services, including the AI Prompt Database.</p>
        
        <h2>1. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li><strong>Personal Information:</strong> When you create an account, we collect your email address and password. This information is securely managed by our authentication provider, Supabase.</li>
          <li><strong>Usage Data:</strong> We collect information about how you interact with our service, such as which prompts you view, save, or copy.</li>
          <li><strong>Cookies:</strong> We use cookies to maintain your session and improve your experience.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide and maintain our service.</li>
          <li>Manage your account and saved prompts.</li>
          <li>Communicate with you about updates or support.</li>
          <li>Improve the functionality and user experience of our website.</li>
        </ul>

        <h2>3. Data Sharing and Disclosure</h2>
        <p>We do not sell your personal information. We may share information with the following third parties:</p>
        <ul>
          <li><strong>Supabase:</strong> For database and authentication services.</li>
          <li><strong>Vercel:</strong> For hosting our website.</li>
        </ul>
        <p>We may also disclose your information if required by law.</p>

        <h2>4. Data Security</h2>
        <p>We take reasonable measures to protect your information, but no online service is 100% secure. We rely on the security infrastructure of our service providers, Supabase and Vercel.</p>

        <h2>5. Your Rights</h2>
        <p>You have the right to access, update, or delete your personal information. You can manage your account information by logging in or contacting us directly.</p>

        <h2>6. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>

        <h2>7. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at contact@aididthis.com.</p>
      </div>
    </div>
  );
}