import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import {
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  PenTool,
  CheckCircle2,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Home,
  Tent,
  Umbrella,
  Shield,
} from "lucide-react";

// --- الواجهات ودالة جلب البيانات (كما هي لم تتغير) ---
interface WPPageData {
  databaseId: number;
  title: string;
  slug: string;
  uri: string;
  content: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  seo: {
    title: string;
    metaDesc: string;
    canonical: string;
  };
}

async function getPageData(slug: string): Promise<WPPageData | null> {
  const decodedSlug = decodeURIComponent(slug);
  const uri = `/${decodedSlug}/`;
  const query = `
    query GetSinglePageData($uri: ID!) {
      page(id: $uri, idType: URI) {
        databaseId
        title
        slug
        uri
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        seo {
          title
          metaDesc
          canonical
        }
      }
    }
  `;
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables: { uri } }),
        next: { revalidate: 60 },
      },
    );
    const json = await res.json();
    return json?.data?.page || null;
  } catch (error) {
    console.error("خطأ في جلب بيانات الصفحة:", error);
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const resolvedParams = await params;
  const pageData = await getPageData(resolvedParams.slug);
  if (!pageData) return { title: "الصفحة غير موجودة" };
  return {
    title: pageData.seo?.title || pageData.title,
    description: pageData.seo?.metaDesc,
  };
}

