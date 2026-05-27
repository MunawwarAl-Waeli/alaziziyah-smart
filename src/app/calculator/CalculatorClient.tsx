"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { COMPANY_INFO } from "@/lib/config";
import {
  Calculator,
  Check,
  ChevronLeft,
  Clock,
  Shield,
  RotateCcw,
  CarFront,
  Home,
  ShieldCheck,
  Building2,
  Waves,
  Factory,
  Layers,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* =========================
   TYPES
========================= */

interface ServiceOption {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  basePrice: number;
  minArea: number;
  maxArea: number;
}

interface MaterialOption {
  id: string;
  name: string;
  priceFactor: number;
  description: string;
  warranty: string;
  features: string[];
}

/* =========================
   DATA (نفسك السابق)
========================= */

const services: ServiceOption[] = [
  {
    id: "carport",
    name: "مظلة سيارات",
    icon: CarFront,
    description: "حماية سيارات",
    basePrice: 350,
    minArea: 12,
    maxArea: 500,
  },
  {
    id: "pergola",
    name: "برجولة",
    icon: Home,
    description: "جلسات خارجية",
    basePrice: 400,
    minArea: 10,
    maxArea: 400,
  },
  {
    id: "fence",
    name: "ساتر",
    icon: ShieldCheck,
    description: "خصوصية",
    basePrice: 300,
    minArea: 10,
    maxArea: 500,
  },
  {
    id: "school",
    name: "مظلة مدرسة",
    icon: Building2,
    description: "مدارس",
    basePrice: 380,
    minArea: 50,
    maxArea: 2000,
  },
  {
    id: "pool",
    name: "مظلة مسبح",
    icon: Waves,
    description: "مسابح",
    basePrice: 450,
    minArea: 20,
    maxArea: 2000,
  },
  {
    id: "warehouse",
    name: "هنجر",
    icon: Factory,
    description: "مستودعات",
    basePrice: 280,
    minArea: 100,
    maxArea: 5000,
  },
];

const materials: MaterialOption[] = [
  {
    id: "iron",
    name: "حديد",
    priceFactor: 1.2,
    description: "",
    warranty: "15 سنة",
    features: ["متانة"],
  },
  {
    id: "poly",
    name: "لكسان",
    priceFactor: 1.5,
    description: "",
    warranty: "10 سنوات",
    features: ["عزل"],
  },
  {
    id: "wood",
    name: "خشب",
    priceFactor: 1.8,
    description: "",
    warranty: "8 سنوات",
    features: ["فخامة"],
  },
  {
    id: "pvc",
    name: "PVC",
    priceFactor: 0.9,
    description: "",
    warranty: "5 سنوات",
    features: ["اقتصادي"],
  },
];

/* =========================
   MAIN
========================= */

export default function CalculatorClient() {
  // 🔥 5 steps (بدون showResult)
  const [step, setStep] = useState(1);

  const [service, setService] = useState<ServiceOption | null>(null);
  const [material, setMaterial] = useState<MaterialOption | null>(null);
  const [area, setArea] = useState(20);

  const [form, setForm] = useState({ name: "", phone: "" });

  const result = useMemo(() => {
    if (!service || !material) return null;

    const base = service.basePrice * area;
    const mat = base * (material.priceFactor - 1);

    return {
      total: base + mat,
      time: Math.max(3, Math.ceil(area / 50) * 2),
      warranty: material.warranty,
    };
  }, [service, material, area]);

  const next = useCallback(() => {
    setStep((s) => Math.min(s + 1, 5));
  }, []);

  const prev = useCallback(() => {
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const reset = useCallback(() => {
    setStep(1);
    setService(null);
    setMaterial(null);
    setArea(20);
    setForm({ name: "", phone: "" });
  }, []);

  const canNext =
    (step === 1 && service) ||
    (step === 2 && area >= (service?.minArea || 0)) ||
    (step === 3 && material) ||
    (step === 4 && result);

  const format = (n: number) => Math.round(n).toLocaleString("en-US") + " ريال";

  const send = () => {
    if (!result) return;

    const msg = `
طلب عرض سعر
الاسم: ${form.name}
الجوال: ${form.phone}
الخدمة: ${service?.name}
المساحة: ${area}
التكلفة: ${format(result.total)}
    `;

    window.open(
      `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <main className="w-full bg-slate-50 dark:bg-slate-950" dir="rtl">
      {/* spacing للهيدر */}
      <div className="h-16 md:h-20" />

      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex gap-2 items-center bg-primary/10 px-4 py-2 rounded-full">
            <Calculator className="w-5 h-5" />
            الحاسبة الذكية
          </div>
        </div>

        {/* PROGRESS */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="h-1 bg-slate-200 rounded">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${(step - 1) * 25}%` }}
            />
          </div>
        </div>

        {/* CARD */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border p-6">
          {/* STEP 1 */}
          <div className={cn(step === 1 ? "block" : "hidden")}>
            <div className="grid grid-cols-2 gap-3">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setService(s)}
                  className={cn(
                    "p-4 border rounded-xl",
                    service?.id === s.id && "border-primary",
                  )}
                >
                  <s.icon className="w-6 h-6 mx-auto mb-2" />
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2 */}
          <div className={cn(step === 2 ? "block" : "hidden")}>
            <div className="text-center text-4xl font-bold text-primary">
              {area} م²
            </div>

            <input
              type="range"
              min={service?.minArea || 10}
              max={service?.maxArea || 1000}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full mt-6"
            />
          </div>

          {/* STEP 3 */}
          <div className={cn(step === 3 ? "block" : "hidden")}>
            <div className="grid grid-cols-2 gap-3">
              {materials.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMaterial(m)}
                  className={cn(
                    "p-4 border rounded-xl",
                    material?.id === m.id && "border-primary",
                  )}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 4 - RESULT */}
          <div className={cn(step === 4 ? "block" : "hidden")}>
            {result && (
              <div className="text-center space-y-4">
                <div className="text-5xl font-black text-primary">
                  {format(result.total)}
                </div>

                <div className="text-sm text-muted-foreground">
                  مدة التنفيذ: {result.time} أيام
                </div>
              </div>
            )}
          </div>

          {/* STEP 5 - FORM */}
          <div className={cn(step === 5 ? "block" : "hidden")}>
            <div className="space-y-4">
              <input
                placeholder="الاسم"
                className="w-full p-3 border rounded-xl"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                placeholder="رقم الجوال"
                className="w-full p-3 border rounded-xl"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <button
                onClick={send}
                className="w-full bg-green-500 text-white p-4 rounded-xl"
              >
                إرسال واتساب
              </button>
            </div>
          </div>

          {/* NAV */}
          <div className="flex justify-between mt-8 pt-4 border-t">
            <button onClick={prev}>السابق</button>

            <div className="flex gap-2">
              <button onClick={reset}>
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={next}
                disabled={!canNext}
                className="bg-primary text-white px-6 py-2 rounded-xl disabled:opacity-50"
              >
                التالي
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
// "use client";

// import { useState, useRef, useMemo } from "react";
// import { COMPANY_INFO } from "@/lib/config";
// import {
//   Calculator,
//   Check,
//   ChevronLeft,
//   Clock,
//   Shield,
//   RotateCcw,
//   CarFront,
//   Home,
//   ShieldCheck,
//   Building2,
//   Waves,
//   Factory,
//   Layers,
//   MessageCircle,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// // ==========================================
// // 1. تعريف الأنواع والبيانات
// // ==========================================

// interface ServiceOption {
//   id: string;
//   name: string;
//   icon: React.ElementType;
//   description: string;
//   basePrice: number;
//   minArea: number;
//   maxArea: number;
// }

// interface MaterialOption {
//   id: string;
//   name: string;
//   priceFactor: number;
//   description: string;
//   warranty: string;
//   features: string[];
// }

// const services: ServiceOption[] = [
//   {
//     id: "carport",
//     name: "مظلة سيارات",
//     icon: CarFront,
//     description: "حماية فائقة وعزل حراري للسيارات",
//     basePrice: 350,
//     minArea: 12,
//     maxArea: 500,
//   },
//   {
//     id: "pergola",
//     name: "برجولة",
//     icon: Home,
//     description: "جلسات خارجية أنيقة بتصاميم فاخرة",
//     basePrice: 400,
//     minArea: 10,
//     maxArea: 400,
//   },
//   {
//     id: "fence",
//     name: "ساتر",
//     icon: ShieldCheck,
//     description: "خصوصية وأمان بتصاميم عصرية",
//     basePrice: 300,
//     minArea: 10,
//     maxArea: 500,
//   },
//   {
//     id: "school",
//     name: "مظلة مدرسة",
//     icon: Building2,
//     description: "تغطية الساحات بأعلى معايير السلامة",
//     basePrice: 380,
//     minArea: 50,
//     maxArea: 2000,
//   },
//   {
//     id: "pool",
//     name: "مظلة مسبح",
//     icon: Waves,
//     description: "مظلات متحركة وثابتة للمسابح",
//     basePrice: 450,
//     minArea: 20,
//     maxArea: 2000,
//   },
//   {
//     id: "warehouse",
//     name: "هنجر",
//     icon: Factory,
//     description: "مستودعات صناعية بمواصفات عالية",
//     basePrice: 280,
//     minArea: 100,
//     maxArea: 5000,
//   },
// ];

// const materials: MaterialOption[] = [
//   {
//     id: "iron",
//     name: "حديد مجلفن",
//     priceFactor: 1.2,
//     description: "هيكل مقاوم للصدأ بدهان حراري",
//     warranty: "15 سنة",
//     features: ["متانة عالية", "مقاوم للصدأ"],
//   },
//   {
//     id: "polycarbonate",
//     name: "لكسان",
//     priceFactor: 1.5,
//     description: "ألواح عازلة للحرارة والكسر",
//     warranty: "10 سنوات",
//     features: ["عزل ممتاز", "شفاف"],
//   },
//   {
//     id: "wood",
//     name: "خشب سويدي",
//     priceFactor: 1.8,
//     description: "خشب طبيعي معالج ضد الرطوبة",
//     warranty: "8 سنوات",
//     features: ["مظهر فخم", "معالج"],
//   },
//   {
//     id: "pvc",
//     name: "PVC",
//     priceFactor: 0.9,
//     description: "قماش عالي الجودة ألماني/كوري",
//     warranty: "5 سنوات",
//     features: ["مقاوم للماء", "اقتصادي"],
//   },
// ];

// const steps = [
//   { id: 1, name: "الخدمة" },
//   { id: 2, name: "المساحة" },
//   { id: 3, name: "المواد" },
//   { id: 4, name: "النتيجة" },
// ];

// // ==========================================
// // 2. المكون الرئيسي (صفحة مستقلة)
// // ==========================================

// export default function CalculatorClient() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showResult, setShowResult] = useState(false);
//   const [showContactForm, setShowContactForm] = useState(false);

//   const calculatorTopRef = useRef<HTMLDivElement>(null);

//   const [selectedService, setSelectedService] = useState<ServiceOption | null>(
//     null,
//   );
//   const [area, setArea] = useState<number>(20);
//   const [selectedMaterial, setSelectedMaterial] =
//     useState<MaterialOption | null>(null);
//   const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

//   const calculationResult = useMemo(() => {
//     if (!selectedService || !selectedMaterial) return null;

//     const baseCost = selectedService.basePrice * area;
//     const materialCost = baseCost * (selectedMaterial.priceFactor - 1);
//     const totalCost = baseCost + materialCost;
//     const estimatedDays = Math.max(3, Math.ceil(area / 50) * 2);

//     return {
//       baseCost,
//       materialCost,
//       totalCost,
//       estimatedTime: `${estimatedDays} - ${estimatedDays + 3} أيام`,
//       warranty: selectedMaterial.warranty,
//       breakdown: [
//         { label: "التكلفة الأساسية", amount: baseCost },
//         { label: "إضافة الخامة", amount: materialCost },
//       ],
//     };
//   }, [selectedService, area, selectedMaterial]);

//   const scrollToCalculatorTop = () => {
//     if (calculatorTopRef.current) {
//       // تقليل الـ offset ليتناسب مع صفحة مستقلة
//       const yOffset = -20;
//       const element = calculatorTopRef.current;
//       const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
//       window.scrollTo({ top: y, behavior: "smooth" });
//     }
//   };

//   const nextStep = () => {
//     if (currentStep < 4) {
//       setCurrentStep((prev) => prev + 1);
//     } else {
//       setShowResult(true);
//     }
//     scrollToCalculatorTop();
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep((prev) => prev - 1);
//       scrollToCalculatorTop();
//     }
//   };

//   const resetCalculator = () => {
//     setCurrentStep(1);
//     setSelectedService(null);
//     setArea(20);
//     setSelectedMaterial(null);
//     setShowResult(false);
//     setShowContactForm(false);
//     scrollToCalculatorTop();
//   };

//   const canProceed = () => {
//     if (currentStep === 1) return !!selectedService;
//     if (currentStep === 2) return area >= (selectedService?.minArea || 0);
//     if (currentStep === 3) return !!selectedMaterial;
//     return true;
//   };

//   const formatPrice = (price: number) =>
//     Math.round(price).toLocaleString("en-US") + " ريال";

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!calculationResult) return;

//     if (typeof window !== "undefined") {
//       window.dataLayer = window.dataLayer || [];
//       window.dataLayer.push({
//         event: "calculator_whatsapp_lead",
//         lead_category: "Smart Calculator",
//         service_name: selectedService?.name,
//         material_type: selectedMaterial?.name,
//         project_area: area,
//         estimated_value: calculationResult.totalCost,
//       });
//     }

//     const message = `طلب عرض سعر رسمي\nالاسم: ${formData.name}\nالخدمة: ${selectedService?.name}\nالمساحة: ${area} م²\nالمواد: ${selectedMaterial?.name}\nالتكلفة التقديرية: ${formatPrice(calculationResult.totalCost)}`;
//     window.open(
//       `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`,
//       "_blank",
//     );
//   };

//   return (
//     <main className="w-full bg-slate-50 dark:bg-slate-950" dir="rtl">
//       <div className="container mx-auto px-4 relative z-10">
//         {/* رأس الصفحة */}
//         <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
//           <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
//             <Calculator className="w-5 h-5 text-primary" />
//             <span className="text-primary text-sm font-bold">
//               حاسبة التكلفة الذكية
//             </span>
//           </div>
//           <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-foreground leading-tight">
//             احسب تكلفة{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-primary-dark">
//               مشروعك
//             </span>
//           </h1>
//           <p className="text-muted-foreground text-sm md:text-lg leading-relaxed px-4">
//             خطوات بسيطة للحصول على تقدير فوري لتكلفة مشروع المظلة أو الساتر أو
//             البرجولة
//           </p>
//         </div>

//         <div ref={calculatorTopRef} className="scroll-mt-6"></div>

//         {/* شريط التقدم (Progress Bar) */}
//         <div className="max-w-4xl mx-auto mb-8 md:mb-12">
//           <div className="flex items-center justify-between mb-4 px-2 md:px-6">
//             {steps.map((step) => (
//               <div
//                 key={step.id}
//                 className={cn(
//                   "flex flex-col items-center gap-2 transition-opacity duration-300",
//                   step.id > currentStep && !showResult && "opacity-40",
//                 )}
//               >
//                 <div
//                   className={cn(
//                     "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-bold transition-colors duration-300 shadow-sm",
//                     step.id < currentStep || (step.id === 4 && showResult)
//                       ? "bg-primary text-white"
//                       : step.id === currentStep && !showResult
//                         ? "bg-primary/10 text-primary border-2 border-primary"
//                         : "bg-white dark:bg-slate-800 text-muted-foreground border border-border",
//                   )}
//                 >
//                   {step.id < currentStep || (step.id === 4 && showResult) ? (
//                     <Check className="w-4 h-4 md:w-5 md:h-5" />
//                   ) : (
//                     step.id
//                   )}
//                 </div>
//                 <span className="text-xs md:text-sm font-bold text-foreground">
//                   {step.name}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* شريط التقدم باستخدام CSS نقي للأداء العالي */}
//           <div className="w-full h-1.5 md:h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-primary transition-all duration-500 ease-out"
//               style={{
//                 width: showResult
//                   ? "100%"
//                   : `${((currentStep - 1) / 3) * 100}%`,
//               }}
//             />
//           </div>
//         </div>

//         {/* نموذج الحاسبة */}
//         <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
//           <div className="p-4 md:p-8 lg:p-10">
//             {!showResult ? (
//               <div className="animate-in fade-in duration-500 slide-in-from-bottom-4">
//                 {/* ================= الخطوة 1: الخدمات ================= */}
//                 {currentStep === 1 && (
//                   <div className="space-y-6">
//                     <h2 className="text-xl md:text-2xl font-bold text-center text-foreground mb-6">
//                       اختر نوع الخدمة
//                     </h2>
//                     <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
//                       {services.map((service) => {
//                         const Icon = service.icon;
//                         const isSelected = selectedService?.id === service.id;
//                         return (
//                           <button
//                             key={service.id}
//                             onClick={() => {
//                               setSelectedService(service);
//                               if (area < service.minArea)
//                                 setArea(service.minArea);
//                             }}
//                             className={cn(
//                               "relative p-4 md:p-6 rounded-2xl border-2 transition-colors duration-200 text-center flex flex-col items-center group h-full",
//                               isSelected
//                                 ? "border-primary bg-primary/5"
//                                 : "border-border/60 hover:border-primary/50 bg-background",
//                             )}
//                           >
//                             <div
//                               className={cn(
//                                 "mb-3 md:mb-5 p-3 md:p-4 rounded-full transition-colors duration-200",
//                                 isSelected
//                                   ? "bg-primary text-white"
//                                   : "bg-muted text-muted-foreground group-hover:text-primary group-hover:bg-primary/10",
//                               )}
//                             >
//                               <Icon
//                                 className="w-6 h-6 md:w-10 md:h-10"
//                                 strokeWidth={1.5}
//                               />
//                             </div>
//                             <h3 className="font-bold text-sm md:text-lg text-foreground mb-1 md:mb-2">
//                               {service.name}
//                             </h3>
//                             <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed px-1">
//                               {service.description}
//                             </p>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* ================= الخطوة 2: المساحة ================= */}
//                 {currentStep === 2 && selectedService && (
//                   <div className="space-y-6 md:space-y-8">
//                     <h2 className="text-xl md:text-2xl font-bold text-center text-foreground">
//                       حدد المساحة التقريبية (م²)
//                     </h2>
//                     <div className="bg-slate-50 dark:bg-slate-800/30 p-6 md:p-10 rounded-2xl border border-border/50 max-w-2xl mx-auto text-center">
//                       <span className="text-5xl md:text-7xl font-black text-primary drop-shadow-sm">
//                         {area}{" "}
//                         <span className="text-2xl md:text-3xl text-muted-foreground font-medium">
//                           م²
//                         </span>
//                       </span>

//                       <div className="mt-8 md:mt-12 relative px-2">
//                         <input
//                           type="range"
//                           min={selectedService.minArea}
//                           max={selectedService.maxArea}
//                           value={area}
//                           onChange={(e) => setArea(Number(e.target.value))}
//                           className="w-full h-3 md:h-4 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-dark transition-colors"
//                         />
//                         <div className="flex justify-between mt-3 text-xs md:text-sm font-medium text-muted-foreground">
//                           <span>{selectedService.minArea} م² (الأدنى)</span>
//                           <span>{selectedService.maxArea} م² (الأقصى)</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* ================= الخطوة 3: المواد ================= */}
//                 {currentStep === 3 && (
//                   <div className="space-y-6">
//                     <h2 className="text-xl md:text-2xl font-bold text-center text-foreground mb-6">
//                       اختر نوع التغطية (الخامة)
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
//                       {materials.map((material) => {
//                         const isSelected = selectedMaterial?.id === material.id;
//                         return (
//                           <button
//                             key={material.id}
//                             onClick={() => setSelectedMaterial(material)}
//                             className={cn(
//                               "relative p-5 md:p-6 rounded-2xl border-2 transition-colors duration-200 text-right flex flex-col h-full group",
//                               isSelected
//                                 ? "border-primary bg-primary/5"
//                                 : "border-border/60 hover:border-primary/50 bg-background",
//                             )}
//                           >
//                             <div className="flex items-start justify-between w-full mb-3">
//                               <div className="flex items-center gap-3">
//                                 <div
//                                   className={cn(
//                                     "p-2 rounded-xl transition-colors",
//                                     isSelected
//                                       ? "bg-primary text-white"
//                                       : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
//                                   )}
//                                 >
//                                   <Layers className="w-5 h-5 md:w-6 md:h-6" />
//                                 </div>
//                                 <h3 className="font-bold text-base md:text-xl text-foreground">
//                                   {material.name}
//                                 </h3>
//                               </div>
//                               <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs md:text-sm font-bold whitespace-nowrap">
//                                 ضمان {material.warranty}
//                               </span>
//                             </div>
//                             <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
//                               {material.description}
//                             </p>
//                             <div className="flex flex-wrap gap-2 mt-auto">
//                               {material.features.map((feature, idx) => (
//                                 <span
//                                   key={idx}
//                                   className="text-xs bg-muted px-2 py-1 rounded-md text-foreground flex items-center gap-1"
//                                 >
//                                   <Check className="w-3 h-3 text-primary" />{" "}
//                                   {feature}
//                                 </span>
//                               ))}
//                             </div>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               /* ================= النتيجة الكاملة ================= */
//               calculationResult && (
//                 <div className="max-w-2xl mx-auto space-y-6 md:space-y-8 animate-in zoom-in-95 duration-500">
//                   <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 md:p-8 rounded-3xl text-center shadow-md relative overflow-hidden isolate">
//                     <div
//                       className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
//                       style={{
//                         background:
//                           "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
//                       }}
//                     ></div>
//                     <div
//                       className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full pointer-events-none"
//                       style={{
//                         background:
//                           "radial-gradient(circle, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 70%)",
//                       }}
//                     ></div>

//                     <h2 className="text-sm md:text-lg font-medium opacity-90 mb-2 relative z-10">
//                       التكلفة التقديرية (شامل التركيب)
//                     </h2>
//                     <p className="text-4xl md:text-6xl font-black relative z-10 tracking-tight">
//                       {formatPrice(calculationResult.totalCost)}
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-2 gap-3 md:gap-4">
//                     <div className="bg-muted/30 p-4 md:p-5 rounded-2xl border border-border flex flex-col items-center justify-center text-center">
//                       <Clock className="w-6 h-6 md:w-8 md:h-8 text-primary mb-2" />
//                       <p className="text-xs md:text-sm text-muted-foreground mb-1">
//                         وقت التنفيذ المتوقع
//                       </p>
//                       <p className="font-bold text-sm md:text-base text-foreground">
//                         {calculationResult.estimatedTime}
//                       </p>
//                     </div>
//                     <div className="bg-muted/30 p-4 md:p-5 rounded-2xl border border-border flex flex-col items-center justify-center text-center">
//                       <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary mb-2" />
//                       <p className="text-xs md:text-sm text-muted-foreground mb-1">
//                         فترة الضمان
//                       </p>
//                       <p className="font-bold text-sm md:text-base text-foreground">
//                         {calculationResult.warranty}
//                       </p>
//                     </div>
//                   </div>

//                   {/* تفاصيل الحساب */}
//                   <div className="bg-slate-50 dark:bg-slate-900 p-5 md:p-6 rounded-2xl border border-border space-y-3">
//                     <h3 className="font-bold text-sm md:text-base mb-4 border-b border-border pb-2">
//                       تفاصيل الحسبة:
//                     </h3>
//                     {calculationResult.breakdown.map((item, i) => (
//                       <div
//                         key={i}
//                         className="flex justify-between items-center text-sm md:text-base"
//                       >
//                         <span className="text-muted-foreground flex items-center gap-2">
//                           <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
//                           {item.label}
//                         </span>
//                         <span className="font-bold text-foreground">
//                           {formatPrice(item.amount)}
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* نموذج التواصل أو زر الواتساب */}
//                   {!showContactForm ? (
//                     <button
//                       onClick={() => setShowContactForm(true)}
//                       className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-sm md:text-lg transition-colors flex items-center justify-center gap-2"
//                     >
//                       اطلب معاينة دقيقة للموقع
//                     </button>
//                   ) : (
//                     <form
//                       onSubmit={handleSubmit}
//                       className="space-y-4 bg-card border border-border p-5 md:p-6 rounded-2xl animate-in fade-in slide-in-from-top-2"
//                     >
//                       <h3 className="font-bold text-center mb-4">
//                         أدخل بياناتك لإرسال التسعيرة للواتساب
//                       </h3>
//                       <div>
//                         <input
//                           type="text"
//                           placeholder="الاسم الكامل"
//                           required
//                           className="w-full px-4 py-3 text-sm md:text-base bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
//                           value={formData.name}
//                           onChange={(e) =>
//                             setFormData({ ...formData, name: e.target.value })
//                           }
//                         />
//                       </div>
//                       <div>
//                         <input
//                           type="tel"
//                           placeholder="رقم الجوال"
//                           required
//                           className="w-full px-4 py-3 text-sm md:text-base bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
//                           value={formData.phone}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               phone: e.target.value,
//                             })
//                           }
//                         />
//                       </div>
//                       <button
//                         type="submit"
//                         className="w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-colors"
//                       >
//                         <MessageCircle className="w-5 h-5" /> إرسال الطلب عبر
//                         واتساب
//                       </button>
//                     </form>
//                   )}
//                 </div>
//               )
//             )}

//             {/* أزرار التحكم بالتنقل */}
//             {!showResult && (
//               <div className="flex justify-between items-center mt-8 pt-6 border-t border-border gap-4">
//                 <button
//                   onClick={prevStep}
//                   disabled={currentStep === 1}
//                   className="px-5 py-2.5 text-sm md:text-base font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors"
//                 >
//                   السابق
//                 </button>

//                 <div className="flex items-center gap-3">
//                   {currentStep > 1 && (
//                     <button
//                       onClick={resetCalculator}
//                       title="إعادة ضبط"
//                       className="p-2.5 md:p-3 text-muted-foreground hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30 rounded-xl transition-colors"
//                     >
//                       <RotateCcw className="w-5 h-5 md:w-6 md:h-6" />
//                     </button>
//                   )}
//                   <button
//                     onClick={nextStep}
//                     disabled={!canProceed()}
//                     className="px-6 md:px-8 py-2.5 md:py-3 bg-primary hover:bg-primary-dark disabled:bg-muted disabled:text-muted-foreground text-white rounded-xl font-bold text-sm md:text-base flex items-center gap-2 transition-colors"
//                   >
//                     {currentStep === 3 ? "احسب التكلفة" : "التالي"}
//                     <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
