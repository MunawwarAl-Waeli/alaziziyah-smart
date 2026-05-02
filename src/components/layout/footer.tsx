"use client";

import React from "react";
import Link from "next/link";
import { COMPANY_INFO, SOCIAL_LINKS } from "@/lib/config";
import {
  MapPin,
  Mail,
  Facebook,
  Instagram,
  MessageCircle,
  ChevronLeft,
  ArrowUpRight,
  Home,
  Users,
  Package,
  Briefcase,
  FileText,
  Phone,
  Umbrella,
  Leaf,
  Shield,
  Tent,
  Sparkles,
  Warehouse,
} from "lucide-react";

import { usePathname } from "next/navigation";

const quickLinks = [
  { name: "الرئيسية", href: "/", icon: Home },
  { name: "من نحن", href: "/about", icon: Users },
  { name: "خدماتنا", href: "/services", icon: Package },
  { name: "المشاريع", href: "/projects", icon: Briefcase },
  { name: "المدونة", href: "/blog", icon: FileText },
  { name: "اتصل بنا", href: "/contact", icon: Phone },
];

const serviceLinks = [
  {
    name: "مظلات سيارات",
    href: "/services/تركيب-مظلات-سيارات",
    icon: Umbrella,
  },
  { name: "برجولات", href: "/services/تركيب-برجولات", icon: Leaf },
  { name: "سواتر", href: "/services/تركيب-سواتر", icon: Shield },
  { name: "مظلات قماش", href: "/services/قماش-مظلات", icon: Tent },
  {
    name: "مظلات مسابح",
    href: "/services/تركيب-مظلات-مسابح-لكسان-ضد-الكسر",
    icon: Sparkles,
  },
  { name: "قرميد", href: "/services/قرميد", icon: Warehouse },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <footer
      className="relative bg-slate-950 text-slate-50 pt-16 pb-20 md:pb-8 font-sans mt-10 md:mt-16"
      dir="rtl"
    >
      {/* 🌊 الموجة الذكية: تطفو للأعلى بحرية دون أن تنقص 🌊 */}
      <div className="absolute top-0 left-0 w-full leading-none -translate-y-[99%] z-10 pointer-events-none">
        <svg
          className="relative block w-full h-[40px] md:h-[70px] [transform:rotateX(180deg)]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-slate-950"
          ></path>
        </svg>
      </div>

      {/* 🛑 حاوية الخلفية (تم تنظيفها من الروابط المعطلة) 🛑 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* الشبكة الرئيسية */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* العمود 1: معلومات الشركة */}
          {/* العمود 1: معلومات الشركة (مُحسن لـ SEO) */}
          <div className="flex flex-col gap-5 text-center md:text-right">
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-bold text-white mb-2">
                تركيب مظلات وسواتر
              </h3>
              <div className="w-12 h-1 bg-primary rounded-full"></div>
            </div>

            {/* النص المحسن مع الروابط الداخلية */}
            <p className="text-slate-400 leading-relaxed text-sm text-justify md:text-right">
              مؤسسة العزيزية للمقاولات والحدادة، خيارك الموثوق لـ{" "}
              <Link
                href="/services/تركيب-مظلات-سيارات"
                className="text-primary hover:text-white font-bold transition-colors hover:underline underline-offset-4 decoration-primary/50"
              >
                تركيب مظلات سيارات
              </Link>{" "}
              لحماية مركبتك بأعلى معايير الجودة، وتصميم{" "}
              <Link
                href="/projects/مظلات-حدائق"
                className="text-primary hover:text-white font-bold transition-colors hover:underline underline-offset-4 decoration-primary/50"
              >
                مظلات حدائق
              </Link>{" "}
              عصرية. متخصصون في تنفيذ وتوريد{" "}
              <Link
                href="/services/تركيب-سواتر"
                className="text-primary hover:text-white font-bold transition-colors hover:underline underline-offset-4 decoration-primary/50"
              >
                السواتر بكافة أنواعها
              </Link>{" "}
              (حديد، خشب، لكسان) لتوفير الخصوصية التامة، بالإضافة إلى بناء{" "}
              <Link
                href="/services/تركيب-برجولات"
                className="text-primary hover:text-white font-bold transition-colors hover:underline underline-offset-4 decoration-primary/50"
              >
                برجولات راقية
              </Link>{" "}
              للفلل والاستراحات. نضمن لك متانة هندسية وتصاميم مبتكرة.
            </p>

            <div className="flex justify-center md:justify-start">
              <Link href="/contact" className="inline-flex w-fit mt-2">
                <button className="bg-gradient-to-l from-primary to-primary text-primary-foreground font-bold py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-primary/20 hover:-translate-y-1 hover:shadow-xl flex items-center gap-2 group text-sm">
                  اطلب عرض سعر
                  <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </button>
              </Link>
            </div>
          </div>

          {/* العمود 2: تواصل معنا */}
          <div className="text-center md:text-right">
            <div className="flex flex-col items-center md:items-start mb-6">
              <h3 className="text-lg font-bold text-white mb-2">تواصل معنا</h3>
              <div className="w-8 h-0.5 bg-primary rounded-full"></div>
            </div>
            <address className="not-italic space-y-5">
              <div className="flex items-center justify-center md:justify-start gap-3 group">
                <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-primary/20 transition-colors border border-slate-800">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  المملكة العربية السعودية، جدة
                </p>
              </div>

              <div className="flex items-center justify-center md:justify-start  gap-3 group">
                <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-primary/20 transition-colors border border-slate-800">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                </div>
                <a
                  dir="ltr"
                  href={SOCIAL_LINKS?.phone || "tel:+966530989975"}
                  className="text-slate-400  hover:text-white text-sm transition-colors font-sans"
                >
                  +966 5309 89 975
                </a>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3 group">
                <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-primary/20 transition-colors border border-slate-800">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                </div>
                <a
                  href="mailto:info@al-azizia.com"
                  className="text-slate-400 hover:text-white text-sm transition-colors font-sans"
                >
                  info@al-azizia.com
                </a>
              </div>
            </address>
          </div>

          {/* العمود 3: روابط سريعة */}
          <div className="text-center md:text-right">
            <div className="flex flex-col items-center md:items-start mb-6">
              <h3 className="text-lg font-bold text-white mb-2">روابط سريعة</h3>
              <div className="w-8 h-0.5 bg-primary rounded-full"></div>
            </div>
            <nav>
              <ul className="space-y-3">
                {quickLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={`
                          flex items-center justify-center md:justify-start gap-2 text-sm transition-all group
                          ${isActive ? "text-primary" : "text-slate-400 hover:text-white hover:translate-x-[-4px]"}
                        `}
                      >
                        <link.icon
                          className={`w-4 h-4 transition-colors ${isActive ? "text-primary" : "text-slate-500 group-hover:text-primary"}`}
                        />
                        <span>{link.name}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* العمود 4: خدماتنا */}
          <div className="text-center md:text-right">
            <div className="flex flex-col items-center md:items-start mb-6">
              <h3 className="text-lg font-bold text-white mb-2">خدماتنا</h3>
              <div className="w-8 h-0.5 bg-primary rounded-full"></div>
            </div>
            <nav>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-400 hover:text-white hover:translate-x-[-4px] transition-all group"
                    >
                      <link.icon className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" />
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* الشريط السفلي العلوي (أرقام وسوشيال ميديا) */}
        <div className="border-t border-slate-800/60 pt-6 pb-6 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
            <a
              href="mailto:info@al-azizia.com"
              className="hover:text-primary transition-colors flex items-center gap-2"
            >
              info@al-azizia.com
            </a>
            <span className="hidden md:inline text-slate-700">|</span>
            <a
              dir="ltr"
              href="tel:+966530989975"
              className="hover:text-primary transition-colors flex items-center gap-2 font-sans"
            >
              +966 5309 89 975
            </a>
            <span className="hidden md:inline text-slate-700">|</span>
            <a
              href="https://wa.me/967770323857"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-white hover:bg-green-600 transition-all bg-slate-900 border border-slate-800 p-2.5 rounded-full hover:-translate-y-1 group"
            >
              <MessageCircle className="w-5 h-5 group-hover:text-white transition-colors" />
            </a>
          </div>

          <div className="flex gap-3 justify-center">
            <a
              href="https://www.facebook.com/share/18E2uf8aH4/"
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:border-primary hover:text-white hover:-translate-y-1 transition-all group"
            >
              <Facebook className="w-4 h-4 transition-colors" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:border-primary hover:text-white hover:-translate-y-1 transition-all group"
            >
              <Instagram className="w-4 h-4 transition-colors" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:border-primary hover:text-white hover:-translate-y-1 transition-all group"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current transition-colors"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.004 4.076H5.022z" />
              </svg>
            </a>
          </div>
        </div>

        {/* الشريط النهائي (الحقوق) */}
        <div className="border-t border-slate-800/60 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p className="text-center md:text-right">
            © {currentYear} شركة العزيزية للمظلات والسواتر. جميع الحقوق محفوظة.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/967770323857"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              تطوير: م.منور الوائلي
            </a>
            <span className="text-slate-800 hidden sm:inline">|</span>
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              سياسة الخصوصية
            </Link>
            <span className="text-slate-800 hidden sm:inline">|</span>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              شروط الاستخدام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
