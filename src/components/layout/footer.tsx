"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  MessageCircle,
  ChevronLeft,
  ArrowUpRight,
} from "lucide-react";
import { usePathname } from "next/navigation";

const quickLinks = [
  { name: "الرئيسية", href: "/", icon: "🏠" },
  { name: "من نحن", href: "/about", icon: "👥" },
  { name: "خدماتنا", href: "/services", icon: "⚙️" },
  { name: "المشاريع", href: "/projects", icon: "🏗️" },
  { name: "المدونة", href: "/blog", icon: "📝" },
  { name: "اتصل بنا", href: "/contact", icon: "📞" },
];

const serviceLinks = [
  { name: "مظلات سيارات", href: "/services/carports", icon: "🚗" },
  { name: "برجولات", href: "/services/pergolas", icon: "🏡" },
  { name: "سواتر", href: "/services/fences", icon: "🛡️" },
  { name: "مظلات مدارس", href: "/services/schools", icon: "🏫" },
  { name: "مظلات مسابح", href: "/services/pools", icon: "🏊" },
  { name: "هناجر", href: "/services/warehouses", icon: "🏭" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <footer
      className="bg-slate-950 text-slate-50 border-t border-slate-800 pt-12 pb-16 md:pb-6 relative overflow-hidden font-sans mt-auto"
      dir="rtl"
    >
      {/* إضاءات خلفية خافتة */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* الشبكة الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10">
          {/* العمود 1: معلومات الشركة */}
          <div className="flex flex-col gap-4 text-center md:text-right">
            <h3 className="text-xl font-bold text-white mb-1 relative inline-block mx-auto md:mx-0">
              تركيب مظلات وسواتر
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-amber-500 rounded-full mx-auto md:mx-0" />
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm text-justify">
              شركة العزيزية للمظلات والسواتر، هي شركة متخصصة في تركيب سواتر
              ومظلات وغيرها من الأعمال مثل: تركيب المظلات، تركيب البرجولات،
              تركيب السواتر، وصيانة المظلات والسواتر بكافة أنواعها بأعلى معايير
              الجودة الهندسية.
            </p>
            <div className="flex justify-center md:justify-start">
              <Link href="/contact" className="inline-flex w-fit mt-2">
                <button className="bg-gradient-to-l from-amber-600 to-amber-500 text-white font-bold py-2 px-5 rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:-translate-y-1 hover:shadow-xl flex items-center gap-2 group text-sm">
                  اطلب عرض سعر
                  <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </button>
              </Link>
            </div>
          </div>

          {/* العمود 2: تواصل معنا */}
          <div>
            <h3 className="text-lg font-bold text-white mb-5 relative inline-block mx-auto md:mx-0 text-center md:text-right">
              تواصل معنا
              <span className="absolute -bottom-2 right-0 w-8 h-0.5 bg-amber-500 rounded-full mx-auto md:mx-0" />
            </h3>
            <address className="not-italic space-y-4 text-center md:text-right">
              <div className="flex items-center justify-center md:justify-start gap-3 group">
                <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-amber-500/10 transition-colors">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  المملكة العربية السعودية، جدة
                </p>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3 group">
                <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-amber-500/10 transition-colors">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                </div>
                <a
                  href="tel:+966530989975"
                  className="text-slate-400 hover:text-white text-sm transition-colors font-sans"
                >
                  +966 5309 89 975
                </a>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3 group">
                <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-amber-500/10 transition-colors">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                </div>
                <a
                  href="mailto:info@alazizia.com"
                  className="text-slate-400 hover:text-white text-sm transition-colors font-sans"
                >
                  info@alazizia.com
                </a>
              </div>
            </address>
          </div>

          {/* العمود 3: روابط سريعة */}
          <div>
            <h3 className="text-lg font-bold text-white mb-5 relative inline-block mx-auto md:mx-0 text-center md:text-right">
              روابط سريعة
              <span className="absolute -bottom-2 right-0 w-8 h-0.5 bg-amber-500 rounded-full mx-auto md:mx-0" />
            </h3>
            <nav>
              <ul className="space-y-3 text-center md:text-right">
                {quickLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={`
                          flex items-center justify-center md:justify-start gap-2 text-sm transition-all group
                          ${isActive ? "text-amber-500" : "text-slate-400 hover:text-amber-500 hover:translate-x-[-4px]"}
                        `}
                      >
                        <span className="text-base">{link.icon}</span>
                        <span>{link.name}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* العمود 4: خدماتنا */}
          <div>
            <h3 className="text-lg font-bold text-white mb-5 relative inline-block mx-auto md:mx-0 text-center md:text-right">
              خدماتنا
              <span className="absolute -bottom-2 right-0 w-8 h-0.5 bg-amber-500 rounded-full mx-auto md:mx-0" />
            </h3>
            <nav>
              <ul className="space-y-3 text-center md:text-right">
                {serviceLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-400 hover:text-amber-500 hover:translate-x-[-4px] transition-all group"
                    >
                      <span className="text-base">{link.icon}</span>
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* الشريط السفلي العلوي */}
        <div className="border-t border-slate-800 pt-6 pb-6 flex flex-col lg:flex-row justify-between items-center gap-5">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
            <a
              href="mailto:info@al-azizia.com"
              className="hover:text-amber-500 transition-colors flex items-center gap-2"
            >
              info@al-azizia.com
            </a>
            <span className="hidden md:inline text-slate-700">|</span>
            <a
              href="tel:+966530989975"
              className="hover:text-amber-500 transition-colors flex items-center gap-2"
            >
              +966 5309 89 975
            </a>
            <span className="hidden md:inline text-slate-700">|</span>
            <a
              href="https://wa.me/967770323857"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-white hover:bg-green-500 transition-all bg-slate-900 p-2 rounded-full"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          <div className="flex gap-3">
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:border-amber-500 hover:text-white hover:-translate-y-1 transition-all"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:border-amber-500 hover:text-white hover:-translate-y-1 transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:border-amber-500 hover:text-white hover:-translate-y-1 transition-all"
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

        {/* الشريط النهائي */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p className="text-center md:text-right">
            © {currentYear} شركة العزيزية للمظلات والسواتر. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Link
              href="https://lucent-toffee-64037a.netlify.app/"
              className="hover:text-amber-500 transition-colors"
            >
              تطوير بواسطة منور الوائلي
            </Link>
            <span className="text-slate-800">|</span>
            <Link
              href="/privacy"
              className="hover:text-amber-500 transition-colors"
            >
              سياسة الخصوصية
            </Link>
            <span className="text-slate-800">|</span>
            <Link
              href="/terms"
              className="hover:text-amber-500 transition-colors"
            >
              شروط الاستخدام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
// "use client";

// import React from "react";
// import Link from "next/link";
// import {
//   MapPin,
//   Phone,
//   Mail,
//   Facebook,
//   Instagram,
//   MessageCircle,
//   ChevronLeft,
//   ArrowUpRight,
// } from "lucide-react";
// import { usePathname } from "next/navigation";
// const quickLinks = [
//   { name: "الرئيسية", href: "/", icon: "🏠" },
//   { name: "من نحن", href: "/about", icon: "👥" },
//   { name: "خدماتنا", href: "/services", icon: "⚙️" },
//   { name: "المشاريع", href: "/projects", icon: "🏗️" },
//   { name: "المدونة", href: "/blog", icon: "📝" },
//   { name: "اتصل بنا", href: "/contact", icon: "📞" },
// ];
// const serviceLinks = [
//   { name: "مظلات سيارات", href: "/services/carports", icon: "🚗" },
//   { name: "برجولات", href: "/services/pergolas", icon: "🏡" },
//   { name: "سواتر", href: "/services/fences", icon: "🛡️" },
//   { name: "مظلات مدارس", href: "/services/schools", icon: "🏫" },
//   { name: "مظلات مسابح", href: "/services/pools", icon: "🏊" },
//   { name: "هناجر", href: "/services/warehouses", icon: "🏭" },
// ];
// export function Footer() {
//   const currentYear = new Date().getFullYear();
//   const pathname = usePathname();

//   return (
//     <footer
//       // استخدمنا slate-950 لضمان بقاء الفوتر داكناً وفخماً دائماً
//       className="bg-slate-950 text-slate-50 border-t border-slate-800 pt-16 pb-6 relative overflow-hidden font-sans"
//       dir="rtl"
//     >
//       {/* إضاءة خلفية خافتة جداً في الزوايا */}
//       <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

//       <div className="container mx-auto px-4 relative z-10">
//         {/* الشبكة الرئيسية */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
//           {/* العمود 1: معلومات الشركة */}
//           <div className="flex flex-col gap-5">
//             <h3 className="text-xl font-bold text-white mb-2 relative inline-block">
//               تركيب مظلات وسواتر
//               <span className="absolute -bottom-2 right-0 w-12 h-1 bg-primary rounded-full"></span>
//             </h3>
//             <p className="text-slate-400 leading-relaxed text-sm text-justify">
//               شركة العزيزية للمظلات والسواتر، هي شركة متخصصة في تركيب سواتر
//               ومظلات وغيرها من الأعمال مثل: تركيب المظلات، تركيب البرجولات،
//               تركيب السواتر، وصيانة المظلات والسواتر بكافة أنواعها بأعلى معايير
//               الجودة الهندسية.
//             </p>
//             <Link href="/contact" className="inline-flex w-fit mt-2">
//               <button className="bg-gradient-to-l from-primary-dark to-primary text-primary-foreground font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 hover:-translate-y-1 hover:shadow-xl flex items-center gap-2 group">
//                 اطلب عرض سعر
//                 <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
//               </button>
//             </Link>
//           </div>

//           {/* العمود 2: روابط سريعة */}
//           <div>
//             <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
//               روابط سريعة
//               <span className="absolute -bottom-2 right-0 w-8 h-0.5 bg-primary rounded-full" />
//             </h3>
//             <nav>
//               <ul className="space-y-3">
//                 {quickLinks.map((link) => {
//                   const isActive = pathname === link.href;
//                   return (
//                     <li key={link.name}>
//                       <Link
//                         href={link.href}
//                         className={`
//                           flex items-center gap-2 text-sm transition-all group
//                           ${isActive ? "text-primary" : "text-slate-400 hover:text-primary hover:translate-x-[-4px]"}
//                         `}
//                       >
//                         <span className="text-base">{link.icon}</span>
//                         <span>{link.name}</span>
//                         {isActive && (
//                           <span className="w-1.5 h-1.5 bg-primary rounded-full" />
//                         )}
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </nav>
//           </div>

//           {/* العمود 4: الخدمات */}
//           <div>
//             <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
//               خدماتنا
//               <span className="absolute -bottom-2 right-0 w-8 h-0.5 bg-primary rounded-full" />
//             </h3>
//             <nav>
//               <ul className="space-y-3">
//                 {serviceLinks.map((link) => (
//                   <li key={link.name}>
//                     <Link
//                       href={link.href}
//                       className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary hover:translate-x-[-4px] transition-all group"
//                     >
//                       <span className="text-base">{link.icon}</span>
//                       <span>{link.name}</span>
//                       <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           </div>
//           {/* العمود 3: تواصل معنا */}
//           <div>
//             <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
//               تواصل معنا
//               <span className="absolute -bottom-2 right-0 w-12 h-1 bg-primary rounded-full"></span>
//             </h3>
//             <address className="not-italic space-y-6">
//               <div className="flex items-start gap-4 group">
//                 <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-primary/10 transition-colors mt-1">
//                   <MapPin className="w-4 h-4 text-primary shrink-0" />
//                 </div>
//                 <p className="text-slate-400 text-sm leading-relaxed pt-1">
//                   المملكة العربية السعودية، الموقع الرئيسي جدة
//                   <br />
//                 </p>
//               </div>

//               <div className="flex items-center gap-4 group">
//                 <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-primary/10 transition-colors">
//                   <Phone className="w-4 h-4 text-primary shrink-0" />
//                 </div>
//                 <a
//                   href="tel:+966530989975"
//                   className="text-slate-400 hover:text-white text-sm  transition-colors font-sans"
//                 >
//                   +966 5309 89 975
//                 </a>
//               </div>

//               <div className="flex items-center gap-4 group">
//                 <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-primary/10 transition-colors">
//                   <Mail className="w-4 h-4 text-primary shrink-0" />
//                 </div>
//                 <a
//                   href="mailto:info@alazizia.com"
//                   className="text-slate-400 hover:text-white text-sm transition-colors font-sans"
//                 >
//                   info@alazizia.com
//                 </a>
//               </div>
//             </address>
//           </div>
//         </div>

//         {/* الشريط السفلي العلوي */}
//         <div className="border-t border-slate-800 pt-6 pb-6 flex flex-col lg:flex-row justify-between items-center gap-6">
//           <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 text-sm text-slate-400 font-sans">
//             <a
//               href="mailto:info@al-azizia.com"
//               className="hover:text-primary transition-colors flex items-center gap-2"
//             >
//               info@al-azizia.com
//             </a>
//             <span className="hidden md:inline text-slate-700">|</span>
//             <a
//               href="tel:+966530989975"
//               className="hover:text-primary  transition-colors flex items-center gap-2 "
//             >
//               +966 5309 89 975
//             </a>
//             <span className="hidden md:inline text-slate-700">|</span>

//             <a
//               href="https://wa.me/966530989975"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-green-500 hover:text-white hover:bg-green-500 transition-all bg-slate-900 p-2.5 rounded-full"
//             >
//               <MessageCircle className="w-5 h-5" />
//             </a>
//           </div>

//           {/* السوشيال ميديا */}
//           <div className="flex gap-3">
//             <a
//               href="#"
//               className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:border-primary hover:text-primary-foreground hover:-translate-y-1 transition-all"
//             >
//               <Facebook className="w-4 h-4" />
//             </a>
//             <a
//               href="#"
//               className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:border-primary hover:text-primary-foreground hover:-translate-y-1 transition-all"
//             >
//               <Instagram className="w-4 h-4" />
//             </a>
//             <a
//               href="#"
//               className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:border-primary hover:text-primary-foreground hover:-translate-y-1 transition-all"
//             >
//               <svg
//                 viewBox="0 0 24 24"
//                 className="w-4 h-4 fill-current"
//                 aria-hidden="true"
//               >
//                 <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.004 4.076H5.022z" />
//               </svg>
//             </a>
//           </div>
//         </div>

//         {/* الشريط النهائي */}
//         <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
//           <p>
//             © {currentYear} شركة العزيزية للمظلات والسواتر. جميع الحقوق محفوظة.
//           </p>
//           <div className="flex items-center gap-4 flex-wrap justify-center">
//             <Link href="#" className="hover:text-primary transition-colors">
//               تطوير بواسطة منور الوائلي
//             </Link>
//             <span className="text-slate-800">|</span>
//             <Link
//               href="/privacy"
//               className="hover:text-primary transition-colors"
//             >
//               سياسة الخصوصية
//             </Link>
//             <span className="text-slate-800">|</span>
//             <Link
//               href="/terms"
//               className="hover:text-primary transition-colors"
//             >
//               شروط الاستخدام
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
