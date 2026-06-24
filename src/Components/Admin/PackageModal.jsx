import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { Icon } from "./AdminIcons";
import { Field, LangTabs, inputCls } from "./AdminUI";

// Modal إضافة وتعديل الباقات
export default function PackageModal({ pkg, onSave, onClose }) {
  const isEdit = !!pkg?.id; // لو في id معناها تعديل، لو لأ معناها إضافة جديدة
  const [lang, setLang]     = useState("ar");
  const [loading, setLoading] = useState(false);

  // بنحول الـ arrays لـ strings عشان نعرضها في الـ textarea
  const arrayToString = (arr) => (Array.isArray(arr) ? arr.join("\n") : arr || "");

  const [form, setForm] = useState({
    title:       pkg?.title       || "",
    title_en:    pkg?.title_en    || "",
    old_price:   pkg?.old_price   || "",
    new_price:   pkg?.new_price   || "",
    features:    arrayToString(pkg?.features),
    features_en: arrayToString(pkg?.features_en),
    gifts:       arrayToString(pkg?.gifts),
    gifts_en:    arrayToString(pkg?.gifts_en),
    popular:     pkg?.popular     || false,
  });

  // بنحول الـ string للـ array تاني لما بنحفظ
  const stringToArray = (str) => str.split("\n").map((s) => s.trim()).filter(Boolean);

  async function handleSave() {
    if (!form.title || !form.new_price) {
      return alert("الاسم العربي والسعر مطلوبين");
    }

    setLoading(true);

    const payload = {
      title:       form.title.trim(),
      title_en:    form.title_en.trim() || form.title.trim(), // لو مفيش إنجليزي بنحط العربي
      old_price:   Number(form.old_price) || null,
      new_price:   Number(form.new_price),
      features:    stringToArray(form.features),
      features_en: stringToArray(form.features_en),
      gifts:       stringToArray(form.gifts),
      gifts_en:    stringToArray(form.gifts_en),
      popular:     form.popular,
    };

    let error;
    if (isEdit) {
      ({ error } = await supabase.from("packages").update(payload).eq("id", pkg.id));
    } else {
      ({ error } = await supabase.from("packages").insert(payload));
    }

    setLoading(false);
    if (error) return alert("حصل خطأ: " + error.message);
    onSave();
  }

  const isArabic = lang === "ar";

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-gray-900 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        dir="rtl"
      >
        {/* الهيدر */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white">{isEdit ? "تعديل الباقة" : "باقة جديدة"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition"><Icon.X /></button>
        </div>

        {/* تابات اللغة */}
        <LangTabs active={lang} onChange={setLang} />

        <div className="space-y-4">

          {/* الحقول بتتغير حسب اللغة المختارة */}
          {isArabic ? (
            <>
              <Field label="اسم الباقة (عربي)">
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputCls}
                  placeholder="مثال: باقة الفرح الكامل"
                  dir="rtl"
                />
              </Field>
              <Field label="المميزات (كل سطر مميز)">
                <textarea
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  className={inputCls + " h-28 resize-none"}
                  placeholder={"فوتو سيشن\nتصوير قاعة\nعدد 1 مصور"}
                  dir="rtl"
                />
              </Field>
              <Field label="الهدايا (كل سطر هدية)">
                <textarea
                  value={form.gifts}
                  onChange={(e) => setForm({ ...form, gifts: e.target.value })}
                  className={inputCls + " h-20 resize-none"}
                  placeholder={"البوم كبير 30x45\nتابلوه"}
                  dir="rtl"
                />
              </Field>
            </>
          ) : (
            <>
              <Field label="Package Name (English)">
                <input
                  value={form.title_en}
                  onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                  className={inputCls}
                  placeholder="e.g. Full Day Wedding"
                  dir="ltr"
                />
              </Field>
              <Field label="Features (one per line)">
                <textarea
                  value={form.features_en}
                  onChange={(e) => setForm({ ...form, features_en: e.target.value })}
                  className={inputCls + " h-28 resize-none"}
                  placeholder={"Photo Session\nHall Coverage\n1 Photographer"}
                  dir="ltr"
                />
              </Field>
              <Field label="Gifts (one per line)">
                <textarea
                  value={form.gifts_en}
                  onChange={(e) => setForm({ ...form, gifts_en: e.target.value })}
                  className={inputCls + " h-20 resize-none"}
                  placeholder={"Photobook 30x45\nPortrait"}
                  dir="ltr"
                />
              </Field>
            </>
          )}

          {/* السعر مشترك للغتين */}
          <div className="grid grid-cols-2 gap-4 pt-1 border-t border-gray-800">
            <Field label="السعر القديم / Old Price">
              <input
                type="number"
                value={form.old_price}
                onChange={(e) => setForm({ ...form, old_price: e.target.value })}
                className={inputCls}
                placeholder="3500"
              />
            </Field>
            <Field label="السعر الجديد / New Price">
              <input
                type="number"
                value={form.new_price}
                onChange={(e) => setForm({ ...form, new_price: e.target.value })}
                className={inputCls}
                placeholder="2500"
              />
            </Field>
          </div>

          {/* مفتاح الباقة المميزة */}
          <label className="flex items-center gap-3 cursor-pointer pt-1">
            <div
              onClick={() => setForm({ ...form, popular: !form.popular })}
              className={`w-10 h-6 rounded-full transition-colors duration-200 relative ${form.popular ? "bg-indigo-500" : "bg-gray-700"}`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${form.popular ? "right-1" : "right-5"}`} />
            </div>
            <span className="text-gray-300 text-sm">باقة مميزة (Popular)</span>
          </label>
        </div>

        {/* زرار الحفظ */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-6 w-full py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Icon.Save />
          {loading ? "جاري الحفظ..." : isEdit ? "حفظ التعديلات" : "إضافة الباقة"}
        </button>
      </div>
    </div>
  );
}
