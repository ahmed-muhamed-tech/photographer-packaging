// قسم الإضافات في أسفل صفحة الباقات

export default function AddonsList({ addons, isArabic, t }) {
  // لو مفيش إضافات متنرجعش حاجة
  if (addons.length === 0) return null;

  return (
    <div className="mt-24 bg-gray-900 rounded-3xl p-8 border border-gray-800">
      {/* العنوان */}
      <h2 className={`text-3xl font-bold mb-6 text-center ${isArabic ? "lg:text-right" : "lg:text-left"}`}>
        {t.addons}
      </h2>
      <div className={`w-24 h-1 bg-indigo-500 mb-8 rounded-full mx-auto ${isArabic ? "lg:mr-0" : "lg:ml-0"}`} />

      {/* قائمة الإضافات */}
      <ul className="space-y-6">
        {addons.map((addon) => {
          // بنحدد النص الصح حسب اللغة
          const addonText = isArabic ? addon.text : addon.text_en;

          return (
            <li
              key={addon.id}
              className="flex flex-col lg:flex-row justify-between items-center bg-gray-800 py-6 px-6 rounded-2xl hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
            >
              <span className="text-sm lg:text-lg text-gray-300">{addonText}</span>
              <span className="mt-3 lg:mt-0 bg-indigo-600 px-5 py-2 rounded-full text-sm font-bold">
                {addon.price}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
