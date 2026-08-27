"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { ease } from "@/components/ui/AnimationWrappers";

export default function BlogModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function close() {
    router.back();
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease }}
        onClick={close}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease }}
        className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] overflow-y-auto bg-bg-card border border-bg-border sm:rounded-2xl rounded-t-2xl shadow-2xl"
      >
        <button
          onClick={close}
          aria-label="Close"
          className="sticky top-3 float-right mr-3 z-10 p-2 rounded-full bg-bg/80 backdrop-blur border border-bg-border text-text-secondary hover:text-accent-primary transition"
        >
          <X size={18} />
        </button>
        <div className="p-6 sm:p-10 clear-both">{children}</div>
      </motion.div>
    </div>
  );
}
