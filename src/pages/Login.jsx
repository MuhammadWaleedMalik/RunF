import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase"; // Assuming firebase is set up similarly
import useGoogle from "../hooks/useGoogle";
import useLogin from "../hooks/useLogin";

// Color Scheme
const colors = {
  primary: "#ff12a4", // Deep Purple
  secondary: "#C05898", // Light purple
  background: "#09090B", // Almost Black
  text: "#E2E8F0", // Light Gray
  paragraph: "#A1A1AA", // Muted Gray
};

const Login = () => {
  const { t } = useTranslation();
  const { loginWithGoogle } = useAuth();
  const { login } = useLogin();
  const { authenticateWithGoogle } = useGoogle();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;
      const response = await authenticateWithGoogle(displayName, email);
      alert("Signed in with Google successfully!");
      localStorage.setItem("credits", response.user.credits);
      localStorage.setItem("token", response.token);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Google login failed:", error);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t("fillAllFields"));
      return;
    }

    try {
      setError("");
      setLoading(true);

      // Admin Check
      if (email === "admin@newtonai.net" && password === "@Abc123456") {
        localStorage.setItem("Admin", "Done");
        navigate("/admin");
      } else {
        const response = await login(email, password);
        if (response !== undefined) {
          localStorage.removeItem("credits");
          localStorage.removeItem("token");
          localStorage.setItem("credits", response.user.credits);
          localStorage.setItem("token", response.token);
          alert("Logged in successfully!");
          navigate("/");
        } else {
          setError("Internal Error Occurred Try Again Later");
        }
      }
    } catch (error) {
      console.error("Email login failed:", error);
      setError(t("loginFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ backgroundColor: colors.background }}
      className="min-h-screen mt-24 mb-24 w-full flex flex-col justify-center items-center px-8 sm:px-20"
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-5xl font-bold mb-10 uppercase"
        style={{ color: colors.text }}
      >
        {t("login")}
      </motion.h1>

      {/* Email and Password Login Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onSubmit={handleEmailLogin}
        className="w-full max-w-lg"
      >
        {/* Email Input */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-lg font-medium mb-2"
            style={{ color: colors.text }}
          >
            {t("email")}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t("enterEmail")}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-lg font-medium mb-2"
            style={{ color: colors.text }}
          >
            {t("password")}
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t("enterPassword")}
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-3 rounded-lg text-center"
            style={{ backgroundColor: colors.error, color: colors.background }}
          >
            {error}
          </motion.div>
        )}

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          type="submit"
          disabled={loading}
          className="w-full p-4 flex items-center justify-center font-bold text-xl rounded-lg transition-all duration-300 uppercase shadow-md"
          style={{
            backgroundColor: colors.primary,
            color: colors.background,
          }}
        >
          {loading ? t("loggingIn") : t("login")}
        </motion.button>
      </motion.form>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="my-8 flex items-center w-full max-w-lg"
      >
        <div className="flex-1 h-px" style={{ backgroundColor: colors.text }} />
        <span className="mx-4 text-lg" style={{ color: colors.text }}>
          {t("or")}
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: colors.text }} />
      </motion.div>

      {/* Google Login Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex justify-center w-full max-w-lg"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={handleGoogleLogin}
          className="w-full p-4 flex items-center justify-center font-bold text-xl rounded-lg transition-all duration-300 uppercase shadow-md"
          style={{
            backgroundColor: colors.secondary,
            color: colors.text,
          }}
        >
          <FcGoogle className="h-7 w-7 mr-3" />
          {t("continueWithGoogle")}
        </motion.button>
      </motion.div>

      {/* "Don't have an account?" */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="text-lg mt-10 text-center"
        style={{ color: colors.text }}
      >
        {t("dontHaveAccount")}{" "}
        <Link
          to="/signup"
          className="font-bold text-2xl hover:underline"
          style={{ color: colors.primary }}
        >
          {t("signup")}
        </Link>
      </motion.p>
    </motion.div>
  );
};

export default Login;