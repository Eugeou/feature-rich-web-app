export interface Community {
  id: string;
  name: string;
  description: string;
  image: string;
  memberCount: string;
  contentFrequency: string;
  category: string;
  isVerified: boolean;
  isJoined: boolean;
  badge?: string;
  createdAt: Date;
}
