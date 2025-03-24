import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Footer = () => {
  const { t } = useTranslation();

  const website = {
    name: "RunwayML 🚀",
    slogan: "Turn Text into Stunning Videos |  YouTube Videos Made Easy 🎉",
  };
  
  const colors = {
    primary: "#9333EA", // Deep Purple
    secondary: "#C05898", // Light purple
    background: "#09090B", // Almost Black
    text: "#E2E8F0", // Light Gray
    paragraph: "#A1A1AA", // Muted Gray
  };

  return (
    <footer style={{ backgroundColor: colors.background, color: colors.text }} className="pt-16 pb-10 w-full">
      <div className="w-full px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row justify-between items-start">
        {/* Left Side - Website Name & Slogan */}
        <div className="w-full md:w-1/3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to="/"
              className="text-5xl italic font-extrabold tracking-wide"
              style={{ color: colors.secondary }}
            >
              {t(website.name)}
            </Link>
          </motion.div>
          <motion.p
            whileHover={{ x: 5, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{ color: colors.paragraph }}
            className="mt-2 text-lg italic"
          >
            {t(website.slogan)}
          </motion.p>
        </div>

        {/* Right Side - Links */}
        <div className="w-full md:w-2/3 flex justify-between gap-12 mt-10 md:mt-0">
          {/* Company Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-left"
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3 className="text-2xl font-semibold mb-3" style={{ color: colors.secondary }}>
              {t("Company")}
            </h3>
            <ul className="space-y-2 text-lg">
              <li>
                <Link to="/aboutus" className="hover:text-white transition-all duration-300">
                  {t("About Us")}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-all duration-300">
                  {t("Blogs")}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Legal Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-left"
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3 className="text-2xl font-semibold mb-3" style={{ color: colors.secondary }}>
              {t("Legal")}
            </h3>
            <ul className="space-y-2 text-lg">
              <li>
                <Link to="/terms" className="hover:text-white transition-all duration-300">
                  {t("Terms")}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-all duration-300">
                  {t("Privacy")}
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Footer Bottom */}
      <motion.div
        className="border-t border-gray-700 mt-12 pt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="text-lg italic" style={{ color: colors.paragraph }}>
          &copy; {new Date().getFullYear()} {t(website.name)}. {t("All rights reserved.")}
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
