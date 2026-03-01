"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  Search,
  HelpCircle,
  Shield,
  PenTool,
  Wallet,
  PhoneCall,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import { SectionSeparator } from "@/components/ui/section-separator";

// تصنيفات الأسئلة (لجعل الصفحة منظمة)
const categories = [
  { id: "general", name: "عامة", icon: HelpCircle },
  { id: "technical", name: "فنية وهندسية", icon: PenTool },
  { id: "warranty", name: "الضمان والصيانة", icon: Shield },
  { id: "pricing", name: "الأسعار والدفع", icon: Wallet },
];

// بيانات الأسئلة (يمكنك زيادتها)
const allFaqs = [
  {
    category: "general",
    question: "هل تغطون جميع مناطق المملكة؟",
    answer:
      "نعم، مصنعنا الرئيسي في الرياض، ولكن لدينا فرق تركيب متنقلة تغطي كافة مناطق المملكة (جدة، الدمام، نيوم، الجنوب). للمشاريع الكبيرة، نقوم بإنشاء ورشة مؤقتة في الموقع.",
  },
  {
    category: "general",
    question: "كيف يمكنني طلب عرض سعر؟",
    answer:
      "يمكنك التواصل معنا عبر نموذج 'اتصل بنا' في الموقع، أو عبر الواتساب، أو الاتصال المباشر. يفضل تزويدنا بصور للموقع ومساحة تقريبية لنعطيك سعراً مبدئياً دقيقاً.",
  },
  {
    category: "technical",
    question: "ما الفرق بين القماش PVC و PTFE؟",
    answer:
      "الـ PVC هو الخيار الاقتصادي والعملي وعمره الافتراضي 10-15 سنة. الـ PTFE (التيفلون) هو الخيار الأقوى عالمياً، لا يتأثر بالشمس أبداً، وعمره الافتراضي يتجاوز 30 سنة، ويستخدم في الملاعب والمشاريع الكبرى.",
  },
  {
    category: "technical",
    question: "هل المظلات مقاومة للرياح القوية؟",
    answer:
      "نعم، جميع تصاميمنا تخضع لحسابات هندسية (Wind Load Analysis) وتتحمل سرعة رياح تصل إلى 140 كم/ساعة حسب المواصفات المطلوبة.",
  },
  {
    category: "warranty",
    question: "كم مدة الضمان؟",
    answer:
      "نقدم ضماناً يصل إلى 10 سنوات على أعمال القماش والشد الإنشائي، و5 سنوات على الأنظمة الميكانيكية والمحركات. الضمان شامل وموثق بعقد رسمي.",
  },
  {
    category: "pricing",
    question: "هل السعر يشمل التركيب؟",
    answer:
      "نعم، عروض أسعارنا عادة تكون 'مفتاح' (Turnkey)، تشمل التصميم، التصنيع، التوريد، والتركيب، إلا إذا طلب العميل التوريد فقط.",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // فلترة الأسئلة حسب البحث والقسم
  const filteredFaqs = allFaqs.filter((faq) => {
    const matchesCategory = faq.category === activeCategory;
    const matchesSearch =
      faq.question.includes(searchQuery) || faq.answer.includes(searchQuery);
    return searchQuery ? matchesSearch : matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      {/* رأس الصفحة */}
      <div className="bg-secondary/10 py-20 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            كيف يمكننا <span className="text-primary">مساعدتك؟</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto mb-10">
            ابحث في قاعدة المعرفة الخاصة بنا أو تصفح الأسئلة الشائعة حسب القسم.
          </p>

          {/* شريط البحث */}
          <div className="max-w-2xl mx-auto relative group">
            <input
              type="text"
              placeholder="ابحث عن سؤالك (مثلاً: ضمان، أسعار، تركيب...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-2xl py-4 pr-12 pl-4 text-lg shadow-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6 group-focus-within:text-primary transition-colors" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* القائمة الجانبية (التصنيفات) */}
          <div className="lg:col-span-3">
            <div className="sticky top-32 space-y-2">
              <h3 className="font-bold text-lg mb-4 px-4">الأقسام</h3>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSearchQuery(""); // تصفير البحث عند تغيير القسم
                    setOpenIndex(null);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-right",
                    activeCategory === cat.id && !searchQuery
                      ? "bg-primary text-white shadow-md"
                      : "bg-secondary/30 text-foreground hover:bg-secondary",
                  )}
                >
                  <cat.icon
                    className={cn(
                      "w-5 h-5",
                      activeCategory === cat.id && !searchQuery
                        ? "text-white"
                        : "text-primary",
                    )}
                  />
                  {cat.name}
                </button>
              ))}

              {/* صندوق المساعدة الجانبي */}
              <div className="mt-8 p-6 bg-secondary/20 rounded-2xl border border-border text-center">
                <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <PhoneCall className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold mb-2">لم تجد إجابتك؟</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  فريقنا الهندسي جاهز للرد على استفساراتك الخاصة.
                </p>
                <Link
                  href="/contact"
                  className="text-primary font-bold text-sm hover:underline"
                >
                  تواصل معنا مباشرة &larr;
                </Link>
              </div>
            </div>
          </div>

          {/* قائمة الأسئلة */}
          <div className="lg:col-span-9">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                {searchQuery
                  ? `نتائج البحث عن: "${searchQuery}"`
                  : categories.find((c) => c.id === activeCategory)?.name}
              </h2>
            </div>

            {filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "rounded-2xl transition-all duration-300 border",
                        isOpen
                          ? "bg-card border-primary/30 shadow-lg"
                          : "bg-white dark:bg-secondary/10 border-border hover:border-primary/20",
                      )}
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-6 text-right"
                      >
                        <h3
                          className={cn(
                            "text-lg font-bold transition-colors",
                            isOpen ? "text-primary" : "text-foreground",
                          )}
                        >
                          {faq.question}
                        </h3>
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 mr-4",
                            isOpen
                              ? "bg-primary text-white rotate-180"
                              : "bg-secondary text-foreground",
                          )}
                        >
                          {isOpen ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                          >
                            <div className="px-6 pb-6 pt-0">
                              <p className="text-muted-foreground leading-relaxed border-t border-border/50 pt-4 text-lg">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-secondary/10 rounded-3xl border border-dashed border-border">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-xl font-bold text-foreground">
                  لا توجد نتائج مطابقة
                </p>
                <p className="text-muted-foreground">
                  جرب كلمات مفتاحية أخرى أو تصفح الأقسام
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
