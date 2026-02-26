export function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      <div className="bg-[#1A1A1A] text-white py-16">
        <div className="container-aman">
          <h1 className="text-4xl md:text-5xl font-serif font-light">Terms of Use</h1>
          <p className="text-white/70 mt-4">Last updated: January 2025</p>
        </div>
      </div>

      <div className="container-aman py-16">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#1A1A1A] mb-4">Acceptance of Terms</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by the terms and 
              provisions of this agreement. If you do not agree to these terms, please do not use this website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#1A1A1A] mb-4">Use of Website</h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              You agree to use this website only for lawful purposes and in a way that does not infringe 
              the rights of, restrict or inhibit anyone else's use and enjoyment of the website. 
              Prohibited behavior includes:
            </p>
            <ul className="list-disc pl-6 text-[#6B6B6B] space-y-2">
              <li>Harassing or causing distress or inconvenience to any person</li>
              <li>Transmitting obscene or offensive content</li>
              <li>Disrupting the normal flow of dialogue within our website</li>
              <li>Attempting to gain unauthorized access to our systems</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#1A1A1A] mb-4">Reservations and Bookings</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              All reservations are subject to availability and confirmation. Rates displayed on our 
              website are subject to change without notice. Cancellation policies vary by property 
              and rate type and will be communicated at the time of booking.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#1A1A1A] mb-4">Intellectual Property</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              All content on this website, including but not limited to text, graphics, logos, images, 
              and software, is the property of Aman Group S.a.r.l. or its content suppliers and is 
              protected by international copyright laws. Unauthorized use of any materials may violate 
              copyright, trademark, and other laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#1A1A1A] mb-4">Disclaimer</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              The information on this website is provided on an "as is" basis. Aman makes no 
              representations or warranties of any kind, express or implied, about the completeness, 
              accuracy, reliability, suitability, or availability of the website or the information, 
              products, services, or related graphics contained on the website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#1A1A1A] mb-4">Limitation of Liability</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              In no event shall Aman be liable for any indirect, incidental, special, consequential, 
              or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
              or other intangible losses, resulting from your access to or use of or inability to 
              access or use the website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#1A1A1A] mb-4">Governing Law</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of Luxembourg, 
              without regard to its conflict of law provisions. Any disputes arising under these terms 
              shall be subject to the exclusive jurisdiction of the courts of Luxembourg.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#1A1A1A] mb-4">Changes to Terms</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective 
              immediately upon posting to the website. Your continued use of the website following 
              any changes constitutes acceptance of those changes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#1A1A1A] mb-4">Contact Information</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              If you have any questions about these Terms of Use, please contact us at legal@aman.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
