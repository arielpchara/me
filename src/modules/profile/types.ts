export interface Resume {
  label: string;
  href: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  items: string[];
}

export interface Experience {
  /** Stable name used for analytics. */
  key: string;
  role: string;
  date: string;
  company: string;
  description: string;
}

export interface ProfileAttributes {
  resumes: Resume[];
  skills: SkillCategory[];
  experience: Experience[];
}

export interface Profile extends ProfileAttributes {
  about: string;
}
