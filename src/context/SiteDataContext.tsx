'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '@/lib/api';
import { Category, Post, Profile, Project } from '@/lib/types';

interface SiteDataContextType {
  projects: Project[];
  categories: Category[];
  posts: Post[];
  profile: Profile;
  refreshDb: () => Promise<void>;
  updateProfile: (profile: Profile) => Promise<Profile>;
  addProject: (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => Promise<Project>;
  updateProject: (id: string, project: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>) => Promise<Project>;
  deleteProject: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => Promise<Category>;
  updateCategory: (id: string, category: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>) => Promise<Category>;
  deleteCategory: (id: string) => Promise<void>;
  addPost: (post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) => Promise<Post>;
  updatePost: (id: string, post: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>) => Promise<Post>;
  deletePost: (id: string) => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

const EMPTY_PROFILE: Profile = {
  id: '',
  full_name: '',
  headline: '',
  short_bio: '',
  about_content: '',
  avatar_url: '',
  email: '',
  phone: '',
  zalo_url: '',
  facebook_url: '',
  tiktok_url: '',
  instagram_url: '',
  youtube_url: '',
  cta_text: '',
  show_hero: true,
  show_featured: true,
  show_categories: true,
  show_workflow: true,
  show_stats: true,
  show_blogs: true,
  show_contact: true,
  featured_title: '',
  categories_title: '',
  blogs_title: '',
  hero_bg_type: 'color',
  hero_bg_url: '',
  hero_video_project_id: '',
  homepage_featured_project_ids: [],
  homepage_category_ids: [],
  created_at: '',
  updated_at: '',
};

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
  const [loaded, setLoaded] = useState(false);

  const refreshDb = async () => {
    const [nextProjects, nextCategories, nextPosts, nextProfile] = await Promise.all([
      api.getProjects(),
      api.getCategories(),
      api.getPosts(),
      api.getProfile(),
    ]);

    setProjects(nextProjects);
    setCategories(nextCategories);
    setPosts(nextPosts);
    setProfile(nextProfile);
    setLoaded(true);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refreshDb();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const value = useMemo<SiteDataContextType>(() => ({
    projects,
    categories,
    posts,
    profile,
    refreshDb,
    updateProfile: async (nextProfile) => {
      const updated = await api.updateProfile(nextProfile);
      setProfile(updated);
      return updated;
    },
    addProject: async (project) => {
      const created = await api.createProject(project);
      setProjects((current) => [...current, created]);
      return created;
    },
    updateProject: async (id, project) => {
      const updated = await api.updateProject(id, project);
      setProjects((current) => current.map((item) => (item.id === id ? updated : item)));
      return updated;
    },
    deleteProject: async (id) => {
      await api.deleteProject(id);
      setProjects((current) => current.filter((item) => item.id !== id));
    },
    addCategory: async (category) => {
      const created = await api.createCategory(category);
      setCategories((current) => [...current, created]);
      return created;
    },
    updateCategory: async (id, category) => {
      const updated = await api.updateCategory(id, category);
      setCategories((current) => current.map((item) => (item.id === id ? updated : item)));
      return updated;
    },
    deleteCategory: async (id) => {
      await api.deleteCategory(id);
      setCategories((current) => current.filter((item) => item.id !== id));
    },
    addPost: async (post) => {
      const created = await api.createPost(post);
      setPosts((current) => [...current, created]);
      return created;
    },
    updatePost: async (id, post) => {
      const updated = await api.updatePost(id, post);
      setPosts((current) => current.map((item) => (item.id === id ? updated : item)));
      return updated;
    },
    deletePost: async (id) => {
      await api.deletePost(id);
      setPosts((current) => current.filter((item) => item.id !== id));
    },
  }), [projects, categories, posts, profile]);

  if (!loaded) {
    return (
      <div className="min-h-[100dvh] bg-[#030712] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-gray-400 font-mono text-sm tracking-widest">LOADING PORTFOLIO...</p>
        </div>
      </div>
    );
  }

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
