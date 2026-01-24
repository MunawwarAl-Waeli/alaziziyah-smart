"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import {
  Star,
  Quote,
  Play,
  Volume2,
  Pause,
  Award,
  TrendingUp,
  Users,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  project: string;
  duration: string;
  impact: string[];
  video?: string;
  audio?: string;
  highlights: string[];
}

interface SuccessMetric {
  icon: any;
  value: string;
  label: string;
  change: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "المهندس محمد العليان",
    position: "مدير المشاريع",
    company: "NEOM",
    avatar: "/images/user.png",
    rating: 5,
    quote:
      "الشركة قدمت حلولاً مبتكرة تجاوزت توقعاتنا. الدقة في التنفيذ والالتزام بالجدول الزمني كان استثنائياً.",
    project: "مظلة سماوية بيومناخية",
    duration: "6 أشهر",
    impact: ["توفير 40% في الطاقة", "زيادة الكفاءة 35%", "رضا العملاء 98%"],
    video: "/videos/test.mp4",
    highlights: ["التزام بالمواعيد", "حلول مبتكرة", "جودة عالية"],
  },
  {
    id: 2,
    name: "الدكتورة سارة القحطاني",
    position: "رئيسة قسم الهندسة",
    company: "الرياض آرت",
    avatar: "/images/user.png",
    rating: 5,
    quote:
      "التعاون مع فريقكم كان تجربة استثنائية. الإبداع والاهتمام بالتفاصيل ظهر جلياً في كل مرحلة.",
    project: "واجهة ضوئية تفاعلية",
    duration: "8 أشهر",
    impact: ["زيادة الزوار 60%", "تفاعل الجمهور 85%", "جوائز عالمية"],
    audio: "/audio/test.mp4",
    highlights: ["إبداع فريد", "اهتمام بالتفاصيل", "احترافية"],
  },
  {
    id: 3,
    name: "المهندس خالد الفهد",
    position: "المدير التنفيذي",
    company: "أمانة الرياض",
    avatar: "/images/user.png",
    rating: 5,
    quote:
      "الجسر الذي صممتموه ليس مجرد هيكل، بل تحفة هندسية تجمع بين الجمال والوظيفية والسلامة.",
    project: "جسر معلق خفيف",
    duration: "10 أشهر",
    impact: ["تقليل التكاليف 25%", "سلامة 100%", "رضا المجتمع 95%"],
    highlights: ["هندسة دقيقة", "سلامة عالية", "توفير في التكاليف"],
  },
  {
    id: 4,
    name: "المهندسة نورا السديري",
    position: "مديرة الابتكار",
    company: "STC",
    avatar: "/images/user.png",
    rating: 5,
    quote:
      "القدرة على تحويل الأفكار المعقدة إلى واقع ملموس بجودة غير مسبوقة هي ما يميز هذا الفريق.",
    project: "مواقف ذكية",
    duration: "7 أشهر",
    impact: ["زيادة السعة 50%", "تقليل الانتظار 70%", "توفير الطاقة 45%"],
    video: "/videos/testimonial.mp4",
    highlights: ["تحويل الأفكار", "جودة غير مسبوقة", "ابتكار مستمر"],
  },
];

const successMetrics: SuccessMetric[] = [
  {
    icon: TrendingUp,
    value: "98%",
    label: "رضا العملاء",
    change: "+12%",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Award,
    value: "150+",
    label: "مشروع ناجح",
    change: "+25",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Target,
    value: "99.8%",
    label: "التزام بالمواعيد",
    change: "+5%",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Users,
    value: "200+",
    label: "عميل سعيد",
    change: "+40",
    color: "from-orange-500 to-red-500",
  },
];

