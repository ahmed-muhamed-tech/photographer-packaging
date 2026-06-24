// ملف الترجمات لصفحة الباقات
// كل النصوص اللي بتتغير حسب اللغة بتيجي من هنا

export function getTranslations(isArabic) {
  return {
    title:   isArabic ? "الباقات"                          : "Packages",
    bookNow: isArabic ? "احجز الآن"                        : "Book Now",
    bookDate: isArabic ? "احجز موعدك"                     : "Book Your Date",
    bookSub:  isArabic ? "اختر التاريخ المناسب وسيتم التواصل معك" : "Choose a date and we will contact you",
    dateLabel: isArabic ? "تاريخ الحجز"                   : "Booking Date",
    confirm:  isArabic ? "تأكيد الحجز"                    : "Confirm Booking",
    addons:   isArabic ? "📸 إضافات"                       : "📸 Additional Options",
    popular:  isArabic ? "الأكثر طلباً"                   : "Most Popular",
    empty:    isArabic ? "لا توجد باقات متاحة حالياً"     : "No packages available at the moment",
    note: isArabic
      ? "حين تغيير موعد الزفاف، لا يتم إلغاء الحجز ويمكن فقط تعديل تاريخ التصوير."
      : "When changing the wedding date, the booking will not be canceled — you can only modify the photography date.",
    egp:      isArabic ? "جنيه"                            : "EGP",
    gifts:    isArabic ? "🎁 الهدايا"                      : "🎁 Gifts",
  };
}
