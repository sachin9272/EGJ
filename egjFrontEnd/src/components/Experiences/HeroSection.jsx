import experienceHero from "../../styles/components/experiences/heroSection.module.scss";
import { motion } from "motion/react";

function HeroSection() {
  return (
    <section className={experienceHero.hero_container}>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-2%" }}
        transition={{
          delay: 0.1,
          y: { duration: 0.5, ease: "easeInOut" },
          opacity: { duration: 1.2, ease: "easeOut" },
        }}
        className={experienceHero.text}
      >
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-2%" }}
          transition={{
            delay: 0.1,
            y: { duration: 0.5, ease: "easeInOut" },
            opacity: { duration: 1.2, ease: "easeOut" },
          }}
          className={experienceHero.text_title}
        >
          CREATE YOUR OWN{" "}
          <span className={experienceHero.text_highlight}>ADVENTURE</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-2%" }}
          transition={{
            delay: 0.1,
            y: { duration: 0.5, ease: "easeInOut" },
            opacity: { duration: 1.2, ease: "easeOut" },
          }}
          className={experienceHero.text_paragraph}
        >
          Step into the stories of those who ventured deep into the wild heart
          of the{" "}
          <span className={experienceHero.text_paragraph_highlight}>
            Amazon rainforest
          </span>{" "}
          Amazon rainforest, where nature whispers its timeless secrets.{" "}
        </motion.p>
        <motion.hr
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            y: { duration: 1, ease: "easeInOut" },
            opacity: { duration: 1.5, ease: "easeOut" },
          }}
          key="Line"
          className={experienceHero.hr}
        />
        <motion.a href="/tour" className={experienceHero.experience_button}>
          Book Now
        </motion.a>
      </motion.div>
    </section>
  );
}

export default HeroSection;
