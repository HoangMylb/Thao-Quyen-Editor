import { Category, Post, Profile, Project } from '@/lib/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://thao-quyen-editor.onrender.com';
const TOKEN_KEY = 'tq_admin_token';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface LoginPayload {
  success: boolean;
  token: string;
  message: string;
}

type ApiProfile = {
  id: string;
  fullName: string;
  headline: string;
  shortBio: string;
  aboutContent: string;
  avatarUrl: string;
  email: string;
  phone: string;
  zaloUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  ctaText: string;
  showHero: boolean;
  showFeatured: boolean;
  showCategories: boolean;
  showWorkflow: boolean;
  showStats: boolean;
  showBlogs: boolean;
  showContact: boolean;
  featuredTitle: string;
  categoriesTitle: string;
  blogsTitle: string;
  heroBgType: 'color' | 'image' | 'video';
  heroBgUrl: string;
  heroVideoProjectId: string | null;
  homepageFeaturedProjectIds: string[];
  homepageCategoryIds: string[];
  createdAt: string;
  updatedAt: string;
};

type ApiCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  projectCount?: number;
  createdAt: string;
  updatedAt: string;
};

type ApiProject = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  categoryId: string;
  categoryName?: string;
  categorySlug?: string;
  clientName: string;
  toolsUsed: string[];
  projectGoals: string;
  editorRole: string;
  isFeatured: boolean;
  isPublished: boolean;
  projectDate: string;
  createdAt: string;
  updatedAt: string;
};

type ApiPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnailUrl: string;
  status: 'draft' | 'published';
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

function getToken() {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(TOKEN_KEY) || '';
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });

  const body = (await response.json()) as ApiResponse<T>;
  if (!response.ok || !body.success) {
    throw new Error(body.message || 'API request failed.');
  }

  return body.data;
}

function mapProfile(profile: ApiProfile): Profile {
  return {
    id: profile.id,
    full_name: profile.fullName,
    headline: profile.headline,
    short_bio: profile.shortBio,
    about_content: profile.aboutContent,
    avatar_url: profile.avatarUrl,
    email: profile.email,
    phone: profile.phone,
    zalo_url: profile.zaloUrl,
    facebook_url: profile.facebookUrl,
    tiktok_url: profile.tiktokUrl,
    instagram_url: profile.instagramUrl,
    youtube_url: profile.youtubeUrl,
    cta_text: profile.ctaText,
    show_hero: profile.showHero,
    show_featured: profile.showFeatured,
    show_categories: profile.showCategories,
    show_workflow: profile.showWorkflow,
    show_stats: profile.showStats,
    show_blogs: profile.showBlogs,
    show_contact: profile.showContact,
    featured_title: profile.featuredTitle,
    categories_title: profile.categoriesTitle,
    blogs_title: profile.blogsTitle,
    hero_bg_type: profile.heroBgType,
    hero_bg_url: profile.heroBgUrl,
    hero_video_project_id: profile.heroVideoProjectId || '',
    homepage_featured_project_ids: profile.homepageFeaturedProjectIds,
    homepage_category_ids: profile.homepageCategoryIds,
    created_at: profile.createdAt,
    updated_at: profile.updatedAt,
  };
}

function mapCategory(category: ApiCategory): Category {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    thumbnail_url: category.thumbnailUrl,
    project_count: category.projectCount,
    created_at: category.createdAt,
    updated_at: category.updatedAt,
  };
}

function mapProject(project: ApiProject): Project {
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    short_description: project.shortDescription,
    description: project.description,
    thumbnail_url: project.thumbnailUrl,
    video_url: project.videoUrl,
    category_id: project.categoryId,
    category_name: project.categoryName,
    category_slug: project.categorySlug,
    client_name: project.clientName,
    tools_used: project.toolsUsed,
    project_goals: project.projectGoals,
    editor_role: project.editorRole,
    is_featured: project.isFeatured,
    is_published: project.isPublished,
    project_date: project.projectDate,
    created_at: project.createdAt,
    updated_at: project.updatedAt,
  };
}

function mapPost(post: ApiPost): Post {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    thumbnail_url: post.thumbnailUrl,
    status: post.status,
    published_at: post.publishedAt || '',
    created_at: post.createdAt,
    updated_at: post.updatedAt,
  };
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const body = (await response.json()) as ApiResponse<LoginPayload>;
  if (!response.ok || !body.success || !body.data.token) {
    throw new Error(body.message || body.data?.message || 'Đăng nhập thất bại.');
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(TOKEN_KEY, body.data.token);
  }

  return body.data;
}

export function logout() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(TOKEN_KEY);
  }
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export async function getProfile() {
  return mapProfile(await request<ApiProfile>('/api/profile'));
}

