







import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Centralized Configuration
const colors = {
  primary: "#8B5CF6", // Purple
  secondary: "#F472B6", // Pink
  background: "#0F172A", // Dark Blue
  text: "#FFFFFF", // White
  paragraph: "#CBD5E1", // Light Gray
};

const website = {
  name: "RunwayML 🚀",
  slogan: "Turn Text into Stunning Videos 🎥 | Create Short Films 🎬 | YouTube Videos Made Easy 🎉",
};

// Framer Motion Variants
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const rotate = {
  hidden: { opacity: 0, rotate: -90 },
  visible: { opacity: 1, rotate: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Reusable Animated Section Component
const AnimatedSection = ({ children, variants, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const HomePage = () => {
  return (
    <div
      className="font-sans"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {/* Page 1: Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-900 to-black">
        <AnimatedSection variants={fadeIn} className="text-center">
          <h1 className="text-6xl font-bold mb-24 mt-12" style={{ color: colors.primary }}>
            {website.name}
          </h1>
          <p className="text-2xl mb-8" style={{ color: colors.paragraph }}>
            {website.slogan}
          </p>
          <p className="text-2xl mr-24 ml-24 mb-8" style={{ color: colors.paragraph }}>
                Transform your ideas into stunning AI-generated videos effortlessly! 🎥 Whether you want to create short films, engaging YouTube content, or eye-catching promotional videos, our platform makes it easy and intuitive. 🚀 Start your journey into AI-powered video creation today! ✨
          </p>
 
            <div className="flex justify-end  mr-24 mt-12 gap-4">
            <motion.a
              href="/blog"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg text-lg font-semibold transition-all"
              style={{ backgroundColor: colors.primary, color: colors.text }}
            >
              Explore 🌟
            </motion.a>
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg text-lg font-semibold transition-all"
              style={{ backgroundColor: colors.secondary, color: colors.background }}
            >
              Get Started 🚀
            </motion.a>
          </div>
        </AnimatedSection>
      </section>

      {/* Page 2: Features Section */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black to-purple-900">
        <AnimatedSection variants={slideInLeft} className="text-center">
          <h2 className="text-4xl italic font-bold mb-8" style={{ color: colors.primary }}>
            Features & Functionality ✨
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 mr-12 ml-12 gap-8">
            {[
    "   🎥 Text-to-Video Generation: Turn your written content into visually stunning videos with AI-powered creativity. Simply input your text, and let our platform bring it to life with engaging visuals, animations, and effects. " ,  
    "  📜 Video Script Writing: Struggling with script ideas? Our AI-driven scriptwriting tool helps you craft compelling and engaging scripts for any type of video—whether it’s a short film, marketing ad, or YouTube content.  " ,
    "  🎬 Short Movie Creation: Bring your storytelling vision to reality! From concept to final production, create AI-enhanced short films with professional-grade editing, seamless transitions, and cinematic effects.  " ,
    "  🎉 YouTube Video Production: Elevate your YouTube content with AI-assisted video generation, perfect transitions, and high-quality production elements. Whether you're a vlogger, educator, or content creator, making standout videos has never been easier! " 
           ]
           .map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                <p className="text-xl">{feature}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Page 3: Animated Showcase */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-900 to-black">
        <AnimatedSection variants={fadeIn} className="text-center">
          <h2 className="text-4xl font-bold mb-8" style={{ color: colors.primary }}>
            Bring Your Ideas to Life 🎨
          </h2>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: colors.paragraph }}
          >
            With RunwayML, you can create professional-quality videos in minutes
            using AI-powered tools. Whether it's a short film, a YouTube video,
            or a creative project, we've got you covered.
          </p>
          
    
          <div className="flex justify-center gap-8 mt-8">
                <motion.div variants={rotate} whileHover={{ scale: 1.1 }}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a-ecesX6S0OnDGAakfImoUogPVhht5_c0g&s"
                    alt="Video Icon 1"
                    className="w-24 h-24"
                  />
                </motion.div>

                <motion.div variants={rotate} whileHover={{ scale: 1.1 }}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDf9fVxf1Res6S21oFYiuLgHwZX2b2aIADhQ&s" alt="Video Icon 2" className="w-24 h-24" />
                </motion.div>

                <motion.div variants={rotate} whileHover={{ scale: 1.1 }}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdwGjIubSrpJ4mR1L7Z8O3U0dtewj3Rs5NzQ&s"
                    alt="Video Icon 3"
                    className="w-24 h-24"
                  />
                </motion.div>
          </div>


        </AnimatedSection>
      </section>

     
     
    
    {/* Page 5: Image Grid */}
<section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-900 to-black px-4">
  <AnimatedSection variants={fadeIn} className="text-center">
    <h2 className="text-4xl font-bold mb-8" style={{ color: colors.primary }}>
      How It Works 🛠️
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      {[
        {
          src: "https://www.steve.ai/assets/stevehomepage/animaker_ai_mob.png",
          title: "Step 1: Enter Your Prompt 🖋️",
          description:
            "Start by providing a detailed prompt. Our AI will analyze your input to understand the theme and style you want for your video.",
        },
        {
          src: "https://static.rfstat.com/renderforest/images/v2/landing-pics/ai-video-generator/outube-thumbnail-new.webp",
          title: "Step 2: AI Generates Video 🎥",
          description:
            "Our AI-powered system processes your text, selects relevant visuals, and creates a high-quality video with smooth transitions and effects.",
        },
        {
          src: "https://www.shutterstock.com/image-vector/vector-download-button-600nw-1200039685.jpg",
          title: "Step 3: Download & Share 🚀",
          description:
            "Once the video is generated, you can preview it, make any necessary edits, and download or share it instantly on any platform.",
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <img src={item.src} alt={item.title} className="rounded-lg shadow-md mb-4 w-48 h-48 object-cover" />
          <h3 className="text-2xl font-semibold text-white mb-2">{item.title}</h3>
          <p className="text-white text-lg">{item.description}</p>
        </motion.div>
      ))}
    </div>
  </AnimatedSection>
</section>

     
     



      {/* Page 6: Testimonials */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black to-purple-900">
        <AnimatedSection variants={slideInLeft} className="text-center">
          <h2 className="text-4xl font-bold mb-8" style={{ color: colors.primary }}>
            What Our Users Say 🗣️
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
        
         "RunwayML is a game-changer! 🚀",
         "Creating videos has never been easier. 🎥",
         "AI-powered video editing saved me hours! ⏳",
         "Seamless, smooth, and stunning results. ✨",
     
        ].map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                <p className="text-xl">{testimonial}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Page 7: Call to Action */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-900 to-black">
        <AnimatedSection variants={scaleUp} className="text-center">
          <h2 className="text-4xl font-bold mb-8" style={{ color: colors.primary }}>
            Ready to Create? 🎬
          </h2>
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-lg text-2xl font-semibold transition-all"
            style={{ backgroundColor: colors.secondary, color: colors.background }}
          >
            Get Started Now 🚀
          </motion.a>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default HomePage;