import heroSection from "../../styles/components/home/heroSection.module.scss";
import { motion } from "motion/react";

const Hero = () => {
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
      className={heroSection.hero_section}
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
        className={heroSection.title}
      >
        THE JOURNEY <span className={heroSection.highlight}>OF YOUR LIFE</span>{" "}
      </motion.h1>
      <motion.h4
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          y: { duration: 0.9, ease: "easeInOut" },
          opacity: { duration: 1.5, ease: "easeOut" },
        }}
        key="Sub-title"
        className={heroSection.subtitle}
      >
        Reconnect with nature on our Amazon Rainforest tours with
        <span className={heroSection.highlight_2}>
          <b>English-speaking guides.</b>
        </span>
      </motion.h4>
      <motion.hr
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          y: { duration: 1, ease: "easeInOut" },
          opacity: { duration: 1.5, ease: "easeOut" },
        }}
        key="Line"
        className={heroSection.hr}
      />
      <motion.a
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0,
          y: { duration: 0.9, ease: "easeInOut" },
          opacity: { duration: 1.5, ease: "easeOut" },
        }}
        href="/tour"
        key="Button"
        className={heroSection.button}
      >
        BOOK TOUR
      </motion.a>
    </motion.section>
  );
};

export default Hero;
