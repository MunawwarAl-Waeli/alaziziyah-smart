"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Umbrella,
  Shield,
  Sun,
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle,
  Award,
  Users,
  Clock,
  ChevronDown,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

interface HeroProps {
  title: string;
  description: string;
}

// قيم ثابتة للعناصر المتحركة لتجنب Hydration mismatch
const generateParticles = () => {
  return Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: (i * 73) % 1000,
    y: (i * 37) % 1000,
    moveX: ((i * 13) % 80) - 40,
    moveY: ((i * 17) % 80) - 40,
    duration: 8 + (i % 12),
  }));
};
const ALL_SERVICES = [
  { name: "مظلات سيارات", slug: "projects/مظلات-سيارات" },
  { name: "برجولات", slug: "projects/معرض_برجولات_حديد" },
  { name: "سواتر ليزر وحديد", slug: "projects/سواتر-حديد" },
  { name: "سواتر خشبية", slug: "projects/سواتر-خشبية" },
  { name: "مظلات مسابح", slug: "projects/مظلات-مسابح" },
  { name: "مظلات مدارس", slug: "projects/مظلات-مدارس" },
  // { name: "هناجر ومستودعات", slug: "projects/هناجر" },
  { name: "قرميد", slug: "services/قرميد" },
  { name: "بيوت شعر ملكية", slug: "services/بيوت-شعر" },
  { name: "مظلات شد إنشائي", slug: "projects/مظلات-الشد-الانشائي" },
  { name: "مظلات حدائق", slug: "projects/مظلات-حدائق" },
];

export function MainHero({ title, description }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [particles] = useState(generateParticles); // آمن تماماً للـ SSR

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);



  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 text-white overflow-hidden min-h-screen flex items-center"
    >
      {/* ===== 1. حاوية الخلفية ===== */}
      <motion.div
        style={{ y: backgroundY, opacity: backgroundOpacity }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <motion.div
          animate={{ y: [0, -40, 0], x: [0, 20, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-[5%] text-amber-500/30 hidden lg:block"
        >
          <Umbrella className="w-32 h-32" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 40, 0], x: [0, -30, 0], rotate: [0, -20, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-32 right-[5%] text-amber-600/20 hidden lg:block"
        >
          <Shield className="w-40 h-40" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-40 right-[15%]"
        >
          <Sun className="w-20 h-20 text-yellow-500/20" />
        </motion.div>

        {/* النقاط المتحركة */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: [0, particle.moveY, 0],
              x: [0, particle.moveX, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
          />
        ))}

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-auto"
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
              fill="#ffffff"
              fillOpacity="0.1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </motion.div>

      {/* ===== 2. المحتوى الرئيسي ===== */}
      <div className="container mx-auto px-4 pt-32 pb-20 lg:pt-40 lg:pb-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                  {title}
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <p className="text-lg lg:text-xl text-amber-100/90 mb-4 leading-relaxed">
                {description}
              </p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {[
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    text: "ضمان 10 سنوات",
                  },
                  { icon: <Award className="w-5 h-5" />, text: "مواد أوروبية" },
                  { icon: <Users className="w-5 h-5" />, text: "فريق محترف" },
                  { icon: <Clock className="w-5 h-5" />, text: "تنفيذ سريع" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-2 bg-white/5 backdrop-blur p-2 rounded-xl border border-white/10"
                  >
                    <span className="text-amber-400">{item.icon}</span>
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-2 sm:gap-4 mb-8"
            >
              {[
                { number: "500+", label: "مشروع", icon: "🏗️" },
                { number: "15+", label: "سنوات", icon: "⏳" },
                { number: "100%", label: "رضا العملاء", icon: "⭐" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur rounded-xl p-3 text-center border border-white/10"
                >
                  <span className="text-xl sm:text-2xl font-bold text-amber-400">
                    {stat.number}
                  </span>
                  <p className="text-xs text-amber-200">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 mb-6"
            >
              <Link
                href="/contact"
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl font-bold text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all flex-1 text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  احصل على عرض سعر
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>

              <a
                href="https://wa.me/966530989975"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-xl flex-1"
              >
                <MessageCircle className="w-5 h-5" />
                واتساب
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2"
            >
              <span className="text-sm text-amber-300 ml-2">اعمالنا:</span>
              {ALL_SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/${service.slug}`}
                  className="px-3 py-1.5 bg-white/5 backdrop-blur rounded-full text-xs text-amber-200 hover:bg-amber-500 hover:text-white transition-all border border-white/10"
                >
                  {service.name}
                </Link>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-2 mt-6 text-sm text-amber-300/70"
            >
              <MapPin className="w-4 h-4" />
              <span>نغطي كافة أحياء ومناطق مدينة جدة</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-1 lg:order-2 hidden lg:block relative"
          >
            <div className="relative h-[600px] w-full">
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 2, -2, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-0 w-[450px] h-[500px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10 z-20"
              >
                <Image
                  src="/images/مظلات-السيارات.jpg"
                  alt="مظلات سيارات بي في سي وجي دي اف في جدة"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 right-6 text-white">
                  <p className="text-2xl font-bold">مظلات سيارات مبتكرة</p>
                  <p className="text-amber-300">
                    عزل حراري 100% وحماية من شمس جدة الحارقة
                  </p>
                </div>
                <div className="absolute top-6 left-6 bg-amber-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
                  خصم 20%
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 30, 0], rotate: [0, -3, 3, 0] }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-0 left-0 w-[350px] h-[400px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10 z-10"
              >
                <Image
                  src="/images/1.jpg"
                  alt="تركيب برجولات خشبية وحديدية في جدة"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 350px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 right-6 text-white">
                  <p className="text-xl font-bold">برجولات حدائق مودرن</p>
                  <p className="text-sm text-amber-300">
                    تصاميم عصرية للجلسات الخارجية والأسطح
                  </p>
                </div>
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute top-40 left-20 w-[200px] h-[200px] rounded-2xl overflow-hidden shadow-xl border-4 border-white/10 z-30"
              >
                <Image
                  src="/images/السواتر.jpg"
                  alt="سواتر حديد ليزر وسواتر قماشية بجدة"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* مؤشر التمرير */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 cursor-pointer hidden lg:block z-20"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">اكتشف المزيد</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </motion.div>
    </section>
  );
}
