import { useState } from "react";
import FaqStyle from "../../styles/components/tourExpeditions/fqa.module.scss";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Faq() {
  const questions = [
    {
      question: "Can I pay in US dollars or with a card at the agency?",
      answer:
        "No, all remaining balances must be paid in cash in Colombian Pesos (COP) at our office. Make sure to exchange currency before arriving in Leticia, as card services are limited in the Amazon.",
    },
    {
      question: "Is airport pickup and drop-off included?",
      answer:
        "Yes! Airport transfers are included in your tour package at no extra cost. Our team will greet you upon arrival.",
    },
    {
      question: "Is the Yellow Fever Vaccination Card required?",
      answer:
        "Yes. For your safety and in accordance with local health regulations, a Yellow Fever vaccination card is mandatory. We highly recommend getting vaccinated at least 10 days before travel.",
    },
    {
      question: "What should I pack for the tour?",
      answer:
        "Bring lightweight long-sleeve shirts and pants, a swimsuit, a quick-dry towel, insect repellent, sunscreen, a flashlight or headlamp, any personal medication, comfortable hiking shoes or sneakers, and a small backpack for daily excursions. And don’t worry — we provide rubber boots!",
    },
    {
      question: "Is the Ayahuasca experience included in all packages?",
      answer:
        "No, Ayahuasca ceremonies are not included in all tours. They are available as an optional add-on in select standard packages. Please request in advance if interested.",
    },
    {
      question: "Will all activities listed be available during my trip?",
      answer:
        "Activities may vary slightly depending on weather or seasonal changes, but we always ensure a rich and fulfilling Amazon experience.",
    },
    {
      question: "Is lodging accommodation included in the package?",
      answer:
        "Yes. Every package includes accommodation in rustic, clean, and comfortable jungle lodges during your entire tour.",
    },
  ];
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={FaqStyle.container}>
      <header className={FaqStyle.text_container}>
        <h1 className={FaqStyle.text_title}>Frequent Ask Questions</h1>
        <p className={FaqStyle.text_description}>
          We’re here to help you. Contact us anytime. Ready to explore the
          Amazon? Secure your spot with a 30% deposit today!
        </p>
        <hr className={FaqStyle.hr} />
      </header>
      <article>
        {questions.map((item, index) => (
          <div className={FaqStyle.question_container} key={index}>
            <div className={FaqStyle.question}>
              <div
                className={FaqStyle.question_closed}
                onClick={() => toggle(index)}
              >
                <h3 className={FaqStyle.question_title}>{item.question}</h3>
                {openIndex === index ? (
                  <IoIosArrowUp className={FaqStyle.question_arrow} />
                ) : (
                  <IoIosArrowDown className={FaqStyle.question_arrow} />
                )}
              </div>

              {openIndex === index && (
                <div className={FaqStyle.question_open}>
                  <hr className={FaqStyle.question_hr} />
                  <p className={FaqStyle.question_text}>{item.answer}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </article>
    </section>
  );
}

export default Faq;
