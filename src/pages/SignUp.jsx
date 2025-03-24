import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useRegister from "../hooks/useRegister"; // Import the register hook

const SignUp = () => {
  const { t } = useTranslation();
  
  const { register, isloading } = useRegister(); // Use the register hook
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const colors = {
    primary: "#8B5CF6", // Purple
    secondary: "#C05898", // Light Purple
    background: "#09090B", // Dark Background
    text: "#E2E8F0", // Light Gray
    border: "#F472B6", // Pink Border
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setError("");

    if (!email || !password) {
      setFormError(t("fillAllFields"));
      return;
    }

    setIsLoading(true);

    try {
      const response = await register(email, password);
      if (response !== undefined) {
        alert("Signed up successfully!");
        navigate("/login");
      } else {
        setFormError("Email already exists. Internal error occurred. Try again later.");
      }
    } catch (err) {
      setFormError(err.message || t("signupFailed"));
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex justify-center mt-24 mb-24 items-center px-6 py-12"
      style={{ backgroundColor: colors.background }}
    >
      <div className="w-full max-w-md p-8 border-2 rounded-lg shadow-lg" style={{ borderColor: colors.border }}>
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl font-bold text-center mb-6"
          style={{ color: colors.primary }}
        >
          {t("signup")}
        </motion.h1>

        {(formError || error) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500 text-white px-4 py-2 rounded-md mb-4 text-center"
          >
            {formError || error}
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Email Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium" style={{ color: colors.text }}>
              {t("emailAddress")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-md border bg-transparent text-white focus:ring-2"
              style={{ borderColor: colors.border }}
              required
              disabled={isloading}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium" style={{ color: colors.text }}>
              {t("password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-md border bg-transparent text-white focus:ring-2"
              style={{ borderColor: colors.border }}
              required
              disabled={isloading}
            />
          </div>

          {/* Sign Up Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            type="submit"
            disabled={isloading}
            className="w-full py-3 text-lg font-semibold rounded-md hover:opacity-80 transition-all"
            style={{ backgroundColor: colors.primary, color: "white" }}
          >
            {isloading ? t("creatingAccount") : t("createAccount")}
          </motion.button>
        </motion.form>

        {/* Already have an account? */}
        <p className="text-center mt-4" style={{ color: colors.text }}>
          {t("alreadyHaveAccount")}{" "}
          <Link to="/login" className="font-bold hover:underline" style={{ color: colors.primary }}>
            {t("login")}
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUp;