import { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaLeaf, FaQuoteLeft, FaStar } from "react-icons/fa";
import styles from "../styles/components/googleReviewsCarousel.module.scss";

const allReviewsUrl = "https://maps.app.goo.gl/Z8WNKQkieDYKoUKa6";

const reviews = [
  {
    name: "Barbara Elmer",
    meta: "7-day Amazon tour",
    url: "https://maps.app.goo.gl/rUBgKtXLfXKCMunV6",
    text: "I met George of the Jungle at the airport, and after stopping by his office I booked a 7-day Amazon tour with him. I was promised an English-speaking guide, and I ended up with Patrick — an awesome, knowledgeable guide who spoke great English. I had a wonderful week in the jungle, and the tours were always adjusted to my needs and to the weather.\n\nI’m a solo female traveler, and I felt completely safe and well taken care of with Patrick. He knows so much about the area and has a really pleasant way of talking with both guests and locals. He also translates whenever needed, so you never feel left out even if you don’t speak Spanish.\n\nThe accommodation isn’t comparable to European standards, of course, but that’s part of what makes it a real adventure. And yes, you really do get to see all the animals they promise — you just need a bit of time and patience.\n\nFrom my experience, I can totally recommend George of the Jungle Tours — and especially the guide, Patrick.\n\nThank you for an incredible, truly unforgettable week in the Amazon — it was amazing!",
  },
  {
    name: "JENNIFER VANEGAS",
    meta: "Indigenous experience",
    url: "https://maps.app.goo.gl/49Pj42HiyEaTy1y38",
    text: "What a wonderful experience. I was traveling with my Mom and we were looking for an indigenous experience and nature connection. Nothing too hard, nothing too soft, just in the middle; Something according to my mom's age (63 YO). As my Mom is an Spanish speaker, he was so diligent to send us with another wonderful and humble man ~ John \"El Loco\" ~ who is and indigenous man from the Miraña Amazonian Community, so he is plenty of knowledge and with his \"eagle eyes\" he can see from far away animals and let you know we're they are to admire their beautifulness. Patrick who's is the guide, would tell you every single detail you must know from this space, He is a Peruvian well informed guide, serious in his work and will take you to a very conscious discover of the nature. The house were we stayed, was very simple but lovely, with hamacs and a beautiful view to the river. Activities during the day, but if you don't want to, you can stay and observe the birds and animals around. Write, read and enjoy a bit of peace. This description is very short to write down all the things we learned and did during our visit. My Mum was so happy and loved the experience.\n\nThank you very much for all the things.",
  },
  {
    name: "kon",
    meta: "Colombia highlight",
    url: "https://maps.app.goo.gl/RWVmUNAmPgLB96gh7",
    text: "One of the absolute highlights of my travels through Colombia.\n\nI did a 4-day / 3-night jungle expedition and it was perfectly balanced — adventurous, educational, and well organized. We did a wide range of activities and saw an incredible amount of wildlife, including snakes, caimans, macaws, scorpions, tarantulas, monkeys, and many more species.\n\nA special moment was visiting a local village, where there happened to be a party at the time — an unforgettable and very authentic cultural experience.\n\nThe accommodation and food were very good, especially considering we were in the rainforest. But what truly made this tour exceptional was our guide Patrick. He brought the jungle to life with his deep knowledge, passion, and storytelling. He taught us so much about the Amazon and made the experience feel real and meaningful. On top of that, he’s an incredibly friendly person and speaks excellent English, which made everything easy to understand and engaging.\n\nI would 100% do this tour again and can highly recommend it to anyone visiting Colombia. If you go to Leticia, a jungle tour is a must — and if possible, do it with this agency and especially with Patrick.\n\nAn unforgettable experience.",
  },
  {
    name: "Dom Des",
    meta: "English-speaking guide",
    url: "https://maps.app.goo.gl/1aPoR6JXWZhHaF1m9",
    text: "We have used that company twice and requested Alain an English speaking guide. He is just amazing. Extremely knowledgeable, with impressive background. He was fully dedicated to make our trip unforgettable. He made sure we saw everything that he promised we will see. He communicates with nature, shares his love and passion every moments. He always made sure we felt secure. He listened to our desires and adjusted the plan accordingly. The experience itself is a life time experience, like nothing else, wild and authentique. Merci Alain for the unforgettable and magic moments.",
  },
  {
    name: "Luciano Salvatori",
    meta: "4-day Amazon trip",
    url: "https://maps.app.goo.gl/PoxBMNmmRrS6P8pA7",
    text: "We had an amazing Trip. We booked 4 days and usually the tour starts at 8 in the morning, but the owner got us at 12 from the airport and got us personally to the location at the Amazon so we won't have to stay a day longer than we planned. We had great trips, the food was nice and props to Patrick our guide, he spotted every animal there was, no matter how far it was. We also had free time when we could explore ourselves and the best part is that we could arrange everything with our booking pretty freely, because we are very spontaneous.\n\nThanks again for the time, we would love to do it again!",
  },
  {
    name: "Magdalena Mikusek",
    meta: "Boat tour",
    url: "https://maps.app.goo.gl/gZefSG48ocp975487",
    text: "It was a very well organised boat tour around Amazon river. Alan showed us the jungle, we searched for sloths, looked out for pink and grey dolphins, we visited indigenous tribes. We learned a lot about the beauty of this region, rich traditions and the nature. The lunch at the Base camp was delicious. I loved every minute of it.",
  },
];

