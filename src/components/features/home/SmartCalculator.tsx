"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Umbrella,
  Leaf,
  Shield,
  Plus,
  Minus,
  Calculator,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// أنواع المنتجات
const PRODUCT_TYPES = [
  {
    id: "shade",
    name: "مظلات",
    icon: Umbrella,
    desc: "سيارات - حدائق - قماش PVC",
  },
  {
    id: "pergola",
    name: "برجولات",
    icon: Leaf,
    desc: "خشبية - حديد - ألمنيوم",
  },
  { id: "shutter", name: "سواتر", icon: Shield, desc: "حديد - قماش - شينكو" },
];

// المواد والأسعار
const MATERIALS_MAP: Record<
  string,
  { id: string; name: string; price: number; desc: string }[]
> = {
  shade: [
    { id: "pvc_900", name: "PVC 900g", price: 140, desc: "كوري - حماية عالية" },
    {
      id: "pvc_1100",
      name: "PVC 1100g",
      price: 160,
      desc: "كوري - جودة فائقة",
    },
    {
      id: "poly",
      name: "بولي إيثيلين",
      price: 120,
      desc: "أسترالي - عزل حراري",
    },
  ],
  pergola: [
    { id: "wood", name: "خشب طبيعي", price: 650, desc: "سويدي/زان" },
    { id: "iron", name: "حديد مودرن", price: 350, desc: "دهان ناري" },
    { id: "alu", name: "ألمنيوم", price: 500, desc: "قص ليزر" },
  ],
  shutter: [
    { id: "iron_sh", name: "حديد مجدول", price: 130, desc: "أمان عالي" },
    { id: "pvc_sh", name: "قماش PVC", price: 110, desc: "حل اقتصادي" },
    { id: "shinko", name: "شينكو معزول", price: 80, desc: "تكلفة مناسبة" },
  ],
};

// مكون بطاقة المواد المحسنة
function MaterialCard({ material, selected, onClick }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex-shrink-0 snap-start w-44 text-right p-4 rounded-2xl border-2 transition-all duration-200 relative overflow-hidden",
        selected
          ? "border-primary bg-primary/5 shadow-md shadow-primary/20"
          : "border-border/50 bg-accent/20 hover:border-primary/30 hover:bg-accent/30",
      )}
    >
      {selected && (
        <motion.div
          layoutId="selectedMaterial"
          className="absolute -top-1 -left-1 w-6 h-6 bg-primary rounded-br-xl flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <CheckCircle2 className="w-4 h-4 text-white" />
        </motion.div>
      )}
      <div className="font-bold text-foreground mb-1">{material.name}</div>
      <div className="text-xs text-muted-foreground mb-2">{material.desc}</div>
      <div className="text-sm font-black text-primary">
        {material.price} ر.س{" "}
        <span className="text-[10px] font-normal text-muted-foreground">
          / م²
        </span>
      </div>
    </motion.button>
  );
}

