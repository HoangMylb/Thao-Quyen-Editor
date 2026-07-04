'use client';

import Link from 'next/link';
import { IconCalendar, IconUser, IconExternalLink, IconPlayerPlay } from '@tabler/icons-react';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  categoryName?: string;
  onPlay?: (videoUrl: string, title: string) => void;
}

export default function ProjectCard({ project, categoryName, onPlay }: ProjectCardProps) {
  const handlePlayClick = (e: React.MouseEvent) => {
    if (onPlay) {
      e.preventDefault();
      onPlay(project.video_url || '', project.title);
    }
  };

  // Helper to extract YouTube ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const ytId = getYouTubeId(project.video_url || '');
  const isDirectVideo = project.video_url && !ytId && !project.video_url.includes('vimeo.com');

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card-bg transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_10px_30px_-10px_rgba(236,72,153,0.12)]">
      {/* Thumbnail Container (TikTok style 9:16 aspect ratio) */}
      <div 
        onClick={onPlay ? handlePlayClick : undefined}
        className={`relative aspect-[9/16] w-full overflow-hidden bg-slate-100 ${onPlay ? 'cursor-pointer' : ''}`}
      >
        {isDirectVideo ? (
          <video
            src={project.video_url}
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ytId ? `https://img.youtube.com/vi/${ytId}/0.jpg` : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </>
        )}
        
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg hover:bg-white/30 hover:scale-110">
            <IconPlayerPlay className="w-6 h-6 fill-current pl-0.5" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          {project.is_featured && (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold text-white tracking-wider uppercase shadow-sm">
              Nổi bật
            </span>
          )}
          {categoryName && (
            <span className="rounded-full bg-white/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200/50 uppercase shadow-sm">
              {categoryName}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-2 font-mono">
          {project.client_name && (
            <span className="flex items-center gap-1">
              <IconUser className="w-3.5 h-3.5 text-slate-400" />
              {project.client_name}
            </span>
          )}
          <span className="flex items-center gap-1">
            <IconCalendar className="w-3.5 h-3.5 text-slate-400" />
            {project.project_date}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors duration-200 line-clamp-1 mb-2">
          {project.title}
        </h3>
        
        <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">
          {project.short_description}
        </p>

        {/* Tools row */}
        {project.tools_used && project.tools_used.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tools_used.slice(0, 3).map((tool) => (
              <span key={tool} className="rounded bg-slate-50 border border-slate-200 px-1.5 py-0.5 text-[10px] font-mono text-slate-600">
                {tool}
              </span>
            ))}
            {project.tools_used.length > 3 && (
              <span className="text-[10px] text-slate-500 font-mono self-center pl-1">
                +{project.tools_used.length - 3}
              </span>
            )}
          </div>
        )}

        {/* View Details / Quick Play buttons */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          {onPlay ? (
            <button
              onClick={handlePlayClick}
              className="inline-flex items-center justify-center gap-1 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/25 py-2 text-center text-xs font-bold text-primary transition-all cursor-pointer"
            >
              Xem Video
              <IconPlayerPlay className="w-3.5 h-3.5 fill-current" />
            </button>
          ) : (
            <Link
              href={`/portfolio/${project.slug}`}
              className="inline-flex items-center justify-center gap-1 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/25 py-2 text-center text-xs font-bold text-primary transition-all"
            >
              Xem Video
              <IconPlayerPlay className="w-3.5 h-3.5 fill-current" />
            </Link>
          )}
          <Link
            href={`/portfolio/${project.slug}`}
            className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 hover:border-primary/20 hover:bg-slate-50 py-2 text-center text-xs font-semibold text-slate-700 transition-all"
          >
            Chi tiết
            <IconExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
