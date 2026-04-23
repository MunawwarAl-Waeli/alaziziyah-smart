"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY_INFO, SOCIAL_LINKS } from "@/lib/config";
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
  CarFront,
  Waves,
  Building2,
  Leaf,
  Trees,
  Tent,
  Settings,
  Shield,
  Warehouse,
  Umbrella,
  PenTool,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllServices } from "@/lib/api";
import { useMediaQuery } from "@/hooks/use-media-query";

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
    href: SOCIAL_LINKS.whatsapp,
    color: "from-emerald-500 to-emerald-600",
    description: "رد فوري خلال دقائق",
  },
  {
    id: "phone",
    label: "اتصال مباشر",
    icon: "📞",
    href: SOCIAL_LINKS.phone,
    color: "from-blue-500 to-blue-600",
    description: "خدمة عملاء 24/7",
  },
  {
    id: "quote",
    label: "عرض سعر",
    icon: "💰",
    href: "/contact",
    color: "from-amber-500 to-amber-600",
    description: "أرسل استفسارك واحصل على عرض سعر",
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

// ==================== أيقونة الخدمة ====================
// نحدد نوع الإرجاع كـ LucideIcon بدلاً من string
export const getServiceIcon = (text: string): LucideIcon => {
  const lowerText = text.toLowerCase();

  if (lowerText.includes("سيارات")) return CarFront;
  if (lowerText.includes("مسابح")) return Waves;
  if (lowerText.includes("مدارس") || lowerText.includes("محلات"))
    return Building2;
  if (
    lowerText.includes("حدائق") ||
    lowerText.includes("برجولات") ||
    lowerText.includes("جلسات")
  )
    return Leaf;
  if (lowerText.includes("خشب")) return Trees;
  if (
    lowerText.includes("قماش") ||
    lowerText.includes("بي في سي") ||
    lowerText.includes("pvc")
  )
    return Tent;
  if (lowerText.includes("متحركة")) return Settings;
  if (lowerText.includes("لكسان")) return Sparkles;
  if (lowerText.includes("سواتر")) return Shield;
  if (lowerText.includes("حديد") || lowerText.includes("ساندوتش"))
    return Warehouse;
  if (lowerText.includes("مظلات")) return Umbrella;

  // الأيقونة الافتراضية لأي خدمة غير مصنفة أعلاه
  return PenTool;
};

// ==================== جلب الخدمات ديناميكياً ====================
export async function getDynamicServicesList() {
  try {
    const services = await getAllServices();
    const servicesList = services.map((service) => ({
      id: service.id || service.slug,
      name: service.title,
      href: `/services/${service.slug}`,
      icon: getServiceIcon(service.title + " " + service.slug),
    }));
    return servicesList;
  } catch (error) {
    console.error("Error fetching services for list:", error);
    return [];
  }
}

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
  // const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  // تحميل الخدمات
  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await getDynamicServicesList();
        setServicesList(data);
      } catch (error) {
        console.error("Failed to load services:", error);
      } finally {
        setIsLoadingServices(false);
      }
    }
    fetchServices();
  }, []);

  const filteredServices = servicesList.filter((service) =>
    service.name.includes(searchTerm),
  );
  const isMobile = useMediaQuery("(max-width: 767px)");
  useEffect(() => {
    setMounted(true);
  }, []);

  // مراقبة التمرير لزر الرجوع للأعلى
  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  // محاكاة المستخدمين النشطين
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

  // تصفير غير المقروءة عند الفتح
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setMessages((prev) => prev.map((m) => ({ ...m, read: true })));
    }
  }, [isOpen]);

  const generateMessageId = () => {
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

  const handleRateChat = (rating: number) => {
    console.log("تم التقييم:", rating);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  // ==================== وضع الجوال ====================
  if (isMobile) {
    return (
      <>
        {/* زر الرجوع للأعلى (يظهر بعد التمرير) */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="fixed bottom-24 right-4 z-[100] w-10 h-10 bg-amber-600 text-white rounded-full shadow-lg flex items-center justify-center"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white dark:bg-slate-900 border-t border-border/50 shadow-lg rounded-t-2xl">
          {/* الشريط السفلي */}
          <div className="flex items-center justify-around py-2 px-3">
            <button
              onClick={() => setShowServicesMenu(!showServicesMenu)}
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-amber-600 transition-colors"
            >
              <Grid3x3 className="w-6 h-6" />
              <span className="text-[10px] font-medium">خدماتنا</span>
            </button>

            {/* زر تواصل → اتصال مباشر */}
            <button
              onClick={() => {
                setShowServicesMenu(false);
                window.location.href = SOCIAL_LINKS.phone;
              }}
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-amber-600 transition-colors"
            >
              <Phone className="w-6 h-6" />
              <span className="text-[10px] font-medium">اتصال</span>
            </button>

            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-green-600 transition-colors"
            >
              <MessageCircle className="w-6 h-6" style={{ color: "#25D366" }} />
              <span className="text-[10px] font-medium">واتساب</span>
            </a>

            <a
              href="/contact"
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-amber-600 transition-colors"
            >
              <Calculator className="w-6 h-6" />
              <span className="text-[10px] font-medium">عرض سعر</span>
            </a>
          </div>

          {/* قائمة الخدمات (Bottom Sheet) */}
          <AnimatePresence>
            {showServicesMenu && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowServicesMenu(false)}
                  className="fixed inset-0 bg-black/60 z-50"
                />
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 rounded-t-3xl shadow-xl max-h-[85vh] overflow-hidden flex flex-col"
                  dir="rtl"
                >
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3" />
                  <div className="flex justify-between items-center p-4 border-b border-border/50">
                    <h3 className="text-xl font-bold">جميع الخدمات</h3>
                    <button
                      onClick={() => setShowServicesMenu(false)}
                      className="p-2 rounded-full hover:bg-slate-100"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
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
                  <div className="flex-1 overflow-y-auto p-4 pt-2">
                    <div className="grid grid-cols-2 gap-3">
                      {filteredServices.map((service) => {
                        // 1. تحويل مرجع الأيقونة إلى مكون يمكن لـ React قراءته
                        const IconComponent = service.icon;

                        return (
                          <button
                            key={service.id}
                            onClick={() => {
                              setShowServicesMenu(false);
                              window.location.href = service.href;
                            }}
                            className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-transparent hover:border-amber-200 hover:bg-amber-50 dark:hover:bg-slate-800/80 transition-all text-center group shadow-sm"
                          >
                            {/* 2. تصميم الدائرة المحيطة بالأيقونة */}
                            <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-600 group-hover:bg-amber-100 dark:group-hover:bg-amber-500/20 group-hover:border-amber-200 transition-colors duration-300">
                              {/* 3. استدعاء الأيقونة مع إعطائها ألوان تتغير عند التمرير */}
                              <IconComponent className="w-6 h-6 text-slate-500 dark:text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
                            </div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 line-clamp-2 transition-colors">
                              {service.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {filteredServices.length === 0 && (
                      <div className="text-center py-10 text-muted-foreground flex flex-col items-center gap-3">
                        <Search className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                        <span>لا توجد خدمات مطابقة</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* نافذة الدردشة (اختياري، تظهر عند تفعيل الدردشة من مكان آخر) */}
          <AnimatePresence>
            {isOpen && showChat && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-full left-4 right-4 mb-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-border/50 overflow-hidden"
                style={{ maxHeight: "70vh" }}
              >
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
                            msg.type === "user"
                              ? "bg-slate-200"
                              : "bg-amber-500"
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
      </>
    );
  }

  // ==================== وضع سطح المكتب ====================
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
            {/* رأس الدردشة مع زر إغلاق */}
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

      {/* قائمة الإجراءات السريعة (مع زر إغلاق مضاف) */}
      <AnimatePresence>
        {isOpen && !showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-border/50 overflow-hidden mb-2"
          >
            <div className="p-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm">تواصل معنا</h4>
                <p className="text-[10px] text-amber-100">
                  اختر طريقة التواصل المناسبة
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
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
              onClick={scrollToTop}
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