// مكون العداد
function Counter({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
          {label === "الطول" ? "أ" : "ب"}
        </span>
        {label} (متر)
      </span>
      <div className="flex items-center justify-between bg-accent/50 p-1.5 rounded-2xl border border-border/50">
        <button
          onClick={() => onChange(Math.max(1, value - 1))}
          className="w-10 h-10 rounded-xl bg-background shadow-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors active:scale-95"
        >
          <Minus className="w-5 h-5" />
        </button>
        <motion.span
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-xl font-bold w-12 text-center"
        >
          {value}
        </motion.span>
        <button
          onClick={() => onChange(value + 1)}
          className="w-10 h-10 rounded-xl bg-background shadow-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors active:scale-95"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export function SmartCalculator() {
  const [type, setType] = useState(PRODUCT_TYPES[0].id);
  const [material, setMaterial] = useState(
    MATERIALS_MAP[PRODUCT_TYPES[0].id][0].id,
  );
  const [length, setLength] = useState(5);
  const [width, setWidth] = useState(5);

  const handleTypeChange = (newType: string) => {
    setType(newType);
    setMaterial(MATERIALS_MAP[newType][0].id);
  };

  const result = useMemo(() => {
    const area = length * width;
    const mat = MATERIALS_MAP[type]?.find((m) => m.id === material);
    const price = mat ? mat.price : 0;
    return { area, total: area * price, pricePerM: price };
  }, [type, material, length, width]);

  return (
    <section className="py-12 bg-background relative overflow-hidden">
      {/* عناصر خلفية جمالية */}
      <div className="absolute top-0 right-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-4 mx-auto max-w-2xl relative z-10">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="text-primary font-bold text-xs bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
            تقدير فوري
          </span>
          <h2 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2 mb-2">
            <Calculator className="w-6 h-6 text-primary" />
            <span>حاسبة التكلفة المبدئية</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            اختر المواصفات والمقاسات لتحصل على تقدير سريع
          </p>
        </motion.div>

        {/* البطاقة الرئيسية */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-[32px] p-5 md:p-8 shadow-xl shadow-black/5 dark:shadow-white/5 backdrop-blur-sm"
        >
          {/* 1. اختيار النوع مع ترقيم */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                1
              </div>
              <h3 className="text-base font-bold">اختر نوع المنتج</h3>
            </div>
            <div className="flex bg-accent/50 p-1.5 rounded-2xl relative">
              {PRODUCT_TYPES.map((t) => {
                const isActive = type === t.id;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleTypeChange(t.id)}
                    className={cn(
                      "flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl text-xs font-medium transition-all relative z-10",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-md"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <Icon className="w-5 h-5 mb-1" />
                    <span>{t.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. اختيار المادة مع ترقيم */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                2
              </div>
              <h3 className="text-base font-bold">اختر المواصفات</h3>
            </div>
            <div className="flex overflow-x-auto gap-3 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {MATERIALS_MAP[type]?.map((m) => (
                <MaterialCard
                  key={m.id}
                  material={m}
                  selected={material === m.id}
                  onClick={() => setMaterial(m.id)}
                />
              ))}
            </div>
          </div>

          {/* 3. المقاسات مع ترقيم */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                3
              </div>
              <h3 className="text-base font-bold">حدد المقاسات</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Counter label="الطول" value={length} onChange={setLength} />
              <Counter label="العرض" value={width} onChange={setWidth} />
            </div>
          </div>

          {/* 4. النتيجة النهائية مع تصميم جذاب */}
          <AnimatePresence mode="wait">
            <motion.div
              key={result.total}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-br from-primary to-primary/80 text-background rounded-3xl p-6 relative overflow-hidden"
            >
              {/* خلفية جمالية */}
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/20 blur-2xl rounded-full" />
              <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-black/10 blur-2xl rounded-full" />

              {/* تفاصيل إضافية */}
              <div className="flex justify-between items-start mb-3 relative z-10">
                <span className="text-background/80 text-xs">
                  المساحة: {result.area} م² |{" "}
                  {PRODUCT_TYPES.find((t) => t.id === type)?.name}
                </span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-[10px]">
                  سعر المتر: {result.pricePerM} ر.س
                </span>
              </div>

              {/* السعر الإجمالي */}
              <div className="flex justify-between items-end relative z-10">
                <div>
                  <span className="block text-background/70 text-sm mb-1">
                    التكلفة التقديرية
                  </span>
                  <div className="flex items-baseline gap-1">
                    <motion.span
                      key={result.total}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-4xl font-black tracking-tighter"
                    >
                      {result.total.toLocaleString("ar-SA")}
                    </motion.span>
                    <span className="text-lg font-bold text-white/90">ر.س</span>
                  </div>
                </div>

                <a
                  href="/contact"
                  className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-black/20"
                >
                  <ArrowLeft className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ملاحظات وإخلاء مسؤولية */}
          <div className="mt-4 flex items-start gap-2 bg-yellow-100/30 dark:bg-yellow-950/30 border border-yellow-500/30 text-yellow-700 dark:text-yellow-400 p-3 rounded-xl text-[10px] leading-relaxed">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              هذا تقدير مبدئي. السعر النهائي يتحدد بعد المعاينة الميدانية
              والمقاسات الدقيقة. جميع الأسعار شاملة التوريد والتركيب.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
