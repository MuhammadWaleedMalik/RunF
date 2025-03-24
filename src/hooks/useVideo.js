import { useState } from "react";

const API_KEY = import.meta.env.VITE_KEY; // Your API key
const API_BASE = "https://api.minimaxi.chat/v1"; // Your API base URL

export default function useVideo() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [taskId, setTaskId] = useState(null);

  const generateVideo = async (prompt) => {
    if (!prompt) {
      setError("Prompt cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Proceed with video generation
      const response = await fetch(`${API_BASE}/video_generation`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, model: "T2V-01" }),
      });

      const rawResponse = await response.text(); // Log the raw response
      console.log("Raw video_generation Response:", rawResponse);

      let data;
      try {
        data = JSON.parse(rawResponse); // Try to parse the response as JSON
      } catch (err) {
        throw new Error("Invalid JSON response from the API.");
      }

      if (!response.ok || data.base_resp?.status_code !== 0) {
        throw new Error(data.base_resp?.status_msg || "Failed to generate video");
      }

      setTaskId(data.task_id);
      pollVideoGeneration(data.task_id);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  const pollVideoGeneration = (taskId) => {
    console.log("Polling video generation task...");

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${API_BASE}/query/video_generation?task_id=${taskId}`, {
          headers: { Authorization: `Bearer ${API_KEY}` },
        });

        const rawResponse = await response.text(); // Log the raw response
        console.log("Raw polling Response:", rawResponse);

        let data;
        try {
          data = JSON.parse(rawResponse); // Try to parse the response as JSON
        } catch (err) {
          throw new Error("Invalid JSON response from the API.");
        }

        if (data.base_resp?.status_code === 1004) {
          throw new Error("Invalid API Key. Please check your API key.");
        }

        const status = data.status;

        if (status === "Success") {
          clearInterval(interval);
          fetchVideo(data.file_id);
        } else if (status === "Fail") {
          throw new Error("Video generation failed.");
        }
      } catch (err) {
        console.error("Error:", err);
        clearInterval(interval);
        setError(err.message || "Error fetching video status.");
        setLoading(false);
      }
    }, 5000);
  };

  const fetchVideo = async (fileId) => {
    console.log("Fetching generated video...");
    try {
      const response = await fetch(`${API_BASE}/files/retrieve?file_id=${fileId}`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });

      const rawResponse = await response.text(); // Log the raw response
      console.log("Raw fetchVideo Response:", rawResponse);

      let data;
      try {
        data = JSON.parse(rawResponse); // Try to parse the response as JSON
      } catch (err) {
        throw new Error("Invalid JSON response from the API.");
      }

      if (data.file?.download_url) {
        setVideoUrl(data.file.download_url);
      } else {
        throw new Error("Failed to fetch video.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Error retrieving video.");
    } finally {
      setLoading(false);
    }
  };

  return { videoUrl, loading, error, generateVideo };
}