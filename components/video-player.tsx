export function VideoPlayer({ src, title }: { src: string | null; title: string }) {
  if (!src) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100 text-sm text-muted">
        Video will be available soon.
      </div>
    );
  }

  return (
    <iframe
      title={title}
      src={src}
      className="aspect-video w-full rounded-lg bg-black"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
