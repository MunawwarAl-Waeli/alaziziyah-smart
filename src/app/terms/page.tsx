export default function TermsContent() {
  return (
    <section
      dir="rtl"
      // تم إضافة font-sans و leading-loose لتحسين القراءة، وتفعيل ألوان الوضع الداكن
      className="max-w-4xl mx-auto px-6 py-16 text-right font-sans text-gray-800 dark:text-gray-200 leading-loose"
    >
      {/* العنوان الرئيسي والإصدار */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
        شروط استخدام الموقع
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 font-mono">
        الإصدار 1.0
      </p>

      {/* تكبير الخط الأساسي قليلاً للشاشات الكبيرة */}
      <div className="space-y-6 text-base md:text-lg">
        <p>
          موقع العزيزية للمظلات والسواتر الموجود على
          <a
            href="https://al-azizia.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline mx-1 transition-colors"
          >
            https://al-azizia.com/
          </a>
          هو عمل محمي بحقوق الطبع والنشر تابع لشركة العزيزية للمظلات والسواتر.
          قد تخضع بعض ميزات الموقع لإرشادات أو شروط أو قواعد إضافية، والتي سيتم
          نشرها على الموقع فيما يتعلق بهذه الميزات.
        </p>

        <p>
          يتم دمج جميع هذه الشروط والإرشادات والقواعد الإضافية بالإشارة إلى هذه
          الشروط.
        </p>

        {/* المربع التحذيري متوافق مع الوضعين */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-500 dark:border-blue-400 p-5 my-6 rounded-l-lg">
          <p className="text-sm md:text-base leading-relaxed">
            وصفت شروط الاستخدام هذه الشروط والأحكام الملزمة قانونًا التي تشرف
            على استخدامك للموقع. من خلال تسجيل الدخول إلى الموقع، فإنك تلتزم
            بهذه الشروط وتقر بأن لديك السلطة والقدرة على الدخول في هذه الشروط.
            <strong className="text-gray-900 dark:text-white mx-1">
              يجب أن يكون عمرك 18 عامًا على الأقل حتى تتمكن من الوصول إلى
              الموقع.
            </strong>
            إذا كنت لا توافق على جميع أحكام هذه الشروط، فلا تقم بتسجيل الدخول
            و/أو استخدام الموقع.
          </p>
        </div>

        <p className="text-sm italic text-gray-600 dark:text-gray-400">
          تتطلب هذه الشروط استخدام قسم التحكيم 10.2 على أساس فردي لحل النزاعات
          وكذلك الحد من سبل الانتصاف المتاحة لك في حالة حدوث نزاع.
        </p>

        {/* القسم الأول */}
        <h2 className="text-2xl font-bold mt-12 mb-4 border-b-2 border-gray-100 dark:border-gray-800 pb-3 text-gray-900 dark:text-white">
          1. الوصول إلى الموقع
        </h2>
        <p>
          تخضع لهذه الشروط. تمنحك الشركة ترخيصًا محدودًا وغير قابل للتحويل وغير
          حصري وقابل للإلغاء للوصول إلى الموقع فقط لاستخدامك الشخصي وغير
          التجاري.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900 dark:text-gray-100">
          قيود معينة:
        </h3>
        <p>تخضع الحقوق المعتمدة لك في هذه الشروط للقيود التالية:</p>
        <ul className="list-none space-y-3 pr-4 text-gray-700 dark:text-gray-300">
          <li>
            <span className="font-bold ml-2 text-gray-900 dark:text-white">
              (أ)
            </span>{" "}
            لا يجوز لك بيع الموقع أو تأجيره أو استئجاره أو نقله أو التنازل عنه
            أو توزيعه أو استضافته أو استغلاله تجاريًا.
          </li>
          <li>
            <span className="font-bold ml-2 text-gray-900 dark:text-white">
              (ب)
            </span>{" "}
            لا يجوز لك تغيير أو عمل أعمال مشتقة أو تفكيك أو تجميع عكسي أو إجراء
            هندسة عكسية لأي جزء من الموقع.
          </li>
          <li>
            <span className="font-bold ml-2 text-gray-900 dark:text-white">
              (ج)
            </span>{" "}
            لا يجوز لك الوصول إلى الموقع من أجل إنشاء موقع ويب مماثل أو تنافسي.
          </li>
          <li>
            <span className="font-bold ml-2 text-gray-900 dark:text-white">
              (د)
            </span>{" "}
            لا يجوز نسخ أي جزء من الموقع أو إعادة إنتاجه أو توزيعه أو إعادة نشره
            أو تنزيله أو عرضه أو نشره أو نقله بأي شكل أو بأي وسيلة ما لم تتم
            الإشارة إلى خلاف ذلك.
          </li>
        </ul>

        <p className="mt-6">
          يجب الاحتفاظ بجميع حقوق الطبع والنشر وإشعارات الملكية الأخرى الموجودة
          على الموقع على جميع نسخه. تحتفظ الشركة بالحق في تغيير الموقع أو تعليقه
          أو إيقافه مع أو بدون إشعار لك.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900 dark:text-gray-100">
          الملكية الفكرية:
        </h3>
        <p>
          باستثناء أي محتوى مستخدم قد تقدمه، فإنك تدرك أن جميع حقوق الملكية
          الفكرية، بما في ذلك حقوق النشر وبراءات الاختراع والعلامات التجارية
          والأسرار التجارية، في الموقع ومحتواه مملوكة للشركة أو موردي الشركة.
        </p>

        {/* القسم الثاني */}
        <h2 className="text-2xl font-bold mt-12 mb-4 border-b-2 border-gray-100 dark:border-gray-800 pb-3 text-gray-900 dark:text-white">
          2. روابط وإعلانات الطرف الثالث؛ مستخدمين آخرين
        </h2>

        <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900 dark:text-gray-100">
          روابط وإعلانات الطرف الثالث:
        </h3>
        <p>
          قد يحتوي الموقع على روابط لمواقع وخدمات خارجية. لا تخضع روابط وإعلانات
          الطرف الثالث هذه لسيطرة الشركة، والشركة ليست مسؤولة عنها. توفر الشركة
          هذه الروابط فقط من أجل الراحة لك، وأنت تستخدمها على مسؤوليتك الخاصة.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900 dark:text-gray-100">
          مستخدمين آخرين:
        </h3>
        <p>
          يتحمل كل مستخدم للموقع وحده المسؤولية عن أي وجميع محتويات المستخدم
          الخاصة به. أنت توافق على أن الشركة لن تكون مسؤولة عن أي خسارة أو ضرر
          يتم تكبدها نتيجة لأي من هذه التفاعلات. إذا كان هناك نزاع بينك وبين أي
          مستخدم للموقع، فنحن لسنا ملزمين بالتدخل فيه.
        </p>

        {/* القسم القانوني */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 mt-10">
          <p className="text-sm md:text-base leading-relaxed">
            أنت بموجب هذا تقوم بإعفاء الشركة ومسؤوليها وموظفيها ووكلائها من كل
            نزاع أو مطالبة نشأت أو تنشأ بشكل مباشر أو غير مباشر عن الموقع.
            <strong className="text-gray-900 dark:text-white mx-1">
              {" "}
              إذا كنت مقيمًا في كاليفورنيا
            </strong>
            ، فإنك تتنازل بموجب هذا عن المادة 1542 من القانون المدني لولاية
            كاليفورنيا.
          </p>
        </div>
      </div>

      {/* الخط الفاصل البديل (تم تحويله إلى كلاسات Tailwind متوافقة مع الوضعين) */}
      <div className="h-[2px] bg-gradient-to-l from-transparent via-gray-200 dark:via-gray-700 to-transparent my-12" />

      {/* تذييل المطور */}
      <p className="text-center text-gray-600 dark:text-gray-400">
        في حال هناك مشكلة ما يمكنكم التواصل مع
        <span className="font-bold text-gray-900 dark:text-white mx-1 text-lg">
          مصمم مواقع م. منور الوائلي
        </span>
        من خلال الرابط التالي:
        <a
          href="https://wa.me/967770323857"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-100 dark:bg-gray-800 px-5 py-2.5 rounded-full text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors inline-block mt-3 mr-2 shadow-sm"
        >
          للتواصل
        </a>
      </p>
    </section>
  );
}
