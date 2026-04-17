"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Phone,
  Mail,
  Calculator,
  ChevronUp,
  Sparkles,
  Clock,
  Users,
  Send,
  Smile,
  Paperclip,
  Mic,
  Check,
  CheckCheck,
  User,
  Bot,
  Headphones,
  Star,
  Grid3x3,
  ChevronLeft,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ==================== أنواع الرسائل ====================
interface ChatMessage {
  id: string;
  type: "user" | "bot" | "agent";
  content: string;
  timestamp: Date;
  read: boolean;
  delivered: boolean;
}

// ==================== خيارات التواصل السريع ====================
const quickActions = [
  {
    id: "whatsapp",
    label: "واتساب",
    icon: "💬",
    href: "https://wa.me/966558181955",
    color: "from-emerald-500 to-emerald-600",
    description: "رد فوري خلال دقائق",
  },
  {
    id: "phone",
    label: "اتصال مباشر",
    icon: "📞",
    href: "tel:+966530989975",
    color: "from-blue-500 to-blue-600",
    description: "خدمة عملاء 24/7",
  },
  {
    id: "quote",
    label: "عرض سعر",
    icon: "💰",
    href: "/contact", // تم التغيير من "/cost-calculator" إلى "/contact"
    color: "from-amber-500 to-amber-600",
    description: "أرسل استفسارك واحصل على عرض سعر",
  },
  {
    id: "contact",
    label: "نموذج تواصل",
    icon: "📝",
    href: "/contact",
    color: "from-purple-500 to-purple-600",
    description: "أرسل استفسارك",
  },
];

// ==================== ردود سريعة للدردشة ====================
const quickReplies = [
  { id: "1", text: "عرض سعر", icon: "💰" },
  { id: "2", text: "استفسار عن خدمة", icon: "❓" },
  { id: "3", text: "موعد معاينة", icon: "📅" },
  { id: "4", text: "اتصال", icon: "📞" },
];

// ==================== ردود البوت التلقائية ====================
const botResponses = [
  {
    keywords: ["سعر", "تكلفة", "كم", "بكم"],
    response:
      "للحصول على عرض سعر دقيق، يمكنك استخدام نموذج التواصل أو التحدث مع فريق المبيعات. هل تفضل:\n1️⃣ ملء نموذج التواصل الآن\n2️⃣ التحدث مع فريق المبيعات",
  },
  {
    keywords: ["مظلة", "سيارة", "مظلات"],
    response:
      "نقدم عدة أنواع من مظلات السيارات:\n• مظلات حديد (ضمان 15 سنة)\n• مظلات لكسان (عزل حراري)\n• مظلات متحركة\nأي نوع يهمك؟",
  },
  {
    keywords: ["برجولات", "جلسات", "حديقة"],
    response:
      "البرجولات لدينا:\n• خشبية (طبيعية)\n• حديدية (عصرية)\n• متحركة (بإضاءة LED)\nهل تريد معرفة المزيد عن نوع معين؟",
  },
  {
    keywords: ["سواتر", "خصوصية", "ساتر"],
    response:
      "السواتر المتوفرة:\n• حديد شرائح\n• خشبية\n• لكسان شفاف\n• متحركة كهربائية\nما هو الارتفاع المناسب لك؟",
  },
  {
    keywords: ["وقت", "مدة", "متى"],
    response:
      "مدة التنفيذ تعتمد على حجم المشروع:\n• مشاريع صغيرة: 3-5 أيام\n• متوسطة: 7-10 أيام\n• كبيرة: 2-4 أسابيع\nنلتزم بالموعد المتفق عليه.",
  },
  {
    keywords: ["ضمان", "ضمانك"],
    response:
      "نقدم ضمانات ممتازة:\n• هياكل حديدية: 15 سنة\n• لكسان: 10 سنوات\n• برجولات خشبية: 8 سنوات\n• ضد عيوب التصنيع: 5 سنوات",
  },
];

