import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Color Scheme
const colors = {
  primary: "#ff12a4", // Deep Purple
  secondary: "#C05898", // Light Purple
  background: "#09090B", // Almost Black
  text: "#E2E8F0", // Light Gray
  paragraph: "#A1A1AA", // Muted Gray
};

// Terms Data
const terms = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By using RunwayML, you agree to abide by our terms and policies. Continued use of the platform indicates your acceptance. We reserve the right to modify these terms at any time, and it is your responsibility to stay updated. Failure to comply may result in account suspension or termination.",
  },
  {
    title: "2. Text-to-Video Generation",
    content:
      "RunwayML’s text-to-video generation tool is designed to create professional-quality videos. Users must ensure their generated content aligns with ethical standards and does not violate intellectual property rights. Any misuse or unauthorized distribution may lead to restrictions on access.",
  },
  {
    title: "3. Video Script Writing",
    content:
      "Our AI-powered scriptwriting tool helps users create engaging and coherent scripts. Users must interact responsibly and avoid generating harmful, offensive, or misleading content. RunwayML reserves the right to monitor and restrict access if violations occur.",
  },
  {
    title: "4. Short Movie Creation",
    content:
      "RunwayML’s short movie creation tool is intended for creative and professional use. Users must ensure their content adheres to ethical guidelines and does not infringe on copyrights. Any misuse may result in account restrictions or termination.",
  },
  {
    title: "5. YouTube Video Production",
    content:
      "Our YouTube video production tools are designed to help users create high-quality content. Users must comply with YouTube’s community guidelines and avoid generating misleading or harmful content. RunwayML reserves the right to monitor and enforce these standards.",
  },
];

// Framer Motion Variants
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Terms = () => {
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 md:px-12 py-20"
      style={{ backgroundColor: colors.background }}
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-5xl font-extrabold text-center mb-12"
        style={{ color: colors.primary }}
      >
        {t("Terms & Conditions")}
      </motion.h1>

      {/* Terms Section */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-4xl space-y-10"
      >
        {terms.map((term, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="p-8 rounded-xl shadow-lg transition-all"
            style={{
              backgroundColor: colors.secondary,
              borderLeft: `8px solid ${colors.primary}`,
            }}
          >
            <h3
              className="text-3xl font-bold mb-4"
              style={{ color: colors.primary }}
            >
              {t(term.title)}
            </h3>
            <p
              className="text-lg leading-relaxed"
              style={{ color: colors.text }}
            >
              {t(term.content)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Terms;