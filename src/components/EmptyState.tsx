'use client';

import { IconInbox } from '@tabler/icons-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = "Không tìm thấy dữ liệu",
  message = "Hiện tại chưa có nội dung hiển thị ở mục này.",
  actionLabel,
  onAction
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-card-border rounded-2xl bg-white shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-primary mb-4 border border-emerald-100">
        <IconInbox className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-medium text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 active:scale-95 transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
