import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] text-white border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* العمود 1: عن الشركة */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-black font-bold text-xl">
                ع
              </div>
              <span className="text-xl font-bold tracking-tighter">
                العزيزية{" "}
                <span className="text-primary font-normal text-sm">
                  للحلول الذكية
                </span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
              المصنع السعودي الرائد في أنظمة المظلات والبرجولات الذكية. نحول
              المساحات الخارجية إلى مناطق حيوية مستدامة بتقنيات هندسية متطورة.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* العمود 2: روابط سريعة */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">المنتجات</h3>
            <ul className="space-y-4">
              {[
                { name: "مظلات السيارات", href: "/products/cars" },
                { name: "البرجولات الذكية", href: "/products/pergolas" },
                { name: "السواتر والخصوصية", href: "/products/screens" },
                { name: "أعمال الشد الإنشائي", href: "/products/tensile" },
                { name: "أنظمة الأتمتة", href: "/products/smart" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-[-5px] transition-all inline-block text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود 3: الشركة */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">الشركة</h3>
            <ul className="space-y-4">
              {[
                { name: "عن المصنع", href: "/about" },
                { name: "مشاريعنا", href: "/projects" },
                { name: "طلب عرض سعر", href: "/contact" },
                { name: "المدونة الهندسية", href: "/blog" },
                { name: "الوظائف", href: "/careers" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-[-5px] transition-all inline-block text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود 4: التواصل */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary">تواصل معنا</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">
                  الرياض، حي الصناعية الثانية،
                  <br />
                  شارع الإبداع الهندسي
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-400 text-sm dir-ltr">
                  +966 50 000 0000
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-400 text-sm">
                  info@alaziziyah.com
                </span>
              </li>
              <li className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">
                  السبت - الخميس
                  <br />
                  8:00 ص - 6:00 م
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* الحقوق */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} العزيزية للحلول الذكية. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
