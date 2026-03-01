"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  MessageCircle, // نستخدمها كبديل لأيقونة واتساب
  ChevronLeft,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#0b1120] text-white border-t border-white/5 pt-16 pb-6"
      dir="rtl"
    >
      <div className="container mx-auto px-4">
        {/* الشبكة الرئيسية - 4 أعمدة بناءً على التصميم */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* العمود 1: معلومات الـ SEO ونبذة عن الشركة */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-bold text-white mb-2 relative inline-block">
              تركيب مظلات وسواتر
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-[#d4af37] rounded-full"></span>
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm text-justify">
              شركة العزيزية للمظلات والسواتر، هي شركة متخصصة في تركيب سواتر
              ومظلات وغيرها من الأعمال مثل: تركيب المظلات، تركيب البرجولات،
              تركيب السواتر، وصيانة المظلات والسواتر بكافة أنواعها بأعلى معايير
              الجودة.
            </p>
            <Link href="/contact" className="inline-flex w-fit mt-2">
              <button className="bg-[#d4af37] hover:bg-[#c4a027] text-slate-900 font-bold py-2.5 px-6 rounded-md transition-colors shadow-lg hover:shadow-xl flex items-center gap-2">
                اطلب عرض سعر
                <ChevronLeft className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* العمود 2: روابط سريعة */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
              روابط سريعة
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-[#d4af37] rounded-full"></span>
            </h3>
            <nav>
              <ul className="space-y-4">
                {[
                  { name: "الرئيسية", href: "/" },
                  { name: "من نحن", href: "/about" },
                  { name: "خدماتنا", href: "/services" },
                  { name: "معرض الأعمال", href: "/projects" },
                  { name: "سياسة الخصوصية", href: "/privacy" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#d4af37] hover:translate-x-[-8px] transition-all inline-flex items-center gap-2 text-sm font-medium group"
                    >
                      <span className="w-1.5 h-1.5 border border-gray-400 group-hover:border-[#d4af37] group-hover:bg-[#d4af37] transition-colors rounded-sm"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* العمود 3: تواصل معنا */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
              تواصل معنا
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-[#d4af37] rounded-full"></span>
            </h3>
            <address className="not-italic space-y-6">
              <div className="flex items-start gap-4 group">
                <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-1" />
                <p className="text-gray-400 text-sm leading-relaxed">
                  المملكة العربية السعودية، الرياض
                  <br />
                  شارع التخصصي
                </p>
              </div>

              <div className="flex items-center gap-4 group">
                <Phone className="w-5 h-5 text-[#d4af37] shrink-0" />
                <a
                  href="tel:+966558181955"
                  className="text-gray-400 hover:text-white text-sm dir-ltr transition-colors font-sans"
                >
                  +966 55 818 1955
                </a>
              </div>

              <div className="flex items-center gap-4 group">
                <Mail className="w-5 h-5 text-[#d4af37] shrink-0" />
                <a
                  href="mailto:info@alazizia.com"
                  className="text-gray-400 hover:text-white text-sm transition-colors font-sans"
                >
                  info@alazizia.com
                </a>
              </div>
            </address>
          </div>

          {/* العمود 4: الخريطة */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
              موقعنا على الخريطة
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-[#d4af37] rounded-full"></span>
            </h3>
            <div className="w-full h-48 bg-slate-800 rounded-xl overflow-hidden border border-white/10 relative group cursor-pointer">
              {/* هنا نضع Iframe لخريطة جوجل. استبدل الرابط برابط موقعكم الفعلي */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115935.13289947932!2d46.738586!3d24.774265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-80 group-hover:opacity-100 transition-opacity"
              ></iframe>
            </div>
          </div>
        </div>

        {/* الشريط السفلي العلوي (أرقام التواصل السريعة والسوشيال ميديا) */}
        <div className="border-t border-white/10 pt-6 pb-6 flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* معلومات التواصل الأفقية */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-8 text-sm text-gray-400 font-sans">
            <a
              href="mailto:info@al-azizia.com"
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              info@al-azizia.com
            </a>
            <span className="hidden md:inline text-white/20">|</span>
            <a
              href="tel:+966530989975"
              className="hover:text-white transition-colors flex items-center gap-2 dir-ltr"
            >
              +966 5309 89 975
            </a>
            <span className="hidden md:inline text-white/20">|</span>
            <a
              href="tel:+966558181955"
              className="hover:text-white transition-colors flex items-center gap-2 dir-ltr"
            >
              +966 5581 819 55
            </a>
            <a
              href="https://wa.me/966558181955"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400 transition-colors bg-white/5 p-2 rounded-full"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          {/* السوشيال ميديا */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-slate-900 transition-all"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-slate-900 transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            {/* أيقونة X بدلاً من تويتر القديم */}
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-slate-900 transition-all"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.004 4.076H5.022z" />
              </svg>
            </a>
          </div>
        </div>

        {/* الشريط السفلي النهائي (الحقوق وروابط السياسة) */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            © {currentYear} شركة العزيزية للمظلات والسواتر. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="#" className="hover:text-white transition-colors">
              تطوير بواسطة مطوري الويب
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              سياسة الخصوصية
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              شروط استخدام الموقع
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