// ==================== قائمة الخدمات الكاملة ====================
// ... باقي الـ imports كما هي ...

// ==================== قائمة الخدمات المستخرجة من JSON الحقيقي ====================
// تم استخراجها من البيانات المقدمة وتصفية الصفحات غير الخدمية
const rawServicesPages = [
  { slug: "مظلات-منازل", uri: "/مظلات-منازل/" },
  { slug: "سواتر-شرائح-حديد", uri: "/سواتر-شرائح-حديد/" },
  { slug: "سواتر-لكسان", uri: "/سواتر-لكسان/" },
  { slug: "مظلات-محلات", uri: "/مظلات-محلات/" },
  { slug: "مظلات-قرميد", uri: "/مظلات-قرميد/" },
  { slug: "مظلات-مسابح", uri: "/مظلات-مسابح/" },
  { slug: "مظلات-مدارس", uri: "/مظلات-مدارس/" },
  { slug: "سواتر-خشبية", uri: "/سواتر-خشبية/" },
  { slug: "مظلات-الشد-الانشائي", uri: "/مظلات-الشد-الانشائي/" },
  { slug: "برجولات-حدائق", uri: "/برجولات-حدائق/" },
  { slug: "مظلات-بي-في-سي", uri: "/مظلات-بي-في-سي/" },
  { slug: "مظلات-قماش", uri: "/مظلات-قماش/" },
  { slug: "مظلات-سيارات-حديد", uri: "/مظلات-سيارات-حديد/" },
  { slug: "مظلات-برجولات", uri: "/مظلات-برجولات/" },
  { slug: "مظلات-خارجية-للمنازل", uri: "/مظلات-خارجية-للمنازل/" },
  { slug: "مظلات-حدائق-منزلية", uri: "/مظلات-حدائق-منزلية/" },
  { slug: "قماش-مظلات", uri: "/قماش-مظلات/" },
  { slug: "مظلات-لكسان", uri: "/مظلات-لكسان/" },
  { slug: "سواتر-حديد", uri: "/سواتر-حديد/" },
  { slug: "برجولات-حديد", uri: "/برجولات-حديد/" },
  { slug: "مظلات-حديد", uri: "/مظلات-حديد/" },
  { slug: "مظلات-خشبية", uri: "/مظلات-خشبية/" },
  { slug: "مظلات-جلسات", uri: "/مظلات-جلسات/" },
  { slug: "سواتر-قماش", uri: "/سواتر-قماش/" },
  { slug: "مظلات-سيارات-متحركة", uri: "/مظلات-سيارات-متحركة/" },
  { slug: "مظلات-متحركة", uri: "/مظلات-متحركة/" },
  { slug: "مظلات-حدائق", uri: "/مظلات-حدائق/" },
  { slug: "مظلات-سيارات", uri: "/مظلات-سيارات/" },
  { slug: "تركيب-مظلات-جدة", uri: "/تركيب-مظلات-جدة/" },
  { slug: "تركيب-مظلات-الأحساء", uri: "/تركيب-مظلات-الأحساء/" },
  { slug: "تركيب-سواتر-حديد", uri: "/تركيب-سواتر-حديد/" },
  { slug: "تركيب-سندوش-بنل", uri: "/تركيب-سندوش-بنل/" },
  { slug: "تركيب-مظلات-خارجية", uri: "/تركيب-مظلات-خارجية/" },
  { slug: "تركيب-مظلات-متحركة", uri: "/تركيب-مظلات-متحركة/" },
  { slug: "تركيب-سواتر-ابواب", uri: "/تركيب-سواتر-ابواب/" },
  { slug: "تركيب-جلسات-خارجية", uri: "/تركيب-جلسات-خارجية/" },
  { slug: "تركيب-قماش-مظلات-2", uri: "/تركيب-قماش-مظلات-2/" },
  { slug: "تركيب-مظلات-حدائق", uri: "/تركيب-مظلات-حدائق/" },
  { slug: "تفصيل-مظلة-للسيارة", uri: "/تفصيل-مظلة-للسيارة/" },
  { slug: "تركيب-مظلات-مدارس", uri: "/تركيب-مظلات-مدارس/" },
  { slug: "تركيب-قماش-مظلات", uri: "/تركيب-قماش-مظلات/" },
  { slug: "تركيب-برجولات", uri: "/تركيب-برجولات/" },
  { slug: "تركيب-لكسان", uri: "/تركيب-لكسان/" },
  { slug: "تركيب-مظلات-سيارات", uri: "/تركيب-مظلات-سيارات/" },
  { slug: "تركيب-مظلات-وسواتر", uri: "/تركيب-مظلات-وسواتر/" },
  { slug: "تركيب-سواتر", uri: "/تركيب-سواتر/" },
  { slug: "تركيب-مظلات", uri: "/تركيب-مظلات/" },
  { slug: "تركيب-مظلات-الدمام", uri: "/تركيب-مظلات-الدمام/" },
  { slug: "شركة-عمل-سواتر-ومظلات", uri: "/شركة-عمل-سواتر-ومظلات/" },
  { slug: "شركة-تركيب-السواتر-والمظلات", uri: "/شركة-تركيب-السواتر-والمظلات/" },
];

