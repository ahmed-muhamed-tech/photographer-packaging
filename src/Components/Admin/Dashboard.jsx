import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

import { Icon } from "./AdminIcons";
import { LoadingDots, EmptyState, StatCard } from "./AdminUI";
import { PackageRow, AddonRow } from "./AdminRows";
import PackageModal from "./PackageModal";
import AddonModal   from "./AddonModal";

// الداشبورد الرئيسي بعد تسجيل الدخول
export default function Dashboard({ onLogout }) {
  const [tab, setTab] = useState("packages"); 

  const [packages, setPackages]         = useState([]);
  const [addons, setAddons]             = useState([]);
  const [loadingPkgs, setLoadingPkgs]   = useState(true);
  const [loadingAddons, setLoadingAddons] = useState(true);

 
  const [pkgModal, setPkgModal]     = useState(null);
  const [addonModal, setAddonModal] = useState(null);

  useEffect(() => {
    fetchPackages();
    fetchAddons();
  }, []);

  async function fetchPackages() {
    setLoadingPkgs(true);
    const { data } = await supabase.from("packages").select("*").order("created_at");
    setPackages(data || []);
    setLoadingPkgs(false);
  }

  async function fetchAddons() {
    setLoadingAddons(true);
    const { data } = await supabase.from("addons").select("*").order("created_at");
    setAddons(data || []);
    setLoadingAddons(false);
  }

  async function deletePackage(id) {
    if (!confirm("هتحذف الباقة دي؟")) return;
    await supabase.from("packages").delete().eq("id", id);
    fetchPackages();
  }

  async function deleteAddon(id) {
    if (!confirm("هتحذف الإضافة دي؟")) return;
    await supabase.from("addons").delete().eq("id", id);
    fetchAddons();
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-950 text-white">

      {/* Modals */}
      {pkgModal !== null && (
        <PackageModal
          pkg={pkgModal?.id ? pkgModal : null}
          onSave={() => { setPkgModal(null); fetchPackages(); }}
          onClose={() => setPkgModal(null)}
        />
      )}
      {addonModal !== null && (
        <AddonModal
          addon={addonModal?.id ? addonModal : null}
          onSave={() => { setAddonModal(null); fetchAddons(); }}
          onClose={() => setAddonModal(null)}
        />
      )}

      {/* الهيدر */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Icon.Star />
          </div>
          <div>
            <h1 className="font-bold text-white text-lg mb-3 leading-none">لوحة الإدارة</h1>
            <p className="text-gray-500 text-xs">Fayoumdis Photography</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="text-gray-500 hover:text-white text-sm transition px-3 py-1.5 rounded-xl hover:bg-gray-800"
        >
          خروج
        </button>
      </header>

      {/* الإحصائيات */}
      <div className="grid grid-cols-2 gap-4 p-6 pb-0">
        <StatCard label="عدد الباقات"   value={packages.length} accent="indigo" icon={<Icon.Package />} />
        <StatCard label="عدد الإضافات" value={addons.length}   accent="purple" icon={<Icon.Star />} />
      </div>

      {/* تابات التنقل */}
      <div className="flex gap-1 mx-6 mt-6 p-1 bg-gray-900 rounded-2xl border border-gray-800">
        {[
          { key: "packages", label: "الباقات" },
          { key: "addons",   label: "الإضافات" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${
              tab === t.key
                ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* المحتوى */}
      <main className="p-6">

        {/* تاب الباقات */}
        {tab === "packages" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">الباقات</h2>
              <button
                onClick={() => setPkgModal({})}
                className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
              >
                <Icon.Plus /> إضافة باقة
              </button>
            </div>

            {loadingPkgs ? (
              <LoadingDots />
            ) : packages.length === 0 ? (
              <EmptyState label="مفيش باقات لسه، اضغط إضافة باقة" />
            ) : (
              <div className="space-y-3">
                {packages.map((pkg) => (
                  <PackageRow
                    key={pkg.id}
                    pkg={pkg}
                    onEdit={() => setPkgModal(pkg)}
                    onDelete={() => deletePackage(pkg.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* تاب الإضافات */}
        {tab === "addons" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">الإضافات</h2>
              <button
                onClick={() => setAddonModal({})}
                className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
              >
                <Icon.Plus /> إضافة جديدة
              </button>
            </div>

            {loadingAddons ? (
              <LoadingDots />
            ) : addons.length === 0 ? (
              <EmptyState label="مفيش إضافات لسه، اضغط إضافة جديدة" />
            ) : (
              <div className="space-y-3">
                {addons.map((addon) => (
                  <AddonRow
                    key={addon.id}
                    addon={addon}
                    onEdit={() => setAddonModal(addon)}
                    onDelete={() => deleteAddon(addon.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
