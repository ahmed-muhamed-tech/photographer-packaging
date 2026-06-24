// Popup الحجز - منفصل عن صفحة الباقات عشان الكود يبقى أنظف

export default function BookingPopup({ isArabic, bookingData, setBookingData, onClose, onConfirm, t }) {
  return (
    // الخلفية الداكنة - لو ضغط عليها بتقفل الـ Popup
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
    >
      {/* الـ Card نفسه - stopPropagation عشان متقفلش لما تضغط جوا */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-gray-900 border border-indigo-500/30 rounded-3xl p-8 shadow-2xl relative"
      >
        {/* زرار الإغلاق */}
        <button
          onClick={onClose}
          className={`absolute ${isArabic ? "left-4" : "right-4"} top-4 text-gray-400 hover:text-white text-2xl cursor-pointer`}
        >
          ×
        </button>

        {/* العنوان */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            {t.bookDate}
          </h2>
          <p className="text-gray-400 mt-2 text-sm">{t.bookSub}</p>
        </div>

        {/* الفورم */}
        <div className="space-y-5">
          <div>
            <label className="block mb-2 text-gray-300 font-medium">{t.dateLabel}</label>
            <input
              type="text"
              value={bookingData.date}
              onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
            />
          </div>

          <button
            onClick={onConfirm}
            className="w-full mt-4 py-3 rounded-2xl font-bold text-white bg-linear-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-indigo-500/20"
          >
            {t.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}
