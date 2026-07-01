'use client';

import React, { use } from 'react';
import ProjectForm from '@/components/ProjectForm';
import { useMockDb } from '@/context/MockDbContext';
import Link from 'next/link';
import { IconChevronLeft } from '@tabler/icons-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditProjectPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { projects } = useMockDb();
  
  const project = projects.find((p) => p.id === resolvedParams.id);

  if (!project) {
    return (
      <div className="max-w-xl mx-auto text-center py-12 space-y-4">
        <p className="text-sm text-slate-500">Dự án video này không tồn tại hoặc đã bị xóa khỏi hệ thống.</p>
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-emerald-650 font-semibold"
        >
          <IconChevronLeft className="w-4 h-4" />
          Quay lại quản lý dự án
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProjectForm project={project} />
    </div>
  );
}
