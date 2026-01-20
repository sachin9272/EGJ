import videoSection from "../../styles/components/home/videoSection.module.scss";
import { motion } from "motion/react";

function VideoSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50%" }}
      transition={{
        delay: 0.1,
        y: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 1.2, ease: "easeOut" },
      }}
      className={videoSection.video_section}
    >
      <figure className={videoSection.video_container}>
        <video className={videoSection.video} autoPlay loop muted playsInline>
          <source
            src="https://res.cloudinary.com/dbuxt1ti8/video/upload/v1759272080/React_lp5cj4.mp4"
            type="video/mp4"
          />
        </video>
      </figure>
      <article className={videoSection.textBox_container}>
        <div className={videoSection.textBox_titles}>
          <h2>Discover the Amazon</h2>
          <h3>Live the adventure</h3>
        </div>
        <div className={videoSection.textBox_paragraph_container}>
          <p className={videoSection.textBox_paragraph}>
            Step into the heart of the world’s most vibrant rainforest with
            Expeditions George of the Jungle. Our expert English-speaking guides
            lead immersive, all-inclusive journeys that go beyond sightseeing —
            they connect you deeply with the Amazon’s wildlife, landscapes, and
            cultures.
          </p>
          <p className={videoSection.textBox_paragraph}>
            From winding river expeditions to starlit jungle walks, each moment
            is designed to awaken your sense of wonder and help you reconnect
            with nature in its purest form. You’ll share stories with local
            communities, taste authentic Amazonian flavors, and sleep surrounded
            by the sounds of the forest.
          </p>
        </div>
      </article>
    </motion.section>
  );
}

export default VideoSection;
