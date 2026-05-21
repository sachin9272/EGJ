import { FaLeaf } from "react-icons/fa6";
import Navbar from "../components/NavBar";
import policy from "../styles/pages/refundPolicy.module.scss";

const lawItems = [
  {
    title: "National Tourism Registry",
    text: "All tourism service providers in Colombia must be registered in the National Tourism Registry. This registration is mandatory and must be updated annually to remain compliant with government regulations.",
  },
  {
    title: "Tourism Development",
    text: "The State promotes various forms of tourism, including ecotourism, ethnotourism, and metropolitan tourism, to enhance the tourism experience while preserving Colombia's natural and cultural heritage.",
  },
  {
    title: "Consumer Protection",
    text: "Public and private entities are required to protect consumers, ensuring that all tourism activities are conducted with integrity and fairness.",
  },
  {
    title: "Accessibility",
    text: "Tourism services must be accessible to individuals with disabilities, reflecting a commitment to inclusivity and human dignity.",
  },
];

const policySections = [
  {
    title: "Date of Transaction",
    text: "The date of the transaction refers to the exact date on which any product or service is purchased, including renewals. This date marks the start of our contractual obligations, and all purchases made are final.",
  },
  {
    title: "No Refund After Account Closure",
    text: "Once a product or service is purchased, it is strictly non-refundable. Any attempt to close an account will void any eligibility for refunds. This policy is enforced to maintain the integrity of our operations and prevent fraudulent claims.",
  },
  {
    title: "Additional Auction Categories",
    text: "All sales are final. Once a booking confirmation is made, the transaction is irrevocable, and no refunds will be provided under any circumstances.",
  },
  {
    title: "Tour Services",
    text: "If a tour service has been performed, it is absolutely non-refundable. Significant resources are allocated to each tour, and these cannot be recuperated. In rare cases where a tour has not yet been performed, a refund may be considered within 180 days of the transaction date. However, this is subject to strict review and approval, and the decision rests solely with Expeditions George of the Jungle.",
  },
  {
    title: "Website Services",
    text: "Booking Confirmation Fee: A 30% non-refundable fee applies to all bookings once completed. This fee covers the costs associated with reserving and preparing for your expedition and is non-negotiable.",
  },
  {
    title: "Sitelock 911 - Trustee Fees",
    text: "Once the trustee fee service is initiated, the fees become non-refundable, as the resources and time allocated to these services are considered expended.",
  },
  {
    title: "Strict No Refunds Policy",
    text: "Refunds will only be considered under the most severe and legitimate circumstances, specifically life or death situations. Such claims must be supported by irrefutable evidence, and even then, refunds are granted at the sole discretion of Expeditions George of the Jungle. We reserve the right to deny any refund request that does not meet our stringent criteria.",
  },
];

function RefundPolicy() {
  return (
    <div className={policy.page_shell}>
      <Navbar />

      <main className={policy.page}>
        <section className={policy.hero}>
          <div className={policy.leaf_rule}>
            <span></span>
            <FaLeaf />
            <span></span>
          </div>
          <p className={policy.eyebrow}>EXPEDITIONS GEORGE OF THE JUNGLE</p>
          <h1>Refund Policy</h1>
        </section>

        <section className={policy.content_card}>
          <article className={policy.policy_block}>
            <p className={policy.section_label}>LAW 300 OF 1996</p>
            <h2>General Tourism Law</h2>
            <p>
              Law 300 of 1996, also known as the General Tourism Law, is the
              cornerstone of tourism policy and planning in Colombia. Compliance
              with this law is mandatory for all tourism service providers and
              is essential to uphold ethical, responsible, and sustainable
              tourism practices.
            </p>
            <div className={policy.item_grid}>
              {lawItems.map(({ title, text }) => (
                <div className={policy.info_item} key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </article>

          <article className={policy.policy_block}>
            <p className={policy.section_label}>REFUND POLICY</p>
            <h2>Strict No Refund Terms</h2>
            <p>
              At Expeditions George of the Jungle, we uphold a strict and clear
              no refund policy. Our operations are carefully planned and
              executed to deliver the highest quality experiences to our
              clients. The following refund terms are enforced without
              exception:
            </p>
            <div className={policy.section_list}>
              {policySections.map(({ title, text }) => (
                <section className={policy.text_section} key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </section>
              ))}
            </div>
          </article>

          <article className={policy.policy_block}>
            <p>
              This strict no refund policy is designed to protect both our
              company and our clients by ensuring that all transactions are
              conducted with fairness and respect. Our commitment to upholding
              the highest standards in the tourism industry is reflected in this
              policy, and we expect the same level of commitment from our
              clients. By maintaining this firm stance on refunds, we reinforce
              the integrity of our services and the reputation we have earned
              within the industry.
            </p>
          </article>

          <article className={`${policy.policy_block} ${policy.contact_block}`}>
            <p className={policy.section_label}>CONTACT US</p>
            <h2>Questions About This Policy</h2>
            <p>
              Don't hesitate to contact us if you have any questions regarding
              our refund policy.
            </p>
            <div className={policy.contact_links}>
              <a href="mailto:expeditionsgeorgeofthejungle@gmail.com">
                expeditionsgeorgeofthejungle@gmail.com
              </a>
              <a
                href="https://expeditionsgeorgeofthejungle.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                expeditionsgeorgeofthejungle.com
              </a>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default RefundPolicy;
