import { useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaTiktok, FaWhatsapp } from "react-icons/fa";

import { LanguageContext } from "../../Contexts/LanguageContext";

// روابط السوشيال ميديا في مكان واحد - سهل التعديل
const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/ELSHAKYphotographer",
    icon: <FaFacebookF />,
    colorClass: "border-blue-600 text-blue-600 hover:text-gray-300 hover:bg-blue-600",
  },
  {
    href: "https://www.instagram.com/mohamed_ali_photography1/?igsh=MWhhNjBldnNramdjYQ%3D%3D#",
    icon: <FaInstagram />,
    colorClass: "border-pink-600 text-pink-600  hover:text-gray-300 hover:bg-pink-600",
  },
  {
    href: "https://wa.me/201007021051",
    icon: <FaWhatsapp />,
    colorClass: "border-green-600 text-green-600  hover:text-gray-300 hover:bg-green-500",
  },
  {
    href: "https://www.tiktok.com/@mohamedali_photographer?_t=ZS-90uL9uOTzW6&_r=1",
    icon: <FaTiktok />,
    colorClass: "border-black text-black hover:text-gray-300 hover:bg-black",
  },
  {
    href: "https://maps.app.goo.gl/DpdpudTZgD68bZZi6",
    icon: <FaMapMarkerAlt />,
    colorClass: "border-indigo-600 text-indigo-600  hover:text-gray-300 hover:bg-indigo-700",
  },
];

export default function Home() {
  const { language, setLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();


  function goToPackages() {
    if (!language) {
      toast.warn("Please choose any language!");
      return;
    }
    navigate("/packages");
  }


  function selectLanguage(lang) {
    localStorage.setItem("lang", lang);
    setLanguage(lang);
  }

  return (
    <section className="home bg-cover bg-center bg-[url(/bgForMob.webp)] lg:bg-[url(/bgForPC.webp)]">
      <div className="container h-screen mx-auto flex items-center justify-center lg:block">

        {/* الكارد الرئيسي */}
        <div className="card lg:text-white bg-gray-900/40 text-black rounded-lg absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2 lg:right-0 lg:top-0 lg:translate-0 py-6 px-4 flex flex-col items-center text-center justify-center w-[80%] max-h-screen lg:w-1/2 lg:h-screen">

          {/* صورة المصور */}
          <img
            src="/MyPhoto.webp"
            className="w-33 lg:w-42 rounded-full absolute -top-18 lg:top-0 border-2 border-white lg:relative"
            alt="mainPhoto"
          />

          {/* الاسم */}
          <h1 className="font-bold text-3xl mb-4 mt-8 lg:mt-0 bg-linear-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Mohamed Ali
          </h1>

          {/* وصف قصير */}
          <p className="text-lg leading-8 mb-10 w-[97%] lg:w-[70%] text-white">
           A passionate photographer capturing timeless moments and transforming every shot into a story that lives forever.
          </p>

          {/* أيقونات السوشيال ميديا */}
          <div className="social flex gap-3 mb-8">
            {SOCIAL_LINKS.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                className={`w-12 h-12 rounded-full cursor-pointer text-xl flex justify-center items-center border-2 hover:text-white transition-all duration-300 hover:border-white ${link.colorClass}`}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* اختيار اللغة */}
          <h3 className="text-2xl font-medium mb-2 text-white">Choose Your Language</h3>

          {/* English */}
          <div
            onClick={() => selectLanguage("en")}
            className="bg-gray-900 py-2 px-1 rounded-md text-white w-full flex items-center gap-1 text-xl mb-2 cursor-pointer"
          >
            <input type="radio" name="language" id="en" readOnly checked={language === "en"} />
            <label htmlFor="en" className="flex-1 text-start cursor-pointer">English</label>
          </div>

          {/* Arabic */}
          <div
            onClick={() => selectLanguage("ar")}
            className="bg-gray-900 py-2 px-1 rounded-md text-white w-full flex items-center gap-1 text-xl cursor-pointer"
          >
            <input type="radio" name="language" id="ar" readOnly checked={language === "ar"} />
            <label htmlFor="ar" className="flex-1 text-start cursor-pointer">Arabic</label>
          </div>

          {/* زرار الانتقال */}
          <button
            onClick={goToPackages}
            className="bg-linear-to-r from-blue-500 to-purple-600 text-2xl border-2 border-transparent transition-all duration-300 hover:text-white hover:border-white py-2 px-4 rounded-md font-semibold cursor-pointer mt-4 w-full"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
