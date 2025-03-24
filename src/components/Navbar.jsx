import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX, FiChevronDown, FiGlobe } from 'react-icons/fi';



const colors = {
  primary: "#ff12a4", // Deep Purple
  white : "white" ,
  secondary: "#C05898", // Light purple
  background: "#09090B", // Almost Black
  text: "#E2E8F0", // Light Gray
  paragraph: "#A1A1AA", // Muted Gray
};

const website = {
  name: "RunwayML 🚀",
  slogan: "Turn Text into Stunning Videos 🎥 | Create Short Films 🎬 | YouTube Videos Made Easy 🎉",
};


const Navbar = () => {
  
  const { t, i18n } = useTranslation();
  const  isAuthenticated =localStorage.getItem('token')
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAIFeaturesOpen, setIsAIFeaturesOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const aiDropdownRef = useRef(null);
  const langDropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aiDropdownRef.current && !aiDropdownRef.current.contains(event.target )) {
        setIsAIFeaturesOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target )) {
        setIsLanguageMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAIFeatures = () => setIsAIFeaturesOpen(!isAIFeaturesOpen);
  const toggleLanguageMenu = () => setIsLanguageMenuOpen(!isLanguageMenuOpen);
  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  return (
    <nav 
    className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-red/90 backdrop-blur-md' : 'bg-red'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <img src={"/images/deep_arena.jpg"} alt="Logo Image" className="w-12 h-12 object-contain" />
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-[32px] font-bold font-mono "
                style={{ color: colors.primary }}
              >{website.name}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
       
            <NavLink to="/" style={{ color: colors.primary }} className="nav-link">
              {t('home')}
            </NavLink>
            <NavLink to="/pricing" style={{ color: colors.primary }} className="nav-link">
              {t('pricing')}
            </NavLink>
            <NavLink to="/blog" style={{ color: colors.primary }} className="nav-link">
              {t('blog')}
            </NavLink>

          
          

            {/* AI Features Dropdown */}
            <div className="relative" ref={aiDropdownRef}>
              <button 
                style={{ color: colors.primary , hover: "blue"}}
              className="nav-link  flex items-center" onClick={toggleAIFeatures}>
                {t('aiFeatures')} <FiChevronDown className={`ml-1 transition-transform ${isAIFeaturesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isAIFeaturesOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-[#CADCFC] text-black border border-[#00246B] z-50">
                  {["Generate Videos", "Generate Shorts", "Video Script", "Video Script Enhancer"].map((feature) => (
                    <NavLink key={feature} to={`/ai-features/${feature}`} className="block px-4 py-2 text-sm hover:bg-[#00246B] hover:text-[#CADCFC]">
                      {t(feature)}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Language Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                style={{ color: colors.primary , hover: "blue"}}
                className="nav-link flex items-center" onClick={toggleLanguageMenu}>
                <FiGlobe className="mr-1" /> {languages.find(lang => lang.code === i18n.language)?.name || 'English'}
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-[#CADCFC] text-black border border-[#00246B] z-50">
                
                  {languages.map((language) => (
                    <button key={language.code} onClick={() => changeLanguage(language.code)} className="w-full text-left block px-4 py-2 text-sm 
                    hover:bg-[#00246B] hover:text-[#CADCFC] ">
                      {language.nativeName} ({language.name})
                    </button>
                  ))}
                </div>
              )}
        
        
            </div>
      
      
      
          </div>

          {/* Authentication */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <button onClick={()=>{localStorage.removeItem('token'); window.location.reload();}} className="btn bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded">
                {t('logout')}
              </button>
            ) : (
              <>

              {/* #CADCFC #00246B */}
                <Link to="/login"
                className="btn  hover:bg-[white] hover:text-[#00246B]  px-4 py-2 rounded"
                style={{ color: colors.white , backgroundColor: colors.primary  }}
                
                  >
                  {t('login')}
                </Link>
                <Link to="/signup" 
                
                className="btn  hover:bg-[rgb(255,255,255)] hover:text-[#00246B]  px-4 py-2 rounded"
                style={{ color: colors.white , backgroundColor: colors.primary  }}
           
                >
                
                  {t('signup')}
                </Link>
              </>
            )}
          </div>
        </div>
        </div>









        <div className="flex justify-end items-center">
  {/* Menu Button (Mobile Only) */}
  <button onClick={toggleMenu} className="text-3xl md:hidden" style={{ color: colors.text }}>
    {isMenuOpen ? <FiX /> : <FiMenu />}
  </button>
</div>

{/* Mobile Menu Overlay */}
{isMenuOpen && (
  <div
    className="fixed inset-0 flex flex-col items-center justify-center space-y-6 text-xl z-50 w-screen h-screen"
    style={{ backgroundColor: colors.background, color: colors.text }}
  >
    <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 text-3xl" style={{ color: colors.text }}>
      <FiX />
    </button>

    {/* Navigation Links */}
    <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="transition-colors hover:text-[blue]">
      {t("home")}
    </NavLink>
    <NavLink to="/pricing" onClick={() => setIsMenuOpen(false)} className="transition-colors hover:text-[blue]">
      {t("pricing")}
    </NavLink>
    <NavLink to="/blog" onClick={() => setIsMenuOpen(false)} className="transition-colors hover:text-[blue]">
      {t("blog")}
    </NavLink>

    {/* AI Features Dropdown */}
    <div className="relative" ref={aiDropdownRef}>
      <button
        className="nav-link flex items-center transition-colors hover:text-[blue]"
        onClick={toggleAIFeatures}
      >
        {t("aiFeatures")}
        <FiChevronDown className={`ml-1 transition-transform ${isAIFeaturesOpen ? "rotate-180" : ""}`} />
      </button>

      {isAIFeaturesOpen && (
        <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg border z-50"
          style={{ backgroundColor: colors.secondary, color: colors.text, borderColor: colors.primary }}>
          {["Generate Videos", "Generate Shorts", "Video Script", "Video Script Enhancer"].map((feature) => (
            <NavLink
              key={feature}
              to={`/ai-features/${feature}`}
              className="block px-4 py-2 text-sm transition-colors"
              style={{ color: colors.background }}
            >
              {t(feature)}
            </NavLink>
          ))}
        </div>
      )}
    </div>

    {/* Language Dropdown */}
    <div className="relative" ref={langDropdownRef}>
      <button className="nav-link flex items-center transition-colors hover:text-[blue]" onClick={toggleLanguageMenu}>
        <FiGlobe className="mr-1" /> {languages.find((lang) => lang.code === i18n.language)?.name || "English"}
      </button>

      {isLanguageMenuOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg border z-50"
          style={{ backgroundColor: colors.secondary, color: colors.background, borderColor: colors.primary }}>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className="w-full text-left block px-4 py-2 text-sm transition-colors hover:text-[#CADCFC]"
            >
              {language.nativeName} ({language.name})
            </button>
          ))}
        </div>
      )}
    </div>

    {/* Authentication Buttons */}
    {isAuthenticated ? (
      <button
        onClick={() => {
          ()=>{localStorage.removeItem('token'); window.location.reload() ;
            
          }
          setIsMenuOpen(false);
        }}
        className="btn px-4 py-2 rounded transition-colors"
        style={{ backgroundColor: "red", color: colors.text }}
      >
        {t("logout")}
      </button>
    ) : (
      <>
        <Link
          to="/login"
          className="btn px-4 py-2 rounded transition-colors"
          onClick={() => setIsMenuOpen(false)}
          style={{ backgroundColor: colors.white, color: colors.background }}
        >
          {t("login")}
        </Link>
        <Link
          to="/signup"
          onClick={() => setIsMenuOpen(false)}
          className="btn px-4 py-2 rounded transition-colors"
          style={{ backgroundColor: colors.white , color: colors.background }}
        >
          {t("signup")}
        </Link>
      </>
    )}
  </div>
)}









    </nav>
  );
};

export default Navbar;





















