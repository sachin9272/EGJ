import HeroSection from "../../styles/components/tourExpeditions/hero.module.scss";
import { motion } from "motion/react";

function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-2%" }}
      transition={{
        delay: 0.1,
        y: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 1.2, ease: "easeOut" },
      }}
      className={HeroSection.hero_container}
    >
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          y: { duration: 0.8, ease: "easeInOut" },
          opacity: { duration: 1.5, ease: "easeOut" },
        }}
        key="Title"
        className={HeroSection.hero_title}
      >
        CHOOSE YOUR{" "}
        <span className={HeroSection.hero_highlight}>ADVENTURE</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          y: { duration: 0.9, ease: "easeInOut" },
          opacity: { duration: 1.5, ease: "easeOut" },
        }}
        key="Sub-title"
        className={HeroSection.hero_description}
      >
        Embark on a journey through the heart of the Colombian Amazon, where{" "}
        <span className={HeroSection.hero_description_highlight}>
          Colombia, Peru, and Brazil
        </span>{" "}
        meet in culture, flavor, and biodiversity.{" "}
      </motion.p>
    </motion.section>
  );
}

export default Hero;
