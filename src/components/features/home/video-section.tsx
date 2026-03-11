"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Clock, Sparkles, Video } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// 1. الواجهة والبيانات
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

// دالة مساعدة لحساب العرض بناءً على حجم الشاشة
const getCardWidth = (isActive: boolean, isMobile: boolean) => {
  if (isMobile) {
    return isActive ? "400px" : "120px";
  }
  return isActive ? "750px" : "120px";
};

export function VideoGallery() {
  const [activeId, setActiveId] = useState<number>(videos[0].id);
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ✅ التحقق من حجم الشاشة ديناميكياً
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleInteraction = (video: VideoItem) => {
    if (activeId === video.id) {
      setPlayingVideo(video);
    } else {
      setActiveId(video.id);
      // تمرير سلس للعنصر النشط
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
    <section
      className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900"
      dir="rtl"
    >
      {/* إضاءات خلفية متحركة */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05],
          x: [0, -100, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="container mx-auto relative z-10">
        {/* رأس القسم */}
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
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white"
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
            className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            اكتشف دقة التصنيع واحترافية التركيب. انقر على أي مشروع لمشاهدة
            التفاصيل الحية بالصوت والصورة.
          </motion.p>
        </div>

        {/* --- حاوية الفيديوهات (متحولة حسب حجم الشاشة) --- */}
        <div
          ref={scrollRef}
          className={cn(
            "flex gap-4 overflow-x-auto pb-10 pt-4 px-4 md:px-8 snap-x snap-mandatory no-scrollbar",
            isMobile ? "flex-col overflow-x-hidden" : "flex-row",
          )}
          style={{
            maxHeight: isMobile ? "none" : "600px",
          }}
        >
          {videos.map((video, index) => {
            const isActive = activeId === video.id;

            return (
              <motion.div
                id={`video-card-${video.id}`}
                key={video.id}
                layout
                onClick={() => handleInteraction(video)}
                onMouseEnter={() => !isMobile && setActiveId(video.id)}
                className={cn(
                  "relative rounded-[2rem] overflow-hidden cursor-pointer shrink-0 transition-all duration-700 ease-out snap-center group border border-white/10 shadow-2xl bg-slate-900",
                  isMobile ? "w-full" : "h-[550px]",
                )}
                animate={{
                  width: isMobile ? "100%" : getCardWidth(isActive, isMobile),
                  height: isMobile ? (isActive ? "400px" : "120px") : "550px",
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* صورة الغلاف */}
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className={cn(
                    "object-cover transition-all duration-1000",
                    isActive
                      ? "scale-100 grayscale-0 opacity-80 group-hover:opacity-100"
                      : "scale-110 grayscale opacity-40 md:opacity-50",
                  )}
                  sizes="(max-width: 768px) 100vw, 750px"
                />

                {/* تدرج لوني داكن */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t transition-opacity duration-700",
                    isActive
                      ? "from-slate-950 via-slate-900/50 to-transparent"
                      : "from-slate-950 to-slate-900/60",
                  )}
                />

                {/* --- محتوى الكرت وهو مغلق (غير نشط) --- */}
                <div
                  className={cn(
                    "absolute inset-0 flex transition-opacity duration-500",
                    isMobile
                      ? "flex-row items-center px-6"
                      : "flex-col items-center justify-end pb-8",
                    isActive ? "opacity-0 pointer-events-none" : "opacity-100",
                  )}
                >
                  <span className="text-primary font-black text-2xl mb-4 md:mb-4">
                    0{index + 1}
                  </span>

                  {/* عنوان مصغر يظهر في الجوال */}
                  {isMobile && (
                    <h4 className="text-white font-bold text-lg line-clamp-1 ml-auto">
                      {video.title}
                    </h4>
                  )}

                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:border-primary transition-colors shrink-0">
                    <Play className="w-4 h-4 md:w-5 md:h-5 text-white ml-1 group-hover:text-primary transition-colors" />
                  </div>
                </div>

                {/* --- محتوى الكرت وهو مفتوح (نشط) --- */}
                <div
                  className={cn(
                    "absolute inset-0 p-6 md:p-10 flex flex-col justify-end transition-all duration-700",
                    isActive
                      ? "opacity-100 translate-y-0 delay-200"
                      : "opacity-0 translate-y-10 pointer-events-none",
                  )}
                >
                  {/* زر التشغيل الرئيسي */}
                  <div className="mb-auto mt-auto flex justify-center md:justify-start">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative w-16 h-16 md:w-20 md:h-20"
                    >
                      {/* النبض المتحرك */}
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-primary rounded-full"
                      />
                      {/* الزر الفعلي */}
                      <div className="relative w-full h-full bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center bg-gradient-to-br hover:from-primary hover:to-primary-dark transition-all duration-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                        <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-current ml-1" />
                      </div>
                    </motion.div>
                  </div>

                  {/* المعلومات السفلية */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="bg-primary text-white text-[10px] md:text-xs font-black px-3 py-1.5 rounded-full shadow-lg border border-primary-light/50">
                      {video.category}
                    </span>
                    <span className="bg-slate-900/60 backdrop-blur-md border border-white/10 text-white/90 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {video.duration}
                    </span>
                  </div>

                  <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-black leading-tight line-clamp-2 md:max-w-2xl drop-shadow-lg">
                    {video.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* --- النافذة المنبثقة لتشغيل الفيديو --- */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-2 md:p-12"
            onClick={() => setPlayingVideo(null)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setPlayingVideo(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:bg-primary transition-all z-50 p-3 rounded-full bg-black/50 border border-white/10"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative"
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
                  className="absolute inset-0 w-full h-full object-contain bg-black"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
// "use client";

// import { useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Play, X, Clock, Sparkles, Video } from "lucide-react";
// import Image from "next/image";
// import { cn } from "@/lib/utils";

// // 1. الواجهة والبيانات
// interface VideoItem {
//   id: number;
//   title: string;
//   category: string;
//   duration: string;
//   thumbnail: string;
//   videoUrl: string;
//   type: "local" | "youtube";
// }

// const videos: VideoItem[] = [
//   {
//     id: 1,
//     title: "جولة حصرية داخل المصنع",
//     category: "عن المصنع",
//     duration: "03:45",
//     thumbnail: "/images/0.jpg",
//     videoUrl: "/videos/test.mp4",
//     type: "local",
//   },
//   {
//     id: 2,
//     title: "تركيب مظلات مواقف STC",
//     category: "مشاريع",
//     duration: "01:20",
//     thumbnail: "/images/2.jpg",
//     videoUrl: "/videos/test.mp4",
//     type: "local",
//   },
//   {
//     id: 3,
//     title: "مقابلة مع المدير التنفيذي",
//     category: "لقاءات",
//     duration: "05:10",
//     thumbnail: "/images/3.jpg",
//     videoUrl: "/videos/test.mp4",
//     type: "local",
//   },
//   {
//     id: 4,
//     title: "تقنية القص بالليزر",
//     category: "تكنولوجيا",
//     duration: "00:50",
//     thumbnail: "/images/4.jpg",
//     videoUrl: "/videos/test.mp4",
//     type: "local",
//   },
// ];

// export function VideoGallery() {
//   const [activeId, setActiveId] = useState<number>(videos[0].id);
//   const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const handleInteraction = (video: VideoItem) => {
//     if (activeId === video.id) {
//       setPlayingVideo(video);
//     } else {
//       setActiveId(video.id);
//       const element = document.getElementById(`video-card-${video.id}`);
//       if (element && scrollRef.current) {
//         element.scrollIntoView({
//           behavior: "smooth",
//           block: "nearest",
//           inline: "center",
//         });
//       }
//     }
//   };

//   return (
//     // استخدام خلفية slate-950 لضمان التباين العالي للفيديوهات
//     <section className="py-24 relative overflow-hidden bg-slate-950" dir="rtl">
//       {/* إضاءات خلفية هندسية (Glows) */}
//       <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

//       <div className="container mx-auto relative z-10">
//         {/* رأس القسم */}
//         <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-bold mb-6 border border-primary/20 shadow-sm"
//           >
//             <Video className="w-4 h-4" />
//             التجربة البصرية
//           </motion.div>
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.1 }}
//             className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white"
//           >
//             معرض{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-dark to-primary">
//               المرئيات
//             </span>
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2 }}
//             className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
//           >
//             اكتشف دقة التصنيع واحترافية التركيب. انقر على أي مشروع لمشاهدة
//             التفاصيل الحية بالصوت والصورة.
//           </motion.p>
//         </div>

//         {/* --- حاوية الفيديوهات (عمودية للجوال، أكورديون للكمبيوتر) --- */}
//         <div
//           ref={scrollRef}
//           className="flex flex-col md:flex-row gap-4 md:gap-4 overflow-x-hidden md:overflow-x-auto pb-10 pt-4 px-4 md:px-8 snap-y md:snap-x snap-mandatory no-scrollbar w-full min-h-[600px] md:h-[600px]"
//         >
//           {videos.map((video, index) => {
//             const isActive = activeId === video.id;

//             return (
//               <div
//                 id={`video-card-${video.id}`}
//                 key={video.id}
//                 onClick={() => handleInteraction(video)}
//                 onMouseEnter={() => setActiveId(video.id)} // تمدد عند التمرير في الكمبيوتر فقط
//                 className={cn(
//                   "relative rounded-[2rem] overflow-hidden cursor-pointer shrink-0 transition-all duration-700 ease-out snap-center group border border-white/10 shadow-2xl bg-slate-900",
//                   // إعدادات الارتفاع والعرض الديناميكية:
//                   // في الجوال: الارتفاع يتغير، العرض ثابت 100%
//                   // في الكمبيوتر: الارتفاع ثابت، العرض يتغير (الأكورديون)
//                   "w-full md:h-[550px]",
//                   isActive
//                     ? "h-[400px] md:w-[600px] lg:w-[750px]"
//                     : "h-[120px] md:w-[100px] lg:w-[120px]",
//                 )}
//               >
//                 {/* صورة الغلاف */}
//                 <Image
//                   src={video.thumbnail}
//                   alt={video.title}
//                   fill
//                   className={cn(
//                     "object-cover transition-all duration-1000",
//                     isActive
//                       ? "scale-100 grayscale-0 opacity-80 group-hover:opacity-100"
//                       : "scale-110 grayscale opacity-40 md:opacity-50",
//                   )}
//                 />

//                 {/* تدرج لوني داكن يعطي عمقاً */}
//                 <div
//                   className={cn(
//                     "absolute inset-0 bg-gradient-to-t transition-opacity duration-700",
//                     isActive
//                       ? "from-slate-950 via-slate-900/50 to-transparent"
//                       : "from-slate-950 to-slate-900/60",
//                   )}
//                 />

//                 {/* --- محتوى الكرت وهو مغلق (غير نشط) - يظهر بشكل مختلف في الجوال والكمبيوتر --- */}
//                 <div
//                   className={cn(
//                     "absolute inset-0 flex transition-opacity duration-500",
//                     // في الجوال: عرض أفقي | في الكمبيوتر: عرض عمودي
//                     "flex-row items-center px-6 md:flex-col md:items-center md:justify-end md:pb-8 md:px-0",
//                     isActive ? "opacity-0 pointer-events-none" : "opacity-100",
//                   )}
//                 >
//                   <span className="text-primary font-black text-2xl md:mb-4 md:mr-0 mr-4">
//                     0{index + 1}
//                   </span>

//                   {/* عنوان مصغر يظهر في الجوال فقط عندما يكون مغلقاً */}
//                   <h4 className="text-white font-bold text-lg md:hidden line-clamp-1 ml-auto">
//                     {video.title}
//                   </h4>

//                   <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:border-primary transition-colors shrink-0">
//                     <Play className="w-4 h-4 md:w-5 md:h-5 text-white ml-1 group-hover:text-primary transition-colors" />
//                   </div>
//                 </div>

//                 {/* --- محتوى الكرت وهو مفتوح (نشط) --- */}
//                 <div
//                   className={cn(
//                     "absolute inset-0 p-6 md:p-10 flex flex-col justify-end transition-all duration-700",
//                     isActive
//                       ? "opacity-100 translate-y-0 delay-200"
//                       : "opacity-0 translate-y-10 pointer-events-none",
//                   )}
//                 >
//                   {/* زر التشغيل الرئيسي (في المنتصف) */}
//                   <div className="mb-auto mt-auto flex justify-center md:justify-start">
//                     <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
//                       {/* النبض النحاسي */}
//                       <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30" />
//                       {/* الزر الفعلي */}
//                       <div className="w-full h-full bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center bg-gradient-to-br hover:from-primary-light hover:to-primary-dark transition-all duration-500 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
//                         <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-current ml-1" />
//                       </div>
//                     </div>
//                   </div>

//                   {/* المعلومات السفلية */}
//                   <div className="flex flex-wrap items-center gap-3 mb-3">
//                     <span className="bg-primary text-primary-foreground text-[10px] md:text-xs font-black px-3 py-1.5 rounded-full shadow-lg border border-primary-light/50">
//                       {video.category}
//                     </span>
//                     <span className="bg-slate-900/60 backdrop-blur-md border border-white/10 text-white/90 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium flex items-center gap-1.5">
//                       <Clock className="w-3.5 h-3.5 text-primary" />
//                       {video.duration}
//                     </span>
//                   </div>

//                   <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-black leading-tight line-clamp-2 md:max-w-2xl drop-shadow-lg">
//                     {video.title}
//                   </h3>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* --- النافذة المنبثقة الذكية لتشغيل الفيديو (Lightbox) --- */}
//       <AnimatePresence>
//         {playingVideo && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-2 md:p-12"
//             onClick={() => setPlayingVideo(null)}
//           >
//             <button
//               onClick={() => setPlayingVideo(null)}
//               className="absolute top-6 right-6 md:top-10 md:right-10 text-slate-400 hover:text-white hover:bg-primary transition-all z-50 p-3 rounded-full bg-slate-900 border border-slate-800"
//             >
//               <X className="w-6 h-6 md:w-8 md:h-8" />
//             </button>

//             <motion.div
//               initial={{ scale: 0.95, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.95, opacity: 0, y: 20 }}
//               className="w-full max-w-6xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(245,158,11,0.15)] border border-slate-800 relative"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {playingVideo.type === "youtube" ? (
//                 <iframe
//                   width="100%"
//                   height="100%"
//                   src={`${playingVideo.videoUrl}?autoplay=1&rel=0`}
//                   title={playingVideo.title}
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                   className="absolute inset-0 w-full h-full"
//                 />
//               ) : (
//                 <video
//                   src={playingVideo.videoUrl}
//                   controls
//                   autoPlay
//                   className="absolute inset-0 w-full h-full object-contain bg-slate-950"
//                 />
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }
