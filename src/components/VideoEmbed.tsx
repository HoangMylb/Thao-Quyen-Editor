'use client';

interface VideoEmbedProps {
  videoUrl: string;
  title?: string;
  isVertical?: boolean;
}

export default function VideoEmbed({ videoUrl, title = "Project Video", isVertical = false }: VideoEmbedProps) {
  // Helper to extract YouTube ID
  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('embed/')) {
      return url;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`;
    }
    return null;
  };

  // Helper to extract Vimeo ID
  const getVimeoEmbedUrl = (url: string) => {
    if (url.includes('player.vimeo.com')) {
      return url;
    }
    const regExp = /vimeo\.com\/(?:video\/)?([0-9]+)/;
    const match = url.match(regExp);
    if (match && match[1]) {
      return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
    }
    return null;
  };

  const ytUrl = getYouTubeEmbedUrl(videoUrl);
  const vimeoUrl = getVimeoEmbedUrl(videoUrl);

  const containerClass = `relative ${isVertical ? 'aspect-[9/16] h-full' : 'aspect-video w-full'} overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/5`;

  if (ytUrl) {
    return (
      <div className={containerClass}>
        <iframe
          src={ytUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  if (vimeoUrl) {
    return (
      <div className={containerClass}>
        <iframe
          src={vimeoUrl}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  // Fallback direct video file
  return (
    <div className={containerClass}>
      <video
        src={videoUrl}
        controls
        autoPlay
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      >
        Trình duyệt của bạn không hỗ trợ tag video.
      </video>
    </div>
  );
}
