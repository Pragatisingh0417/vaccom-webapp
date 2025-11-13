export default function Privacy() {
  return (
    <section className="px-6 py-12 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#DC1515] font-bold leading-snug sm:leading-tight md:leading-[1.2] mb-4 sm:mb-6">
          Privacy Policy
        </h2>

        <p className="text-sm sm:text-base md:text-[17px] text-gray-800 leading-relaxed space-y-4">
          At Vaccom, we value your privacy and are committed to protecting your
          personal information. This Privacy Policy outlines how we collect,
          use, and safeguard your data in compliance with the Privacy Act 1988
          (Cth) and Australian Privacy Principles (APPs).
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          Information We Collect
        </h3>
        <p className="text-gray-800 leading-relaxed mb-4">
          We may collect personal information you provide directly, such as your
          name, email address, phone number, and business details when you
          contact us, request a quote, or use our services. We may also collect
          non-personal information through cookies, analytics tools, and
          browsing activity on our website.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          How We Use Your Information
        </h3>
        <ul className="list-disc list-inside text-gray-800 mb-4 space-y-1">
          <li>Provide and improve our services</li>
          <li>Respond to enquiries and provide customer support</li>
          <li>
            Send updates, offers, and relevant service information (with your
            consent)
          </li>
          <li>Comply with legal and regulatory obligations</li>
        </ul>
        <p className="text-gray-800 leading-relaxed mb-6">
          We do not sell or rent your personal information to third parties.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          Data Storage & Security
        </h3>
        <p className="text-gray-800 leading-relaxed mb-4">
          We store personal information securely using encryption, firewalls,
          and secure access protocols. While we take all reasonable steps to
          protect your data, no method of transmission or storage is 100% secure,
          and we cannot guarantee absolute security.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          Cookies & Tracking
        </h3>
        <p className="text-gray-800 leading-relaxed mb-4">
          Our website uses cookies to enhance your browsing experience, analyse
          traffic, and improve site performance. You can adjust your browser
          settings to block cookies, but some features of our website may not
          function correctly.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          Third-Party Links
        </h3>
        <p className="text-gray-800 leading-relaxed mb-4">
          Our website may contain links to third-party sites. We are not
          responsible for the privacy practices or content of those websites. We
          recommend reviewing their privacy policies before providing any
          personal information.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          Your Rights
        </h3>
        <p className="text-gray-800 leading-relaxed mb-4">
          You have the right to request access to the personal information we
          hold about you, request corrections, or ask for deletion where
          applicable. To exercise these rights, please contact us using the
          details below.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          Information We Collect about Your Usage
        </h3>
        <p className="text-gray-800 leading-relaxed mb-4">
          We may also automatically collect certain information about your
          interaction with the Services (“Usage Data”). To do this, we may use
          cookies, pixels, and similar technologies (“Cookies”). Usage Data may
          include information about how you access and use our Site and your
          account, including device information, browser information,
          information about your network connection, your IP address, and other
          information regarding your interaction with the Services.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          Contact
        </h3>
        <p className="text-gray-800 leading-relaxed">
          For any questions about this Privacy Policy or to request changes to
          your personal information, contact us at: <br />
          <strong>Email:</strong>{" "}
          <a
            href="mailto:info@vaccom.com.au"
            className="text-[#DC1515] hover:underline"
          >
            info@vaccom.com.au
          </a>
        </p>
      </div>
    </section>
  );
}
