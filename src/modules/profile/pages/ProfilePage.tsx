import { Markdown } from '@/shared/components/markdown/Markdown';
import { ExperienceSection } from '../components/ExperienceSection';
import { ResumeDropdown } from '../components/ResumeDropdown';
import { SkillsSection } from '../components/SkillsSection';
import { profile } from '../data/profile';

export function ProfilePage() {
  return (
    <>
      <section className="about-section">
        <h2>
          <i className="ri-user-5-line section-icon"></i> About Me
        </h2>
        <div className="about-content">
          <div className="about-text">
            <Markdown>{profile.about}</Markdown>
          </div>
        </div>
        <ResumeDropdown resumes={profile.resumes} />
      </section>
      <SkillsSection skills={profile.skills} />
      <ExperienceSection experience={profile.experience} />
    </>
  );
}
