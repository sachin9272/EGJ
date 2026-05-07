import { FaCompass, FaLocationDot, FaSeedling } from "react-icons/fa6";
import Navbar from "../components/NavBar";
import georgeImage from "../assets/images/GEORGE.png";
import about from "../styles/pages/about.module.scss";

const facts = [
  { label: "Founder", value: "George" },
  { label: "Origin", value: "BRACOPE" },
  { label: "Based In", value: "Leticia, Amazonas" },
  { label: "Experience", value: "30+ Years" },
];

const principles = [
  {
    icon: <FaSeedling />,
    label: "Mission",
    title: "Captivate, Educate, Preserve",
    text: "Our mission is to promote the Amazon rainforest in Leticia, Amazonas, South Colombia, and offer expedition tours that captivate adventurers from around the world. We prioritize sustainability, providing expert guides, unique experiences, safety, and comfort. Through education and awareness, we aim to preserve the rainforest’s biodiversity and enrich the lives of our visitors. Join us in exploring the wonders of the Amazon — the lungs of the Earth.",
    tags: ["Sustainability", "Expert Guides", "Education", "Safety"],
  },
  {
    icon: <FaCompass />,
    label: "Vision",
    title: "An Ecotourism Destination For The World",
    text: "We promote responsible use of the planet, providing nature lovers with endless possibilities in the tropical forest. Our vision is to convert the Amazon into premier ecotourism destinations, integrating indigenous communities and fostering global responsibility. Join us for a rewarding and transformative experience in the Amazon, where peace, tranquility, and conservation thrive.",
    tags: ["Responsibility", "Indigenous Integration", "Conservation", "Socioeconomic"],
  },
];

function About() {
  return (
    <div className={about.page_shell}>
      <Navbar />

      <main className={about.page}>
        <section className={about.hero}>
          <p className={about.eyebrow}>
            <FaLocationDot /> Leticia, Amazonas · Our Story
          </p>
          <h1>
            About <span>George Of</span> <span>The Jungle</span>
          </h1>
          <p className={about.hero_text}>
            Born of the Amazon, raised by the river. The life story of a
            responsible guide, entrepreneur, and lifelong guardian of the jungle
            who brings indigenous wisdom together with unforgettable journeys
            into the lungs of the Earth.
          </p>
          <div className={about.hero_actions}>
            <a href="#story" className={about.primary_button}>
              Read the story
            </a>
            <a href="#mission" className={about.secondary_button}>
              Our mission +
            </a>
          </div>
          <div className={about.fact_grid}>
            {facts.map((fact) => (
              <article key={fact.label} className={about.fact_card}>
                <small>{fact.label}</small>
                <strong>{fact.value}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className={about.story_section} id="story">
          <p className={about.kicker}>A Life Story</p>
          <h2>
            George Of The <span>Jungle</span>
          </h2>

          <div className={about.story_grid}>
            <div className={about.profile_column}>
              <aside className={about.profile_card}>
                <div className={about.profile_image_wrap}>
                  <img src={georgeImage} alt="George of the Jungle" />
                </div>
                <p className={about.profile_role}>Guide · Agent · Entrepreneur</p>
                <h3>George</h3>
                <small>Amazonian icon · Leticia, Colombia</small>
              </aside>
              <article className={about.quote_card}>
                <span>“</span>
                <p>
                  Loving this profession with passion and respect takes me to
                  recognize the Amazonian characters that shaped this life — the
                  “Tatu” Mendoza and Mawgli, the Amazonian Tarzan.
                </p>
              </article>
            </div>

            <div className={about.story_copy}>
              <p>
                His name is George. His origin has no borders. He is a BRACOPE
                descendant — Brazilian, Colombian and Peruvian blood runs
                through his DNA. At just 10 years old he connected with his
                first actions of tourist guidance. Joel, a Miraña indigenous
                polyglot known as TATU for his small stature, became his initial
                mentor and boss — speaking English, Portuguese, French, Spanish
                and native languages also.
              </p>
              <p>
                At 19 he began a formal job at the Hotel Anaconda in Leticia,
                Amazonas. Family, friends, and foreign tourists chose to call
                him George — a name that later became his tradition name:
                George of the Jungle. Born in a region dressed in multicoloured
                jungle, magical as its sunrises and immense as its river, he
                grew into a good-natured man in harmony with the ecosystem of
                the Amazon.
              </p>
              <p>
                The universe of jungle and river was the school where he learned
                aboriginal culture, flora, fauna, ancestral medicine, trails,
                roads and customs — prodigies of life that today define him as
                an expeditious guide, agent and entrepreneur specializing in
                everything Amazon tourism represents.
              </p>
              <article className={about.highlight_card}>
                <small>The Trilogy</small>
                <p>
                  Together with George, Joel Mendoza “TATU”, and Mawgli, the
                  Amazonian Tarzan, three characters born and raised in the
                  Colombian Amazon became pioneers of tourism who inspired
                  adventure and nature tourism in Leticia.
                </p>
              </article>
              <p>
                After more than 30 years of work in tourism, George consolidated
                his entrepreneurial vision: Expeditions George of the Jungle, a
                company in agreement with the promotion and preservation of the
                environment, education, job opportunity, social and culture —
                integrating the native and ancestral with the experiences of the
                wild and mystical scenery of the jungle and the jungle world of
                the greatest treasure the Amazon represents.
              </p>
              <p>
                Nothing needs the sensitization that George’s exciting work
                gives like the happy and content tourists who decide to share the
                best days of their lives in the Amazon — the great home, the
                lung of the earth that awaits you with splendid plans and
                services. Always welcome.
              </p>
              <p className={about.story_author}>— By Gicarl E. Reinos C.</p>
            </div>
          </div>
        </section>

        <section className={about.legacy_banner}>
          <p className={about.kicker}>Heritage · Amazonas · 1990 - Today</p>
          <h2>
            A Legacy That <span>Lives In The Present</span>
          </h2>
          <p>
            Three decades guiding travelers through the soul of the Amazon,
            bridging ancestral wisdom, sustainable adventure, and the living
            pulse of Leticia.
          </p>
        </section>

        <section className={about.mission_section} id="mission">
          <div className={about.section_header}>
            <div>
              <p className={about.kicker}>Purpose</p>
              <h2>
                What Drives <span>Us</span>
              </h2>
            </div>
            <p>
              The values that guide every expedition we organize, from the first
              step into the canopy to the last sunset over the river.
            </p>
          </div>

          <div className={about.principle_grid}>
            {principles.map(({ icon, label, title, text, tags }) => (
              <article key={label} className={about.principle_card}>
                <span className={about.principle_icon}>
                  {icon}
                </span>
                <small>{label}</small>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className={about.tag_row}>
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default About;
