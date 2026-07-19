import { useState } from "react";
import { Icon } from "./AdminIcons";
import { supabase } from "../../supabaseClient";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";

// كلمة السر بتيجي من ملف .env.local
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

// شاشة الدخول للأدمن
export default function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  async function signIn() {
    setIsLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(
        error.message === "Invalid login credentials" &&
          "الايميل او كلمه المرور غير صحيحه",
      );
    } else {
      onLogin();
    }
    setIsLoading(false)
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (password.trim() && email.trim()) {
      signIn();
    } else {
      setError("لا يجب ان تكون اي خانه فارغه");
      setPassword("");
    }
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gray-950 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl">
        {/* الهيدر */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Icon.Lock />
          </div>
          <h1 className="text-2xl font-bold text-white">لوحة الإدارة</h1>
          <p className="text-gray-400 text-sm">أدخل كلمة المرور للمتابعة</p>
        </div>

        {/* فورم الدخول */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="البريد الالكتروني"
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition text-right"
          />

          <div className="w-full  flex gap-2 items-center bg-gray-800 overflow-hidden pl-4 border border-gray-700 rounded-2xl  text-white outline-none focus-within:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition text-right">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              className=" px-4 py-3 flex-1 outline-none"
            />
            <div className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <IoMdEye /> : <FaRegEyeSlash />}
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            disabled={isLoading}
            type="submit"
            className="cursor-pointer w-full py-3 rounded-2xl font-bold text-white bg-linear-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition"
          >
            {isLoading ? "جاري تسجيل الدخول..." : "دخول"}
          </button>
        </form>
      </div>
    </div>
  );
}
