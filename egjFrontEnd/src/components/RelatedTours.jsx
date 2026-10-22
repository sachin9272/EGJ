import { Link } from "react-router-dom";
import { VERIFIED_TOUR_CATALOG } from "../constants/verifiedTours";
import styles from "../styles/components/relatedTours.module.scss";

export default function RelatedTours({ currentTourPath }) {
  // Filter out current tour to avoid self-linking
  const otherTours = VERIFIED_TOUR_CATALOG.filter(
    (tour) => tour.detailPath !== currentTourPath
  ).slice(0, 3);

  if (otherTours.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="related-tours-heading">
      <p className={styles.section_label}>CONTINUE EXPLORING</p>
      <h2 id="related-tours-heading" className={styles.heading}>
        OTHER AMAZON EXPEDITIONS
      </h2>
      <div className={styles.grid}>
        {otherTours.map((tour) => {
          const imageUrl =
            tour.images && tour.images[0]?.url
              ? tour.images[0].url
              : "/Logo.webp";
          return (
            <article className={styles.card} key={tour._id}>
              <div className={styles.image_wrapper}>
                <img
                  src={imageUrl}
                  alt={`${tour.name} - Amazon Jungle Expedition`}
                  className={styles.image}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.card_title}>{tour.name}</h3>
                <p className={styles.card_desc}>{tour.description}</p>
                <div className={styles.footer}>
                  <span className={styles.price}>
                    From ${tour.price} USD
                  </span>
                  <Link
                    to={tour.detailPath}
                    className={styles.link}
                    aria-label={`View itinerary for ${tour.name}`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