export function CustomerSuccess() {
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "carousel" | "immersive">(
    "immersive",
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100"
    >
      {/* خلفية ديناميكية */}
      <SuccessBackground />

      {/* شريط التحكم */}
      <div className="fixed top-1/2 right-4 z-50 transform -translate-y-1/2">
        <div className="flex flex-col gap-3 p-3 bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-xl">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2.5 rounded-xl transition-all",
              viewMode === "grid"
                ? "bg-primary/20 text-primary"
                : "bg-gray-100 hover:bg-gray-200",
            )}
            aria-label="عرض شبكي"
          >
            <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
              <div className="bg-current rounded-sm" />
              <div className="bg-current rounded-sm" />
              <div className="bg-current rounded-sm" />
              <div className="bg-current rounded-sm" />
            </div>
          </button>

          <button
            onClick={() => setViewMode("carousel")}
            className={cn(
              "p-2.5 rounded-xl transition-all",
              viewMode === "carousel"
                ? "bg-primary/20 text-primary"
                : "bg-gray-100 hover:bg-gray-200",
            )}
            aria-label="عرض دائري"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-current rounded-full" />
            </div>
          </button>

          <button
            onClick={() => setViewMode("immersive")}
            className={cn(
              "p-2.5 rounded-xl transition-all",
              viewMode === "immersive"
                ? "bg-primary/20 text-primary"
                : "bg-gray-100 hover:bg-gray-200",
            )}
            aria-label="عرض غامر"
          >
            <div className="w-4 h-4 relative">
              <div className="absolute inset-0 border-2 border-current rounded-lg" />
              <div className="absolute inset-1 border border-current rounded" />
            </div>
          </button>
        </div>
      </div>

      {/* العنوان الرئيسي */}
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6"
          >
            <Volume2 className="w-4 h-4" />
            صوت النجاح
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            <span className="bg-gradient-to-r from-primary via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              أصوات تروي
            </span>
            <br />
            <span className="text-gray-900">قصة نجاحنا</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            ليس مجرد عملاء، بل شركاء في النجاح. استمع إلى قصصهم التي تشهد على
            تميزنا
          </motion.p>
        </div>
      </div>

      {/* إحصائيات النجاح */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {successMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} bg-opacity-10`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {metric.change}
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* عرض تجارب العملاء */}
      {viewMode === "immersive" ? (
        <ImmersiveTestimonials
          testimonials={testimonials}
          activeTestimonial={activeTestimonial}
          setActiveTestimonial={setActiveTestimonial}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      ) : viewMode === "carousel" ? (
        <CarouselTestimonials
          testimonials={testimonials}
          activeTestimonial={activeTestimonial}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      ) : (
        <GridTestimonials testimonials={testimonials} />
      )}

      {/* التحكم في العروض */}
      <TestimonialControls
        activeTestimonial={activeTestimonial}
        total={testimonials.length}
        onNext={handleNext}
        onPrev={handlePrev}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
      />

      {/* موجز التأثير */}
      <ImpactHighlights testimonials={testimonials} />
    </section>
  );
}

function ImmersiveTestimonials({
  testimonials,
  activeTestimonial,
  setActiveTestimonial,
  isPlaying,
  setIsPlaying,
}: any) {
  return (
    <div className="relative h-[600px] max-w-6xl mx-auto px-4">
      {testimonials.map((testimonial: Testimonial, index: number) => {
        const isActive = index === activeTestimonial;
        const position = index - activeTestimonial;

        return (
          <motion.div
            key={testimonial.id}
            initial={false}
            animate={{
              x: position * 300,
              scale: isActive ? 1 : 0.85,
              opacity: isActive ? 1 : 0.6,
              zIndex: isActive ? 10 : 5 - Math.abs(position),
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl"
            onClick={() => setActiveTestimonial(index)}
          >
            <div
              className={cn(
                "bg-white rounded-3xl p-8 border-2 transition-all duration-300 cursor-pointer",
                isActive
                  ? "border-primary shadow-2xl"
                  : "border-gray-200 shadow-lg hover:shadow-xl",
              )}
            >
              {/* رأس البطاقة */}
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-lg">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  {testimonial.video && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(!isPlaying);
                      }}
                      className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all"
                    >
                      {isPlaying && isActive ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {testimonial.position}
                      </p>
                      <p className="text-primary font-medium text-sm">
                        {testimonial.company}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i < testimonial.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300",
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {testimonial.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* الاقتباس */}
              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                <p className="text-gray-700 text-lg leading-relaxed pr-8">
                  {testimonial.quote}
                </p>
              </div>

              {/* مشروع وتأثير */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                <div>
                  <div className="text-sm text-gray-500 mb-1">المشروع</div>
                  <div className="font-medium text-gray-900">
                    {testimonial.project}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">المدة</div>
                  <div className="font-medium text-gray-900">
                    {testimonial.duration}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function CarouselTestimonials({
  testimonials,
  activeTestimonial,
  handleNext,
  handlePrev,
}: any) {
  return (
    <div className="relative max-w-4xl mx-auto px-4">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-xl">
        {/* مؤشرات */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleNext(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === activeTestimonial
                  ? "w-8 bg-primary"
                  : "bg-gray-300 hover:bg-gray-400",
              )}
            />
          ))}
        </div>

        {/* المحتوى */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="p-12"
          >
            <div className="text-center">
              <Quote className="w-12 h-12 text-primary/20 mx-auto mb-8" />
              <p className="text-2xl text-gray-800 mb-8 leading-relaxed">
                "{testimonials[activeTestimonial].quote}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <Image
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-white shadow-lg"
                />
                <div className="text-left">
                  <h4 className="font-bold text-gray-900">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[activeTestimonial].position}
                  </p>
                  <p className="text-primary text-sm">
                    {testimonials[activeTestimonial].company}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* أزرار التنقل */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
        >
          →
        </button>
      </div>
    </div>
  );
}

function GridTestimonials({ testimonials }: any) {
  return (
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial: Testimonial, index: number) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={60}
                height={60}
                className="rounded-full border-2 border-white shadow-md"
              />
              <div>
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-gray-600 text-sm">
                  {testimonial.position} • {testimonial.company}
                </p>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-3 h-3",
                        i < testimonial.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-6 line-clamp-3">
              {testimonial.quote}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <div>
                <div className="text-sm text-gray-500">المشروع</div>
                <div className="font-medium text-gray-900">
                  {testimonial.project}
                </div>
              </div>
              <div className="flex gap-2">
                {testimonial.highlights.slice(0, 2).map((highlight, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TestimonialControls({
  activeTestimonial,
  total,
  onNext,
  onPrev,
  isPlaying,
  onPlayPause,
}: any) {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <div className="flex items-center gap-4 p-4 bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-xl">
        <button
          onClick={onPrev}
          className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
        >
          ←
        </button>

        <div className="flex items-center gap-4">
          <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${((activeTestimonial + 1) / total) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-sm text-gray-600 font-medium">
            {activeTestimonial + 1} / {total}
          </span>
        </div>

        <button
          onClick={onPlayPause}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all",
            isPlaying
              ? "bg-primary text-white"
              : "bg-gray-100 hover:bg-gray-200",
          )}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={onNext}
          className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
        >
          →
        </button>
      </div>
    </div>
  );
}

function ImpactHighlights({ testimonials }: any) {
  const allImpacts = testimonials.flatMap((t: Testimonial) => t.impact);
  const uniqueImpacts = [...new Set(allImpacts)];

  return (
    <div className="container mx-auto px-4 mt-32">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">تأثير ملموس</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          نتائج حقيقية تظهر جودة عملنا وتأثيره الإيجابي
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uniqueImpacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:border-primary/30 transition-all hover:shadow-lg"
            >
              <div className="text-2xl font-bold text-primary mb-2">
                {impact.match(/\d+%/)?.[0] || ""}
              </div>
              <div className="text-sm text-gray-700">
                {impact.replace(/\d+%\s*/, "")}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SuccessBackground() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number }>>(
    [],
  );

  useEffect(() => {
    const generatedParticles = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/10 rounded-full"
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
          }}
          animate={{
            x: [
              `${particle.x}vw`,
              `${particle.x + Math.sin(i) * 5}vw`,
              `${particle.x}vw`,
            ],
            y: [
              `${particle.y}vh`,
              `${particle.y + Math.cos(i) * 5}vh`,
              `${particle.y}vh`,
            ],
          }}
          transition={{
            duration: 15 + (i % 5),
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
