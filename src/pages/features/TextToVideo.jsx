import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useVideo from "../../hooks/useVideo"; // Import the useVideo hook

// Color Scheme
const colors = {
  primary: "#ff12a4", // Deep Purple
  secondary: "#C05898", // Light Purple
  background: "#09090B", // Almost Black
  text: "#E2E8F0", // Light Gray
  paragraph: "#A1A1AA", // Muted Gray
};

const TextToVideo = () => {
  const { t } = useTranslation();
  const [userPrompt, setUserPrompt] = useState("");
  const [players, setPlayers] = useState([]); // Leaderboard data
  const navigate = useNavigate();

  // Use the useVideo hook
  const { videoUrl, loading, error, generateVideo } = useVideo();

  // Check if credits are less than 15 and redirect
  useEffect(() => {
    const credits = parseInt(localStorage.getItem("credits"), 10) || 0;
    if (credits < 15) {
      navigate("/pricing");
    }
  }, [navigate]);

  // Simulated Leaderboard Data
  useEffect(() => {
    const mockData = [
      { id: 1, name: "VideoMaster", score: 1200 },
      { id: 2, name: "CinephileAI", score: 1100 },
      { id: 3, name: "ShortFilmPro", score: 950 },
      { id: 4, name: "RunwayCreator", score: 870 },
      { id: 5, name: "AI_Director", score: 800 },
    ];

    // Sort by highest score
    const sortedData = mockData.sort((a, b) => b.score - a.score);
    setPlayers(sortedData);
  }, []);

  const handleGenerateVideo = async () => {
    if (!userPrompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    // Call the generateVideo function from the useVideo hook
    await generateVideo(userPrompt);
  };

  const handleDownloadVideo = () => {
    if (videoUrl) {
      const link = document.createElement("a");
      link.href = videoUrl;
      link.download = "generated-video.mp4";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center px-6 py-24"
      style={{ backgroundColor: colors.background }}
    >
      {/* Title & Description */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold" style={{ color: colors.primary }}>
          {t("RunwayML Text-to-Video")}
        </h1>
        <p className="text-lg mt-2" style={{ color: colors.text }}>
          {t("Turn your text into stunning videos with AI.")}
        </p>
      </motion.div>

      {/* Video Generation Section */}
      <div
        className="w-full max-w-3xl bg-transparent p-8 rounded-xl border"
        style={{ borderColor: colors.primary }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
          {t("Enter Your Prompt")}
        </h2>

        {/* Text Input */}
        <textarea
          rows={4}
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
          style={{
            backgroundColor: "transparent",
            borderColor: colors.primary,
            color: colors.text,
          }}
          placeholder={t("Describe the video you want to create...")}
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        ></textarea>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 rounded-lg text-center"
            style={{ backgroundColor: "#ff4444", color: colors.text }}
          >
            {error}
          </motion.div>
        )}

        {/* Generate Video Button */}
        <motion.button
          onClick={handleGenerateVideo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="w-full mt-4 font-bold py-3 px-6 rounded-lg transition-all"
          style={{
            backgroundColor: colors.primary,
            color: colors.background,
          }}
        >
          {loading ? t("Generating...") : t("Generate Video")}
        </motion.button>

        {/* Generated Video Display */}
        {videoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: colors.text }}>
              {t("Your Generated Video")}
            </h3>
            <video
              controls
              className="w-full rounded-lg"
              style={{ border: `2px solid ${colors.primary}` }}
            >
              <source src={videoUrl} type="video/mp4" />
              {t("Your browser does not support the video tag.")}
            </video>

            {/* Download Button */}
            <motion.button
              onClick={handleDownloadVideo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-4 font-bold py-3 px-6 rounded-lg transition-all"
              style={{
                backgroundColor: colors.secondary,
                color: colors.text,
              }}
            >
              {t("Download Video")}
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* How to Use Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mt-12 p-8 rounded-xl border"
        style={{ borderColor: colors.primary }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
          {t("How to Use")}
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          <li style={{ color: colors.text }}>
            {t("Enter a detailed description of the video you want to create.")}
          </li>
          <li style={{ color: colors.text }}>
            {t("Click 'Generate Video' to let RunwayML create your video.")}
          </li>
          <li style={{ color: colors.text }}>
            {t("Preview and download your video once it's ready.")}
          </li>
        </ol>
      </motion.div>

      {/* Leaderboard Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mt-12 p-8 rounded-xl border"
        style={{ borderColor: colors.primary }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
          {t("Top Video Creators")}
        </h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ backgroundColor: colors.primary, color: colors.text }}>
              <th className="p-3">#</th>
              <th className="p-3">{t("Creator")}</th>
              <th className="p-3">{t("Score")}</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <motion.tr
                key={player.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-gray-600"
                style={{ color: colors.text }}
              >
                <td className="p-3 font-bold">
                  {index === 0 ? "🏆" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                </td>
                <td className="p-3">{player.name}</td>
                <td className="p-3">{player.score}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default TextToVideo;