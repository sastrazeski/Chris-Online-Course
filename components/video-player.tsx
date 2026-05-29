export function VideoPlayer({ src, title }: { src: string | null; title: string }) {
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
      <video
        title={title}
        src={videoSrc}
        className="aspect-video w-full rounded-lg bg-black"
        controls
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        onContextMenu={(event) => event.preventDefault()}
      />
    );
  }

  return (
    <iframe
      title={title}
      src={videoSrc}
      className="aspect-video w-full rounded-lg bg-black"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
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
