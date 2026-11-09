import content from '/content/site.md';

interface SiteAttributes {
  /** Role and main skills from the resume, shown as tags in the footer. */
  footerTags: string[];
}

export const site = content.attributes as SiteAttributes;
