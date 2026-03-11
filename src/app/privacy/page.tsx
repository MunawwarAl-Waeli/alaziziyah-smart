export default function PrivacyPolicy() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">سياسة الخصوصية</h1>
        <p className="text-gray-600">
          شركة العزيزية للمظلات والسواتر – تاريخ السريان 2024/07/03
        </p>
      </div>

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">1. المقدمة</h2>
        <p className="text-gray-700 leading-8">
          مرحباً بكم في شركة العزيزية لتركيب المظلات والسواتر. توضح هذه السياسة
          كيفية جمع واستخدام وحماية المعلومات التي يتم الحصول عليها عند استخدام
          موقعنا.
        </p>
      </section>

      {/* Definitions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">2. التعاريف</h2>

        <ul className="space-y-3 text-gray-700 leading-8">
          <li>
            <strong>الخدمة:</strong> موقع al-azizia.com
          </li>
          <li>
            <strong>البيانات الشخصية:</strong> أي معلومات يمكن استخدامها للتعرف
            على شخص.
          </li>
          <li>
            <strong>بيانات الاستخدام:</strong> بيانات يتم جمعها تلقائياً أثناء
            استخدام الموقع.
          </li>
          <li>
            <strong>المستخدم:</strong> الشخص الذي يستخدم موقعنا.
          </li>
        </ul>
      </section>

      {/* Data collection */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          3. المعلومات التي نقوم بجمعها
        </h2>

        <ul className="list-disc pr-6 space-y-2 text-gray-700 leading-8">
          <li>الاسم</li>
          <li>البريد الإلكتروني</li>
          <li>رقم الهاتف</li>
          <li>عنوان IP</li>
          <li>بيانات المتصفح والجهاز</li>
        </ul>
      </section>

      {/* Use of data */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">4. كيفية استخدام البيانات</h2>

        <ul className="list-disc pr-6 space-y-2 text-gray-700 leading-8">
          <li>تقديم خدمات الموقع</li>
          <li>تحسين تجربة المستخدم</li>
          <li>تحليل استخدام الموقع</li>
          <li>التواصل مع العملاء</li>
        </ul>
      </section>

      {/* Cookies */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          5. ملفات تعريف الارتباط (Cookies)
        </h2>

        <p className="text-gray-700 leading-8">
          يستخدم الموقع ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل أداء
          الموقع.
        </p>
      </section>

      {/* Security */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">6. أمان البيانات</h2>

        <p className="text-gray-700 leading-8">
          نحن نتخذ إجراءات أمنية مناسبة لحماية بيانات المستخدمين، ولكن لا يمكن
          ضمان أمان نقل البيانات عبر الإنترنت بنسبة 100%.
        </p>
      </section>

      {/* Contact */}
      <section className="bg-gray-100 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">7. التواصل معنا</h2>

        <p className="text-gray-700 leading-8">
          إذا كان لديك أي استفسار بخصوص سياسة الخصوصية، يمكنك التواصل معنا عبر
          البريد الإلكتروني:
        </p>

        <p className="mt-4 font-semibold">info@al-azizia.com</p>
      </section>
    </main>
  );
}
