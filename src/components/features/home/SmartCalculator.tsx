"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { COMPANY_INFO, SOCIAL_LINKS } from "@/lib/config";
import {
  Calculator,
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Ruler,
  Paintbrush,
  Package,
  Sparkles,
  Phone,
  MessageCircle,
  X,
  Clock,
  Shield,
  Award,
  Calendar,
  RotateCcw,
  Printer,
  Download,
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
  icon: string;
  description: string;
  image: string;
  basePrice: number;
  minArea: number;
  maxArea: number;
}

interface MaterialOption {
  id: string;
  name: string;
  priceFactor: number;
  description: string;
  image: string;
  warranty: string;
  features: string[];
}

interface DesignOption {
  id: string;
  name: string;
  priceFactor: number;
  description: string;
  image: string;
}

interface ExtraOption {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
}

interface CalculationResult {
  baseCost: number;
  materialCost: number;
  designCost: number;
  extraCost: number;
  totalCost: number;
  estimatedTime: string;
  warranty: string;
  breakdown: {
    label: string;
    amount: number;
  }[];
}

// ==========================================
// 2. البيانات الثابتة
// ==========================================

const services: ServiceOption[] = [
  {
    id: "carport",
    name: "مظلة سيارات",
    icon: "🚗",
    description: "حماية سيارتك من الشمس والأمطار بتصاميم عصرية",
    image: "/images/3.jpg",
    basePrice: 350,
    minArea: 120,
    maxArea: 500,
  },
  {
    id: "pergola",
    name: "برجولة",
    icon: "🏡",
    description: "جلسات خارجية أنيقة بتصاميم فاخرة",
    image: "/images/4.jpg",
    basePrice: 400,
    minArea: 150,
    maxArea: 400,
  },
  {
    id: "fence",
    name: "ساتر",
    icon: "🛡️",
    description: "خصوصية وأمان بتصاميم عصرية",
    image: "/images/0.jpg",
    basePrice: 300,
    minArea: 100,
    maxArea: 500,
  },
  {
    id: "school",
    name: "مظلة مدرسة",
    icon: "🏫",
    description: "تغطية ساحات وممرات المدارس بأعلى معايير السلامة",
    image: "/images/1.jpg",
    basePrice: 380,
    minArea: 500,
    maxArea: 2000,
  },
  {
    id: "pool",
    name: "مظلة مسبح",
    icon: "🏊",
    description: "مظلات متحركة للمسابح بتقنيات حديثة",
    image: "/images/5.jpg",
    basePrice: 450,
    minArea: 200,
    maxArea: 2000,
  },
  {
    id: "warehouse",
    name: "هنجر",
    icon: "🏭",
    description: "هناجر ومستودعات صناعية بمواصفات عالية",
    image: "/images/1.jpg",
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
    description: "هيكل حديدي مجلفن مقاوم للصدأ بدهان حراري",
    image: "/images/0.jpg",
    warranty: "15 سنة",
    features: ["متانة عالية", "مقاوم للصدأ", "دهان حراري", "يحمل أوزان ثقيلة"],
  },
  {
    id: "polycarbonate",
    name: "لكسان",
    priceFactor: 1.5,
    description: "ألواح بولي كربونيت عازلة للحرارة والأشعة فوق البنفسجية",
    image: "/images/7.jpg",
    warranty: "10 سنوات",
    features: ["عزل حراري ممتاز", "يمنع 99% من الأشعة", "شفاف", "خفيف الوزن"],
  },
  {
    id: "wood",
    name: "خشب سويدي",
    priceFactor: 1.8,
    description: "خشب طبيعي معالج ضد الرطوبة والحشرات",
    image: "/images/5.jpg",
    warranty: "8 سنوات",
    features: ["مظهر طبيعي", "معالج ضد الرطوبة", "مقاوم للحشرات", "عازل حراري"],
  },
  {
    id: "pvc",
    name: "PVC",
    priceFactor: 0.9,
    description: "قماش PVC عالي الجودة مقاوم للماء والعوامل الجوية",
    image: "/images/4.jpg",
    warranty: "5 سنوات",
    features: ["مقاوم للماء", "خفيف الوزن", "ألوان متعددة", "سهل التركيب"],
  },
  {
    id: "aluminum",
    name: "ألمنيوم",
    priceFactor: 1.6,
    description: "هيكل ألمنيوم خفيف مقاوم للصدأ",
    image: "/images/3.jpg",
    warranty: "12 سنة",
    features: ["خفيف جداً", "مقاوم للصدأ", "لا يحتاج صيانة", "تصاميم عصرية"],
  },
];

