// components/ui/GridBackground.tsx

export function GridBackground() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[-1] h-full w-full select-none"
      xmlns="http://www.w3.org/2000/svg"
      // هذه الخاصية تضمن عدم تشويه النمط عند تغيير حجم الشاشة
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* تعريف النمط المتكرر (المربع الواحد) */}
        <pattern
          id="grid-pattern"
          width="32" // عرض المربع الواحد (يمكنك تكبيره أو تصغيره)
          height="32" // ارتفاع المربع الواحد
          patternUnits="userSpaceOnUse"
          x="50%" // لضمان توسيط الشبكة
          y="50%"
        >
          {/* رسم خطي المربع (شكل L مقلوب) */}
          <path
            d="M0 32V.5H32" // مسار يرسم خطاً أفقياً وعمودياً
            fill="none"
            // هنا نتحكم في لون الخطوط وشفافيتها للوضع الفاتح والداكن
            // stroke-gray-300/40: رمادي فاتح جداً وشفاف للوضع الفاتح
            // dark:stroke-gray-700/30: رمادي داكن وشفاف للوضع الداكن
            className="stroke-gray-300/40 dark:stroke-gray-700/30"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      {/* مستطيل يملأ الشاشة ويستخدم النمط المعرف أعلاه كخلفية */}
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
}
