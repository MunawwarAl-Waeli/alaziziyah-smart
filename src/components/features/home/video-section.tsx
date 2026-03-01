"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Clock, Sparkles } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// 1. الواجهة والبيانات (بالروابط الأصلية الخاصة بك)
interface VideoItem {
  id: number;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  type: "local" | "youtube";
}

const videos: VideoItem[] = [
  {
    id: 1,
    title: "جولة حصرية داخل المصنع",
    category: "عن المصنع",
    duration: "03:45",
    thumbnail: "/images/0.jpg",
    videoUrl: "/videos/test.mp4",
    type: "local",
  },
  {
    id: 2,
    title: "تركيب مظلات مواقف STC",
    category: "مشاريع",
    duration: "01:20",
    thumbnail: "/images/2.jpg",
    videoUrl: "/videos/test.mp4",
    type: "local",
  },
  {
    id: 3,
    title: "مقابلة مع المدير التنفيذي",
    category: "لقاءات",
    duration: "05:10",
    thumbnail: "/images/3.jpg",
    videoUrl: "/videos/test.mp4",
    type: "local",
  },
  {
    id: 4,
    title: "تقنية القص بالليزر",
    category: "تكنولوجيا",
    duration: "00:50",
    thumbnail: "/images/4.jpg",
    videoUrl: "/videos/test.mp4",
    type: "local",
  },
];

export function VideoGallery() {
  // حالة تتبع الكرت النشط
  const [activeId, setActiveId] = useState<number>(videos[0].id);
  // حالة تتبع الفيديو المفتوح في النافذة المنبثقة
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // دالة تفاعل ذكية تدعم الجوال والكمبيوتر
  const handleInteraction = (video: VideoItem) => {
    if (activeId === video.id) {
      // إذا كان الكرت مفتوحاً بالفعل، قم بتشغيل الفيديو
      setPlayingVideo(video);
    } else {
      // إذا كان مغلقاً، قم بتوسيعه فقط
      setActiveId(video.id);

      // تمرير ناعم لجعل الكرت المختار في المنتصف
      const element = document.getElementById(`video-card-${video.id}`);
      if (element && scrollRef.current) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  return (
    <section className="py-24 relative  overflow-hidden" dir="rtl">
      {/* --- خلفية فخمة ومتطورة --- */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* رأس القسم */}
        <div className="text-center mb-16 max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-sm font-bold mb-6 border border-[#d4af37]/20"
          >
            <Sparkles className="w-4 h-4" />
            التجربة البصرية
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white"
          >
            معرض <span className="text-[#d4af37]">المرئيات</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            اكتشف دقة التصنيع واحترافية التركيب. انقر على أي مشروع لتكبيره،
            واضغط مرة أخرى لمشاهدة التفاصيل الحية.
          </motion.p>
        </div>

        {/* --- حاوية الأكورديون الأفقي (تقبل عدد غير محدود من الفيديوهات) --- */}
        <div
          ref={scrollRef}
          className="flex gap-2 md:gap-4 overflow-x-auto pb-10 pt-4 px-4 md:px-8 snap-x snap-mandatory no-scrollbar w-full"
        >
          {videos.map((video, index) => {
            const isActive = activeId === video.id;

            return (
              <div
                id={`video-card-${video.id}`}
                key={video.id}
                onClick={() => handleInteraction(video)}
                onMouseEnter={() => setActiveId(video.id)} // تمدد عند التمرير في الكمبيوتر
                className={cn(
                  "relative h-[400px] md:h-[550px] rounded-3xl md:rounded-[2.5rem] overflow-hidden cursor-pointer shrink-0 transition-all duration-700 ease-out snap-center group border border-white/5 shadow-2xl bg-slate-900",
                  // التحكم الديناميكي في العرض (العنصر النشط يأخذ مساحة كبرى، وغير النشط يأخذ مساحة صغيرة)
                  isActive
                    ? "w-[85vw] md:w-[600px] lg:w-[750px]"
                    : "w-[15vw] md:w-[100px] lg:w-[120px]",
                )}
              >
                {/* صورة الغلاف */}
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className={cn(
                    "object-cover transition-all duration-1000",
                    isActive
                      ? "scale-100 grayscale-0"
                      : "scale-125 grayscale opacity-60",
                  )}
                />

                {/* تدرج لوني داكن يعطي عمقاً */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t transition-opacity duration-700",
                    isActive
                      ? "from-black/90 via-black/40 to-transparent"
                      : "from-black/90 to-black/30",
                  )}
                />

                {/* --- محتوى الكرت وهو مغلق (غير نشط) --- */}
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col items-center justify-end pb-8 transition-opacity duration-500",
                    isActive ? "opacity-0 pointer-events-none" : "opacity-100",
                  )}
                >
                  <span className="text-[#d4af37] font-black text-xl mb-4">
                    0{index + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-3 h-3 text-white ml-0.5" />
                  </div>
                </div>

                {/* --- محتوى الكرت وهو مفتوح (نشط) --- */}
                <div
                  className={cn(
                    "absolute inset-0 p-6 md:p-10 flex flex-col justify-end transition-all duration-700 delay-100",
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10 pointer-events-none",
                  )}
                >
                  {/* زر التشغيل الرئيسي */}
                  <div className="mb-auto mt-auto flex justify-center md:justify-start">
                    <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute inset-0 bg-[#d4af37] rounded-full animate-ping opacity-20" />
                      <div className="w-full h-full bg-white/10 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center bg-gradient-to-br hover:from-[#d4af37] hover:to-[#c4a027] transition-all duration-500 shadow-xl group-hover:border-transparent">
                        <Play className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-slate-900 fill-current ml-1 transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* المعلومات السفلية */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-[#d4af37] text-slate-900 text-[10px] md:text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                      {video.category}
                    </span>
                    <span className="text-white/80 text-xs md:text-sm font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                      {video.duration}
                    </span>
                  </div>

                  <h3 className="text-white text-xl md:text-3xl lg:text-4xl font-bold leading-tight line-clamp-2 max-w-2xl">
                    {video.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- النافذة المنبثقة الذكية لتشغيل الفيديو --- */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setPlayingVideo(null)}
          >
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-[#d4af37] transition-colors z-50 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.15)] border border-white/10 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {playingVideo.type === "youtube" ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`${playingVideo.videoUrl}?autoplay=1&rel=0`}
                  title={playingVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <video
                  src={playingVideo.videoUrl}
                  controls
                  autoPlay
                  className="absolute inset-0 w-full h-full object-contain bg-[#030712]"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
