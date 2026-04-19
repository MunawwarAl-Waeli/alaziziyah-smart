"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Clock, Video } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SoftWavesDivider } from "@/components/ui/SoftWavesDivider";

interface YouTubeVideo {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  videoId: string;
  type: "youtube";
}

export function VideoGallery() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<YouTubeVideo | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // جلب الفيديوهات
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/videos");
        const result = await response.json();

        if (result.success && Array.isArray(result.videos)) {
          setVideos(result.videos);
        }
      } catch (error) {
        console.error("فشل في جلب الفيديوهات:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // التحقق من حجم الشاشة
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // فحص أولي
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleInteraction = (video: YouTubeVideo) => {
    if (videos[activeIndex]?.id === video.id) {
      setPlayingVideo(video);
    } else {
      const newIndex = videos.findIndex((v) => v.id === video.id);
      setActiveIndex(newIndex);
      scrollToCard(newIndex);
    }
  };

  const scrollToCard = (index: number) => {
    const element = document.getElementById(`video-card-${videos[index]?.id}`);
    if (element && scrollRef.current) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }, 50);
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current || videos.length === 0 || !isMobile) return;

    const container = scrollRef.current;
    const cards = container.querySelectorAll('[id^="video-card-"]');
    const containerCenter =
      container.getBoundingClientRect().left + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  if (isLoading) {
    return (
      <section className="py-24 relative overflow-hidden bg-background flex items-center justify-center min-h-[60vh]">
        <div className="text-foreground text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>جاري تحميل الفيديوهات...</p>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return (
      <section className="py-24 relative overflow-hidden bg-background flex items-center justify-center min-h-[60vh]">
        <p className="text-foreground text-lg">
          لا توجد فيديوهات متاحة حالياً.
        </p>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "py-16 md:py-24 relative overflow-hidden",
        "bg-gradient-to-b from-slate-50 to-slate-100",
        "dark:from-slate-950 dark:to-slate-900",
      )}
      dir="rtl"
    >
      <SoftWavesDivider />

      {/* تأثيرات خلفية ثابتة */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-10" />
      <div className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[100px] pointer-events-none opacity-5" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-bold mb-6 border border-primary/20 shadow-sm"
          >
            <Video className="w-4 h-4" />
            التجربة البصرية
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-foreground"
          >
            معرض{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-primary-dark">
              المرئيات
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            اكتشف دقة التصنيع واحترافية التركيب. انقر على أي مشروع لمشاهدة
            التفاصيل الحية بالصوت والصورة.
          </motion.p>
        </div>

        <div className="relative group/gallery">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className={cn(
              "flex gap-4 pb-10 pt-4 px-8 md:px-20 overflow-x-auto",
              "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
              isMobile ? "snap-x snap-mandatory" : "",
            )}
          >
            {videos.map((video, index) => {
              const isActive = index === activeIndex;
              const isHovered = hoveredId === video.id;

              return (
                <div
                  id={`video-card-${video.id}`}
                  key={video.id}
                  onClick={() => handleInteraction(video)}
                  onMouseEnter={() => !isMobile && setHoveredId(video.id)}
                  onMouseLeave={() => !isMobile && setHoveredId(null)}
                  className={cn(
                    "relative rounded-[2rem] overflow-hidden cursor-pointer shrink-0 group border shadow-2xl bg-card border-border",
                    "transition-[width,transform] duration-500 ease-in-out",
                    "transform-gpu [backface-visibility:hidden] will-change-transform [-webkit-font-smoothing:antialiased]",
                    isMobile ? "snap-center w-[85vw] h-[400px]" : "h-[550px]",
                    !isMobile && isActive && "w-[700px] lg:w-[800px]",
                    !isMobile && !isActive && isHovered && "w-[250px]",
                    !isMobile && !isActive && !isHovered && "w-[120px]",
                  )}
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className={cn(
                      "object-cover transition-all duration-700 ease-in-out",
                      "transform-gpu [backface-visibility:hidden]",
                      isActive
                        ? "scale-100 grayscale-0 opacity-100"
                        : "scale-110 grayscale opacity-50 md:opacity-60 group-hover:opacity-80",
                    )}
                    sizes={isMobile ? "85vw" : isActive ? "800px" : "250px"}
                    unoptimized
                  />

                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t transition-opacity duration-500",
                      isActive
                        ? "from-black/90 via-black/20 to-transparent"
                        : "from-black/90 to-black/30",
                    )}
                  />

                  {/* المحتوى الجانبي (عندما يكون الكارت مغلقاً) */}
                  <div
                    className={cn(
                      "absolute inset-0 flex transition-opacity duration-300",
                      isMobile
                        ? "flex-row items-center px-6"
                        : "flex-col items-center justify-end pb-10",
                      isActive
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100 delay-200",
                    )}
                  >
                    <span className="text-primary font-black text-2xl mb-4">
                      0{index + 1}
                    </span>
                    {isMobile && (
                      <h4 className="text-white font-bold text-lg line-clamp-1 ml-auto">
                        {video.title}
                      </h4>
                    )}
                    <div className="w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:border-primary transition-colors shrink-0">
                      <Play className="w-5 h-5 text-white ml-1 group-hover:text-primary transition-colors" />
                    </div>
                  </div>

                  {/* المحتوى الرئيسي (عندما يكون الكارت مفتوحاً) */}
                  <div
                    className={cn(
                      "absolute inset-0 p-6 md:p-10 flex flex-col justify-end transition-all duration-500",
                      isActive
                        ? "opacity-100 translate-y-0 delay-200"
                        : "opacity-0 translate-y-10 pointer-events-none",
                    )}
                  >
                    <div className="mb-auto mt-auto flex justify-center md:justify-start">
                      {/* زر التشغيل مع إعادة التأثير النبضي */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative w-16 h-16 md:w-20 md:h-20"
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0, 0.3],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-primary rounded-full transform-gpu"
                        />
                        <div className="relative w-full h-full bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center bg-gradient-to-br hover:from-primary hover:to-primary-dark transition-all shadow-[0_0_30px_rgba(var(--primary),0.3)]">
                          <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-current ml-1" />
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="bg-primary text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                        فيديو
                      </span>
                      <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        {video.duration}
                      </span>
                    </div>

                    <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-black leading-tight line-clamp-2 md:max-w-2xl drop-shadow-lg w-full whitespace-normal">
                      {video.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {isMobile && (
            <div className="flex justify-center gap-2 mt-4">
              {videos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    scrollToCard(idx);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    idx === activeIndex
                      ? "bg-primary w-8"
                      : "bg-primary/20 w-2 hover:bg-primary/50",
                  )}
                  aria-label={`الذهاب للفيديو ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* نافذة التشغيل المنبثقة */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setPlayingVideo(null)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:bg-primary transition-all z-50 p-3 rounded-full bg-black/50 border border-white/10 hover:border-primary"
              onClick={() => setPlayingVideo(null)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${playingVideo.videoId}?autoplay=1&rel=0`}
                title={playingVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
