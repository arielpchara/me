import content from '/content/profile.md';
import type { Profile, ProfileAttributes } from '../types';

export const profile: Profile = {
  ...(content.attributes as ProfileAttributes),
  about: content.body,
};
