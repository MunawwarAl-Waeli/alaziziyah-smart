"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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

// ==========================================
// 1. تعريف الأنواع والبيانات
// ==========================================

interface ServiceOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
  basePrice: number; // سعر المتر المربع
  minArea: number;
  maxArea: number;
}

interface MaterialOption {
  id: string;
  name: string;
  priceFactor: number; // معامل مضاعف للسعر
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
    name: "اختر الخدمة",
    description: "حدد نوع الخدمة التي تريدها",
  },
  {
    id: 2,
    name: "حدد المساحة",
    description: "أدخل مساحة المشروع بالمتر المربع",
  },
  {
    id: 3,
    name: "اختر المواد",
    description: "اختر المواد المناسبة لمشروعك",
  },
  {
    id: 4,
    name: "اختر التصميم",
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
      event_label: "Main Floating Button",
      location: "Fixed Bottom",
    });
    window.open(
      `https://wa.me/966530989975?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <section
      className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-slate-50 dark:to-slate-950"
      dir="rtl"
    >
      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10">
        {/* رأس القسم */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Calculator className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-bold">
              حاسبة التكلفة
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            احسب تكلفة{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-primary-dark">
              مشروعك
            </span>
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            احصل على تقدير فوري لتكلفة مشروع المظلة أو الساتر أو البرجولة في
            دقائق
          </p>
        </motion.div>

        {/* شريط التقدم */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-2",
                  step.id > currentStep && !showResult && "opacity-50",
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                    step.id < currentStep || (step.id === 6 && showResult)
                      ? "bg-primary text-white"
                      : step.id === currentStep && !showResult
                        ? "bg-primary/20 text-primary border-2 border-primary"
                        : "bg-slate-200 dark:bg-slate-800 text-muted-foreground",
                  )}
                >
                  {step.id < currentStep || (step.id === 6 && showResult) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className="hidden md:inline text-sm font-medium">
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
        <div className="max-w-4xl mx-auto bg-card rounded-3xl shadow-xl border border-border/50 overflow-hidden">
          <div className="p-6 md:p-8">
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
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold">اختر نوع الخدمة</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => setSelectedService(service)}
                            className={cn(
                              "relative p-6 rounded-2xl border-2 transition-all text-right group hover:shadow-lg",
                              selectedService?.id === service.id
                                ? "border-primary bg-primary/5"
                                : "border-border/50 hover:border-primary/30",
                            )}
                          >
                            {selectedService?.id === service.id && (
                              <div className="absolute top-4 left-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                            <div className="text-4xl mb-3">{service.icon}</div>
                            <h4 className="font-bold text-lg mb-1">
                              {service.name}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {service.description}
                            </p>
                            <p className="text-xs text-primary">
                              من {service.minArea} - {service.maxArea} متر مربع
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* الخطوة 2: تحديد المساحة */}
                  {currentStep === 2 && selectedService && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold">حدد مساحة المشروع</h3>

                      <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
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

                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                          <span>{selectedService.minArea} م²</span>
                          <span>{selectedService.maxArea} م²</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Ruler className="w-4 h-4" />
                        <span>يمكنك تغيير المساحة حسب متطلباتك</span>
                      </div>
                    </div>
                  )}

                  {/* الخطوة 3: اختيار المواد */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold">اختر نوع المواد</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {materials.map((material) => (
                          <button
                            key={material.id}
                            onClick={() => setSelectedMaterial(material)}
                            className={cn(
                              "relative p-6 rounded-2xl border-2 transition-all text-right group hover:shadow-lg",
                              selectedMaterial?.id === material.id
                                ? "border-primary bg-primary/5"
                                : "border-border/50 hover:border-primary/30",
                            )}
                          >
                            {selectedMaterial?.id === material.id && (
                              <div className="absolute top-4 left-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}

                            <div className="flex items-start gap-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-bold text-lg">
                                    {material.name}
                                  </h4>
                                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                                    ضمان {material.warranty}
                                  </span>
                                </div>

                                <p className="text-sm text-muted-foreground mb-2">
                                  {material.description}
                                </p>

                                <div className="flex flex-wrap gap-1">
                                  {material.features.map((feature, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs rounded-full"
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
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold">
                        اختر التصميم المناسب
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {designs.map((design) => (
                          <button
                            key={design.id}
                            onClick={() => setSelectedDesign(design)}
                            className={cn(
                              "relative p-6 rounded-2xl border-2 transition-all text-right group hover:shadow-lg",
                              selectedDesign?.id === design.id
                                ? "border-primary bg-primary/5"
                                : "border-border/50 hover:border-primary/30",
                            )}
                          >
                            {selectedDesign?.id === design.id && (
                              <div className="absolute top-4 left-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}

                            <h4 className="font-bold text-lg mb-1">
                              {design.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {design.description}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* الخطوة 5: الإضافات */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold">
                        أضف مميزات إضافية (اختياري)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {extras.map((extra) => (
                          <button
                            key={extra.id}
                            onClick={() => toggleExtra(extra.id)}
                            className={cn(
                              "p-6 rounded-2xl border-2 transition-all text-right group hover:shadow-lg",
                              selectedExtras.includes(extra.id)
                                ? "border-primary bg-primary/5"
                                : "border-border/50 hover:border-primary/30",
                            )}
                          >
                            <div className="flex items-start justify-between">
                              <div className="text-2xl mb-2">{extra.icon}</div>
                              {selectedExtras.includes(extra.id) && (
                                <Check className="w-5 h-5 text-primary" />
                              )}
                            </div>
                            <h4 className="font-bold mb-1">{extra.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {extra.description}
                            </p>
                            <p className="text-sm text-primary font-bold">
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
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    {/* رأس النتيجة */}
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full mb-4">
                        <Check className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        تم حساب التكلفة المبدئية
                      </h3>
                      <p className="text-muted-foreground">
                        هذا تقدير مبدئي، قد تختلف التكلفة الفعلية حسب تفاصيل
                        الموقع
                      </p>
                    </div>

                    {/* بطاقة السعر النهائي */}
                    <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-8 rounded-2xl text-center">
                      <p className="text-sm text-white/80 mb-2">
                        التكلفة التقديرية
                      </p>
                      <p className="text-5xl font-bold mb-2">
                        {formatPrice(calculationResult.totalCost)}
                      </p>
                      <p className="text-sm text-white/80">
                        شامل التركيب والضمان
                      </p>
                    </div>

                    {/* تفاصيل الحساب */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6">
                      <h4 className="font-bold mb-4">تفاصيل التكلفة</h4>
                      <div className="space-y-3">
                        {calculationResult.breakdown.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-muted-foreground">
                              {item.label}
                            </span>
                            <span className="font-medium">
                              {formatPrice(item.amount)}
                            </span>
                          </div>
                        ))}
                        <div className="pt-3 mt-3 border-t border-border/50 flex justify-between font-bold">
                          <span>الإجمالي</span>
                          <span className="text-primary">
                            {formatPrice(calculationResult.totalCost)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* معلومات إضافية */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center">
                        <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">
                          مدة التنفيذ
                        </p>
                        <p className="font-bold text-sm">
                          {calculationResult.estimatedTime}
                        </p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center">
                        <Shield className="w-5 h-5 text-primary mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">الضمان</p>
                        <p className="font-bold text-sm">
                          {calculationResult.warranty}
                        </p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center">
                        <Ruler className="w-5 h-5 text-primary mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">المساحة</p>
                        <p className="font-bold text-sm">{area} م²</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center">
                        <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">الزيارة</p>
                        <p className="font-bold text-sm">مجانية</p>
                      </div>
                    </div>

                    {/* تفاصيل الاختيارات */}
                    <div className="border border-border/50 rounded-2xl p-4">
                      <h4 className="font-bold mb-3">اختياراتك</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-muted-foreground">الخدمة:</span>{" "}
                          {selectedService?.name}
                        </p>
                        <p>
                          <span className="text-muted-foreground">المواد:</span>{" "}
                          {selectedMaterial?.name}
                        </p>
                        <p>
                          <span className="text-muted-foreground">
                            التصميم:
                          </span>{" "}
                          {selectedDesign?.name}
                        </p>
                        {selectedExtras.length > 0 && (
                          <p>
                            <span className="text-muted-foreground">
                              الإضافات:
                            </span>{" "}
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
                          className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-bold hover:shadow-lg transition-all"
                        >
                          احصل على عرض سعر رسمي
                        </button>

                        <div className="flex gap-3">
                          <button
                            onClick={resetCalculator}
                            className="flex-1 py-3 border border-border/50 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                          >
                            <RotateCcw className="w-4 h-4" />
                            حساب جديد
                          </button>

                          <button
                            onClick={() => window.print()}
                            className="flex-1 py-3 border border-border/50 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                          >
                            <Printer className="w-4 h-4" />
                            طباعة
                          </button>
                        </div>
                      </div>
                    ) : (
                      <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                      >
                        <h4 className="font-bold">
                          أدخل بياناتك للحصول على عرض رسمي
                        </h4>

                        <input
                          type="text"
                          placeholder="الاسم الكامل"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-border/50 rounded-xl focus:outline-none focus:border-primary"
                        />

                        <input
                          type="tel"
                          placeholder="رقم الجوال"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-border/50 rounded-xl focus:outline-none focus:border-primary"
                        />

                        <input
                          type="email"
                          placeholder="البريد الإلكتروني"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-border/50 rounded-xl focus:outline-none focus:border-primary"
                        />

                        <button
                          type="submit"
                          className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-5 h-5" />
                          إرسال عبر واتساب
                        </button>

                        <p className="text-xs text-center text-muted-foreground">
                          سيتم إرسال تفاصيل طلبك عبر واتساب مع عرض سعر مبدئي
                        </p>
                      </motion.form>
                    )}
                  </motion.div>
                )
              )}
            </AnimatePresence>

            {/* أزرار التنقل */}
            {!showResult && (
              <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={cn(
                    "px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2",
                    currentStep === 1
                      ? "text-muted-foreground cursor-not-allowed"
                      : "text-foreground hover:bg-slate-100 dark:hover:bg-slate-800",
                  )}
                >
                  <ChevronRight className="w-5 h-5" />
                  السابق
                </button>

                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={cn(
                    "px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2",
                    canProceed()
                      ? "bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg"
                      : "bg-slate-200 dark:bg-slate-700 text-muted-foreground cursor-not-allowed",
                  )}
                >
                  {currentStep === 6 ? "عرض النتيجة" : "التالي"}
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* رابط حاسبة متقدمة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8"
        >
          <Link
            href="/cost-calculator"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors group"
          >
            <span>حاسبة متقدمة مع خيارات أكثر</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
// "use client";

// import React, { useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Umbrella,
//   Leaf,
//   Shield,
//   Plus,
//   Minus,
//   Calculator,
//   ArrowLeft,
//   CheckCircle2,
//   AlertTriangle,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// // أنواع المنتجات
// const PRODUCT_TYPES = [
//   {
//     id: "shade",
//     name: "مظلات",
//     icon: Umbrella,
//     desc: "سيارات - حدائق - قماش PVC",
//   },
//   {
//     id: "pergola",
//     name: "برجولات",
//     icon: Leaf,
//     desc: "خشبية - حديد - ألمنيوم",
//   },
//   { id: "shutter", name: "سواتر", icon: Shield, desc: "حديد - قماش - شينكو" },
// ];

// // المواد والأسعار
// const MATERIALS_MAP: Record<
//   string,
//   { id: string; name: string; price: number; desc: string }[]
// > = {
//   shade: [
//     { id: "pvc_900", name: "PVC 900g", price: 140, desc: "كوري - حماية عالية" },
//     {
//       id: "pvc_1100",
//       name: "PVC 1100g",
//       price: 160,
//       desc: "كوري - جودة فائقة",
//     },
//     {
//       id: "poly",
//       name: "بولي إيثيلين",
//       price: 120,
//       desc: "أسترالي - عزل حراري",
//     },
//   ],
//   pergola: [
//     { id: "wood", name: "خشب طبيعي", price: 650, desc: "سويدي/زان" },
//     { id: "iron", name: "حديد مودرن", price: 350, desc: "دهان ناري" },
//     { id: "alu", name: "ألمنيوم", price: 500, desc: "قص ليزر" },
//   ],
//   shutter: [
//     { id: "iron_sh", name: "حديد مجدول", price: 130, desc: "أمان عالي" },
//     { id: "pvc_sh", name: "قماش PVC", price: 110, desc: "حل اقتصادي" },
//     { id: "shinko", name: "شينكو معزول", price: 80, desc: "تكلفة مناسبة" },
//   ],
// };
// interface Material {
//   id: string;
//   name: string;
//   color?: string; // اختياري
//   price: number;
//   desc: string;
//   icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; // إذا فيه أيقونة
// }

// interface MaterialCardProps {
//   material: Material;
//   selected: boolean;
//   onClick: () => void;
// }
// // مكون بطاقة المواد المحسنة
// function MaterialCard({ material, selected, onClick }: MaterialCardProps) {
//   return (
//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       onClick={onClick}
//       className={cn(
//         "flex-shrink-0 snap-start w-44 text-right p-4 rounded-2xl border-2 transition-all duration-200 relative overflow-hidden",
//         selected
//           ? "border-primary bg-primary/5 shadow-md shadow-primary/20"
//           : "border-border/50 bg-accent/20 hover:border-primary/30 hover:bg-accent/30",
//       )}
//     >
//       {selected && (
//         <motion.div
//           layoutId="selectedMaterial"
//           className="absolute -top-1 -left-1 w-6 h-6 bg-primary rounded-br-xl flex items-center justify-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.2 }}
//         >
//           <CheckCircle2 className="w-4 h-4 text-white" />
//         </motion.div>
//       )}
//       <div className="font-bold text-foreground mb-1">{material.name}</div>
//       <div className="text-xs text-muted-foreground mb-2">{material.desc}</div>
//       <div className="text-sm font-black text-primary">
//         {material.price} ر.س{" "}
//         <span className="text-[10px] font-normal text-muted-foreground">
//           / م²
//         </span>
//       </div>
//     </motion.button>
//   );
// }

// // مكون العداد
// function Counter({
//   label,
//   value,
//   onChange,
// }: {
//   label: string;
//   value: number;
//   onChange: (v: number) => void;
// }) {
//   return (
//     <div className="flex flex-col gap-2">
//       <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
//         <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
//           {label === "الطول" ? "أ" : "ب"}
//         </span>
//         {label} (متر)
//       </span>
//       <div className="flex items-center justify-between bg-accent/50 p-1.5 rounded-2xl border border-border/50">
//         <button
//           onClick={() => onChange(Math.max(1, value - 1))}
//           className="w-10 h-10 rounded-xl bg-background shadow-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors active:scale-95"
//         >
//           <Minus className="w-5 h-5" />
//         </button>
//         <motion.span
//           key={value}
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           className="text-xl font-bold w-12 text-center"
//         >
//           {value}
//         </motion.span>
//         <button
//           onClick={() => onChange(value + 1)}
//           className="w-10 h-10 rounded-xl bg-background shadow-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors active:scale-95"
//         >
//           <Plus className="w-5 h-5" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export function SmartCalculator() {
//   const [type, setType] = useState(PRODUCT_TYPES[0].id);
//   const [material, setMaterial] = useState(
//     MATERIALS_MAP[PRODUCT_TYPES[0].id][0].id,
//   );
//   const [length, setLength] = useState(5);
//   const [width, setWidth] = useState(5);

//   const handleTypeChange = (newType: string) => {
//     setType(newType);
//     setMaterial(MATERIALS_MAP[newType][0].id);
//   };

//   const result = useMemo(() => {
//     const area = length * width;
//     const mat = MATERIALS_MAP[type]?.find((m) => m.id === material);
//     const price = mat ? mat.price : 0;
//     return { area, total: area * price, pricePerM: price };
//   }, [type, material, length, width]);

//   return (
//     <section className="py-12 bg-background relative overflow-hidden">
//       {/* عناصر خلفية جمالية */}
//       <div className="absolute top-0 right-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

//       <div className="container px-4 mx-auto max-w-2xl relative z-10">
//         {/* العنوان */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-8"
//         >
//           <span className="text-primary font-bold text-xs bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
//             تقدير فوري
//           </span>
//           <h2 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2 mb-2">
//             <Calculator className="w-6 h-6 text-primary" />
//             <span>حاسبة التكلفة المبدئية</span>
//           </h2>
//           <p className="text-sm text-muted-foreground">
//             اختر المواصفات والمقاسات لتحصل على تقدير سريع
//           </p>
//         </motion.div>

//         {/* البطاقة الرئيسية */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.1 }}
//           className="bg-card border border-border rounded-[32px] p-5 md:p-8 shadow-xl shadow-black/5 dark:shadow-white/5 backdrop-blur-sm"
//         >
//           {/* 1. اختيار النوع مع ترقيم */}
//           <div className="mb-8">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
//                 1
//               </div>
//               <h3 className="text-base font-bold">اختر نوع المنتج</h3>
//             </div>
//             <div className="flex bg-accent/50 p-1.5 rounded-2xl relative">
//               {PRODUCT_TYPES.map((t) => {
//                 const isActive = type === t.id;
//                 const Icon = t.icon;
//                 return (
//                   <button
//                     key={t.id}
//                     onClick={() => handleTypeChange(t.id)}
//                     className={cn(
//                       "flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl text-xs font-medium transition-all relative z-10",
//                       isActive
//                         ? "text-primary-foreground"
//                         : "text-muted-foreground hover:text-foreground",
//                     )}
//                   >
//                     {isActive && (
//                       <motion.div
//                         layoutId="activeTab"
//                         className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-md"
//                         transition={{
//                           type: "spring",
//                           bounce: 0.2,
//                           duration: 0.6,
//                         }}
//                       />
//                     )}
//                     <Icon className="w-5 h-5 mb-1" />
//                     <span>{t.name}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* 2. اختيار المادة مع ترقيم */}
//           <div className="mb-8">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
//                 2
//               </div>
//               <h3 className="text-base font-bold">اختر المواصفات</h3>
//             </div>
//             <div className="flex overflow-x-auto gap-3 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
//               {MATERIALS_MAP[type]?.map((m) => (
//                 <MaterialCard
//                   key={m.id}
//                   material={m}
//                   selected={material === m.id}
//                   onClick={() => setMaterial(m.id)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* 3. المقاسات مع ترقيم */}
//           <div className="mb-8">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
//                 3
//               </div>
//               <h3 className="text-base font-bold">حدد المقاسات</h3>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <Counter label="الطول" value={length} onChange={setLength} />
//               <Counter label="العرض" value={width} onChange={setWidth} />
//             </div>
//           </div>

//           {/* 4. النتيجة النهائية مع تصميم جذاب */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={result.total}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="bg-gradient-to-br from-primary to-primary/80 text-background rounded-3xl p-6 relative overflow-hidden"
//             >
//               {/* خلفية جمالية */}
//               <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/20 blur-2xl rounded-full" />
//               <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-black/10 blur-2xl rounded-full" />

//               {/* تفاصيل إضافية */}
//               <div className="flex justify-between items-start mb-3 relative z-10">
//                 <span className="text-background/80 text-xs">
//                   المساحة: {result.area} م² |{" "}
//                   {PRODUCT_TYPES.find((t) => t.id === type)?.name}
//                 </span>
//                 <span className="bg-white/20 px-2 py-1 rounded-full text-[10px]">
//                   سعر المتر: {result.pricePerM} ر.س
//                 </span>
//               </div>

//               {/* السعر الإجمالي */}
//               <div className="flex justify-between items-end relative z-10">
//                 <div>
//                   <span className="block text-background/70 text-sm mb-1">
//                     التكلفة التقديرية
//                   </span>
//                   <div className="flex items-baseline gap-1">
//                     <motion.span
//                       key={result.total}
//                       initial={{ scale: 0.5, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       transition={{ type: "spring", stiffness: 300 }}
//                       className="text-4xl font-black tracking-tighter"
//                     >
//                       {result.total.toLocaleString("ar-SA")}
//                     </motion.span>
//                     <span className="text-lg font-bold text-white/90">ر.س</span>
//                   </div>
//                 </div>
//                 <Link
//                   href="/contact"
//                   className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-black/20"
//                 >
//                   <ArrowLeft className="w-6 h-6" />
//                 </Link>
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           {/* ملاحظات وإخلاء مسؤولية */}
//           <div className="mt-4 flex items-start gap-2 bg-yellow-100/30 dark:bg-yellow-950/30 border border-yellow-500/30 text-yellow-700 dark:text-yellow-400 p-3 rounded-xl text-[10px] leading-relaxed">
//             <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
//             <p>
//               هذا تقدير مبدئي. السعر النهائي يتحدد بعد المعاينة الميدانية
//               والمقاسات الدقيقة. جميع الأسعار شاملة التوريد والتركيب.
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
