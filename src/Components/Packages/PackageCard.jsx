
export default function PackageCard({ pkg, isArabic, t, onBook }) {
 
  const title = isArabic ? pkg.title : pkg.title_en;
  const features = isArabic ? pkg.features : pkg.features_en;
  const gifts = isArabic ? pkg.gifts : pkg.gifts_en;

  return (
    <div className="relative bg-gray-900 rounded-3xl p-4 lg:p-6 border border-gray-800 hover:-translate-y-3 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 flex flex-col">
      {/* شارة "الأكثر طلباً" */}
      {pkg.popular && (
        <span
          className={`absolute -top-3 ${isArabic ? "right-6" : "left-6"} bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full`}
        >
          {t.popular}
        </span>
      )}

      {/* اسم الباقة */}
      <h2 className="text-center text-4xl font-bold rounded-2xl mb-6 border border-indigo-500 text-indigo-500 py-5">
        {title}
      </h2>

      {/* gifts & features*/}
      <div className="bg-gray-700/20 rounded-2xl mb-4 py-4 flex-1">
        {/* features */}
        <ul className="space-y-4 text-lg px-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-300">
              <span className="text-indigo-400 shrink-0">✔</span>
              {feature}
            </li>
          ))}
        </ul>

        {/* gifts */}
        {gifts.length > 0 && (
          <>
            <div className="mx-3 mt-4 mb-2 border-t border-gray-600/50 pt-3">
              <p className="text-indigo-300 text-sm font-semibold">{t.gifts}</p>
            </div>
            <ul className="space-y-3 text-lg px-3">
              {gifts.map((gift, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <span className="text-indigo-400 shrink-0">✔</span>
                  {gift}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* السعر */}
      <div className="text-center mt-auto py-2 rounded-2xl bg-indigo-500/30 shadow-xl">
        {pkg.old_price && (
          <div className="text-gray-400 line-through text-lg">
            {pkg.old_price} {t.egp}
          </div>
        )}
        <div className="text-4xl font-extrabold">
          {pkg.new_price}
          <span className={`text-lg ${isArabic ? "mr-2" : "ml-2"}`}>
            {t.egp}
          </span>
        </div>
      </div>

      {/* زرار الحجز */}
      <button
        onClick={() => onBook(title)}
        className="mt-4 bg-white text-indigo-700 px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition block text-center cursor-pointer w-full"
      >
        {t.bookNow}
      </button>
    </div>
  );
}
