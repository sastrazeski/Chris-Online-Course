"use client";

import { ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

export function VideoPlayer({
  src,
  title,
  watermark
}: {
  src: string | null;
  title: string;
  watermark: string;
}) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    function handleVisibility() {
      setIsHidden(document.hidden);
    }

    function blockContextMenu(event: MouseEvent) {
      event.preventDefault();
    }

    function blockRiskyKeys(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      const isPrintScreen = key === "printscreen";
      const isSave = (event.ctrlKey || event.metaKey) && key === "s";
      const isDevtools = key === "f12" || ((event.ctrlKey || event.metaKey) && event.shiftKey && ["i", "j", "c"].includes(key));

      if (isPrintScreen || isSave || isDevtools) {
        event.preventDefault();
        setIsHidden(true);
        window.setTimeout(() => setIsHidden(document.hidden), 1400);
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("keydown", blockRiskyKeys);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("keydown", blockRiskyKeys);
    };
  }, []);

  if (!src) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100 text-sm text-muted">
        Video will be available soon.
      </div>
    );
  }

  const videoSrc = normalizeVideoUrl(src);

  if (isDirectVideo(videoSrc)) {
    return (
      <SecureFrame isHidden={isHidden} watermark={watermark}>
        {/* Premium videos must not expose browser download affordances; backend subscription checks still remain the real access gate. */}
        <video
          title={title}
          src={videoSrc}
          className="aspect-video w-full rounded-lg bg-black"
          controls
          controlsList="nodownload noplaybackrate noremoteplayback"
          disablePictureInPicture
          playsInline
          draggable={false}
          onContextMenu={(event) => event.preventDefault()}
        />
      </SecureFrame>
    );
  }

  return (
    <SecureFrame isHidden={isHidden} watermark={watermark}>
      <iframe
        title={title}
        src={videoSrc}
        className="aspect-video w-full rounded-lg bg-black"
        allow="encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </SecureFrame>
  );
}

function SecureFrame({
  children,
  isHidden,
  watermark
}: {
  children: React.ReactNode;
  isHidden: boolean;
  watermark: string;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-black"
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
    >
      <div className={isHidden ? "blur-xl brightness-50" : ""}>{children}</div>
      <div className="pointer-events-none absolute inset-0 select-none">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-black/15 px-3 py-1 text-[11px] font-semibold text-white/55 backdrop-blur-[1px]"
            style={{
              left: `${8 + (index % 4) * 24}%`,
              top: `${12 + Math.floor(index / 4) * 28}%`,
              transform: `rotate(${index % 2 === 0 ? -18 : 18}deg)`
            }}
          >
            {watermark}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-md border border-white/10 bg-black/50 px-3 py-2 text-xs font-medium text-white/80 backdrop-blur">
        <ShieldAlert className="h-4 w-4 text-red-300" />
        Materi dilindungi. Akun dan sesi ditandai pada video.
      </div>
      {isHidden ? (
        <div className="absolute inset-0 grid place-items-center bg-black/80 px-6 text-center text-sm font-semibold text-white">
          Video disembunyikan saat tab tidak aktif atau shortcut berisiko digunakan.
        </div>
      ) : null}
    </div>
  );
}

function normalizeVideoUrl(value: string) {
  const trimmed = value.trim();
  const driveFileId = trimmed.match(/drive\.google\.com\/file\/d\/([^/]+)/)?.[1];

  if (driveFileId) {
    return `https://drive.google.com/file/d/${driveFileId}/preview`;
  }

  return trimmed;
}

function isDirectVideo(value: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(value);
}