// دالة مساعدة لتحويل slug إلى عنوان مقروء
const formatServiceName = (slug: string): string => {
  return slug
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace(/Ipc/g, "IPC"); // معالجة حالات خاصة
};

// دالة لإرجاع أيقونة مناسبة لكل خدمة بناءً على الكلمات المفتاحية
const getServiceIcon = (slug: string): string => {
  if (slug.includes("مظلات")) return "🏗️";
  if (slug.includes("سواتر")) return "🔩";
  if (slug.includes("برجولات")) return "🌿";
  if (slug.includes("تركيب")) return "🛠️";
  if (slug.includes("جلسات")) return "🪑";
  if (slug.includes("خشبية")) return "🪵";
  if (slug.includes("لكسان")) return "✨";
  if (slug.includes("قماش")) return "🧵";
  if (slug.includes("حديد")) return "🔗";
  if (slug.includes("متحركة")) return "⚙️";
  if (slug.includes("سيارات")) return "🚗";
  if (slug.includes("مسابح")) return "🏊";
  if (slug.includes("مدارس")) return "🏫";
  if (slug.includes("حدائق")) return "🌳";
  return "📐";
};

// بناء قائمة الخدمات النهائية
const servicesList = rawServicesPages.map((page) => ({
  id: page.slug,
  name: formatServiceName(page.slug),
  href: page.uri,
  icon: getServiceIcon(page.slug),
}));