const previewText = (text) => {
  if (text.length <= 280) return text;
  return `${text.slice(0, 280).trim()}...`;
};

function GoogleWordmark() {
  return (
    <span className={styles.google_wordmark} aria-label="Google">
      <span>G</span>
      <span>o</span>
      <span>o</span>
      <span>g</span>
      <span>l</span>
      <span>e</span>
    </span>
  );
}

function GoogleReviewsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState({});

  const visibleReviews = useMemo(() => {
    return [0, 1, 2, 3].map((offset) => {
      const index = (activeIndex + offset) % reviews.length;
      return { ...reviews[index], originalIndex: index };
    });
  }, [activeIndex]);

  const showPrevious = () => {
    setActiveIndex((current) => (current === 0 ? reviews.length - 1 : current - 1));
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % reviews.length);
  };

  return (
    <section className={styles.reviews_section} aria-labelledby="google-reviews-title">
      <div className={styles.overlay} />
      <div className={styles.inner}>
        <div className={styles.leaf_divider} aria-hidden="true">
          <span />
          <FaLeaf />
          <span />
        </div>

        <p className={styles.eyebrow}>Reviews</p>
        <h2 id="google-reviews-title" className={styles.title}>
          What Our Travelers Say
        </h2>
        <p className={styles.subtitle}>
          Real experiences from explorers who journeyed with us through the Amazon.
        </p>

        <div className={styles.summary_bar}>
          <div className={styles.rating_block}>
            <strong>4.9</strong>
            <div>
              <div className={styles.stars} aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
              <p>Based on 230+ Google Reviews</p>
            </div>
          </div>
          <div className={styles.summary_separator} />
          <div className={styles.google_block}>
            <GoogleWordmark />
            <span>Reviews</span>
            <div className={styles.small_stars} aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.carousel_shell}>
          <button
            className={`${styles.nav_button} ${styles.nav_button_left}`}
            type="button"
            onClick={showPrevious}
            aria-label="Previous review"
          >
            <FaChevronLeft />
          </button>

          <div className={styles.cards_grid}>
            {visibleReviews.map((review) => {
              const isExpanded = Boolean(expanded[review.originalIndex]);
              const hasMore = review.text.length > 280;

              return (
                <article className={styles.review_card} key={review.originalIndex}>
                  <div className={styles.card_top}>
                    <FaQuoteLeft className={styles.quote_icon} />
                    <GoogleWordmark />
                  </div>

                  <p className={styles.review_text}>
                    {isExpanded ? review.text : previewText(review.text)}
                  </p>

                  {hasMore && (
                    <button
                      className={styles.read_more}
                      type="button"
                      onClick={() =>
                        setExpanded((current) => ({
                          ...current,
                          [review.originalIndex]: !isExpanded,
                        }))
                      }
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}

                  <div className={styles.card_stars} aria-label="5 star review">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar key={index} />
                    ))}
                  </div>

                  <div className={styles.reviewer_row}>
                    <div className={styles.avatar} aria-hidden="true">
                      {review.name.slice(0, 1)}
                    </div>
                    <div>
                      <h3>{review.name}</h3>
                      <p>{review.meta}</p>
                    </div>
                  </div>

                  <a
                    className={styles.google_link}
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Google <FaExternalLinkAlt />
                  </a>
                </article>
              );
            })}
          </div>

          <button
            className={`${styles.nav_button} ${styles.nav_button_right}`}
            type="button"
            onClick={showNext}
            aria-label="Next review"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className={styles.dots} aria-label="Review carousel position">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={index === activeIndex ? styles.dot_active : ""}
              type="button"
              aria-label={`Show review ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <a
          className={styles.all_reviews_button}
          href={allReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaStar /> View All Google Reviews
        </a>
      </div>
    </section>
  );
}

export default GoogleReviewsCarousel;
