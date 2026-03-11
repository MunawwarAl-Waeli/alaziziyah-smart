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
  ThumbsUp,
} from "lucide-react";
// import { useAnalytics } from "@/hooks/useAnalytics";
import { cn } from "@/lib/utils";

// أنواع الرسائل
interface ChatMessage {
  id: string;
  type: "user" | "bot" | "agent";
  content: string;
  timestamp: Date;
  read: boolean;
  delivered: boolean;
}

// خيارات التواصل السريع
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
    href: "tel:+966558181955",
    color: "from-blue-500 to-blue-600",
    description: "خدمة عملاء 24/7",
  },
  {
    id: "quote",
    label: "عرض سعر",
    icon: "💰",
    href: "/cost-calculator",
    color: "from-amber-500 to-amber-600",
    description: "احسب تكلفة مشروعك",
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

// ردود سريعة
const quickReplies = [
  { id: "1", text: "عرض سعر", icon: "💰" },
  { id: "2", text: "استفسار عن خدمة", icon: "❓" },
  { id: "3", text: "موعد معاينة", icon: "📅" },
  { id: "4", text: "اتصال", icon: "📞" },
];

// رسائل البوت التلقائية
const botResponses = [
  {
    keywords: ["سعر", "تكلفة", "كم", "بكم"],
    response:
      "للحصول على عرض سعر دقيق، يمكنك استخدام حاسبة التكلفة أو التواصل مع فريق المبيعات. هل تفضل:\n1️⃣ استخدام الحاسبة الآن\n2️⃣ التحدث مع فريق المبيعات",
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

  const messagesEndRef = useRef<HTMLDivElement>(null);
  //   const { trackEvent, trackConversion } = useAnalytics();

  useEffect(() => {
    setMounted(true);
  }, []);

  // تتبع التمرير لإظهار الشات
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

  // محاكاة عدد المستخدمين النشطين - باستخدام قيم ثابتة
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
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // إضافة رسالة المستخدم
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

    // محاكاة رد البوت
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

  const handleActionClick = (action: (typeof quickActions)[0]) => {
    // tracking code here
  };

  const handleRateChat = (rating: number) => {
    // tracking code here
  };

  if (!mounted) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-500 text-white shadow-amber-500/30 flex items-center justify-center">
          <MessageCircle className="w-7 h-7" />
        </div>
      </div>
    );
  }
  return (
    <div className="fixed bottom-6 right-6 z-50" dir="rtl">
      {/* القائمة المنبثقة للشات */}
      <AnimatePresence>
        {isOpen && showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[380px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-border/50 overflow-hidden mb-4"
          >
            {/* رأس الشات */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                      <Headphones className="w-6 h-6" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold">دعم العزيزية</h3>
                    <div className="flex items-center gap-2 text-xs text-amber-100">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {activeUsers} متصل
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        رد خلال {waitTime} د
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowChat(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* منطقة الرسائل */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`flex gap-2 max-w-[85%] ${message.type === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        message.type === "user"
                          ? "bg-slate-200 dark:bg-slate-700"
                          : message.type === "bot"
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div>
                      <div
                        className={`p-3 rounded-2xl ${
                          message.type === "user"
                            ? "bg-slate-200 dark:bg-slate-700 rounded-tr-none"
                            : "bg-amber-500 text-white rounded-tl-none"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                      <div
                        className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
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
                            ) : message.delivered ? (
                              <Check className="w-3 h-3" />
                            ) : null}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-end">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-amber-100 dark:bg-amber-950/30 p-3 rounded-2xl rounded-tl-none">
                      <div className="flex gap-1">
                        <motion.span
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: 0,
                          }}
                          className="w-2 h-2 bg-amber-600 rounded-full"
                        />
                        <motion.span
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                          className="w-2 h-2 bg-amber-600 rounded-full"
                        />
                        <motion.span
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: 0.4,
                          }}
                          className="w-2 h-2 bg-amber-600 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ردود سريعة */}
            {showQuickReplies && (
              <div className="p-3 bg-white dark:bg-slate-900 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-2">
                  ردود سريعة:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply.id}
                      onClick={() => handleQuickReply(reply.text)}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-sm hover:bg-amber-500 hover:text-white transition-colors"
                    >
                      <span className="ml-1">{reply.icon}</span>
                      {reply.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* حقل الإدخال */}
            <div className="p-3 border-t border-border/50 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowEmoji(!showEmoji)}
                  className="p-2 text-muted-foreground hover:text-amber-600 transition-colors"
                >
                  <Smile className="w-5 h-5" />
                </button>
                <button className="p-2 text-muted-foreground hover:text-amber-600 transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="اكتب رسالتك هنا..."
                  className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                {input.trim() ? (
                  <button
                    onClick={handleSend}
                    className="p-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                ) : (
                  <button className="p-2 text-muted-foreground hover:text-amber-600 transition-colors">
                    <Mic className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* تقييم سريع */}
            <div className="p-2 bg-slate-50 dark:bg-slate-900/50 border-t border-border/50 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                هل كانت المحادثة مفيدة؟
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRateChat(star)}
                    className="hover:text-amber-500 transition-colors"
                  >
                    <Star className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* القائمة المنبثقة للإجراءات السريعة */}
      <AnimatePresence>
        {isOpen && !showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 right-0 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-border/50 overflow-hidden mb-4"
          >
            <div className="p-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white">
              <h4 className="font-bold text-sm">تواصل معنا</h4>
              <p className="text-xs text-amber-100">
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
                  onClick={() => handleActionClick(action)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white`}
                  >
                    <span className="text-lg">{action.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm group-hover:text-amber-600 transition-colors">
                      {action.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* الزر الرئيسي العائم */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setShowChat(false);
            // trackEvent("Floating Chat", "Opened");
          }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={
          !isOpen && hasScrolled
            ? {
                y: [0, -8, 0],
                boxShadow: [
                  "0 20px 25px -5px rgba(245,158,11,0.1), 0 8px 10px -6px rgba(245,158,11,0.1)",
                  "0 25px 30px -5px rgba(245,158,11,0.2), 0 10px 15px -6px rgba(245,158,11,0.2)",
                  "0 20px 25px -5px rgba(245,158,11,0.1), 0 8px 10px -6px rgba(245,158,11,0.1)",
                ],
              }
            : {}
        }
        transition={
          !isOpen && hasScrolled
            ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
            : {}
        }
        className={cn(
          "relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300",
          isOpen
            ? "bg-slate-900 text-white rotate-90"
            : "bg-gradient-to-br from-amber-600 to-amber-500 text-white shadow-amber-500/30 hover:shadow-amber-500/50",
        )}
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <MessageCircle className="w-7 h-7" />
        )}

        {/* مؤشر عدد الرسائل غير المقروءة */}
        {!isOpen && unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 min-w-[24px] h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5 border-2 border-white"
          >
            {unreadCount}
          </motion.span>
        )}

        {/* مؤشر تواجد الدعم الفني */}
        {!isOpen && agentOnline && (
          <span className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </motion.button>

      {/* خيارات إضافية (تظهر عند فتح الشات) */}
      {isOpen && (
        <div className="absolute bottom-20 left-0 flex flex-col gap-2">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => {
              setShowChat(true);
              //   trackEvent("Floating Chat", "Start Chat");
            }}
            className="w-10 h-10 bg-amber-100 dark:bg-amber-950/30 rounded-xl flex items-center justify-center text-amber-600 hover:bg-amber-200 transition-colors shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 hover:bg-amber-500 hover:text-white transition-colors shadow-lg"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   MessageCircle,
//   Phone,
//   X,
//   Calculator,
//   Mail,
//   Sun,
//   Umbrella,
//   Home,
//   School,
//   Shield,
//   Menu,
//   ArrowUp,
//   Clock,
//   MapPin,
// } from "lucide-react";
// import Link from "next/link";
// import { cn } from "@/lib/utils";

// // خدمات الشركة الرئيسية
// const mainServices = [
//   {
//     id: "carports",
//     label: "مظلات سيارات",
//     icon: <Umbrella className="w-5 h-5" />,
//     href: "/mazallat-sayarat",
//     color: "from-amber-600 to-orange-600",
//     description: "مظلات سيارات حديد - لكسان",
//   },
//   {
//     id: "pergolas",
//     label: "برجولات",
//     icon: <Home className="w-5 h-5" />,
//     href: "/barjolat",
//     color: "from-emerald-600 to-teal-600",
//     description: "برجولات حديد - خشبية - حدائق",
//   },
//   {
//     id: "fences",
//     label: "سواتر",
//     icon: <Shield className="w-5 h-5" />,
//     href: "/sawater",
//     color: "from-blue-600 to-indigo-600",
//     description: "سواتر حديد - خشبية - شرائح",
//   },
//   {
//     id: "schools",
//     label: "مظلات مدارس",
//     icon: <School className="w-5 h-5" />,
//     href: "/mazallat-madaris",
//     color: "from-purple-600 to-pink-600",
//     description: "مظلات مدارس - ساحات - ممرات",
//   },
// ];

// // طرق التواصل
// const contactOptions = [
//   {
//     id: "whatsapp",
//     label: "واتساب",
//     value: "+966 5581 819 55",
//     icon: (
//       <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
//         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
//       </svg>
//     ),
//     href: "https://wa.me/966558181955",
//     bgColor: "bg-emerald-600",
//   },
//   {
//     id: "phone1",
//     label: "اتصال 1",
//     value: "+966 5309 89 975",
//     icon: <Phone className="w-5 h-5" />,
//     href: "tel:+966530989975",
//     bgColor: "bg-blue-600",
//   },
//   {
//     id: "phone2",
//     label: "اتصال 2",
//     value: "+966 5581 819 55",
//     icon: <Phone className="w-5 h-5" />,
//     href: "tel:+966558181955",
//     bgColor: "bg-blue-600",
//   },
//   {
//     id: "email",
//     label: "البريد الإلكتروني",
//     value: "info@al-azizia.com",
//     icon: <Mail className="w-5 h-5" />,
//     href: "mailto:info@al-azizia.com",
//     bgColor: "bg-purple-600",
//   },
// ];

// // المدن التي تعملون بها
// const cities = [
//   { name: "الدمام", path: "/mazallat-al-dammam" },
//   { name: "جدة", path: "/mazallat-jeddah" },
//   { name: "الاحساء", path: "/mazallat-al-ahsa" },
// ];

// export function FloatingChat() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState<"services" | "contact" | "cities">(
//     "services",
//   );
//   const [showScrollTop, setShowScrollTop] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollTop(window.scrollY > 400);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div
//       className="fixed bottom-4 md:bottom-6 left-4 md:left-6 z-[90] flex flex-col items-start gap-3"
//       dir="rtl"
//     >
//       {/* القائمة الرئيسية */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, x: -20 }}
//             animate={{ opacity: 1, y: 0, x: 0 }}
//             exit={{ opacity: 0, y: 20, x: -20 }}
//             transition={{ duration: 0.2 }}
//             className="mb-2 w-[320px] md:w-[360px]"
//           >
//             <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-amber-200/50 dark:border-amber-800/30 overflow-hidden">
//               {/* الهيدر مع شعار الشركة */}
//               <div className="bg-gradient-to-l from-amber-600 to-orange-600 p-4 text-white">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
//                     <Sun className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-lg">العزيزية للمظلات</h3>
//                     <p className="text-xs text-amber-100">
//                       تركيب مظلات وسواتر بكافة أنواعها
//                     </p>
//                   </div>
//                 </div>

//                 {/* تبويبات التنقل */}
//                 <div className="flex gap-2 mt-3">
//                   {[
//                     {
//                       id: "services",
//                       label: "خدماتنا",
//                       icon: <Umbrella className="w-4 h-4" />,
//                     },
//                     {
//                       id: "contact",
//                       label: "تواصل",
//                       icon: <Phone className="w-4 h-4" />,
//                     },
//                     {
//                       id: "cities",
//                       label: "مدن",
//                       icon: <MapPin className="w-4 h-4" />,
//                     },
//                   ].map((tab) => (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveTab(tab.id as typeof activeTab)}
//                       className={cn(
//                         "flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-xs font-medium transition-all",
//                         activeTab === tab.id
//                           ? "bg-white/20 text-white"
//                           : "bg-white/5 text-amber-100 hover:bg-white/10",
//                       )}
//                     >
//                       {tab.icon}
//                       {tab.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* المحتوى حسب التبويب المختار */}
//               <div className="p-3 max-h-[400px] overflow-y-auto">
//                 <AnimatePresence mode="wait">
//                   {/* تبويب الخدمات */}
//                   {activeTab === "services" && (
//                     <motion.div
//                       key="services"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 20 }}
//                       className="space-y-2"
//                     >
//                       <p className="text-xs text-amber-600 dark:text-amber-400 mb-2 font-bold">
//                         تصفح خدماتنا:
//                       </p>
//                       {mainServices.map((service) => (
//                         <Link
//                           key={service.id}
//                           href={service.href}
//                           onClick={() => setIsOpen(false)}
//                           className="flex items-center gap-3 p-2 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all group"
//                         >
//                           <div
//                             className={cn(
//                               "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-white shadow-lg",
//                               service.color,
//                             )}
//                           >
//                             {service.icon}
//                           </div>
//                           <div className="flex-1">
//                             <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
//                               {service.label}
//                             </p>
//                             <p className="text-xs text-slate-500 dark:text-slate-400">
//                               {service.description}
//                             </p>
//                           </div>
//                           <ArrowUp className="w-4 h-4 rotate-45 text-slate-400 group-hover:text-amber-600 transition-colors" />
//                         </Link>
//                       ))}

//                       {/* رابط عرض جميع الخدمات */}
//                       <Link
//                         href="/services"
//                         className="block text-center mt-3 p-2 text-xs text-amber-600 hover:text-amber-700 dark:text-amber-400 font-bold border-t border-amber-100 dark:border-amber-800/30 pt-3"
//                       >
//                         عرض جميع خدماتنا →
//                       </Link>
//                     </motion.div>
//                   )}

//                   {/* تبويب التواصل */}
//                   {activeTab === "contact" && (
//                     <motion.div
//                       key="contact"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 20 }}
//                       className="space-y-2"
//                     >
//                       <p className="text-xs text-amber-600 dark:text-amber-400 mb-2 font-bold">
//                         تواصل معنا مباشرة:
//                       </p>
//                       {contactOptions.map((option) => (
//                         <a
//                           key={option.id}
//                           href={option.href}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center gap-3 p-2 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all group"
//                         >
//                           <div
//                             className={cn(
//                               "w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg",
//                               option.bgColor,
//                             )}
//                           >
//                             {option.icon}
//                           </div>
//                           <div className="flex-1">
//                             <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
//                               {option.label}
//                             </p>
//                             <p className="text-xs text-slate-500 dark:text-slate-400">
//                               {option.value}
//                             </p>
//                           </div>
//                           <Clock className="w-4 h-4 text-slate-400" />
//                         </a>
//                       ))}
//                     </motion.div>
//                   )}

//                   {/* تبويب المدن */}
//                   {activeTab === "cities" && (
//                     <motion.div
//                       key="cities"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 20 }}
//                       className="space-y-2"
//                     >
//                       <p className="text-xs text-amber-600 dark:text-amber-400 mb-2 font-bold">
//                         فروعنا وخدماتنا في:
//                       </p>
//                       {cities.map((city) => (
//                         <Link
//                           key={city.name}
//                           href={city.path}
//                           onClick={() => setIsOpen(false)}
//                           className="flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all group"
//                         >
//                           <MapPin className="w-5 h-5 text-amber-600" />
//                           <span className="font-bold text-slate-800 dark:text-slate-200">
//                             {city.name}
//                           </span>
//                         </Link>
//                       ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* الفوتر */}
//               <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 border-t border-amber-100 dark:border-amber-800/30">
//                 <p className="text-xs text-center text-slate-600 dark:text-slate-400">
//                   🏆 شركة العزيزية - خبرة وجودة في تركيب المظلات والسواتر
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* الأزرار الرئيسية */}
//       <div className="flex flex-col gap-3 items-start">
//         {/* زر العودة للأعلى - يظهر عند التمرير */}
//         {showScrollTop && (
//           <motion.button
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.5 }}
//             onClick={scrollToTop}
//             className="w-12 h-12 rounded-full bg-slate-800/90 dark:bg-slate-700/90 backdrop-blur text-white flex items-center justify-center shadow-lg hover:bg-amber-600 transition-all border border-white/20"
//           >
//             <ArrowUp className="w-5 h-5" />
//           </motion.button>
//         )}

//         {/* الزر الرئيسي */}
//         <motion.button
//           onClick={() => setIsOpen(!isOpen)}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className={cn(
//             "relative w-16 h-16 rounded-2xl",
//             "bg-gradient-to-br from-amber-600 to-orange-600",
//             "flex items-center justify-center",
//             "shadow-2xl shadow-amber-600/30",
//             "border-2 border-white/30",
//             "transition-all duration-300",
//             isOpen && "rotate-90",
//           )}
//         >
//           {/* مؤشر الخدمات الجديدة */}
//           <span className="absolute -top-1 -right-1 w-3 h-3">
//             <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
//             <span className="absolute inset-0 rounded-full bg-emerald-500" />
//           </span>

//           <AnimatePresence mode="wait">
//             {isOpen ? (
//               <motion.div
//                 key="close"
//                 initial={{ rotate: -90, opacity: 0 }}
//                 animate={{ rotate: 0, opacity: 1 }}
//                 exit={{ rotate: 90, opacity: 0 }}
//               >
//                 <X className="w-7 h-7 text-white" />
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="menu"
//                 initial={{ rotate: 90, opacity: 0 }}
//                 animate={{ rotate: 0, opacity: 1 }}
//                 exit={{ rotate: -90, opacity: 0 }}
//               >
//                 <Menu className="w-7 h-7 text-white" />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.button>
//       </div>
//     </div>
//   );
// }
