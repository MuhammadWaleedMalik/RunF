import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// Color Scheme

const colors = {
  primary: "#ff12a4", // Deep Purple
  secondary: "#C05898", // Light purple
  background: "#09090B", // Almost Black
  text: "#E2E8F0", // Light Gray
  paragraph: "#A1A1AA", // Muted Gray
};

// Blog Data
const blogs = [
  {
    title: "Text-to-Video Generation",
    content:
      "RunwayML revolutionizes video creation with its AI-powered text-to-video generation. Simply describe your idea in text, and our advanced AI transforms it into a stunning video. Whether you're creating short films, YouTube content, or marketing videos, RunwayML ensures professional-quality results. The tool understands context, tone, and style, allowing you to produce videos that match your vision perfectly. Save time and effort while unlocking endless creative possibilities with RunwayML's cutting-edge technology.",
  },
  {
    title: "Video Script Writing",
    content:
      "Craft compelling video scripts effortlessly with RunwayML's AI-driven scriptwriting tool. Whether you're working on a short film, a documentary, or a YouTube video, our AI helps you generate engaging and coherent scripts. The tool analyzes your input, suggests improvements, and ensures your script flows naturally. With RunwayML, you can focus on storytelling while the AI handles the technical details. Create scripts that captivate your audience and bring your ideas to life with ease.",
  },
  {
    title: "Short Movie Creation",
    content:
      "RunwayML makes short movie creation accessible to everyone. Our AI-powered platform guides you through every step, from scriptwriting to video editing. With intuitive tools and pre-built templates, you can produce high-quality short films in minutes. Whether you're a beginner or a seasoned filmmaker, RunwayML provides the resources you need to tell your story. Experiment with different styles, genres, and effects to create movies that stand out and leave a lasting impression.",
  },
  {
    title: "YouTube Video Production",
    content:
      "Create professional YouTube videos with RunwayML's AI-powered tools. From scripting to editing, our platform simplifies the entire production process. Generate eye-catching thumbnails, add dynamic transitions, and enhance your videos with AI-driven effects. RunwayML ensures your content is optimized for engagement and visibility. Whether you're a content creator or a business, our tools help you produce videos that resonate with your audience and grow your channel.",
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

const Blog = () => {
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 md:px-12 py-20"
      style={{ backgroundColor: colors.background }}
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-center mb-12"
        style={{ color: colors.primary }}
      >
        {t("RunwayML Blogs")}
      </motion.h1>

      {/* Blog Section */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl space-y-10"
      >
        {blogs.map((blog, index) => (
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
              style={{ color: "black" }}
            >
              {t(blog.title)}
            </h3>
            <p
              className="text-lg leading-relaxed"
              style={{ color: colors.text }}
            >
              {t(blog.content)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Blog;