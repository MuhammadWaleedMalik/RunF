import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useGroq } from "../../hooks/useGroq"; // Import the useGroq hook

const colors = {
  primary: "#ff12a4", // Deep Purple
  secondary: "#C05898", // Light Purple
  background: "#09090B", // Dark Background
  textLight: "#E2E8F0", // Light Gray
  accent: "#F472B6", // Pink Accent
};

const VideoScriptCreator = () => {
  const { t } = useTranslation();
  const [userPrompt, setUserPrompt] = useState("");
  const { fetchGroqResponse, response, loading, error } = useGroq(); // Use the useGroq hook

  const handleGenerateScript = async () => {
    if (!userPrompt) return;

    // Call the fetchGroqResponse function from the useGroq hook
    await fetchGroqResponse("Generate a video script based on the following prompt:", userPrompt);
  };

  return (
    <div className="w-full min-h-screen px-6 py-24 flex flex-col items-center" style={{ backgroundColor: colors.background }}>
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold" style={{ color: colors.primary }}>
          {t("Runway ML Video Script Creator")}
        </h1>
        <p className="text-lg mt-2" style={{ color: colors.textLight }}>
          {t("Generate AI-powered video scripts instantly!")}
        </p>
      </motion.div>

      {/* How to Use Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl p-6 rounded-xl border shadow-lg"
        style={{ borderColor: colors.primary, backgroundColor: colors.secondary }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
          {t("How to Use?")}
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-lg" style={{ color: colors.textLight }}>
          <li>{t("Enter your script idea or prompt in the input field.")}</li>
          <li>{t("Click the 'Generate Script' button to create your AI-powered video script.")}</li>
          <li>{t("Review and refine the generated script for your needs!")}</li>
        </ul>
      </motion.div>

      {/* Input and Generate Button */}
      <div
        className="w-full max-w-4xl mt-8 p-6 rounded-xl border shadow-lg flex flex-col"
        style={{ borderColor: colors.primary, backgroundColor: colors.secondary }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: colors.primary }}>
          {t("Enter Your Prompt")}
        </h2>

        <textarea
          className="w-full p-4 rounded-lg border focus:outline-none focus:ring-2"
          style={{ backgroundColor: "transparent", borderColor: colors.primary, color: colors.textLight }}
          rows="4"
          placeholder={t("Type your video script idea...")}
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        ></textarea>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 rounded-lg text-center"
            style={{ backgroundColor: "#ff4444", color: colors.textLight }}
          >
            {error}
          </motion.div>
        )}

        {/* Generate Script Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          onClick={handleGenerateScript}
          className="mt-4 px-6 py-3 rounded-lg transition-all"
          style={{ backgroundColor: colors.primary, color: "#222" }}
          disabled={!userPrompt || loading}
        >
          {loading ? t("Generating...") : t("Generate Script")}
        </motion.button>
      </div>

      {/* Generated Script Output */}
      {response && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl mt-8 p-6 rounded-xl border shadow-lg"
          style={{ borderColor: colors.primary, backgroundColor: colors.secondary }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
            {t("Generated Script")}
          </h2>
          <p className="text-lg" style={{ color: colors.textLight }}>
            {response}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default VideoScriptCreator;