// --- مكون الصفحة الأساسي ---
export default async function DynamicServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const pageData = await getPageData(resolvedParams.slug);

  if (!pageData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa] pt-24 pb-16" dir="rtl">
      {/* 1. قسم الهيرو (Hero Section) ديناميكي */}
      <section className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden">
        {/* الصورة الخلفية من الووردبريس */}
        <Image
          src={
            pageData.featuredImage?.node.sourceUrl ||
            "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
          }
          alt={pageData.title}
          fill
          className="object-cover"
          priority
        />
        {/* طبقة التعتيم */}
        <div className="absolute inset-0 bg-slate-900/70"></div>

        {/* محتوى الهيرو */}
        <div className="container relative z-10 text-center px-4">
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              الرئيسية
            </Link>
            <span>/</span>
            <Link
              href="/services"
              className="hover:text-white transition-colors"
            >
              خدماتنا
            </Link>
            <span>/</span>
            <span className="text-white font-bold">{pageData.title}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {pageData.title} في جدة
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            نقدم أفضل حلول التظليل والحماية لسيارتك بأحدث التصاميم العصرية
            والخامات العالمية المقاومة للعوامل الجوية.
          </p>
        </div>
      </section>

      {/* 2. الحاوية الرئيسية (المحتوى + الشريط الجانبي) */}
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8 items-start">
        {/* == القسم الأيمن (المحتوى الأساسي 70%) == */}
        <div className="w-full lg:w-2/3 flex flex-col gap-10">
          {/* مقدمة ومميزات */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-blue-700 rounded-full"></div>
              <h2 className="text-2xl font-bold text-slate-800">
                أفضل أنواع {pageData.title}
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed mb-8">
              تعتبر مظلات السيارات ضرورة قصوى في المملكة العربية السعودية نظراً
              لارتفاع درجات الحرارة والشمس القوية التي قد تضر بهيكل السيارة
              وطلائها. نحن في مؤسسة العزيزية نقدم تشكيلة واسعة من المظلات التي
              تجمع بين الجودة العالية والتصميم الجذاب لضمان حماية تامة لسيارتك.
            </p>

            {/* كروت المميزات */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">
                    حماية متكاملة
                  </h3>
                  <p className="text-sm text-slate-500">
                    عزل حراري يصل إلى 100% وحماية من الأشعة فوق البنفسجية
                    الضارة.
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <PenTool className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">
                    تصاميم هندسية
                  </h3>
                  <p className="text-sm text-slate-500">
                    أشكال مخروطية، هرمية، وبطبيعة تناسب أفضل القصور والفلل
                    الراقية.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* أنواع المظلات (كروت أفقية) */}
          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-6">
              أنواع المظلات التي نقدمها
            </h3>
            <div className="flex flex-col gap-4">
              {/* الكرت الأول */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-slate-200 shrink-0">
                  <Image
                    src="images/0.jpg"
                    alt="مظلات PVC"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1">
                  <h4 className="text-lg font-bold text-blue-700 mb-2">
                    مظلات بي في سي (PVC)
                  </h4>
                  <p className="text-sm text-slate-600 mb-4">
                    تعتبر الخيار الأكثر طلباً نظراً لمتانتها العالية وسهولة
                    تنظيفها. تأتي بأوزان مختلفة (1100 جرام - 680 جرام) وبصناعات
                    كورية وألمانية عالية الجودة.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-700">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> مقاومة
                      للحرائق
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> ألوان
                      متعددة وثابتة
                    </span>
                  </div>
                </div>
              </div>

              {/* الكرت الثاني */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-slate-200 shrink-0">
                  <Image
               src="images/2.jpg"
                    alt="مظلات بولي إيثيلين"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1">
                  <h4 className="text-lg font-bold text-blue-700 mb-2">
                    مظلات بولي إيثيلين
                  </h4>
                  <p className="text-sm text-slate-600 mb-4">
                    تسمح بالسماح بمرور الهواء بنسبة بسيطة مع حجب الحرارة، مما
                    يجعل المكان بارداً. مثالية للمواقف الكبيرة والمدارس.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-700">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> مقاومة
                      للرياح الشديدة
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> ضمان
                      يصل لـ 10 سنوات
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* معرض الصور */}
          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-6">
              معرض صور من أعمالنا
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((img) => (
                <div
                  key={img}
                  className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                >
                  <Image
                src="images/0.jpg"
                 alt="معرض أعمالنا"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
              ))}
            </div>
          </section>

          {/* الأسئلة الشائعة */}
          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-6">
              الأسئلة الشائعة
            </h3>
            <div className="flex flex-col gap-3">
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-blue-300 transition-colors">
                <span className="font-bold text-slate-700">
                  كم تكلفة تركيب مظلة سيارة واحدة؟
                </span>
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-blue-300 transition-colors">
                <span className="font-bold text-slate-700">
                  ما هي مدة الضمان على المظلات؟
                </span>
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </section>
        </div>

        {/* == القسم الأيسر (الشريط الجانبي 30%) == */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-6 sticky top-28">
          {/* كرت التواصل (CTA) */}
          <div className="bg-[#2b4c9b] rounded-2xl p-6 text-center shadow-lg relative overflow-hidden">
            {/* زخرفة خلفية */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

            <h3 className="text-xl font-bold text-white mb-2 relative z-10">
              هل تبحث عن مظلة لسيارتك؟
            </h3>
            <p className="text-blue-100 text-sm mb-6 relative z-10">
              تواصل معنا الآن واحصل على استشارة مجانية وتصميم خاص لاحتياجاتك
              (توريد في جدة)
            </p>
            <div className="flex flex-col gap-3 relative z-10">
              <button className="w-full bg-[#d4af37] hover:bg-[#c4a027] text-slate-900 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <Phone className="w-5 h-5" /> اتصل الآن
              </button>
              <button className="w-full bg-[#1e3a8a] hover:bg-blue-900 border border-blue-400 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <MessageCircle className="w-5 h-5" /> واتساب
              </button>
            </div>
          </div>

          {/* قائمة خدمات أخرى */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-4">
              خدمات أخرى
            </h3>
            <ul className="flex flex-col gap-1">
              {[
                { name: "برجولات حدائق", icon: Umbrella },
                { name: "مظلات مدارس", icon: Home },
                { name: "تغطية مسابح", icon: Tent },
                { name: "سواتر حديدية", icon: Shield },
              ].map((service, idx) => (
                <li key={idx}>
                  <Link
                    href="#"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition-colors group"
                  >
                    <span className="flex items-center gap-3 font-medium text-sm">
                      <service.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                      {service.name}
                    </span>
                    <ArrowLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* خريطة الموقع */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
            <div className="relative w-full h-40 bg-slate-100 rounded-xl mb-4 overflow-hidden border border-slate-200">
              <Image
               src="images/5.jpg"
                alt="Map"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white text-blue-800 font-bold text-xs py-2 px-4 rounded-full shadow-lg flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> موقعنا على الخريطة
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" />
              المملكة العربية السعودية، جدة، حي البوادي، شارع المكرونة
            </p>
          </div>
        </aside>
      </div>

      {/* 3. مشاريع تم تنفيذها مؤخراً (Full Width Section) */}
      <section className="container mx-auto px-4 py-8 border-t border-slate-200 mt-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            مشاريع تم تنفيذها مؤخراً
          </h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              tag: "مشاريع حكومية",
              title: "مواقف جامعة الملك عبدالعزيز",
              desc: "تركيب مظلات PVC كوري بضغط 1100 جرام...",
              img: "images/1.jpg",
            },
            {
              tag: "فلل سكنية",
              title: "فيلا حي الشاطئ",
              desc: "تصميم وتركيب مظلة كابولي بدون أعمدة أمامية...",
              img: "images/2.jpg",
            },
            {
              tag: "شركات",
              title: "مواقف شركة المراعي",
              desc: "توريد وتركيب مظلات مخروطية الشكل بارتفاعات...",
              img: "images/3.jpg",
            },
            {
              tag: "مدارس",
              title: "مدارس الأندلس",
              desc: "تغطية ساحات المدارس بقماش بولي إيثيلين...",
              img: "images/4.jpg",
            },
          ].map((project, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group"
            >
              <div className="relative w-full h-48 overflow-hidden bg-slate-200">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-bold text-[#d4af37] bg-yellow-50 px-2 py-1 rounded-md mb-3 inline-block">
                  {project.tag}
                </span>
                <h4 className="font-bold text-slate-800 mb-2">
                  {project.title}
                </h4>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                  {project.desc}
                </p>
                <Link
                  href="#"
                  className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                >
                  عرض التفاصيل <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
