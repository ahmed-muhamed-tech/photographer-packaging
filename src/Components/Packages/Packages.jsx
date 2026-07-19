import { useState, useContext } from "react";
import { toast } from "react-toastify";

import { LanguageContext } from "../../Contexts/LanguageContext";
import { usePackagesData } from "../../hooks/usePackagesData";
import { getTranslations } from "../../constants/translations";

import LoadingSpinner from "../LoadingSpinner";
import BookingPopup from "./BookingPopup";
import PackageCard from "./PackageCard";
import AddonsList from "./AddonsList";

export default function Packages() {
  const { language } = useContext(LanguageContext);
  const isArabic = language === "ar";

  // custom hook fetch data from supabase
  const { packages, addons, loading } = usePackagesData();

  // state الـ Popup
  const [showPopup, setShowPopup] = useState(false);
  const [bookingData, setBookingData] = useState({ date: "", namePackage: "" });

  // النصوص حسب اللغة
  const t = getTranslations(isArabic);

  // لما المستخدم يضغط "احجز الآن"
  function handleBook(packageTitle) {
    setBookingData({ date: "", namePackage: packageTitle });
    setShowPopup(true);
  }

  // لما يضغط "تأكيد الحجز"
  function handleConfirm() {
    if (!bookingData.date) {
      toast.error(
        isArabic ? "يجب ملأ جميع البيانات" : "Please fill in all fields",
      );
      return;
    }

    const phone = "201007021051";
    const message = encodeURIComponent(
      isArabic
        ? `طلب حجز جديد\nتاريخ الحجز: ${bookingData.date}\nالباقة المطلوبة: ${bookingData.namePackage}\nيرجى التواصل لتأكيد الحجز.`
        : `New Booking Request\nBooking Date: ${bookingData.date}\nPackage: ${bookingData.namePackage}\nPlease contact us to confirm.`,
    );

    // بيفتح WhatsApp بالرسالة الجاهزة
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  }

  // لو البيانات بتتحمل
  if (loading) return <LoadingSpinner />;

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="bg-gray-950 relative text-white min-h-screen p-6 sm:p-10"
    >
      {/* Popup الحجز */}
      {showPopup && (
        <BookingPopup
          isArabic={isArabic}
          bookingData={bookingData}
          setBookingData={setBookingData}
          onClose={() => setShowPopup(false)}
          onConfirm={handleConfirm}
          t={t}
        />
      )}

      <div className="container mx-auto">
        {/* العنوان الرئيسي */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center my-16">
          <span className="bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            {t.title}
          </span>
        </h1>

        {/* الباقات */}
        {packages.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">{t.empty}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                isArabic={isArabic}
                t={t}
                onBook={handleBook}
              />
            ))}
          </div>
        )}

        {/* الإضافات */}
        <AddonsList addons={addons} isArabic={isArabic} t={t} />

        {/* ملاحظة في الأسفل */}
        <div className="text-center mt-16 text-lg bg-indigo-600 py-4 rounded-xl shadow-lg">
          {t.note}
        </div>
      </div>
    </section>
  );
}
