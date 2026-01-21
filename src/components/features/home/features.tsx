"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ThermometerSun,
  Wind,
  ShieldCheck,
  EyeOff,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ArchitecturalSeparator } from "@/components/ui/separator"; // تأكد من المسار

interface Feature {
  title: string;
  desc: string;
  stat: string;
  icon: LucideIcon;
  color: string;
}

const features: Feature[] = [
  {
    title: "تحليل الحمل الحراري",
    desc: "محاكاة دقيقة لخفض الحرارة حتى 8 درجات مئوية مقارنة بالخارج.",
    stat: "-8°C",
    icon: ThermometerSun,
    color: "from-orange-500/20 to-red-600/5",
  },
  {
    title: "مقاومة الرياح",
    desc: "اختبار ثبات الهيكل في نفق رياح افتراضي لسرعات تصل لـ 120 كم/س.",
    stat: "120km",
    icon: Wind,
    color: "from-blue-500/20 to-cyan-600/5",
  },
  {
    title: "الامتثال للكود",
    desc: "فحص آلي للارتفاعات والارتدادات لضمان عدم مخالفة كود البلدية.",
    stat: "100%",
    icon: ShieldCheck,
    color: "from-green-500/20 to-emerald-600/5",
  },
  {
    title: "الخصوصية الذكية",
    desc: "دراسة زوايا الرؤية وفتحات السواتر لضمان حجب كامل للجار.",
    stat: "Privacy",
    icon: EyeOff,
    color: "from-indigo-500/20 to-purple-600/5",
  },
];

export function Features() {
  return (
    <section className="relative w-full bg-background pt-32 pb-24 z-10 overflow-hidden">
      {/* --- الإصلاح: الفاصل يوضع هنا مرة واحدة فقط في بداية القسم --- */}
      <ArchitecturalSeparator position="top" />

      <div className="container mx-auto px-4 relative z-10">
        {/* عنوان القسم */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary/80 text-xs font-mono tracking-[0.2em] uppercase mb-3 block">
              Technical Specifications
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
              المختبر{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-primary">
                الهندسي
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light leading-relaxed">
              نحن لا نبيع الحديد، نحن نبيع الأرقام. كل مظلة تخضع لأربعة اختبارات
              رقمية صارمة قبل أن تلمس الأرض.
            </p>
          </motion.div>
        </div>

        {/* شبكة البطاقات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <TiltCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// مكون البطاقة
function TiltCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useMotionTemplate`calc(${mouseYSpring} * -0.5deg)`;
  const rotateY = useMotionTemplate`calc(${mouseXSpring} * 0.5deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 20);
    y.set(yPct * 20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative h-[300px] group perspective-1000" // تحديد ارتفاع ثابت للبطاقة لتجنب الانهيار
    >
      {/* --- تمت إزالة الفاصل من هنا --- */}

      <div
        className={cn(
          "absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500",
          feature.color
        )}
      />

      <div className="relative h-full bg-card/40 backdrop-blur-md border border-border/50 p-8 rounded-3xl overflow-hidden group-hover:border-primary/20 transition-colors shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center text-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300 border border-white/5 dark:border-white/5 border-black/5">
              <feature.icon className="w-6 h-6" />
            </div>
            <span className="text-3xl font-mono font-bold text-muted-foreground/20 group-hover:text-foreground transition-colors duration-300">
              {feature.stat}
            </span>
          </div>

          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {feature.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {feature.desc}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-border/20">
          <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </div>
    </motion.div>
  );
}
