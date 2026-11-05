const contactLinks = [
  { href: 'mailto:ariel@pchara.com', icon: 'ri-mail-line', label: 'ariel@pchara.com', external: false },
  { href: 'https://linkedin.com/in/arielpchara', icon: 'ri-linkedin-box-line', label: 'LinkedIn', external: true },
  { href: 'https://github.com/arielpchara', icon: 'ri-github-line', label: 'GitHub', external: true },
];

export function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="contact-section">
          <h3>
            <i className="ri-contacts-line footer-section-icon"></i> Contact
          </h3>
          <div className="contact-links">
            {contactLinks.map(({ href, icon, label, external }) => (
              <a
                key={href}
                href={href}
                className="contact-link"
                {...(external ? { target: '_blank', rel: 'noopener' } : {})}
              >
                <i className={icon}></i> {label}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Ariel Pchara · Senior
            Fullstack Engineer | React &amp; Node.js Specialist | TypeScript, Microservices, AWS
          </p>
        </div>
      </div>
    </footer>
  );
}
