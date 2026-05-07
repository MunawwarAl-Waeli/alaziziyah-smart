"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
// import { trackGAEvent } from "@/lib/analytics"; // قم بتفعيله إذا كنت تستخدمه
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
  { id: 1, name: "الخدمة" },
  { id: 2, name: "المساحة" },
  { id: 3, name: "المواد" },
  { id: 4, name: "النتيجة" },
];

// ==========================================
// 2. المكون الرئيسي
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

  // 🚀 تحسين الأداء: استخدام useMemo بدلاً من useEffect لمنع إعادة التصيير المزدوج
  const calculationResult = useMemo(() => {
    if (!selectedService || !selectedMaterial) return null;

    const baseCost = selectedService.basePrice * area;
    const materialCost = baseCost * (selectedMaterial.priceFactor - 1);
    const totalCost = baseCost + materialCost;
    const estimatedDays = Math.max(3, Math.ceil(area / 50) * 2);

    return {
      baseCost,
      materialCost,
      totalCost,
      estimatedTime: `${estimatedDays} - ${estimatedDays + 3} أيام`,
      warranty: selectedMaterial.warranty,
      breakdown: [
        { label: "التكلفة الأساسية", amount: baseCost },
        { label: "إضافة الخامة", amount: materialCost },
      ],
    };
  }, [selectedService, area, selectedMaterial]);

  const scrollToCalculatorTop = () => {
    if (calculatorTopRef.current) {
      const yOffset = -100;
      const element = calculatorTopRef.current;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
    scrollToCalculatorTop();
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      scrollToCalculatorTop();
    }
  };

  const resetCalculator = () => {
    setCurrentStep(1);
    setSelectedService(null);
    setArea(20);
    setSelectedMaterial(null);
    setShowResult(false);
    setShowContactForm(false);
    scrollToCalculatorTop();
  };

  const canProceed = () => {
    if (currentStep === 1) return !!selectedService;
    if (currentStep === 2) return area >= (selectedService?.minArea || 0);
    if (currentStep === 3) return !!selectedMaterial;
    return true;
  };

  const formatPrice = (price: number) =>
    Math.round(price).toLocaleString("en-US") + " ريال";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calculationResult) return;

    // 🚀 إرسال الحدث والبيانات إلى Google Tag Manager
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "calculator_whatsapp_lead", // هذا هو اسم الحدث الذي سنستخدمه في GTM
        lead_category: "Smart Calculator",
        service_name: selectedService?.name,
        material_type: selectedMaterial?.name,
        project_area: area,
        estimated_value: calculationResult.totalCost, // مفيد جداً لتتبع قيمة التحويل في إعلانات جوجل
      });
    }

    // الكود الأصلي لفتح الواتساب
    const message = `طلب عرض سعر رسمي\nالاسم: ${formData.name}\nالخدمة: ${selectedService?.name}\nالمساحة: ${area} م²\nالمواد: ${selectedMaterial?.name}\nالتكلفة التقديرية: ${formatPrice(calculationResult.totalCost)}`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };


  return (
    <section
      className="py-12 md:py-24 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-slate-50 dark:to-slate-950"
      dir="rtl"
    >
      <SoftWavesDivider />

      <div className="container mx-auto px-4 relative z-10">
        {/* رأس القسم */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Calculator className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm font-bold">
              حاسبة التكلفة الذكية
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-foreground leading-tight">
            احسب تكلفة{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-primary-dark">
              مشروعك
            </span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg leading-relaxed px-4">
            خطوات بسيطة للحصول على تقدير فوري لتكلفة مشروع المظلة أو الساتر أو
            البرجولة
          </p>
        </motion.div>

        <div ref={calculatorTopRef} className="scroll-mt-28"></div>

        {/* شريط التقدم (Progress Bar) */}
        <div className="max-w-4xl mx-auto mb-8 md:mb-12">
          <div className="flex items-center justify-between mb-4 px-2 md:px-6">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex flex-col items-center gap-2 transition-opacity duration-300",
                  step.id > currentStep && !showResult && "opacity-40",
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-bold transition-all duration-300 shadow-sm",
                    step.id < currentStep || (step.id === 4 && showResult)
                      ? "bg-primary text-white"
                      : step.id === currentStep && !showResult
                        ? "bg-primary/10 text-primary border-2 border-primary"
                        : "bg-slate-100 dark:bg-slate-800 text-muted-foreground border border-border",
                  )}
                >
                  {step.id < currentStep || (step.id === 4 && showResult) ? (
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className="text-xs md:text-sm font-bold text-foreground">
                  {step.name}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full h-1.5 md:h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: showResult
                  ? "100%"
                  : `${((currentStep - 1) / 3) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="h-full bg-primary"
            />
          </div>
        </div>

        {/* نموذج الحاسبة */}
        <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden">
          <div className="p-4 md:p-8 lg:p-10">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key={`step-${currentStep}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* ================= الخطوة 1: الخدمات ================= */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl md:text-2xl font-bold text-center text-foreground mb-6">
                        اختر نوع الخدمة
                      </h3>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                        {services.map((service) => {
                          const Icon = service.icon;
                          const isSelected = selectedService?.id === service.id;
                          return (
                            <button
                              key={service.id}
                              onClick={() => {
                                setSelectedService(service);
                                if (area < service.minArea)
                                  setArea(service.minArea); // ضبط المساحة تلقائياً
                              }}
                              className={cn(
                                "relative p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 text-center flex flex-col items-center group h-full",
                                isSelected
                                  ? "border-primary ring-2 ring-primary/20 bg-primary/5 shadow-md"
                                  : "border-border/60 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 bg-background",
                              )}
                            >
                              <div
                                className={cn(
                                  "mb-3 md:mb-5 p-3 md:p-4 rounded-full transition-colors duration-300",
                                  isSelected
                                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                                    : "bg-muted text-muted-foreground group-hover:text-primary group-hover:bg-primary/10",
                                )}
                              >
                                <Icon
                                  className="w-6 h-6 md:w-10 md:h-10"
                                  strokeWidth={1.5}
                                />
                              </div>
                              <h4 className="font-bold text-sm md:text-lg text-foreground mb-1 md:mb-2">
                                {service.name}
                              </h4>
                              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed px-1">
                                {service.description}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ================= الخطوة 2: المساحة ================= */}
                  {currentStep === 2 && selectedService && (
                    <div className="space-y-6 md:space-y-8">
                      <h3 className="text-xl md:text-2xl font-bold text-center text-foreground">
                        حدد المساحة التقريبية (م²)
                      </h3>
                      <div className="bg-slate-50 dark:bg-slate-800/30 p-6 md:p-10 rounded-2xl border border-border/50 max-w-2xl mx-auto text-center">
                        <span className="text-5xl md:text-7xl font-black text-primary drop-shadow-sm">
                          {area}{" "}
                          <span className="text-2xl md:text-3xl text-muted-foreground font-medium">
                            م²
                          </span>
                        </span>

                        <div className="mt-8 md:mt-12 relative px-2">
                          <input
                            type="range"
                            min={selectedService.minArea}
                            max={selectedService.maxArea}
                            value={area}
                            onChange={(e) => setArea(Number(e.target.value))}
                            className="w-full h-3 md:h-4 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-dark transition-all"
                          />
                          <div className="flex justify-between mt-3 text-xs md:text-sm font-medium text-muted-foreground">
                            <span>{selectedService.minArea} م² (الأدنى)</span>
                            <span>{selectedService.maxArea} م² (الأقصى)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ================= الخطوة 3: المواد ================= */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-xl md:text-2xl font-bold text-center text-foreground mb-6">
                        اختر نوع التغطية (الخامة)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        {materials.map((material) => {
                          const isSelected =
                            selectedMaterial?.id === material.id;
                          return (
                            <button
                              key={material.id}
                              onClick={() => setSelectedMaterial(material)}
                              className={cn(
                                "relative p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 text-right flex flex-col h-full group",
                                isSelected
                                  ? "border-primary ring-2 ring-primary/20 bg-primary/5 shadow-md"
                                  : "border-border/60 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 bg-background",
                              )}
                            >
                              <div className="flex items-start justify-between w-full mb-3">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={cn(
                                      "p-2 rounded-xl transition-colors",
                                      isSelected
                                        ? "bg-primary text-white"
                                        : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
                                    )}
                                  >
                                    <Layers className="w-5 h-5 md:w-6 md:h-6" />
                                  </div>
                                  <h4 className="font-bold text-base md:text-xl text-foreground">
                                    {material.name}
                                  </h4>
                                </div>
                                <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs md:text-sm font-bold whitespace-nowrap">
                                  ضمان {material.warranty}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                                {material.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-auto">
                                {material.features.map((feature, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs bg-muted px-2 py-1 rounded-md text-foreground flex items-center gap-1"
                                  >
                                    <Check className="w-3 h-3 text-primary" />{" "}
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                /* ================= النتيجة الكاملة ================= */
                calculationResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-2xl mx-auto space-y-6 md:space-y-8"
                  >
                    {/* المربع السعري */}
                    <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 md:p-8 rounded-3xl text-center shadow-xl shadow-primary/20 relative overflow-hidden">
                      {/* زينة للخلفية */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>

                      <h3 className="text-sm md:text-lg font-medium opacity-90 mb-2 relative z-10">
                        التكلفة التقديرية (شامل التركيب)
                      </h3>
                      <p className="text-4xl md:text-6xl font-black relative z-10 tracking-tight">
                        {formatPrice(calculationResult.totalCost)}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div className="bg-muted/30 p-4 md:p-5 rounded-2xl border border-border flex flex-col items-center justify-center text-center">
                        <Clock className="w-6 h-6 md:w-8 md:h-8 text-primary mb-2" />
                        <p className="text-xs md:text-sm text-muted-foreground mb-1">
                          وقت التنفيذ المتوقع
                        </p>
                        <p className="font-bold text-sm md:text-base text-foreground">
                          {calculationResult.estimatedTime}
                        </p>
                      </div>
                      <div className="bg-muted/30 p-4 md:p-5 rounded-2xl border border-border flex flex-col items-center justify-center text-center">
                        <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary mb-2" />
                        <p className="text-xs md:text-sm text-muted-foreground mb-1">
                          فترة الضمان
                        </p>
                        <p className="font-bold text-sm md:text-base text-foreground">
                          {calculationResult.warranty}
                        </p>
                      </div>
                    </div>

                    {/* تفاصيل الحساب */}
                    <div className="bg-slate-50 dark:bg-slate-900 p-5 md:p-6 rounded-2xl border border-border space-y-3">
                      <h4 className="font-bold text-sm md:text-base mb-4 border-b border-border pb-2">
                        تفاصيل الحسبة:
                      </h4>
                      {calculationResult.breakdown.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center text-sm md:text-base"
                        >
                          <span className="text-muted-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            {item.label}
                          </span>
                          <span className="font-bold text-foreground">
                            {formatPrice(item.amount)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* نموذج التواصل أو زر الواتساب */}
                    {!showContactForm ? (
                      <button
                        onClick={() => setShowContactForm(true)}
                        className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-sm md:text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                      >
                        اطلب معاينة دقيقة للموقع
                      </button>
                    ) : (
                      <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        onSubmit={handleSubmit}
                        className="space-y-4 bg-card border border-border p-5 md:p-6 rounded-2xl shadow-sm"
                      >
                        <h4 className="font-bold text-center mb-4">
                          أدخل بياناتك لإرسال التسعيرة للواتساب
                        </h4>
                        <div>
                          <input
                            type="text"
                            placeholder="الاسم الكامل"
                            required
                            className="w-full px-4 py-3 text-sm md:text-base bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <input
                            type="tel"
                            placeholder="رقم الجوال"
                            required
                            className="w-full px-4 py-3 text-sm md:text-base bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-colors shadow-lg"
                        >
                          <MessageCircle className="w-5 h-5" /> إرسال الطلب عبر
                          واتساب
                        </button>
                      </motion.form>
                    )}
                  </motion.div>
                )
              )}
            </AnimatePresence>

            {/* أزرار التحكم بالتنقل */}
            {!showResult && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-border gap-4">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-5 py-2.5 text-sm md:text-base font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors"
                >
                  السابق
                </button>

                <div className="flex items-center gap-3">
                  {currentStep > 1 && (
                    <button
                      onClick={resetCalculator}
                      title="إعادة ضبط"
                      className="p-2.5 md:p-3 text-muted-foreground hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                    >
                      <RotateCcw className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                  )}
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="px-6 md:px-8 py-2.5 md:py-3 bg-primary hover:bg-primary-dark disabled:bg-muted disabled:text-muted-foreground text-white rounded-xl font-bold text-sm md:text-base flex items-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    {currentStep === 3 ? "احسب التكلفة" : "التالي"}
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
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
//   MessageCircle,
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
// // 2. البيانات كاملة بدون حذف
// // ==========================================

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
//     minArea: 100,
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
//     description: "تغطية الساحات بأعلى معايير السلامة",
//     basePrice: 380,
//     minArea: 100,
//     maxArea: 2000,
//   },
//   {
//     id: "pool",
//     name: "مظلة مسبح",
//     icon: Waves,
//     description: "مظلات متحركة وثابتة للمسابح",
//     basePrice: 450,
//     minArea: 100,
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
//   { id: 1, name: "الخدمة", description: "نوع الخدمة" },
//   { id: 2, name: "المساحة", description: "المساحة" },
//   { id: 3, name: "المواد", description: "المواد" },
//   { id: 4, name: "النتيجة", description: "التكلفة" },
// ];

// // ==========================================
// // 3. المكون الرئيسي
// // ==========================================

// export function SmartCalculator() {
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
//           { label: "إضافة الخامة", amount: materialCost },
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
//     if (currentStep === 1) return !!selectedService;
//     if (currentStep === 2) return area >= (selectedService?.minArea || 0);
//     if (currentStep === 3) return !!selectedMaterial;
//     return true;
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
//     const message = `طلب عرض سعر رسمي\nالاسم: ${formData.name}\nالخدمة: ${selectedService?.name}\nالمساحة: ${area} م²\nالمواد: ${selectedMaterial?.name}\nالتكلفة التقديرية: ${formatPrice(calculationResult.totalCost)}`;
//     window.open(
//       `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`,
//       "_blank",
//     );
//   };

//   return (
//     <section
//       className="py-6 md:py-24 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-slate-50 dark:to-slate-950"
//       dir="rtl"
//     >
//       <SoftWavesDivider />

//       <div className="container mx-auto px-4 relative z-10">
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
//         <div ref={calculatorTopRef} className="scroll-mt-24"></div>

//         {/* شريط التقدم الصغير */}
//         <div className="max-w-4xl mx-auto mb-6 md:mb-10">
//           <div className="flex items-center justify-between mb-3 px-1">
//             {steps.map((step) => (
//               <div
//                 key={step.id}
//                 className={cn(
//                   "flex flex-col items-center gap-1",
//                   step.id > currentStep && !showResult && "opacity-30",
//                 )}
//               >
//                 <div
//                   className={cn(
//                     "w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-sm font-bold transition-all",
//                     step.id < currentStep || (step.id === 4 && showResult)
//                       ? "bg-primary text-white"
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
//                 <span className="text-[8px] md:text-xs font-bold text-foreground">
//                   {step.name}
//                 </span>
//               </div>
//             ))}
//           </div>
//           <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
//             <motion.div
//               animate={{
//                 width: showResult ? "100%" : `${(currentStep / 4) * 100}%`,
//               }}
//               className="h-full bg-primary"
//             />
//           </div>
//         </div>

//         {/* نموذج الحاسبة */}
//         <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden">
//           <div className="p-3 md:p-8">
//             <AnimatePresence mode="wait">
//               {!showResult ? (
//                 <motion.div
//                   key={`step-${currentStep}`}
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   {/* الخطوة 1: الخدمات - عمودين في الجوال */}
//                   {currentStep === 1 && (
//                     <div className="space-y-4">
//                       <h3 className="text-sm md:text-2xl font-bold text-center text-foreground">
//                         اختر نوع الخدمة
//                       </h3>
//                       <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
//                         {services.map((service) => {
//                           const Icon = service.icon;
//                           return (
//                             <button
//                               key={service.id}
//                               onClick={() => setSelectedService(service)}
//                               className={cn(
//                                 "relative p-2 md:p-6 rounded-xl border-2 transition-all text-center flex flex-col items-center group bg-background",
//                                 selectedService?.id === service.id
//                                   ? "border-primary ring-1 ring-primary bg-primary/5"
//                                   : "border-border/50",
//                               )}
//                             >
//                               <div
//                                 className={cn(
//                                   "mb-1 md:mb-4 p-2 md:p-4 rounded-full transition-colors",
//                                   selectedService?.id === service.id
//                                     ? "bg-primary/20 text-primary"
//                                     : "bg-muted text-muted-foreground",
//                                 )}
//                               >
//                                 <Icon
//                                   className="w-5 h-5 md:w-12 md:h-12"
//                                   strokeWidth={1.5}
//                                 />
//                               </div>
//                               <h4 className="font-bold text-[10px] md:text-lg text-foreground leading-tight">
//                                 {service.name}
//                               </h4>
//                               <p className="text-[8px] md:text-xs text-muted-foreground line-clamp-1 mt-0.5">
//                                 {service.description}
//                               </p>
//                             </button>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   )}

//                   {/* الخطوة 2: المساحة */}
//                   {currentStep === 2 && selectedService && (
//                     <div className="space-y-4">
//                       <h3 className="text-sm md:text-2xl font-bold text-center text-foreground">
//                         المساحة م²
//                       </h3>
//                       <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-border/50 max-w-xl mx-auto text-center">
//                         <span className="text-3xl md:text-5xl font-black text-primary">
//                           {area} م²
//                         </span>
//                         <input
//                           type="range"
//                           min={selectedService.minArea}
//                           max={selectedService.maxArea}
//                           value={area}
//                           onChange={(e) => setArea(Number(e.target.value))}
//                           className="w-full h-2 mt-6 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
//                         />
//                       </div>
//                     </div>
//                   )}

//                   {/* الخطوة 3: المواد */}
//                   {currentStep === 3 && (
//                     <div className="space-y-4">
//                       <h3 className="text-sm md:text-2xl font-bold text-center text-foreground">
//                         اختر الخامة
//                       </h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
//                         {materials.map((material) => (
//                           <button
//                             key={material.id}
//                             onClick={() => setSelectedMaterial(material)}
//                             className={cn(
//                               "relative p-3 md:p-5 rounded-xl border-2 transition-all text-right flex flex-col group bg-background",
//                               selectedMaterial?.id === material.id
//                                 ? "border-primary bg-primary/5"
//                                 : "border-border/50",
//                             )}
//                           >
//                             <div className="flex items-center justify-between w-full">
//                               <div className="flex items-center gap-2">
//                                 <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
//                                   <Layers className="w-4 h-4" />
//                                 </div>
//                                 <h4 className="font-bold text-xs md:text-xl text-foreground">
//                                   {material.name}
//                                 </h4>
//                               </div>
//                               <span className="text-[8px] md:text-xs text-primary font-bold">
//                                 ضمان {material.warranty}
//                               </span>
//                             </div>
//                             <p className="text-[9px] md:text-sm text-muted-foreground mt-1 line-clamp-1">
//                               {material.description}
//                             </p>
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </motion.div>
//               ) : (
//                 /* النتيجة الكاملة */
//                 calculationResult && (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.98 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="space-y-4"
//                   >
//                     <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-5 rounded-2xl text-center shadow-lg">
//                       <p className="text-[10px] md:text-sm opacity-80">
//                         التكلفة التقديرية (شامل التركيب)
//                       </p>
//                       <p className="text-3xl md:text-5xl font-black">
//                         {formatPrice(calculationResult.totalCost)}
//                       </p>
//                     </div>

//                     <div className="grid grid-cols-2 gap-2">
//                       <div className="bg-muted/50 p-3 rounded-xl border border-border/50 text-center">
//                         <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
//                         <p className="text-[8px] md:text-xs text-muted-foreground">
//                           التنفيذ
//                         </p>
//                         <p className="font-bold text-[10px] md:text-sm">
//                           {calculationResult.estimatedTime}
//                         </p>
//                       </div>
//                       <div className="bg-muted/50 p-3 rounded-xl border border-border/50 text-center">
//                         <Shield className="w-4 h-4 text-primary mx-auto mb-1" />
//                         <p className="text-[8px] md:text-xs text-muted-foreground">
//                           الضمان
//                         </p>
//                         <p className="font-bold text-[10px] md:text-sm">
//                           {calculationResult.warranty}
//                         </p>
//                       </div>
//                     </div>

//                     {/* تفاصيل الحساب التي كانت محذوفة */}
//                     <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-border/50 space-y-1">
//                       {calculationResult.breakdown.map((item, i) => (
//                         <div
//                           key={i}
//                           className="flex justify-between text-[10px] md:text-sm"
//                         >
//                           <span className="text-muted-foreground">
//                             {item.label}
//                           </span>
//                           <span className="font-bold">
//                             {formatPrice(item.amount)}
//                           </span>
//                         </div>
//                       ))}
//                     </div>

//                     {!showContactForm ? (
//                       <button
//                         onClick={() => setShowContactForm(true)}
//                         className="w-full py-3 bg-primary text-white rounded-xl font-bold text-xs md:text-base shadow-lg"
//                       >
//                         احصل على عرض سعر رسمي (واتساب)
//                       </button>
//                     ) : (
//                       <motion.form
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         onSubmit={handleSubmit}
//                         className="space-y-2 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-xl"
//                       >
//                         <input
//                           type="text"
//                           placeholder="الاسم الكامل"
//                           required
//                           className="w-full px-3 py-2 text-xs md:text-base bg-background border rounded-lg outline-none"
//                           value={formData.name}
//                           onChange={(e) =>
//                             setFormData({ ...formData, name: e.target.value })
//                           }
//                         />
//                         <input
//                           type="tel"
//                           placeholder="رقم الجوال"
//                           required
//                           className="w-full px-3 py-2 text-xs md:text-base bg-background border rounded-lg outline-none"
//                           value={formData.phone}
//                           onChange={(e) =>
//                             setFormData({ ...formData, phone: e.target.value })
//                           }
//                         />
//                         <input
//                           type="email"
//                           placeholder="البريد الإلكتروني (اختياري)"
//                           className="w-full px-3 py-2 text-xs md:text-base bg-background border rounded-lg outline-none"
//                           value={formData.email}
//                           onChange={(e) =>
//                             setFormData({ ...formData, email: e.target.value })
//                           }
//                         />
//                         <button
//                           type="submit"
//                           className="w-full py-3 bg-[#25D366] text-white rounded-lg font-bold text-xs md:text-base flex items-center justify-center gap-2"
//                         >
//                           <MessageCircle className="w-4 h-4" /> إرسال عبر واتساب
//                         </button>
//                       </motion.form>
//                     )}
//                   </motion.div>
//                 )
//               )}
//             </AnimatePresence>

//             {/* أزرار التحكم */}
//             {!showResult && (
//               <div className="flex justify-between items-center mt-4 pt-4 border-t border-border/50 gap-2">
//                 <button
//                   onClick={prevStep}
//                   disabled={currentStep === 1}
//                   className="px-4 py-2 text-[10px] md:text-base text-muted-foreground disabled:opacity-20"
//                 >
//                   السابق
//                 </button>
//                 <div className="flex gap-2">
//                   {currentStep > 1 && (
//                     <button
//                       onClick={resetCalculator}
//                       className="p-2 md:p-3 text-muted-foreground hover:bg-muted rounded-lg"
//                     >
//                       <RotateCcw className="w-4 h-4" />
//                     </button>
//                   )}
//                   <button
//                     onClick={nextStep}
//                     disabled={!canProceed()}
//                     className="px-6 py-2 bg-primary text-white rounded-lg font-bold text-xs md:text-base flex items-center gap-1"
//                   >
//                     {currentStep === 4 ? "عرض السعر" : "التالي"}{" "}
//                     <ChevronLeft className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