export async function updateProfile(profile: Profile) {
  const payload = {
    fullName: profile.full_name,
    headline: profile.headline,
    shortBio: profile.short_bio,
    aboutContent: profile.about_content,
    avatarUrl: profile.avatar_url,
    email: profile.email,
    phone: profile.phone,
    zaloUrl: profile.zalo_url,
    facebookUrl: profile.facebook_url,
    tiktokUrl: profile.tiktok_url,
    instagramUrl: profile.instagram_url,
    youtubeUrl: profile.youtube_url,
    ctaText: profile.cta_text,
    showHero: profile.show_hero,
    showFeatured: profile.show_featured,
    showCategories: profile.show_categories,
    showWorkflow: profile.show_workflow,
    showStats: profile.show_stats,
    showBlogs: profile.show_blogs,
    showContact: profile.show_contact,
    featuredTitle: profile.featured_title,
    categoriesTitle: profile.categories_title,
    blogsTitle: profile.blogs_title,
    heroBgType: profile.hero_bg_type,
    heroBgUrl: profile.hero_bg_url,
    heroVideoProjectId: profile.hero_video_project_id || null,
    homepageFeaturedProjectIds: profile.homepage_featured_project_ids,
    homepageCategoryIds: profile.homepage_category_ids,
  };

  return mapProfile(await request<ApiProfile>('/api/profile', { method: 'PUT', body: JSON.stringify(payload) }));
}

export async function getCategories() {
  return (await request<ApiCategory[]>('/api/categories')).map(mapCategory);
}

export async function createCategory(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>) {
  return mapCategory(await request<ApiCategory>('/api/categories', {
    method: 'POST',
    body: JSON.stringify({ name: category.name, slug: category.slug, description: category.description, thumbnailUrl: category.thumbnail_url }),
  }));
}

export async function updateCategory(id: string, category: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>) {
  return mapCategory(await request<ApiCategory>(`/api/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ name: category.name, slug: category.slug, description: category.description, thumbnailUrl: category.thumbnail_url || '' }),
  }));
}

export async function deleteCategory(id: string) {
  await request<object>(`/api/categories/${id}`, { method: 'DELETE' });
}

export async function getProjects() {
  return (await request<ApiProject[]>('/api/projects')).map(mapProject);
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
  return mapProject(await request<ApiProject>('/api/projects', {
    method: 'POST',
    body: JSON.stringify({
      title: project.title,
      slug: project.slug,
      shortDescription: project.short_description,
      description: project.description,
      thumbnailUrl: project.thumbnail_url,
      videoUrl: project.video_url,
      categoryId: project.category_id,
      clientName: project.client_name,
      toolsUsed: project.tools_used,
      projectGoals: project.project_goals,
      editorRole: project.editor_role,
      isFeatured: project.is_featured,
      isPublished: project.is_published,
      projectDate: project.project_date,
    }),
  }));
}

export async function updateProject(id: string, project: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>) {
  const current = await request<ApiProject>(`/api/projects/${id}`);
  return mapProject(await request<ApiProject>(`/api/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: project.title ?? current.title,
      slug: project.slug ?? current.slug,
      shortDescription: project.short_description ?? current.shortDescription,
      description: project.description ?? current.description,
      thumbnailUrl: project.thumbnail_url ?? current.thumbnailUrl,
      videoUrl: project.video_url ?? current.videoUrl,
      categoryId: project.category_id ?? current.categoryId,
      clientName: project.client_name ?? current.clientName,
      toolsUsed: project.tools_used ?? current.toolsUsed,
      projectGoals: project.project_goals ?? current.projectGoals,
      editorRole: project.editor_role ?? current.editorRole,
      isFeatured: project.is_featured ?? current.isFeatured,
      isPublished: project.is_published ?? current.isPublished,
      projectDate: project.project_date ?? current.projectDate,
    }),
  }));
}

export async function deleteProject(id: string) {
  await request<object>(`/api/projects/${id}`, { method: 'DELETE' });
}

export async function getPosts() {
  return (await request<ApiPost[]>('/api/posts')).map(mapPost);
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
  return mapPost(await request<ApiPost>('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      thumbnailUrl: post.thumbnail_url,
      status: post.status,
      publishedAt: post.published_at || null,
    }),
  }));
}

export async function updatePost(id: string, post: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>) {
  const current = await request<ApiPost>(`/api/posts/${id}`);
  return mapPost(await request<ApiPost>(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: post.title ?? current.title,
      slug: post.slug ?? current.slug,
      excerpt: post.excerpt ?? current.excerpt,
      content: post.content ?? current.content,
      thumbnailUrl: post.thumbnail_url ?? current.thumbnailUrl,
      status: post.status ?? current.status,
      publishedAt: post.published_at ?? current.publishedAt,
    }),
  }));
}

export async function deletePost(id: string) {
  await request<object>(`/api/posts/${id}`, { method: 'DELETE' });
}
