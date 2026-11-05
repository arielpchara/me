import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/shared/lib/analytics';
import type { Resume } from '../types';

interface ResumeDropdownProps {
  resumes: Resume[];
}

export function ResumeDropdown({ resumes }: ResumeDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('click', closeOnOutsideClick);
    return () => document.removeEventListener('click', closeOnOutsideClick);
  }, []);

  return (
    <div className="resume-cta">
      <div className="resume-dropdown" ref={rootRef}>
        <button className="btn-primary" onClick={() => setOpen((current) => !current)}>
          <i className="ri-download-2-line"></i>
          <span>Download Resume</span>
          <i className="ri-arrow-down-s-line"></i>
        </button>
        <div className={open ? 'resume-dropdown-menu show' : 'resume-dropdown-menu'}>
          {resumes.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              download
              className="resume-dropdown-item"
              onClick={() => trackEvent('download', 'resume', label)}
            >
              <i className="ri-global-line"></i> {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
