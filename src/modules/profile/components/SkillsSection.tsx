import type { SkillCategory } from '../types';

interface SkillsSectionProps {
  skills: SkillCategory[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section>
      <h2>
        <i className="ri-code-box-line section-icon"></i> Skills
      </h2>
      <div className="skills-container">
        {skills.map(({ title, icon, items }) => (
          <div key={title} className="skill-category">
            <h3>
              <i className={`${icon} category-icon`}></i> {title}
            </h3>
            <div className="skill-list">
              {items.map((item) => (
                <span key={item} className="skill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