export function FloatingChat() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      type: "bot",
      content: "👋 مرحباً بك في العزيزية للمظلات!\nكيف يمكنني مساعدتك اليوم؟",
      timestamp: new Date(),
      read: true,
      delivered: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [showEmoji, setShowEmoji] = useState(false);
  const [agentOnline, setAgentOnline] = useState(true);
  const [waitTime, setWaitTime] = useState(2);
  const [activeUsers, setActiveUsers] = useState(5);
  const [unreadCount, setUnreadCount] = useState(1);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // تصفية الخدمات بناءً على البحث
  const filteredServices = servicesList.filter((service) =>
    service.name.includes(searchTerm),
  );
  // ==================== تحجيم الشاشة ====================
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // تتبع التمرير لإظهار الشات (اختياري)
  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => {
      if (window.scrollY > 500 && !hasScrolled) {
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled, mounted]);

  // محاكاة عدد المستخدمين النشطين
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setActiveUsers((prev) => {
        const change = Math.floor(Math.random() * 3) - 1;
        return Math.max(3, Math.min(8, prev + change));
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [mounted]);

  // محاكاة وقت الانتظار
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setWaitTime((prev) => {
        const change = Math.floor(Math.random() * 2) - 1;
        return Math.max(1, Math.min(5, prev + change));
      });
    }, 15000);
    return () => clearInterval(interval);
  }, [mounted]);

  // التمرير لآخر رسالة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // تقليل عدد الرسائل غير المقروءة عند فتح الشات
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setMessages((prev) => prev.map((m) => ({ ...m, read: true })));
    }
  }, [isOpen]);

  const generateMessageId = () => {
    // eslint-disable-next-line react-hooks/purity
    return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: generateMessageId(),
      type: "user",
      content: input,
      timestamp: new Date(),
      read: true,
      delivered: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setShowQuickReplies(false);
    setIsTyping(true);

    setTimeout(() => {
      let botResponse =
        "شكراً لتواصلك. سأقوم بتحويلك إلى أحد ممثلي خدمة العملاء للمساعدة بشكل أفضل.";
      const lowerInput = input.toLowerCase();
      for (const item of botResponses) {
        if (item.keywords.some((keyword) => lowerInput.includes(keyword))) {
          botResponse = item.response;
          break;
        }
      }
      const botMessage: ChatMessage = {
        id: generateMessageId(),
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
        read: true,
        delivered: true,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (text: string) => {
    setInput(text);
    setTimeout(() => handleSend(), 100);
  };

  const handleServiceClick = (href: string) => {
    setShowServicesMenu(false);
    // eslint-disable-next-line react-hooks/immutability
    window.location.href = href;
  };

  const handleRateChat = (rating: number) => {
    console.log("تم التقييم:", rating);
  };

  if (!mounted) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-500 text-white shadow-amber-500/30 flex items-center justify-center">
          <MessageCircle className="w-6 h-6" />
        </div>
      </div>
    );
  }

  // ==================== وضع الجوال (شريط سفلي + قائمة خدمات منسدلة) ====================
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white dark:bg-slate-900 border-t border-border/50 shadow-lg rounded-t-2xl">
        {/* الشريط السفلي */}
        <div className="flex items-center justify-around py-2 px-3">
          {/* زر خدماتنا */}
          <button
            onClick={() => setShowServicesMenu(!showServicesMenu)}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-amber-600 transition-colors"
          >
            <Grid3x3 className="w-6 h-6" />
            <span className="text-[10px] font-medium">خدماتنا</span>
          </button>

          {/* زر تواصل (يفتح قائمة التواصل السريع) */}
          <button
            onClick={() => {
              setShowServicesMenu(false);
              setIsOpen(true);
              setShowChat(false);
            }}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-amber-600 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-[10px] font-medium">تواصل</span>
          </button>

          {/* زر واتساب مباشر */}
          <a
            href="https://wa.me/966 5309 89 975"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-green-600 transition-colors"
          >
            <MessageCircle className="w-6 h-6" style={{ color: "#25D366" }} />
            <span className="text-[10px] font-medium">واتساب</span>
          </a>

          {/* زر عرض سعر - تم تغيير الرابط إلى /contact */}
          <a
            href="/contact"
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-amber-600 transition-colors"
          >
            <Calculator className="w-6 h-6" />
            <span className="text-[10px] font-medium">عرض سعر</span>
          </a>
        </div>

        {/* نافذة الخدمات المحسنة (Bottom Sheet مع Grid) */}
        <AnimatePresence>
          {showServicesMenu && (
            <>
              {/* خلفية مظلمة */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowServicesMenu(false)}
                className="fixed inset-0 bg-black/60 z-50"
              />
              {/* اللوح المنزلق من الأسفل */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 rounded-t-3xl shadow-xl max-h-[85vh] overflow-hidden flex flex-col"
                dir="rtl"
              >
                {/* مقبض السحب */}
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3" />

                {/* رأس القائمة */}
                <div className="flex justify-between items-center p-4 border-b border-border/50">
                  <h3 className="text-xl font-bold">جميع الخدمات</h3>
                  <button
                    onClick={() => setShowServicesMenu(false)}
                    className="p-2 rounded-full hover:bg-slate-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* حقل البحث */}
                <div className="p-4 pb-2">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="ابحث عن خدمة..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-3 pr-10 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* شبكة الخدمات (عمودين) */}
                <div className="flex-1 overflow-y-auto p-4 pt-2">
                  <div className="grid grid-cols-2 gap-3">
                    {filteredServices.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => {
                          setShowServicesMenu(false);
                          window.location.href = service.href;
                        }}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-amber-50 transition-all text-center group"
                      >
                        <span className="text-3xl">{service.icon}</span>
                        <span className="text-sm font-medium group-hover:text-amber-600 line-clamp-2">
                          {service.name}
                        </span>
                      </button>
                    ))}
                  </div>
                  {filteredServices.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      لا توجد خدمات مطابقة
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* نافذة قائمة التواصل (تواصل) */}
        <AnimatePresence>
          {isOpen && !showChat && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-full left-4 right-4 mb-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-border/50 overflow-hidden"
            >
              <div className="p-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white">
                <h4 className="font-bold text-sm">تواصل معنا</h4>
                <p className="text-[10px] text-amber-100">
                  اختر طريقة التواصل المناسبة
                </p>
              </div>
              <div className="p-2">
                {quickActions.map((action) => (
                  <a
                    key={action.id}
                    href={action.href}
                    target={action.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white text-lg`}
                    >
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-xs group-hover:text-amber-600 transition-colors">
                        {action.label}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* نافذة الدردشة الكاملة */}
        <AnimatePresence>
          {isOpen && showChat && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-full left-4 right-4 mb-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-border/50 overflow-hidden"
              style={{ maxHeight: "70vh" }}
            >
              {/* رأس الدردشة */}
              <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Headphones className="w-5 h-5" />
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">دعم العزيزية</h3>
                      <div className="flex gap-2 text-[10px] text-amber-100">
                        <span>
                          <Users className="w-3 h-3 inline ml-1" />{" "}
                          {activeUsers} متصل
                        </span>
                        <span>
                          <Clock className="w-3 h-3 inline ml-1" /> رد خلال{" "}
                          {waitTime} د
                        </span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setShowChat(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* منطقة الرسائل */}
              <div className="h-80 overflow-y-auto p-3 space-y-3 bg-slate-50 dark:bg-slate-900/50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === "user" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`flex gap-2 max-w-[85%] ${
                        msg.type === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                          msg.type === "user" ? "bg-slate-200" : "bg-amber-500"
                        }`}
                      >
                        {msg.type === "user" ? (
                          <User className="w-4 h-4 text-slate-600" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <div
                          className={`p-2 rounded-xl text-sm ${
                            msg.type === "user"
                              ? "bg-slate-200 dark:bg-slate-700 rounded-tr-none"
                              : "bg-amber-500 text-white rounded-tl-none"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1">
                          {msg.timestamp.toLocaleTimeString("ar-SA", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-end">
                    <div className="bg-amber-100 dark:bg-amber-950/30 p-2 rounded-xl flex gap-1">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce delay-100" />
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* حقل الإدخال */}
              <div className="p-2 border-t border-border/50">
                <div className="flex gap-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="اكتب رسالتك..."
                    className="flex-1 p-2 text-sm bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    onClick={handleSend}
                    className="p-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ==================== وضع سطح المكتب (كما كان سابقاً) ====================
  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3"
      dir="rtl"
    >
      {/* نافذة الدردشة */}
      <AnimatePresence>
        {isOpen && showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[380px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-border/50 overflow-hidden mb-2 flex flex-col"
            style={{ maxHeight: "80vh" }}
          >
            {/* رأس الشات */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white p-4 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                      <Headphones className="w-6 h-6" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold">دعم العزيزية</h3>
                    <div className="flex items-center gap-2 text-xs text-amber-100">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {activeUsers} متصل
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> رد خلال {waitTime} د
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowChat(false)}
                  className="p-1 hover:bg-white/10 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* منطقة الرسائل */}
            <div className="flex-1 h-96 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`flex gap-2 max-w-[85%] ${
                      message.type === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        message.type === "user"
                          ? "bg-slate-200"
                          : "bg-amber-500"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="w-4 h-4 text-slate-600" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div>
                      <div
                        className={`p-3 rounded-2xl text-sm ${
                          message.type === "user"
                            ? "bg-slate-200 dark:bg-slate-700 rounded-tr-none"
                            : "bg-amber-500 text-white rounded-tl-none"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <div
                        className={`flex items-center gap-1 mt-1 text-[10px] text-muted-foreground ${
                          message.type === "user"
                            ? "justify-start"
                            : "justify-end"
                        }`}
                      >
                        <span>
                          {message.timestamp.toLocaleTimeString("ar-SA", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {message.type === "user" && (
                          <span>
                            {message.read ? (
                              <CheckCheck className="w-3 h-3 text-blue-500" />
                            ) : (
                              <Check className="w-3 h-3" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-end">
                  <div className="bg-amber-100 dark:bg-amber-950/30 p-3 rounded-2xl flex gap-1">
                    <motion.span
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                      className="w-1.5 h-1.5 bg-amber-600 rounded-full"
                    />
                    <motion.span
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        delay: 0.2,
                      }}
                      className="w-1.5 h-1.5 bg-amber-600 rounded-full"
                    />
                    <motion.span
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        delay: 0.4,
                      }}
                      className="w-1.5 h-1.5 bg-amber-600 rounded-full"
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ردود سريعة */}
            {showQuickReplies && (
              <div className="p-3 bg-white dark:bg-slate-900 border-t border-border/50 overflow-x-auto no-scrollbar">
                <div className="flex gap-2 min-w-max">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply.id}
                      onClick={() => handleQuickReply(reply.text)}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-xs whitespace-nowrap hover:bg-amber-500 hover:text-white transition-colors"
                    >
                      <span className="ml-1">{reply.icon}</span>
                      {reply.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* حقل الإدخال */}
            <div className="p-3 border-t border-border/50 bg-white dark:bg-slate-900 shrink-0">
              <div className="flex items-center gap-2">
                <button className="p-1.5 text-muted-foreground hover:text-amber-600">
                  <Smile className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="اكتب رسالتك..."
                  className="flex-1 px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                {input.trim() ? (
                  <button
                    onClick={handleSend}
                    className="p-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                ) : (
                  <button className="p-2 text-muted-foreground hover:text-amber-600">
                    <Mic className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>هل الدردشة مفيدة؟</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRateChat(star)}
                      className="hover:text-amber-500"
                    >
                      <Star className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* قائمة الإجراءات السريعة */}
      <AnimatePresence>
        {isOpen && !showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-border/50 overflow-hidden mb-2"
          >
            <div className="p-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white">
              <h4 className="font-bold text-sm">تواصل معنا</h4>
              <p className="text-[10px] text-amber-100">
                اختر طريقة التواصل المناسبة
              </p>
            </div>
            <div className="p-2">
              {quickActions.map((action) => (
                <a
                  key={action.id}
                  href={action.href}
                  target={action.href.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                >
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white text-lg`}
                  >
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-xs group-hover:text-amber-600 transition-colors">
                      {action.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* الزر الرئيسي والأزرار الجانبية */}
      <div className="flex flex-row-reverse items-center gap-3">
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) setShowChat(false);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300",
            isOpen
              ? "bg-slate-900 text-white rotate-90"
              : "bg-gradient-to-br from-amber-600 to-amber-500 text-white",
          )}
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <MessageCircle className="w-7 h-7" />
          )}
          {!isOpen && unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white">
              {unreadCount}
            </span>
          )}
          {!isOpen && agentOnline && (
            <span className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          )}
        </motion.button>

        {isOpen && (
          <div className="flex flex-col gap-2">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setShowChat(true)}
              className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shadow-lg hover:bg-amber-200"
            >
              <MessageCircle className="w-5 h-5" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center shadow-lg hover:bg-slate-200"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
