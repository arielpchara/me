export interface PostAttributes {
  /** Heading on the post page. */
  title: string;
  /** Browser tab title, when it differs from the heading. */
  pageTitle?: string;
  /** Title on the blog listing, when it differs from the heading. */
  cardTitle?: string;
  /** URL path, without surrounding slashes. */
  slug: string;
  tags: string[];
  excerpt?: string;
  /** Position on the listing: the highest number comes first. */
  order?: number;
  /** Set to false for pages left off the listing, such as translations. */
  listed?: boolean;
  lang?: string;
  translation?: { href: string; label: string };
  medium?: { url: string; notice: string; badge: string };
}

export interface Post extends PostAttributes {
  body: string;
}
