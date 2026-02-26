export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      <div className="bg-[#1A1A1A] text-white py-16">
        <div className="container-aman">
          <h1 className="text-4xl md:text-5xl font-serif font-light">Privacy Notice</h1>
        <p className="text-white/70 mt-4">Last updated: January 2025</p>
        </div>
      </div>

      <div className="container-aman py-16">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Introduction</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              Aman Group S.a.r.l. ("Aman", "we", "us", or "our") respects your privacy and is committed 
              to protecting your personal data. This Privacy Notice explains how we collect, use, disclose, 
              and safeguard your information when you visit our website, make reservations, or use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Information We Collect</h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              We collect several types of information from and about users of our website and services, including:
            </p>
            <ul className="list-disc pl-6 text-[#6B6B6B] space-y-2">
              <li>Personal identifiers (name, email address, phone number, postal address)</li>
              <li>Reservation and stay information</li>
              <li>Payment information</li>
              <li>Preferences and interests</li>
              <li>Usage data and browsing behavior</li>
              <li>Device and technical information</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">How We Use Your Information</h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              We use the information we collect about you for various purposes, including:
            </p>
            <ul className="list-disc pl-6 text-[#6B6B6B] space-y-2">
              <li>Processing and managing your reservations</li>
              <li>Providing customer service and support</li>
              <li>Personalizing your experience</li>
              <li>Communicating with you about your stays and our services</li>
              <li>Improving our website and services</li>
              <li>Marketing and promotional communications (with your consent)</li>
              <li>Legal and regulatory compliance</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Information Sharing</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              We may share your personal information with our affiliates, service providers, and business 
              partners who assist us in operating our website and providing our services. We do not sell 
              your personal information to third parties.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Your Rights</h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-[#6B6B6B] space-y-2">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to object to processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Contact Us</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              If you have any questions about this Privacy Notice or our privacy practices, please contact us at:
            </p>
            <p className="text-[#6B6B6B] mt-4">
              Aman Group S.a.r.l.<br />
              19 Rue du 11 Novembre<br />
              L-8081 Bertrange, Luxembourg<br />
              Email: privacy@aman.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
