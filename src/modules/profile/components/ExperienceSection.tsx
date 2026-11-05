import type { SyntheticEvent } from 'react';
import { trackEvent } from '@/shared/lib/analytics';
import type { Experience } from '../types';

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section>
      <h2>
        <i className="ri-briefcase-line section-icon"></i> Experience
      </h2>
      <div className="experience-list">
        {experience.map(({ key, role, date, company, description }, index) => (
          <details
            key={key}
            className="experience-item"
            open={index === 0}
            onToggle={(event: SyntheticEvent<HTMLDetailsElement>) =>
              trackEvent(event.currentTarget.open ? 'expand' : 'collapse', 'experience', key)
            }
          >
            <summary className="experience-header">
              <div className="experience-header-text">
                <h3>{role}</h3>
                <span className="experience-date">{date}</span>
              </div>
              <i className="ri-arrow-down-s-line experience-chevron"></i>
            </summary>
            <div className="experience-body">
              <p className="experience-company">{company}</p>
              <p className="experience-description">{description}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
