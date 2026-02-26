export function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      <div className="bg-[#1A1A1A] text-white py-16">
        <div className="container-aman">
          <h1 className="text-4xl md:text-5xl font-serif font-light">Accessibility</h1>
          <p className="text-white/70 mt-4">Our commitment to digital accessibility</p>
        </div>
      </div>

      <div className="container-aman py-16">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Our Commitment</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              Aman is committed to ensuring digital accessibility for people with disabilities. 
              We are continually improving the user experience for everyone and applying the relevant 
              accessibility standards to ensure we provide equal access to all users.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Accessibility Features</h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Our website includes the following accessibility features:
            </p>
            <ul className="list-disc pl-6 text-[#6B6B6B] space-y-2">
              <li>Keyboard navigation support</li>
              <li>Screen reader compatibility</li>
              <li>Text alternatives for images</li>
              <li>Adjustable text sizes</li>
              <li>High contrast mode options</li>
              <li>Consistent navigation structure</li>
              <li>Form labels and error identification</li>
              <li>Skip navigation links</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Standards Compliance</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              We strive to conform to level AA of the World Wide Web Consortium (W3C) Web Content 
              Accessibility Guidelines 2.1. These guidelines explain how to make web content more 
              accessible for people with disabilities.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Physical Accessibility</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              Our properties are designed to accommodate guests with varying mobility needs. 
              Many of our resorts feature accessible rooms, ramps, elevators, and other facilities 
              to ensure all guests can enjoy their stay. Please contact us in advance to discuss 
              specific accessibility requirements.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Feedback</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              We welcome your feedback on the accessibility of our website and properties. 
              If you encounter any accessibility barriers or have suggestions for improvement, 
              please contact us at accessibility@aman.com.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Contact Information</h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              For accessibility-related inquiries, please contact:<br /><br />
              Email: accessibility@aman.com<br />
              Phone: +1 (212) 555-0100
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
