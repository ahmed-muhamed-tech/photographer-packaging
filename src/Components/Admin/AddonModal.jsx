import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { Icon } from "./AdminIcons";
import { Field, LangTabs, inputCls } from "./AdminUI";

// Modal إضافة وتعديل الإضافات (Addons)
export default function AddonModal({ addon, onSave, onClose }) {
  const isEdit = !!addon?.id;
  const [lang, setLang]       = useState("ar");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    text:    addon?.text    || "",
    text_en: addon?.text_en || "",
    price:   addon?.price   || "",
  });

  async function handleSave() {
    if (!form.text || !form.price) {
      return alert("الوصف العربي والسعر مطلوبين");
    }

    setLoading(true);

    const payload = {
      text:    form.text.trim(),
      text_en: form.text_en.trim() || form.text.trim(),
      price:   form.price.trim(),
    };

    let error;
    if (isEdit) {
      ({ error } = await supabase.from("addons").update(payload).eq("id", addon.id));
    } else {
      ({ error } = await supabase.from("addons").insert(payload));
    }

    setLoading(false);
    if (error) return alert("حصل خطأ: " + error.message);
    onSave();
  }

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-gray-900 border border-purple-500/30 rounded-3xl p-6 shadow-2xl"
        dir="rtl"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white">{isEdit ? "تعديل الإضافة" : "إضافة جديدة"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition"><Icon.X /></button>
        </div>

        <LangTabs active={lang} onChange={setLang} />

        <div className="space-y-4">
          {lang === "ar" ? (
            <Field label="وصف الإضافة (عربي)">
              <input
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                className={inputCls}
                placeholder="مثال: مصور إضافي"
                dir="rtl"
              />
            </Field>
          ) : (
            <Field label="Add-on Description (English)">
              <input
                value={form.text_en}
                onChange={(e) => setForm({ ...form, text_en: e.target.value })}
                className={inputCls}
                placeholder="e.g. Extra Photographer"
                dir="ltr"
              />
            </Field>
          )}

          <Field label="السعر / Price">
            <input
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className={inputCls}
              placeholder="1500 جنيه / 1500 EGP"
            />
          </Field>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-6 w-full py-3 rounded-2xl font-bold text-white bg-linear-to-r from-purple-500 to-indigo-600 hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Icon.Save />
          {loading ? "جاري الحفظ..." : isEdit ? "حفظ التعديلات" : "إضافة"}
        </button>
      </div>
    </div>
  );
}
