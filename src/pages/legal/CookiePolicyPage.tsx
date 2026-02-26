export function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      <div className="bg-[#1A1A1A] text-white py-16">
        <div className="container-aman">
          <h1 className="text-4xl md:text-5xl font-serif font-light">Cookie Policy</h1>
          <p className="text-white/70 mt-4">Last updated: January 2025</p>
        </div>
      </div>

      <div className="container-aman py-16">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">What Are Cookies</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              Cookies are small text files that are placed on your computer or mobile device when you 
              visit a website. They are widely used to make websites work more efficiently and provide 
              information to the website owners.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">How We Use Cookies</h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              We use cookies for various purposes, including:
            </p>
            <ul className="list-disc pl-6 text-[#6B6B6B] space-y-2">
              <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
              <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Types of Cookies We Use</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-[#1A1A1A] mb-2">Session Cookies</h3>
                <p className="text-[#6B6B6B]">
                  These cookies are temporary and expire when you close your browser. They are used 
                  to maintain your session state as you navigate our website.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#1A1A1A] mb-2">Persistent Cookies</h3>
                <p className="text-[#6B6B6B]">
                  These cookies remain on your device for a set period or until you manually delete them. 
                  They help us remember your preferences for future visits.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#1A1A1A] mb-2">Third-Party Cookies</h3>
                <p className="text-[#6B6B6B]">
                  Some cookies are placed by third-party services that appear on our pages, such as 
                  analytics providers and social media platforms.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Managing Cookies</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              Most web browsers allow you to control cookies through their settings. You can usually 
              find these settings in the "Options" or "Preferences" menu of your browser. Please note 
              that disabling certain cookies may affect the functionality of our website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Cookie Consent</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              When you first visit our website, you will be shown a cookie banner requesting your 
              consent to use non-essential cookies. You can change your preferences at any time by 
              clicking on the "Cookie Settings" link in the footer of our website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Contact Us</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              If you have any questions about our Cookie Policy, please contact us at privacy@aman.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
