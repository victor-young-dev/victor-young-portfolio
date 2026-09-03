import { useState } from "react";
import { Play } from "lucide-react";

/** Click-to-load YouTube embed — a thumbnail until clicked, so nothing loads Google's player up front. */
export function LiteYouTube({ youtubeId, title }: { youtubeId: string; title?: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
        title={title ?? "Video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative aspect-video w-full overflow-hidden bg-bg-subtle"
      aria-label={title ? `Play ${title}` : "Play video"}
    >
      <img
        src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-black/35 transition-colors duration-200 group-hover:bg-black/20" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="grid size-16 place-items-center rounded-full bg-white/95 text-neutral-900 shadow-lg transition-transform duration-200 group-hover:scale-110">
          <Play className="ml-1 size-6 fill-current" />
        </span>
      </span>
      {title ? (
        <span className="absolute right-4 bottom-4 left-4 text-left text-sm font-medium text-white [text-shadow:0_1px_4px_rgb(0_0_0_/_0.6)]">
          {title}
        </span>
      ) : null}
    </button>
  );
}
