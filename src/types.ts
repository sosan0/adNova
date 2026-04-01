export type Platform = 'instagram' | 'facebook' | 'twitter' | 'linkedin';

export interface Post {
  id: string;
  platform: Platform;
  time: string;
  thumbnail: string;
  status: 'draft' | 'scheduled' | 'published';
}

export interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'active';
  progress: number;
  timeline: number;
}

export interface Metric {
  label: string;
  value: string;
  icon: string;
  color: string;
}