const designs: DesignOption[] = [
  {
    id: "simple",
    name: "بسيط",
    priceFactor: 1,
    description: "تصميم كلاسيكي بسيط وأنيق",
    image: "/images/2.jpg",
  },
  {
    id: "modern",
    name: "عصري",
    priceFactor: 1.3,
    description: "تصميم عصري بخطوط هندسية جريئة",
    image: "/images/1.jpg",
  },
  {
    id: "luxury",
    name: "فاخر",
    priceFactor: 1.8,
    description: "تصميم فاخر مع نقوش وزخارف",
    image: "/images/0.jpg",
  },
  {
    id: "arabesque",
    name: "طابع عربي",
    priceFactor: 2,
    description: "تصميم مستوحى من العمارة العربية الإسلامية",
    image: "/images/0.jpg",
  },
];

const extras: ExtraOption[] = [
  {
    id: "lighting",
    name: "إضاءة LED",
    price: 500,
    icon: "💡",
    description: "إضاءة LED متكاملة مع حساسات حركة",
  },
  {
    id: "motor",
    name: "محرك كهربائي",
    price: 1500,
    icon: "⚡",
    description: "نظام فتح وإغلاق كهربائي مع ريموت كنترول",
  },
  {
    id: "curtains",
    name: "ستائر جانبية",
    price: 800,
    icon: "🪟",
    description: "ستائر جانبية للخصوصية الكاملة",
  },
  {
    id: "sensors",
    name: "حساسات مطر",
    price: 600,
    icon: "🌧️",
    description: "حساسات مطر للإغلاق التلقائي",
  },
  {
    id: "solar",
    name: "ألواح شمسية",
    price: 2000,
    icon: "☀️",
    description: "ألواح شمسية لتوليد الكهرباء",
  },
  {
    id: "furniture",
    name: "أثاث خارجي",
    price: 2500,
    icon: "🪑",
    description: "طقم أثاث خارجي فاخر",
  },
];

const steps = [
  {
    id: 1,
    name: "الخدمة",
    description: "حدد نوع الخدمة التي تريدها",
  },
  {
    id: 2,
    name: "المساحة",
    description: "أدخل مساحة المشروع بالمتر المربع",
  },
  {
    id: 3,
    name: "المواد",
    description: "اختر المواد المناسبة لمشروعك",
  },
  {
    id: 4,
    name: "التصميم",
    description: "حدد التصميم الذي تفضله",
  },
  {
    id: 5,
    name: "الإضافات",
    description: "أضف المميزات الإضافية",
  },
  {
    id: 6,
    name: "النتيجة",
    description: "عرض التكلفة التقديرية",
  },
];

// ==========================================
// 3. المكون الرئيسي
// ==========================================

