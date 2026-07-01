'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockDb, Project, Category, Post, Profile } from '@/lib/mockDb';

interface MockDbContextType {
  projects: Project[];
  categories: Category[];
  posts: Post[];
  profile: Profile;
  refreshDb: () => void;
  
  // Profile
  updateProfile: (profile: Profile) => void;
  
  // Projects
  addProject: (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => Project;
  updateProject: (id: string, project: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>) => Project;
  deleteProject: (id: string) => void;
  
  // Categories
  addCategory: (category: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => Category;
  updateCategory: (id: string, category: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>) => Category;
  deleteCategory: (id: string) => void;
  
  // Posts
  addPost: (post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) => Post;
  updatePost: (id: string, post: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>) => Post;
  deletePost: (id: string) => void;
}

const MockDbContext = createContext<MockDbContextType | undefined>(undefined);

export function MockDbProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  const refreshDb = () => {
    setProjects(mockDb.getProjects());
    setCategories(mockDb.getCategories());
    setPosts(mockDb.getPosts());
    setProfile(mockDb.getProfile());
  };

  useEffect(() => {
    Promise.resolve().then(() => {
      refreshDb();
    });
  }, []);

  const updateProfile = (updatedProfile: Profile) => {
    mockDb.saveProfile(updatedProfile);
    refreshDb();
  };

  const addProject = (p: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    const res = mockDb.createProject(p);
    refreshDb();
    return res;
  };

  const updateProjectDetails = (id: string, p: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>) => {
    const res = mockDb.updateProject(id, p);
    refreshDb();
    return res;
  };

  const deleteProjectDetails = (id: string) => {
    mockDb.deleteProject(id);
    refreshDb();
  };

  const addCategory = (c: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => {
    const res = mockDb.createCategory(c);
    refreshDb();
    return res;
  };

  const updateCategoryDetails = (id: string, c: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>) => {
    const res = mockDb.updateCategory(id, c);
    refreshDb();
    return res;
  };

  const deleteCategoryDetails = (id: string) => {
    mockDb.deleteCategory(id);
    refreshDb();
  };

  const addPost = (po: Omit<Post, 'id' | 'created_at' | 'updated_at'>) => {
    const res = mockDb.createPost(po);
    refreshDb();
    return res;
  };

  const updatePostDetails = (id: string, po: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>) => {
    const res = mockDb.updatePost(id, po);
    refreshDb();
    return res;
  };

  const deletePostDetails = (id: string) => {
    mockDb.deletePost(id);
    refreshDb();
  };

  // Safe SSR fallback while loading initial client values
  if (!profile) {
    return (
      <div className="min-h-[100dvh] bg-[#030712] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-gray-400 font-mono text-sm tracking-widest">LOADING PORTFOLIO...</p>
        </div>
      </div>
    );
  }

  return (
    <MockDbContext.Provider value={{
      projects,
      categories,
      posts,
      profile,
      refreshDb,
      updateProfile,
      addProject,
      updateProject: updateProjectDetails,
      deleteProject: deleteProjectDetails,
      addCategory,
      updateCategory: updateCategoryDetails,
      deleteCategory: deleteCategoryDetails,
      addPost,
      updatePost: updatePostDetails,
      deletePost: deletePostDetails
    }}>
      {children}
    </MockDbContext.Provider>
  );
}

export function useMockDb() {
  const context = useContext(MockDbContext);
  if (!context) {
    throw new Error('useMockDb must be used within a MockDbProvider');
  }
  return context;
}
