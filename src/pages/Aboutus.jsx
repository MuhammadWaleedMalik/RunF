import React from "react";
import { useTranslation } from "react-i18next";

const colors = {
  primary: "#ff12a4", // Deep Purple
  secondary: "#C05898", // Light purple
  background: "#09090B", // Almost Black
  text: "#E2E8F0", // Light Gray
  paragraph: "#A1A1AA", // Muted Gray
};

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div style={{ backgroundColor: colors.background }} className="min-h-screen flex flex-col items-center px-6 md:px-12 py-20">
      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-center mb-8" style={{ color: colors.primary }}>
        {t("Welcome to Runway ML")}
      </h1>

      {/* Description */}
      <p className="text-xl text-center max-w-4xl px-6 md:px-0 mb-12 leading-relaxed font-medium" style={{ color: colors.text }}>
        {t(
          "Runway ML empowers creators by transforming text into stunning videos effortlessly. Whether you're a filmmaker, YouTuber, or marketer, our AI-driven platform helps you craft cinematic visuals with ease. No technical skills needed – just your creativity!"
        )}
      </p>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {[
          {
            title: "AI-Powered Video Generation",
            description: "Turn your ideas into professional-quality videos with AI-enhanced visuals."
          },
          {
            title: "Effortless Editing",
            description: "Create and refine videos seamlessly with our intuitive and user-friendly tools."
          },
          {
            title: "Perfect for Creators",
            description: "Whether you're a YouTuber, filmmaker, or marketer, bring your vision to life."
          },
          {
            title: "Seamless Integration",
            description: "Incorporate AI-generated videos into your workflow with just a few clicks."
          }
        ].map((feature, index) => (
          <div key={index} className="p-6 rounded-xl bg-gray-800 shadow-lg hover:shadow-xl transition-all border border-pink-500">
            <h3 className="text-2xl font-bold mb-3" style={{ color: colors.primary }}>
              {t(feature.title)}
            </h3>
            <p className="text-lg" style={{ color: colors.text }}>
              {t(feature.description)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