export function SmartCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // حالة النموذج
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(
    null,
  );
  const [area, setArea] = useState<number>(20);
  const [selectedMaterial, setSelectedMaterial] =
    useState<MaterialOption | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<DesignOption | null>(
    null,
  );
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // نتيجة الحساب
  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);

  // حساب التكلفة
  useEffect(() => {
    if (selectedService && selectedMaterial && selectedDesign) {
      const baseCost = selectedService.basePrice * area;
      const materialCost = baseCost * (selectedMaterial.priceFactor - 1);
      const designCost = baseCost * (selectedDesign.priceFactor - 1);
      const extraCost = selectedExtras.reduce((total, extraId) => {
        const extra = extras.find((e) => e.id === extraId);
        return total + (extra?.price || 0);
      }, 0);

      const totalCost = baseCost + materialCost + designCost + extraCost;

      // تقدير مدة التنفيذ
      const estimatedDays = Math.max(3, Math.ceil(area / 50) * 2);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCalculationResult({
        baseCost,
        materialCost,
        designCost,
        extraCost,
        totalCost,
        estimatedTime: `${estimatedDays} - ${estimatedDays + 3} أيام`,
        warranty: selectedMaterial.warranty,
        breakdown: [
          { label: "التكلفة الأساسية", amount: baseCost },
          { label: "المواد المختارة", amount: materialCost },
          { label: "التصميم", amount: designCost },
          { label: "الإضافات", amount: extraCost },
        ],
      });
    }
  }, [selectedService, area, selectedMaterial, selectedDesign, selectedExtras]);

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!selectedService;
      case 2:
        return (
          area >= (selectedService?.minArea || 0) &&
          area <= (selectedService?.maxArea || 1000)
        );
      case 3:
        return !!selectedMaterial;
      case 4:
        return !!selectedDesign;
      case 5:
        return true;
      default:
        return true;
    }
  };

  const resetCalculator = () => {
    setCurrentStep(1);
    setSelectedService(null);
    setArea(20);
    setSelectedMaterial(null);
    setSelectedDesign(null);
    setSelectedExtras([]);
    setCalculationResult(null);
    setShowResult(false);
    setShowContactForm(false);
  };

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId],
    );
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString() + " ريال";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calculationResult) return;

    const message =
      `طلب عرض سعر رسمي\n\n` +
      `الخدمة: ${selectedService?.name}\n` +
      `المساحة: ${area} م²\n` +
      `المواد: ${selectedMaterial?.name}\n` +
      `التصميم: ${selectedDesign?.name}\n` +
      `الإضافات: ${selectedExtras.map((id) => extras.find((e) => e.id === id)?.name).join("، ") || "لا يوجد"}\n` +
      `التكلفة التقديرية: ${formatPrice(calculationResult.totalCost)}\n\n` +
      `الاسم: ${formData.name}\n` +
      `الجوال: ${formData.phone}\n` +
      `البريد: ${formData.email}`;
    
    trackGAEvent("contact_whatsapp", {
      event_category: "Lead Generation",
      event_label: "Calculator Form",
      location: "Smart Calculator",
    });

    window.open(
      `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <section
      className="py-12 md:py-24 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-slate-50 dark:to-slate-950"
      dir="rtl"
    >
      <SoftWavesDivider />

      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.08, 0.03],
            x: [0, -100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* رأس القسم */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 md:mb-6">
            <Calculator className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-bold">
              حاسبة التكلفة
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
            احسب تكلفة{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-primary-dark">
              مشروعك
            </span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed px-2">
            احصل على تقدير فوري لتكلفة مشروع المظلة أو الساتر أو البرجولة في دقائق
          </p>
        </motion.div>

        {/* شريط التقدم */}
        <div className="max-w-4xl mx-auto mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-4 px-1">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex flex-col sm:flex-row items-center gap-1 sm:gap-2",
                  step.id > currentStep && !showResult && "opacity-50",
                )}
              >
                <div
                  className={cn(
                    "w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all min-w-[28px] md:min-w-[32px]",
                    step.id < currentStep || (step.id === 6 && showResult)
                      ? "bg-primary text-white"
                      : step.id === currentStep && !showResult
                        ? "bg-primary/20 text-primary border-2 border-primary"
                        : "bg-slate-200 dark:bg-slate-800 text-muted-foreground",
                  )}
                >
                  {step.id < currentStep || (step.id === 6 && showResult) ? (
                    <Check className="w-3 h-3 md:w-4 md:h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className="hidden sm:inline text-xs md:text-sm font-medium">
                  {step.name}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{
                width: showResult ? "100%" : `${(currentStep / 6) * 100}%`,
              }}
              className="h-full bg-gradient-to-l from-primary to-primary-dark"
            />
          </div>
        </div>

        {/* نموذج الحاسبة */}
        <div className="max-w-4xl mx-auto bg-card rounded-2xl md:rounded-3xl shadow-xl border border-border/50 overflow-hidden">
          <div className="p-5 md:p-8">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key={`step-${currentStep}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* الخطوة 1: اختيار الخدمة */}
                  {currentStep === 1 && (
                    <div className="space-y-4 md:space-y-6">
                      <h3 className="text-xl md:text-2xl font-bold">اختر نوع الخدمة</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                        {services.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => setSelectedService(service)}
                            className={cn(
                              "relative p-4 md:p-6 rounded-2xl border-2 transition-all text-right group hover:shadow-md",
                              selectedService?.id === service.id
                                ? "border-primary bg-primary/5"
                                : "border-border/50 hover:border-primary/30",
                            )}
                          >
                            {selectedService?.id === service.id && (
                              <div className="absolute top-3 left-3 md:top-4 md:left-4 w-5 h-5 md:w-6 md:h-6 bg-primary rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                              </div>
                            )}
                            <div className="text-3xl md:text-4xl mb-2 md:mb-3">{service.icon}</div>
                            <h4 className="font-bold text-base md:text-lg mb-1">
                              {service.name}
                            </h4>
                            <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">
                              {service.description}
                            </p>
                            <p className="text-xs text-primary font-medium">
                              من {service.minArea} - {service.maxArea} متر مربع
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* الخطوة 2: تحديد المساحة */}
                  {currentStep === 2 && selectedService && (
                    <div className="space-y-4 md:space-y-6">
                      <h3 className="text-xl md:text-2xl font-bold">حدد مساحة المشروع</h3>

                      <div className="bg-slate-50 dark:bg-slate-800/50 p-5 md:p-6 rounded-2xl">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                          <span className="text-sm text-muted-foreground">
                            المساحة بالمتر المربع
                          </span>
                          <span className="text-3xl font-bold text-primary">
                            {area} م²
                          </span>
                        </div>

                        <input
                          type="range"
                          min={selectedService.minArea}
                          max={selectedService.maxArea}
                          value={area}
                          onChange={(e) => setArea(Number(e.target.value))}
                          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />

                        <div className="flex justify-between mt-3 text-xs font-medium text-muted-foreground">
                          <span>{selectedService.minArea} م²</span>
                          <span>{selectedService.maxArea} م²</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-primary bg-primary/5 p-3 rounded-xl">
                        <Ruler className="w-4 h-4 shrink-0" />
                        <span>يمكنك تغيير المساحة لاحقاً حسب متطلباتك الدقيقة عند المعاينة</span>
                      </div>
                    </div>
                  )}

                  {/* الخطوة 3: اختيار المواد */}
                  {currentStep === 3 && (
                    <div className="space-y-4 md:space-y-6">
                      <h3 className="text-xl md:text-2xl font-bold">اختر نوع المواد</h3>
                      <div className="grid grid-cols-1 gap-3 md:gap-4">
                        {materials.map((material) => (
                          <button
                            key={material.id}
                            onClick={() => setSelectedMaterial(material)}
                            className={cn(
                              "relative p-4 md:p-6 rounded-2xl border-2 transition-all text-right group hover:shadow-md w-full",
                              selectedMaterial?.id === material.id
                                ? "border-primary bg-primary/5"
                                : "border-border/50 hover:border-primary/30",
                            )}
                          >
                            {selectedMaterial?.id === material.id && (
                              <div className="absolute top-3 left-3 md:top-4 md:left-4 w-5 h-5 md:w-6 md:h-6 bg-primary rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                              </div>
                            )}

                            <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4 w-full">
                              <div className="w-full">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  <h4 className="font-bold text-base md:text-lg">
                                    {material.name}
                                  </h4>
                                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] md:text-xs rounded-full whitespace-nowrap">
                                    ضمان {material.warranty}
                                  </span>
                                </div>

                                <p className="text-xs md:text-sm text-muted-foreground mb-3">
                                  {material.description}
                                </p>

                                <div className="flex flex-wrap gap-1.5 md:gap-2">
                                  {material.features.map((feature, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-1 md:py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] md:text-xs rounded-full"
                                    >
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* الخطوة 4: اختيار التصميم */}
                  {currentStep === 4 && (
                    <div className="space-y-4 md:space-y-6">
                      <h3 className="text-xl md:text-2xl font-bold">
                        اختر التصميم المناسب
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        {designs.map((design) => (
                          <button
                            key={design.id}
                            onClick={() => setSelectedDesign(design)}
                            className={cn(
                              "relative p-4 md:p-6 rounded-2xl border-2 transition-all text-right group hover:shadow-md",
                              selectedDesign?.id === design.id
                                ? "border-primary bg-primary/5"
                                : "border-border/50 hover:border-primary/30",
                            )}
                          >
                            {selectedDesign?.id === design.id && (
                              <div className="absolute top-3 left-3 md:top-4 md:left-4 w-5 h-5 md:w-6 md:h-6 bg-primary rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                              </div>
                            )}

                            <h4 className="font-bold text-base md:text-lg mb-1">
                              {design.name}
                            </h4>
                            <p className="text-xs md:text-sm text-muted-foreground">
                              {design.description}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* الخطوة 5: الإضافات */}
                  {currentStep === 5 && (
                    <div className="space-y-4 md:space-y-6">
                      <h3 className="text-xl md:text-2xl font-bold">
                        أضف مميزات إضافية <span className="text-sm font-normal text-muted-foreground">(اختياري)</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        {extras.map((extra) => (
                          <button
                            key={extra.id}
                            onClick={() => toggleExtra(extra.id)}
                            className={cn(
                              "p-4 md:p-6 rounded-2xl border-2 transition-all text-right group hover:shadow-md",
                              selectedExtras.includes(extra.id)
                                ? "border-primary bg-primary/5"
                                : "border-border/50 hover:border-primary/30",
                            )}
                          >
                            <div className="flex items-start justify-between">
                              <div className="text-2xl md:text-3xl mb-2">{extra.icon}</div>
                              {selectedExtras.includes(extra.id) && (
                                <Check className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
                              )}
                            </div>
                            <h4 className="font-bold text-sm md:text-base mb-1">{extra.name}</h4>
                            <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">
                              {extra.description}
                            </p>
                            <p className="text-xs md:text-sm text-primary font-bold">
                              +{extra.price} ريال
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                // عرض النتيجة
                calculationResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-5 md:space-y-6"
                  >
                    {/* رأس النتيجة */}
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-green-500 text-white rounded-full mb-3 md:mb-4">
                        <Check className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">
                        تم حساب التكلفة المبدئية
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground px-2">
                        هذا تقدير مبدئي، قد تختلف التكلفة الفعلية بشكل بسيط حسب تفاصيل الموقع
                      </p>
                    </div>

                    {/* بطاقة السعر النهائي */}
                    <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 md:p-8 rounded-2xl md:rounded-3xl text-center shadow-lg">
                      <p className="text-xs md:text-sm text-white/80 mb-1 md:mb-2">
                        التكلفة التقديرية
                      </p>
                      <p className="text-3xl md:text-5xl font-bold mb-1 md:mb-2 break-words sm:break-normal">
                        {formatPrice(calculationResult.totalCost)}
                      </p>
                      <p className="text-xs md:text-sm text-white/80">
                        شامل المواد والتركيب
                      </p>
                    </div>

                    {/* تفاصيل الحساب */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 md:p-6">
                      <h4 className="font-bold text-sm md:text-base mb-3 md:mb-4">تفاصيل التكلفة</h4>
                      <div className="space-y-2 md:space-y-3">
                        {calculationResult.breakdown.map((item, index) => (
                          <div
                            key={index}
                            className="flex flex-wrap justify-between gap-2 text-xs md:text-sm"
                          >
                            <span className="text-muted-foreground">
                              {item.label}
                            </span>
                            <span className="font-medium text-left">
                              {formatPrice(item.amount)}
                            </span>
                          </div>
                        ))}
                        <div className="pt-3 mt-3 border-t border-border/50 flex flex-wrap justify-between gap-2 font-bold text-sm md:text-base">
                          <span>الإجمالي</span>
                          <span className="text-primary text-left">
                            {formatPrice(calculationResult.totalCost)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* معلومات إضافية */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 md:p-4 rounded-xl text-center">
                        <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary mx-auto mb-1.5 md:mb-2" />
                        <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5">
                          مدة التنفيذ
                        </p>
                        <p className="font-bold text-xs md:text-sm">
                          {calculationResult.estimatedTime}
                        </p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 md:p-4 rounded-xl text-center">
                        <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary mx-auto mb-1.5 md:mb-2" />
                        <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5">الضمان</p>
                        <p className="font-bold text-xs md:text-sm line-clamp-1">
                          {calculationResult.warranty}
                        </p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 md:p-4 rounded-xl text-center">
                        <Ruler className="w-4 h-4 md:w-5 md:h-5 text-primary mx-auto mb-1.5 md:mb-2" />
                        <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5">المساحة</p>
                        <p className="font-bold text-xs md:text-sm">{area} م²</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 md:p-4 rounded-xl text-center">
                        <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary mx-auto mb-1.5 md:mb-2" />
                        <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5">المعاينة</p>
                        <p className="font-bold text-xs md:text-sm">مجانية</p>
                      </div>
                    </div>

                    {/* تفاصيل الاختيارات */}
                    <div className="border border-border/50 rounded-2xl p-4">
                      <h4 className="font-bold text-sm md:text-base mb-2 md:mb-3">ملخص اختياراتك</h4>
                      <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                        <p>
                          <span className="text-muted-foreground">الخدمة:</span>{" "}
                          {selectedService?.name}
                        </p>
                        <p>
                          <span className="text-muted-foreground">المواد:</span>{" "}
                          {selectedMaterial?.name}
                        </p>
                        <p>
                          <span className="text-muted-foreground">التصميم:</span>{" "}
                          {selectedDesign?.name}
                        </p>
                        {selectedExtras.length > 0 && (
                          <p className="leading-relaxed">
                            <span className="text-muted-foreground">الإضافات:</span>{" "}
                            {selectedExtras
                              .map(
                                (id) => extras.find((e) => e.id === id)?.name,
                              )
                              .join("، ")}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* نموذج التواصل */}
                    {!showContactForm ? (
                      <div className="space-y-3">
                        <button
                          onClick={() => setShowContactForm(true)}
                          className="w-full py-3.5 md:py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-bold hover:shadow-lg transition-all text-sm md:text-base"
                        >
                          احصل على عرض سعر رسمي
                        </button>

                        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                          <button
                            onClick={resetCalculator}
                            className="flex-1 py-3 border border-border/50 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                          >
                            <RotateCcw className="w-4 h-4 shrink-0" />
                            حساب جديد
                          </button>

                          <button
                            onClick={() => window.print()}
                            className="flex-1 py-3 border border-border/50 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                          >
                            <Printer className="w-4 h-4 shrink-0" />
                            طباعة التفاصيل
                          </button>
                        </div>
                      </div>
                    ) : (
                      <motion.form
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-3 md:space-y-4 bg-slate-50 dark:bg-slate-800/30 p-4 md:p-6 rounded-2xl border border-border/50"
                      >
                        <h4 className="font-bold text-sm md:text-base">
                          أدخل بياناتك للحصول على العرض رسمياً عبر الواتساب
                        </h4>

                        <input
                          type="text"
                          placeholder="الاسم الكامل"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          className="w-full px-4 py-3 text-sm md:text-base bg-white dark:bg-slate-800 border border-border/50 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />

                        <input
                          type="tel"
                          placeholder="رقم الجوال"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                          className="w-full px-4 py-3 text-sm md:text-base bg-white dark:bg-slate-800 border border-border/50 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />

                        <input
                          type="email"
                          placeholder="البريد الإلكتروني (اختياري)"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 text-sm md:text-base bg-white dark:bg-slate-800 border border-border/50 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />

                        <button
                          type="submit"
                          className="w-full py-3.5 md:py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm md:text-base mt-2"
                        >
                          <MessageCircle className="w-5 h-5 shrink-0" />
                          إرسال الطلب عبر واتساب
                        </button>
                      </motion.form>
                    )}
                  </motion.div>
                )
              )}
            </AnimatePresence>

            {/* أزرار التنقل السفلية */}
            {!showResult && (
              <div className="flex justify-between items-center mt-6 md:mt-8 pt-5 md:pt-6 border-t border-border/50 gap-2">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={cn(
                    "px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-medium transition-all flex items-center gap-1.5 md:gap-2 text-sm md:text-base",
                    currentStep === 1
                      ? "text-muted-foreground cursor-not-allowed opacity-50"
                      : "text-foreground hover:bg-slate-100 dark:hover:bg-slate-800",
                  )}
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                  السابق
                </button>

                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={cn(
                    "px-5 md:px-8 py-2.5 md:py-3 rounded-xl font-bold transition-all flex items-center gap-1.5 md:gap-2 text-sm md:text-base",
                    canProceed()
                      ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-md hover:shadow-lg"
                      : "bg-slate-200 dark:bg-slate-700 text-muted-foreground cursor-not-allowed",
                  )}
                >
                  {currentStep === 6 ? "عرض التكلفة" : "التالي"}
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* رابط حاسبة متقدمة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-6 md:mt-8"
        >
          {/* <Link
            href="/cost-calculator"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors group text-sm md:text-base font-medium"
          >
            <span>هل تبحث عن خيارات أكثر دقة؟ جرب الحاسبة المتقدمة</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform shrink-0" />
          </Link> */}
        </motion.div>
      </div>
    </section>
  );
}