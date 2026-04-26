"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY_INFO } from "@/lib/config";
import {
  Calculator,
  Check,
  ChevronLeft,
  ChevronRight,
  Ruler,
  MessageCircle,
  Clock,
  Shield,
  Calendar,
  RotateCcw,
  Printer,
  CarFront,
  Home,
  ShieldCheck,
  Building2,
  Waves,
  Factory,
  Layers,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { trackGAEvent } from "@/lib/analytics";
import { SoftWavesDivider } from "@/components/ui/SoftWavesDivider";

// ==========================================
// 1. تعريف الأنواع والبيانات
// ==========================================

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

interface CalculationResult {
  baseCost: number;
  materialCost: number;
  totalCost: number;
  estimatedTime: string;
  warranty: string;
  breakdown: {
    label: string;
    amount: number;
  }[];
}

// ==========================================
// 2. البيانات كاملة بدون حذف
// ==========================================

const services: ServiceOption[] = [
  {
    id: "carport",
    name: "مظلة سيارات",
    icon: CarFront,
    description: "حماية فائقة وعزل حراري للسيارات",
    basePrice: 350,
    minArea: 12,
    maxArea: 500,
  },
  {
    id: "pergola",
    name: "برجولة",
    icon: Home,
    description: "جلسات خارجية أنيقة بتصاميم فاخرة",
    basePrice: 400,
    minArea: 10,
    maxArea: 400,
  },
  {
    id: "fence",
    name: "ساتر",
    icon: ShieldCheck,
    description: "خصوصية وأمان بتصاميم عصرية",
    basePrice: 300,
    minArea: 10,
    maxArea: 500,
  },
  {
    id: "school",
    name: "مظلة مدرسة",
    icon: Building2,
    description: "تغطية الساحات بأعلى معايير السلامة",
    basePrice: 380,
    minArea: 50,
    maxArea: 2000,
  },
  {
    id: "pool",
    name: "مظلة مسبح",
    icon: Waves,
    description: "مظلات متحركة وثابتة للمسابح",
    basePrice: 450,
    minArea: 20,
    maxArea: 2000,
  },
  {
    id: "warehouse",
    name: "هنجر",
    icon: Factory,
    description: "مستودعات صناعية بمواصفات عالية",
    basePrice: 280,
    minArea: 100,
    maxArea: 5000,
  },
];

const materials: MaterialOption[] = [
  {
    id: "iron",
    name: "حديد مجلفن",
    priceFactor: 1.2,
    description: "هيكل مقاوم للصدأ بدهان حراري",
    warranty: "15 سنة",
    features: ["متانة عالية", "مقاوم للصدأ"],
  },
  {
    id: "polycarbonate",
    name: "لكسان",
    priceFactor: 1.5,
    description: "ألواح عازلة للحرارة والكسر",
    warranty: "10 سنوات",
    features: ["عزل ممتاز", "شفاف"],
  },
  {
    id: "wood",
    name: "خشب سويدي",
    priceFactor: 1.8,
    description: "خشب طبيعي معالج ضد الرطوبة",
    warranty: "8 سنوات",
    features: ["مظهر فخم", "معالج"],
  },
  {
    id: "pvc",
    name: "PVC",
    priceFactor: 0.9,
    description: "قماش عالي الجودة ألماني/كوري",
    warranty: "5 سنوات",
    features: ["مقاوم للماء", "اقتصادي"],
  },
];

const steps = [
  { id: 1, name: "الخدمة", description: "نوع الخدمة" },
  { id: 2, name: "المساحة", description: "المساحة" },
  { id: 3, name: "المواد", description: "المواد" },
  { id: 4, name: "النتيجة", description: "التكلفة" },
];

// ==========================================
// 3. المكون الرئيسي
// ==========================================

export function SmartCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const calculatorTopRef = useRef<HTMLDivElement>(null);

  const [selectedService, setSelectedService] = useState<ServiceOption | null>(
    null,
  );
  const [area, setArea] = useState<number>(20);
  const [selectedMaterial, setSelectedMaterial] =
    useState<MaterialOption | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);

  const scrollToCalculatorTop = () => {
    if (calculatorTopRef.current) {
      const yOffset = -100;
      const element = calculatorTopRef.current;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (selectedService && selectedMaterial) {
      const baseCost = selectedService.basePrice * area;
      const materialCost = baseCost * (selectedMaterial.priceFactor - 1);
      const totalCost = baseCost + materialCost;
      const estimatedDays = Math.max(3, Math.ceil(area / 50) * 2);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCalculationResult({
        baseCost,
        materialCost,
        totalCost,
        estimatedTime: `${estimatedDays} - ${estimatedDays + 3} أيام`,
        warranty: selectedMaterial.warranty,
        breakdown: [
          { label: "التكلفة الأساسية", amount: baseCost },
          { label: "إضافة الخامة", amount: materialCost },
        ],
      });
    }
  }, [selectedService, area, selectedMaterial]);

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      scrollToCalculatorTop();
    } else {
      setShowResult(true);
      scrollToCalculatorTop();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollToCalculatorTop();
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return !!selectedService;
    if (currentStep === 2) return area >= (selectedService?.minArea || 0);
    if (currentStep === 3) return !!selectedMaterial;
    return true;
  };

  const resetCalculator = () => {
    setCurrentStep(1);
    setSelectedService(null);
    setArea(20);
    setSelectedMaterial(null);
    setCalculationResult(null);
    setShowResult(false);
    setShowContactForm(false);
    scrollToCalculatorTop();
  };

  const formatPrice = (price: number) => price.toLocaleString() + " ريال";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calculationResult) return;
    const message = `طلب عرض سعر رسمي\nالاسم: ${formData.name}\nالخدمة: ${selectedService?.name}\nالمساحة: ${area} م²\nالمواد: ${selectedMaterial?.name}\nالتكلفة التقديرية: ${formatPrice(calculationResult.totalCost)}`;
    window.open(
      `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <section
      className="py-6 md:py-24 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-slate-50 dark:to-slate-950"
      dir="rtl"
    >
      <SoftWavesDivider />

      <div className="container mx-auto px-4 relative z-10">
        <div ref={calculatorTopRef} className="scroll-mt-24"></div>

        {/* شريط التقدم الصغير */}
        <div className="max-w-4xl mx-auto mb-6 md:mb-10">
          <div className="flex items-center justify-between mb-3 px-1">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex flex-col items-center gap-1",
                  step.id > currentStep && !showResult && "opacity-30",
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-sm font-bold transition-all",
                    step.id < currentStep || (step.id === 4 && showResult)
                      ? "bg-primary text-white"
                      : step.id === currentStep && !showResult
                        ? "bg-primary/20 text-primary border-2 border-primary"
                        : "bg-slate-200 dark:bg-slate-800 text-muted-foreground",
                  )}
                >
                  {step.id < currentStep || (step.id === 4 && showResult) ? (
                    <Check className="w-3 h-3 md:w-4 md:h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className="text-[8px] md:text-xs font-bold text-foreground">
                  {step.name}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              animate={{
                width: showResult ? "100%" : `${(currentStep / 4) * 100}%`,
              }}
              className="h-full bg-primary"
            />
          </div>
        </div>

        {/* نموذج الحاسبة */}
        <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden">
          <div className="p-3 md:p-8">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key={`step-${currentStep}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* الخطوة 1: الخدمات - عمودين في الجوال */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-sm md:text-2xl font-bold text-center text-foreground">
                        اختر نوع الخدمة
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
                        {services.map((service) => {
                          const Icon = service.icon;
                          return (
                            <button
                              key={service.id}
                              onClick={() => setSelectedService(service)}
                              className={cn(
                                "relative p-2 md:p-6 rounded-xl border-2 transition-all text-center flex flex-col items-center group bg-background",
                                selectedService?.id === service.id
                                  ? "border-primary ring-1 ring-primary bg-primary/5"
                                  : "border-border/50",
                              )}
                            >
                              <div
                                className={cn(
                                  "mb-1 md:mb-4 p-2 md:p-4 rounded-full transition-colors",
                                  selectedService?.id === service.id
                                    ? "bg-primary/20 text-primary"
                                    : "bg-muted text-muted-foreground",
                                )}
                              >
                                <Icon
                                  className="w-5 h-5 md:w-12 md:h-12"
                                  strokeWidth={1.5}
                                />
                              </div>
                              <h4 className="font-bold text-[10px] md:text-lg text-foreground leading-tight">
                                {service.name}
                              </h4>
                              <p className="text-[8px] md:text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                {service.description}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* الخطوة 2: المساحة */}
                  {currentStep === 2 && selectedService && (
                    <div className="space-y-4">
                      <h3 className="text-sm md:text-2xl font-bold text-center text-foreground">
                        المساحة م²
                      </h3>
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-border/50 max-w-xl mx-auto text-center">
                        <span className="text-3xl md:text-5xl font-black text-primary">
                          {area} م²
                        </span>
                        <input
                          type="range"
                          min={selectedService.minArea}
                          max={selectedService.maxArea}
                          value={area}
                          onChange={(e) => setArea(Number(e.target.value))}
                          className="w-full h-2 mt-6 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                      </div>
                    </div>
                  )}

                  {/* الخطوة 3: المواد */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-sm md:text-2xl font-bold text-center text-foreground">
                        اختر الخامة
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                        {materials.map((material) => (
                          <button
                            key={material.id}
                            onClick={() => setSelectedMaterial(material)}
                            className={cn(
                              "relative p-3 md:p-5 rounded-xl border-2 transition-all text-right flex flex-col group bg-background",
                              selectedMaterial?.id === material.id
                                ? "border-primary bg-primary/5"
                                : "border-border/50",
                            )}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                                  <Layers className="w-4 h-4" />
                                </div>
                                <h4 className="font-bold text-xs md:text-xl text-foreground">
                                  {material.name}
                                </h4>
                              </div>
                              <span className="text-[8px] md:text-xs text-primary font-bold">
                                ضمان {material.warranty}
                              </span>
                            </div>
                            <p className="text-[9px] md:text-sm text-muted-foreground mt-1 line-clamp-1">
                              {material.description}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                /* النتيجة الكاملة */
                calculationResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-5 rounded-2xl text-center shadow-lg">
                      <p className="text-[10px] md:text-sm opacity-80">
                        التكلفة التقديرية (شامل التركيب)
                      </p>
                      <p className="text-3xl md:text-5xl font-black">
                        {formatPrice(calculationResult.totalCost)}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-muted/50 p-3 rounded-xl border border-border/50 text-center">
                        <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                        <p className="text-[8px] md:text-xs text-muted-foreground">
                          التنفيذ
                        </p>
                        <p className="font-bold text-[10px] md:text-sm">
                          {calculationResult.estimatedTime}
                        </p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-xl border border-border/50 text-center">
                        <Shield className="w-4 h-4 text-primary mx-auto mb-1" />
                        <p className="text-[8px] md:text-xs text-muted-foreground">
                          الضمان
                        </p>
                        <p className="font-bold text-[10px] md:text-sm">
                          {calculationResult.warranty}
                        </p>
                      </div>
                    </div>

                    {/* تفاصيل الحساب التي كانت محذوفة */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-border/50 space-y-1">
                      {calculationResult.breakdown.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between text-[10px] md:text-sm"
                        >
                          <span className="text-muted-foreground">
                            {item.label}
                          </span>
                          <span className="font-bold">
                            {formatPrice(item.amount)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {!showContactForm ? (
                      <button
                        onClick={() => setShowContactForm(true)}
                        className="w-full py-3 bg-primary text-white rounded-xl font-bold text-xs md:text-base shadow-lg"
                      >
                        احصل على عرض سعر رسمي (واتساب)
                      </button>
                    ) : (
                      <motion.form
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-2 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-xl"
                      >
                        <input
                          type="text"
                          placeholder="الاسم الكامل"
                          required
                          className="w-full px-3 py-2 text-xs md:text-base bg-background border rounded-lg outline-none"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                        <input
                          type="tel"
                          placeholder="رقم الجوال"
                          required
                          className="w-full px-3 py-2 text-xs md:text-base bg-background border rounded-lg outline-none"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                        <input
                          type="email"
                          placeholder="البريد الإلكتروني (اختياري)"
                          className="w-full px-3 py-2 text-xs md:text-base bg-background border rounded-lg outline-none"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                        <button
                          type="submit"
                          className="w-full py-3 bg-[#25D366] text-white rounded-lg font-bold text-xs md:text-base flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" /> إرسال عبر واتساب
                        </button>
                      </motion.form>
                    )}
                  </motion.div>
                )
              )}
            </AnimatePresence>

            {/* أزرار التحكم */}
            {!showResult && (
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-border/50 gap-2">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-4 py-2 text-[10px] md:text-base text-muted-foreground disabled:opacity-20"
                >
                  السابق
                </button>
                <div className="flex gap-2">
                  {currentStep > 1 && (
                    <button
                      onClick={resetCalculator}
                      className="p-2 md:p-3 text-muted-foreground hover:bg-muted rounded-lg"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="px-6 py-2 bg-primary text-white rounded-lg font-bold text-xs md:text-base flex items-center gap-1"
                  >
                    {currentStep === 4 ? "عرض السعر" : "التالي"}{" "}
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { COMPANY_INFO } from "@/lib/config";
// import {
//   Calculator,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Ruler,
//   MessageCircle,
//   Clock,
//   Shield,
//   Calendar,
//   RotateCcw,
//   Printer,
//   CarFront,
//   Home,
//   ShieldCheck,
//   Building2,
//   Waves,
//   Factory,
//   Layers,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { trackGAEvent } from "@/lib/analytics";
// import { SoftWavesDivider } from "@/components/ui/SoftWavesDivider";

// // ==========================================
// // 1. تعريف الأنواع والبيانات
// // ==========================================

// interface ServiceOption {
//   id: string;
//   name: string;
//   icon: React.ElementType; // استخدام مكونات الأيقونات بدلاً من النصوص
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

// interface CalculationResult {
//   baseCost: number;
//   materialCost: number;
//   totalCost: number;
//   estimatedTime: string;
//   warranty: string;
//   breakdown: {
//     label: string;
//     amount: number;
//   }[];
// }

// // ==========================================
// // 2. البيانات الثابتة
// // ==========================================

// const services: ServiceOption[] = [
//   {
//     id: "carport",
//     name: "مظلة سيارات",
//     icon: CarFront,
//     description: "حماية سيارتك من الشمس والأمطار بتصاميم عصرية",
//     basePrice: 350,
//     minArea: 120,
//     maxArea: 500,
//   },
//   {
//     id: "pergola",
//     name: "برجولة",
//     icon: Home,
//     description: "جلسات خارجية أنيقة بتصاميم فاخرة",
//     basePrice: 400,
//     minArea: 150,
//     maxArea: 400,
//   },
//   {
//     id: "fence",
//     name: "ساتر",
//     icon: ShieldCheck,
//     description: "خصوصية وأمان بتصاميم عصرية",
//     basePrice: 300,
//     minArea: 100,
//     maxArea: 500,
//   },
//   {
//     id: "school",
//     name: "مظلة مدرسة",
//     icon: Building2,
//     description: "تغطية ساحات وممرات المدارس بأعلى معايير السلامة",
//     basePrice: 380,
//     minArea: 500,
//     maxArea: 2000,
//   },
//   {
//     id: "pool",
//     name: "مظلة مسبح",
//     icon: Waves,
//     description: "مظلات متحركة للمسابح بتقنيات حديثة",
//     basePrice: 450,
//     minArea: 200,
//     maxArea: 2000,
//   },
//   {
//     id: "warehouse",
//     name: "هنجر",
//     icon: Factory,
//     description: "هناجر ومستودعات صناعية بمواصفات عالية",
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
//     description: "هيكل حديدي مجلفن مقاوم للصدأ بدهان حراري",
//     warranty: "15 سنة",
//     features: ["متانة عالية", "مقاوم للصدأ", "دهان حراري", "يحمل أوزان ثقيلة"],
//   },
//   {
//     id: "polycarbonate",
//     name: "لكسان",
//     priceFactor: 1.5,
//     description: "ألواح بولي كربونيت عازلة للحرارة والأشعة فوق البنفسجية",
//     warranty: "10 سنوات",
//     features: ["عزل حراري ممتاز", "يمنع 99% من الأشعة", "شفاف", "خفيف الوزن"],
//   },
//   {
//     id: "wood",
//     name: "خشب سويدي",
//     priceFactor: 1.8,
//     description: "خشب طبيعي معالج ضد الرطوبة والحشرات",
//     warranty: "8 سنوات",
//     features: ["مظهر طبيعي", "معالج ضد الرطوبة", "مقاوم للحشرات", "عازل حراري"],
//   },
//   {
//     id: "pvc",
//     name: "PVC",
//     priceFactor: 0.9,
//     description: "قماش PVC عالي الجودة مقاوم للماء والعوامل الجوية",
//     warranty: "5 سنوات",
//     features: ["مقاوم للماء", "خفيف الوزن", "ألوان متعددة", "سهل التركيب"],
//   },
//   {
//     id: "aluminum",
//     name: "ألمنيوم",
//     priceFactor: 1.6,
//     description: "هيكل ألمنيوم خفيف مقاوم للصدأ",
//     warranty: "12 سنة",
//     features: ["خفيف جداً", "مقاوم للصدأ", "لا يحتاج صيانة", "تصاميم عصرية"],
//   },
// ];

// const steps = [
//   { id: 1, name: "الخدمة", description: "حدد نوع الخدمة التي تريدها" },
//   { id: 2, name: "المساحة", description: "أدخل مساحة المشروع بالمتر المربع" },
//   { id: 3, name: "المواد", description: "اختر المواد المناسبة لمشروعك" },
//   { id: 4, name: "النتيجة", description: "عرض التكلفة التقديرية" },
// ];

// // ==========================================
// // 3. المكون الرئيسي
// // ==========================================

// export function SmartCalculator() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showResult, setShowResult] = useState(false);
//   const [showContactForm, setShowContactForm] = useState(false);

//   const calculatorTopRef = useRef<HTMLDivElement>(null);

//   // حالة النموذج
//   const [selectedService, setSelectedService] = useState<ServiceOption | null>(
//     null,
//   );
//   const [area, setArea] = useState<number>(20);
//   const [selectedMaterial, setSelectedMaterial] =
//     useState<MaterialOption | null>(null);
//   const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

//   // نتيجة الحساب
//   const [calculationResult, setCalculationResult] =
//     useState<CalculationResult | null>(null);

//   const scrollToCalculatorTop = () => {
//     if (calculatorTopRef.current) {
//       const yOffset = -100;
//       const element = calculatorTopRef.current;
//       const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
//       window.scrollTo({ top: y, behavior: "smooth" });
//     }
//   };

//   // حساب التكلفة
//   useEffect(() => {
//     if (selectedService && selectedMaterial) {
//       const baseCost = selectedService.basePrice * area;
//       const materialCost = baseCost * (selectedMaterial.priceFactor - 1);
//       const totalCost = baseCost + materialCost;

//       const estimatedDays = Math.max(3, Math.ceil(area / 50) * 2);

//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       setCalculationResult({
//         baseCost,
//         materialCost,
//         totalCost,
//         estimatedTime: `${estimatedDays} - ${estimatedDays + 3} أيام`,
//         warranty: selectedMaterial.warranty,
//         breakdown: [
//           { label: "التكلفة الأساسية", amount: baseCost },
//           { label: "قيمة المواد المختارة", amount: materialCost },
//         ],
//       });
//     }
//   }, [selectedService, area, selectedMaterial]);

//   const nextStep = () => {
//     if (currentStep < 4) {
//       setCurrentStep(currentStep + 1);
//       scrollToCalculatorTop();
//     } else {
//       setShowResult(true);
//       scrollToCalculatorTop();
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//       scrollToCalculatorTop();
//     }
//   };

//   const canProceed = () => {
//     switch (currentStep) {
//       case 1:
//         return !!selectedService;
//       case 2:
//         return (
//           area >= (selectedService?.minArea || 0) &&
//           area <= (selectedService?.maxArea || 1000)
//         );
//       case 3:
//         return !!selectedMaterial;
//       default:
//         return true;
//     }
//   };

//   const resetCalculator = () => {
//     setCurrentStep(1);
//     setSelectedService(null);
//     setArea(20);
//     setSelectedMaterial(null);
//     setCalculationResult(null);
//     setShowResult(false);
//     setShowContactForm(false);
//     scrollToCalculatorTop();
//   };

//   const formatPrice = (price: number) => price.toLocaleString() + " ريال";

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!calculationResult) return;

//     const message =
//       `طلب عرض سعر رسمي\n\n` +
//       `الخدمة: ${selectedService?.name}\n` +
//       `المساحة: ${area} م²\n` +
//       `المواد: ${selectedMaterial?.name}\n` +
//       `التكلفة التقديرية: ${formatPrice(calculationResult.totalCost)}\n\n` +
//       `الاسم: ${formData.name}\n` +
//       `الجوال: ${formData.phone}\n` +
//       `البريد: ${formData.email}`;

//     trackGAEvent("contact_whatsapp", {
//       event_category: "Lead Generation",
//       event_label: "Calculator Form",
//       location: "Smart Calculator",
//     });

//     window.open(
//       `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`,
//       "_blank",
//     );
//   };

//   return (
//     <section
//       className="py-12 md:py-24 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-slate-50 dark:to-slate-950"
//       dir="rtl"
//     >
//       <SoftWavesDivider />

//       {/* خلفية متحركة */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.05, 0.1, 0.05],
//             rotate: [0, 45, 0],
//           }}
//           transition={{ duration: 20, repeat: Infinity }}
//           className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             scale: [1, 1.3, 1],
//             opacity: [0.03, 0.08, 0.03],
//             x: [0, -100, 0],
//           }}
//           transition={{ duration: 25, repeat: Infinity }}
//           className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-primary/10 rounded-full blur-3xl"
//         />
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 relative z-10">
//         {/* رأس القسم */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-10 md:mb-12 max-w-3xl mx-auto"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 md:mb-6">
//             <Calculator className="w-4 h-4 text-primary" />
//             <span className="text-primary text-sm font-bold">
//               حاسبة التكلفة
//             </span>
//           </div>
//           <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 text-foreground">
//             احسب تكلفة{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-primary-dark">
//               مشروعك
//             </span>
//           </h2>
//           <p className="text-muted-foreground text-base md:text-lg leading-relaxed px-2">
//             احصل على تقدير فوري لتكلفة مشروع المظلة أو الساتر أو البرجولة في
//             دقائق
//           </p>
//         </motion.div>

//         {/* المرجع للتمرير السلس */}
//         <div ref={calculatorTopRef} className="scroll-mt-24"></div>

//         {/* شريط التقدم */}
//         <div className="max-w-4xl mx-auto mb-6 md:mb-8">
//           <div className="flex items-center justify-between mb-4 px-1">
//             {steps.map((step) => (
//               <div
//                 key={step.id}
//                 className={cn(
//                   "flex flex-col sm:flex-row items-center gap-1 sm:gap-2",
//                   step.id > currentStep && !showResult && "opacity-50",
//                 )}
//               >
//                 <div
//                   className={cn(
//                     "w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all min-w-[28px] md:min-w-[32px]",
//                     step.id < currentStep || (step.id === 4 && showResult)
//                       ? "bg-primary text-primary-foreground"
//                       : step.id === currentStep && !showResult
//                         ? "bg-primary/20 text-primary border-2 border-primary"
//                         : "bg-slate-200 dark:bg-slate-800 text-muted-foreground",
//                   )}
//                 >
//                   {step.id < currentStep || (step.id === 4 && showResult) ? (
//                     <Check className="w-3 h-3 md:w-4 md:h-4" />
//                   ) : (
//                     step.id
//                   )}
//                 </div>
//                 <span className="hidden sm:inline text-xs md:text-sm font-medium text-foreground">
//                   {step.name}
//                 </span>
//               </div>
//             ))}
//           </div>
//           <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
//             <motion.div
//               initial={{ width: "0%" }}
//               animate={{
//                 width: showResult ? "100%" : `${(currentStep / 4) * 100}%`,
//               }}
//               className="h-full bg-gradient-to-l from-primary to-primary-dark"
//             />
//           </div>
//         </div>

//         {/* نموذج الحاسبة */}
//         <div className="max-w-4xl mx-auto bg-card rounded-2xl md:rounded-3xl shadow-xl border border-border/50 overflow-hidden">
//           <div className="p-5 md:p-8">
//             <AnimatePresence mode="wait">
//               {!showResult ? (
//                 <motion.div
//                   key={`step-${currentStep}`}
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -50 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {/* الخطوة 1: اختيار الخدمة (أيقونات متجاوبة مع الثيم) */}
//                   {currentStep === 1 && (
//                     <div className="space-y-4 md:space-y-6">
//                       <h3 className="text-xl md:text-2xl font-bold text-center text-foreground">
//                         اختر نوع الخدمة
//                       </h3>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
//                         {services.map((service) => {
//                           const Icon = service.icon;
//                           return (
//                             <button
//                               key={service.id}
//                               onClick={() => setSelectedService(service)}
//                               className={cn(
//                                 "relative p-6 rounded-2xl border-2 transition-all text-center flex flex-col items-center group hover:shadow-lg bg-background",
//                                 selectedService?.id === service.id
//                                   ? "border-primary ring-1 ring-primary bg-primary/5"
//                                   : "border-border/50 hover:border-primary/50",
//                               )}
//                             >
//                               {selectedService?.id === service.id && (
//                                 <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center z-10 shadow-md">
//                                   <Check className="w-4 h-4 text-primary-foreground" />
//                                 </div>
//                               )}

//                               <div
//                                 className={cn(
//                                   "mb-4 p-4 rounded-full transition-colors",
//                                   selectedService?.id === service.id
//                                     ? "bg-primary/20 text-primary"
//                                     : "bg-muted text-muted-foreground group-hover:text-primary group-hover:bg-primary/10",
//                                 )}
//                               >
//                                 <Icon
//                                   className="w-10 h-10 md:w-12 md:h-12"
//                                   strokeWidth={1.5}
//                                 />
//                               </div>

//                               <h4 className="font-bold text-lg mb-2 text-foreground">
//                                 {service.name}
//                               </h4>
//                               <p className="text-sm text-muted-foreground mb-4 line-clamp-2 px-2">
//                                 {service.description}
//                               </p>
//                               <div className="mt-auto w-full pt-4 border-t border-border/50">
//                                 <p className="text-xs text-primary font-medium">
//                                   من {service.minArea} إلى {service.maxArea} م²
//                                 </p>
//                               </div>
//                             </button>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   )}

//                   {/* الخطوة 2: تحديد المساحة */}
//                   {currentStep === 2 && selectedService && (
//                     <div className="space-y-4 md:space-y-6">
//                       <h3 className="text-xl md:text-2xl font-bold text-center text-foreground">
//                         حدد مساحة المشروع
//                       </h3>
//                       <div className="bg-slate-50 dark:bg-slate-800/50 p-5 md:p-8 rounded-2xl border border-border/50 max-w-2xl mx-auto">
//                         <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
//                           <span className="text-base font-medium text-foreground">
//                             المساحة الإجمالية (متر مربع)
//                           </span>
//                           <span className="text-4xl font-black text-primary bg-primary/10 px-4 py-2 rounded-xl">
//                             {area}{" "}
//                             <span className="text-xl font-medium">م²</span>
//                           </span>
//                         </div>
//                         <input
//                           type="range"
//                           min={selectedService.minArea}
//                           max={selectedService.maxArea}
//                           value={area}
//                           onChange={(e) => setArea(Number(e.target.value))}
//                           className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
//                         />
//                         <div className="flex justify-between mt-3 text-sm font-medium text-muted-foreground">
//                           <span>{selectedService.minArea} م²</span>
//                           <span>{selectedService.maxArea} م²</span>
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-center gap-2 text-sm text-primary bg-primary/5 p-4 rounded-xl max-w-2xl mx-auto border border-primary/10">
//                         <Ruler className="w-5 h-5 shrink-0" />
//                         <span>
//                           يمكنك تغيير المساحة لاحقاً، المهندس سيقوم بالرفع
//                           المساحي الدقيق مجاناً
//                         </span>
//                       </div>
//                     </div>
//                   )}

//                   {/* الخطوة 3: اختيار المواد */}
//                   {currentStep === 3 && (
//                     <div className="space-y-4 md:space-y-6">
//                       <h3 className="text-xl md:text-2xl font-bold text-center text-foreground">
//                         اختر نوع المواد
//                       </h3>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         {materials.map((material) => (
//                           <button
//                             key={material.id}
//                             onClick={() => setSelectedMaterial(material)}
//                             className={cn(
//                               "relative p-6 rounded-2xl border-2 transition-all flex flex-col group hover:shadow-md bg-background text-right",
//                               selectedMaterial?.id === material.id
//                                 ? "border-primary ring-1 ring-primary bg-primary/5"
//                                 : "border-border/50 hover:border-primary/50",
//                             )}
//                           >
//                             {selectedMaterial?.id === material.id && (
//                               <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center z-10 shadow-md">
//                                 <Check className="w-4 h-4 text-primary-foreground" />
//                               </div>
//                             )}

//                             <div className="flex flex-col w-full h-full">
//                               <div className="flex flex-wrap items-center gap-3 mb-3">
//                                 <div className="p-2.5 bg-primary/10 rounded-xl">
//                                   <Layers className="w-5 h-5 text-primary" />
//                                 </div>
//                                 <h4 className="font-bold text-lg md:text-xl text-foreground">
//                                   {material.name}
//                                 </h4>
//                               </div>
//                               <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
//                                 {material.description}
//                               </p>
//                               <div className="space-y-3 mt-auto pt-4 border-t border-border/50">
//                                 <div className="flex items-center gap-2">
//                                   <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full w-fit">
//                                     ضمان {material.warranty}
//                                   </span>
//                                 </div>
//                                 <div className="flex flex-wrap gap-2">
//                                   {material.features.map((feature, i) => (
//                                     <span
//                                       key={i}
//                                       className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-border/50 text-xs rounded-lg text-foreground"
//                                     >
//                                       {feature}
//                                     </span>
//                                   ))}
//                                 </div>
//                               </div>
//                             </div>
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </motion.div>
//               ) : (
//                 // عرض النتيجة
//                 calculationResult && (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="space-y-5 md:space-y-6"
//                   >
//                     <div className="text-center">
//                       <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-green-500 text-white rounded-full mb-3 md:mb-4">
//                         <Check className="w-6 h-6 md:w-8 md:h-8" />
//                       </div>
//                       <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-foreground">
//                         تم حساب التكلفة المبدئية
//                       </h3>
//                       <p className="text-xs md:text-sm text-muted-foreground px-2">
//                         هذا تقدير مبدئي، قد تختلف التكلفة الفعلية بشكل بسيط حسب
//                         تفاصيل الموقع
//                       </p>
//                     </div>

//                     <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 md:p-8 rounded-2xl md:rounded-3xl text-center shadow-lg">
//                       <p className="text-xs md:text-sm text-white/80 mb-1 md:mb-2">
//                         التكلفة التقديرية الإجمالية
//                       </p>
//                       <p className="text-3xl md:text-5xl font-bold mb-1 md:mb-2 break-words sm:break-normal">
//                         {formatPrice(calculationResult.totalCost)}
//                       </p>
//                       <p className="text-xs md:text-sm text-white/80">
//                         شامل المواد والتركيب
//                       </p>
//                     </div>

//                     <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 md:p-6 border border-border/50">
//                       <h4 className="font-bold text-sm md:text-base mb-3 md:mb-4 text-foreground">
//                         تفاصيل التكلفة
//                       </h4>
//                       <div className="space-y-2 md:space-y-3">
//                         {calculationResult.breakdown.map((item, index) => (
//                           <div
//                             key={index}
//                             className="flex flex-wrap justify-between gap-2 text-xs md:text-sm"
//                           >
//                             <span className="text-muted-foreground">
//                               {item.label}
//                             </span>
//                             <span className="font-medium text-left text-foreground">
//                               {formatPrice(item.amount)}
//                             </span>
//                           </div>
//                         ))}
//                         <div className="pt-3 mt-3 border-t border-border/50 flex flex-wrap justify-between gap-2 font-bold text-sm md:text-base text-foreground">
//                           <span>الإجمالي</span>
//                           <span className="text-primary text-left">
//                             {formatPrice(calculationResult.totalCost)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
//                       <div className="bg-slate-50 dark:bg-slate-800/50 p-3 md:p-4 rounded-xl text-center border border-border/50">
//                         <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary mx-auto mb-1.5 md:mb-2" />
//                         <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5">
//                           مدة التنفيذ
//                         </p>
//                         <p className="font-bold text-xs md:text-sm text-foreground">
//                           {calculationResult.estimatedTime}
//                         </p>
//                       </div>
//                       <div className="bg-slate-50 dark:bg-slate-800/50 p-3 md:p-4 rounded-xl text-center border border-border/50">
//                         <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary mx-auto mb-1.5 md:mb-2" />
//                         <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5">
//                           الضمان
//                         </p>
//                         <p className="font-bold text-xs md:text-sm line-clamp-1 text-foreground">
//                           {calculationResult.warranty}
//                         </p>
//                       </div>
//                       <div className="bg-slate-50 dark:bg-slate-800/50 p-3 md:p-4 rounded-xl text-center border border-border/50">
//                         <Ruler className="w-4 h-4 md:w-5 md:h-5 text-primary mx-auto mb-1.5 md:mb-2" />
//                         <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5">
//                           المساحة
//                         </p>
//                         <p className="font-bold text-xs md:text-sm text-foreground">
//                           {area} م²
//                         </p>
//                       </div>
//                       <div className="bg-slate-50 dark:bg-slate-800/50 p-3 md:p-4 rounded-xl text-center border border-border/50">
//                         <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary mx-auto mb-1.5 md:mb-2" />
//                         <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5">
//                           المعاينة
//                         </p>
//                         <p className="font-bold text-xs md:text-sm text-foreground">
//                           مجانية
//                         </p>
//                       </div>
//                     </div>

//                     {!showContactForm ? (
//                       <div className="space-y-3">
//                         <button
//                           onClick={() => setShowContactForm(true)}
//                           className="w-full py-3.5 md:py-4 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground rounded-xl font-bold hover:shadow-lg transition-all text-sm md:text-base"
//                         >
//                           احصل على عرض سعر رسمي
//                         </button>
//                         <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
//                           <button
//                             onClick={resetCalculator}
//                             className="flex-1 py-3 border border-border/50 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 text-sm md:text-base text-foreground"
//                           >
//                             <RotateCcw className="w-4 h-4 shrink-0" /> حساب جديد
//                           </button>
//                           <button
//                             onClick={() => window.print()}
//                             className="flex-1 py-3 border border-border/50 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 text-sm md:text-base text-foreground"
//                           >
//                             <Printer className="w-4 h-4 shrink-0" /> طباعة
//                             التفاصيل
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <motion.form
//                         initial={{ opacity: 0, y: 15 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         onSubmit={handleSubmit}
//                         className="space-y-3 md:space-y-4 bg-slate-50 dark:bg-slate-800/30 p-4 md:p-6 rounded-2xl border border-border/50"
//                       >
//                         <h4 className="font-bold text-sm md:text-base text-foreground">
//                           أدخل بياناتك للحصول على العرض رسمياً عبر الواتساب
//                         </h4>
//                         <input
//                           type="text"
//                           placeholder="الاسم الكامل"
//                           value={formData.name}
//                           onChange={(e) =>
//                             setFormData({ ...formData, name: e.target.value })
//                           }
//                           required
//                           className="w-full px-4 py-3 text-sm md:text-base bg-white dark:bg-slate-900 border border-border/50 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground"
//                         />
//                         <input
//                           type="tel"
//                           placeholder="رقم الجوال"
//                           value={formData.phone}
//                           onChange={(e) =>
//                             setFormData({ ...formData, phone: e.target.value })
//                           }
//                           required
//                           className="w-full px-4 py-3 text-sm md:text-base bg-white dark:bg-slate-900 border border-border/50 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground"
//                         />
//                         <input
//                           type="email"
//                           placeholder="البريد الإلكتروني (اختياري)"
//                           value={formData.email}
//                           onChange={(e) =>
//                             setFormData({ ...formData, email: e.target.value })
//                           }
//                           className="w-full px-4 py-3 text-sm md:text-base bg-white dark:bg-slate-900 border border-border/50 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground"
//                         />
//                         <button
//                           type="submit"
//                           className="w-full py-3.5 md:py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm md:text-base mt-2"
//                         >
//                           <MessageCircle className="w-5 h-5 shrink-0" /> إرسال
//                           الطلب عبر واتساب
//                         </button>
//                       </motion.form>
//                     )}
//                   </motion.div>
//                 )
//               )}
//             </AnimatePresence>

//             {/* أزرار التنقل السفلية */}
//             {!showResult && (
//               <div className="flex justify-between items-center mt-6 md:mt-8 pt-5 md:pt-6 border-t border-border/50 gap-2">
//                 <button
//                   onClick={prevStep}
//                   disabled={currentStep === 1}
//                   className={cn(
//                     "px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-medium transition-all flex items-center gap-1.5 md:gap-2 text-sm md:text-base",
//                     currentStep === 1
//                       ? "text-muted-foreground cursor-not-allowed opacity-50"
//                       : "text-foreground hover:bg-slate-100 dark:hover:bg-slate-800",
//                   )}
//                 >
//                   <ChevronRight className="w-4 h-4 md:w-5 md:h-5 shrink-0" />{" "}
//                   السابق
//                 </button>

//                 <button
//                   onClick={nextStep}
//                   disabled={!canProceed()}
//                   className={cn(
//                     "px-5 md:px-8 py-2.5 md:py-3 rounded-xl font-bold transition-all flex items-center gap-1.5 md:gap-2 text-sm md:text-base",
//                     canProceed()
//                       ? "bg-gradient-to-r from-primary to-primary-dark text-primary-foreground shadow-md hover:shadow-lg"
//                       : "bg-slate-200 dark:bg-slate-700 text-muted-foreground cursor-not-allowed",
//                   )}
//                 >
//                   {currentStep === 4 ? "عرض التكلفة" : "التالي"}{" "}
//                   <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
