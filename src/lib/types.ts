export interface Profile {
  id: string;
  full_name: string;
  headline: string;
  short_bio: string;
  about_content: string;
  avatar_url: string;
  email: string;
  phone: string;
  zalo_url: string;
  facebook_url: string;
  tiktok_url: string;
  instagram_url: string;
  youtube_url: string;
  cta_text: string;
  show_hero: boolean;
  show_featured: boolean;
  show_categories: boolean;
  show_workflow: boolean;
  show_stats: boolean;
  show_blogs: boolean;
  show_contact: boolean;
  featured_title: string;
  categories_title: string;
  blogs_title: string;
  hero_bg_type: 'color' | 'image' | 'video';
  hero_bg_url: string;
  hero_video_project_id: string;
  homepage_featured_project_ids: string[];
  homepage_category_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail_url: string;
  project_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  category_id: string;
  category_name?: string;
  category_slug?: string;
  client_name: string;
  tools_used: string[];
  project_goals: string;
  editor_role: string;
  is_featured: boolean;
  is_published: boolean;
  project_date: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url: string;
  status: 'draft' | 'published';
  published_at: string;
  created_at: string;
  updated_at: string;
}
