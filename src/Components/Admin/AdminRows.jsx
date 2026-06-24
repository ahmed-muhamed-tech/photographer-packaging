import { Icon } from "./AdminIcons";

// صف الباقة الواحدة في القائمة
export function PackageRow({ pkg, onEdit, onDelete }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center justify-between gap-4">

      {/* معلومات الباقة */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="font-bold text-white truncate">{pkg.title}</h3>
          {pkg.title_en && <span className="text-gray-500 text-xs truncate">/ {pkg.title_en}</span>}
          {pkg.popular && (
            <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Icon.Star /> مميز
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm flex-wrap">
          {pkg.old_price && <span className="text-gray-500 line-through">{pkg.old_price} جنيه</span>}
          <span className="text-indigo-400 font-semibold">{pkg.new_price} جنيه</span>
          <span className="text-gray-600 text-xs">
            {(pkg.features || []).length} مميز عربي · {(pkg.features_en || []).length} EN
          </span>
        </div>
      </div>

      {/* أزرار التحكم */}
      <div className="flex items-center gap-2 shrink-0">
        <button onClick={onEdit} className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition">
          <Icon.Edit />
        </button>
        <button onClick={onDelete} className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition">
          <Icon.Trash />
        </button>
      </div>
    </div>
  );
}

// صف الإضافة الواحدة في القائمة
export function AddonRow({ addon, onEdit, onDelete }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center justify-between gap-4">

      {/* معلومات الإضافة */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{addon.text}</p>
        {addon.text_en && <p className="text-gray-500 text-xs truncate">{addon.text_en}</p>}
        <p className="text-purple-400 text-sm font-semibold mt-0.5">{addon.price}</p>
      </div>

      {/* أزرار التحكم */}
      <div className="flex items-center gap-2 shrink-0">
        <button onClick={onEdit} className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition">
          <Icon.Edit />
        </button>
        <button onClick={onDelete} className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition">
          <Icon.Trash />
        </button>
      </div>
    </div>
  );
}
