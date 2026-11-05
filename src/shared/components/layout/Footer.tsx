const contactLinks = [
  { href: 'mailto:ariel@pchara.com', icon: 'ri-mail-line', label: 'ariel@pchara.com', external: false },
  { href: 'https://linkedin.com/in/arielpchara', icon: 'ri-linkedin-box-line', label: 'LinkedIn', external: true },
  { href: 'https://github.com/arielpchara', icon: 'ri-github-line', label: 'GitHub', external: true },
];

const tags = ['Senior Software Engineer', 'React & Node.js Specialist', 'TypeScript', 'Microservices', 'AWS'];

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
                aria-label={label}
                {...(external ? { target: '_blank', rel: 'noopener' } : {})}
              >
                <i className={icon}></i> <span className="contact-label">{label}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="post-meta">
            {tags.map((tag) => (
              <span key={tag} className="post-tag">
                {tag}
              </span>
            ))}
          </div>
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Ariel Pchara
          </p>
        </div>
      </div>
    </footer>
  );
}
