"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/** Extracts a YouTube video ID from any common YouTube URL format. */
function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    // youtu.be/ID
    if (u.hostname === "youtu.be") return u.pathname.slice(1).split("?")[0];
    // youtube.com/watch?v=ID  or  /embed/ID  or  /shorts/ID
    if (u.hostname.includes("youtube.com")) {
      return (
        u.searchParams.get("v") ||
        u.pathname.split("/").find((s, i, arr) =>
          ["embed", "shorts", "v"].includes(arr[i - 1])
        ) ||
        null
      );
    }
  } catch {}
  return null;
}

function buildEmbedUrl(url: string): string {
  const ytId = getYouTubeId(url);
  if (ytId) {
    return `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`;
  }
  // Assume direct video URL
  return url;
}

function isYouTube(url: string) {
  return !!getYouTubeId(url);
}

type Props = {
  url: string;
  open: boolean;
  onClose: () => void;
};

export default function VideoModal({ url, open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const embedUrl = buildEmbedUrl(url);
  const youtube = isYouTube(url);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          key="video-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.target === overlayRef.current && onClose()}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
        >
          <motion.div
            key="video-box"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition flex items-center gap-1.5 text-xs font-medium"
            >
              <X size={16} /> Close
            </button>

            {/* Video container — 16:9 */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-black shadow-2xl"
              style={{ paddingBottom: "56.25%" }}
            >
              {youtube ? (
                <iframe
                  src={embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Showreel"
                />
              ) : (
                <video
                  src={embedUrl}
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  autoPlay
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
