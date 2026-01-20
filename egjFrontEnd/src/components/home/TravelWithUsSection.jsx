import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "motion/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import travel from "../../styles/components/home/travelWithUs.module.scss";
import card1 from "../../assets/images/Card1.png";
import card2 from "../../assets/images/Card2.png";
import card3 from "../../assets/images/Card3.png";
import card4 from "../../assets/images/Card4.png";
import card5 from "../../assets/images/Card5.png";
import card6 from "../../assets/images/Card6.png";

import { FaLanguage, FaPersonHiking } from "react-icons/fa6";
import { MdNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { GiBoatFishing } from "react-icons/gi";
import { GiCanoe } from "react-icons/gi";
import { FaPlaneArrival } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";

export default function TravelWithUsSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  const cardContent = [
    {
      img: card1,
      title: "Locally Rooted, English-Speaking Guides",
      text: "Our team is fully fluent in English — no language barrier here! We’re proud locals excited to share the land with you, making you feel connected from the moment you arrive.",
      icon: <FaLanguage />,
    },
    {
      img: card2,
      title: "Authentic, Immersive & Eco-Conscious",
      text: "Live with nature: hike under the stars, fish your own meal, and connect with the Amazon. Vegetarian and vegan options made from local ingredients are available.",
      icon: <GiBoatFishing />,
    },
    {
      img: card3,
      title: "Unforgettable Jungle Adventures",
      text: "Not your average trip: night hikes, piranha fishing, jungle survival, and full cultural immersion—every moment a once-in-a-lifetime experience.",
      icon: <GiCanoe />,
    },
    {
      img: card4,
      title: "Well-Planned Experiences",
      text: "Arrive a day early to settle in, meet the team, and get ready for an early jungle departure—everything is organized for a smooth, stress-free start",
      icon: <FaPlaneArrival />,
    },
    {
      img: card5,
      title: "Personalized & Group-Friendly Packages",
      text: "From solo travellers to large groups, families, or partygoers—we’ve got a tour just for you. VIP upgrades and custom packages make sure your experience fits your vision. Plus, we offer group discounts!",
      icon: <FaPersonHiking />,
    },
    {
      img: card6,
      title: "Supporting the Community",
      text: "We’re not just another tour agency. We’re the original pioneers in Amazon expeditions and proud to create real opportunities for our local community while delivering unmatched value and authenticity.",
      icon: <GiPartyPopper />,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10%" }}
      transition={{
        delay: 0.1,
        y: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 1.2, ease: "easeOut" },
      }}
      className={travel.travel_container}
    >
      <header className={travel.travel_title}>
        <h1>WHY TRAVEL WITH US?</h1>
      </header>
      <hr className={travel.hr} />

      <motion.article
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-50%" }}
        transition={{
          delay: 0.1,
          y: { duration: 0.8, ease: "easeInOut" },
          opacity: { duration: 1.2, ease: "easeOut" },
        }}
        className={travel.cards}
      >
        <Swiper
          style={{ height: "31.5rem" }}
          modules={[Navigation]}
          loop={true}
          spaceBetween={15}
          slidesPerView={4}
          breakpoints={{
            1280: { slidesPerView: 4 },
            1200: { slidesPerView: 3 },
            1000: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
            360: { slidesPerView: 1 },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{ clickable: true, el: paginationRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.params.pagination.el = paginationRef.current;
          }}
        >
          {cardContent.map((card, idx) => (
            <SwiperSlide key={idx}>
              <div className={travel.card_container}>
                <div className={travel.card_inner}>
                  <div className={travel.card_front}>
                    <div className={travel.card_media}>
                      <img
                        className={travel.card_image}
                        src={card.img}
                        alt={card.title}
                      />
                      <h4 className={travel.card_title}>
                        {card.title} {card.icon}
                      </h4>
                    </div>
                  </div>
                  <div className={travel.card_back}>
                    <span className={travel.card_back_icon}>{card.icon}</span>
                    <p className={travel.card_back_text}>{card.text}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Arrows */}
        <div ref={prevRef} className={travel.customprev}>
          <MdOutlineNavigateBefore />
        </div>
        <div ref={nextRef} className={travel.customnext}>
          <MdNavigateNext />
        </div>
        <div ref={paginationRef} className="swiper-pagination"></div>
      </motion.article>

      <div className={travel.button_container}>
        <a href="/tour" className={travel.button}>
          SEE TOURS
        </a>
      </div>
    </motion.section>
  );
}
