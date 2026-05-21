import { FaLeaf } from "react-icons/fa6";
import Navbar from "../components/NavBar";
import policy from "../styles/pages/refundPolicy.module.scss";

const useItems = [
  "Provide, operate, and maintain our website",
  "Improve, personalize, and expand our website",
  "Understand and analyze how you use our website",
  "Develop new products, services, features, and functionality",
  "Communicate with you for customer service, updates, marketing, and promotional purposes",
  "Send you emails",
  "Find and prevent fraud",
];

const refundItems = [
  "During booking checkout, all taxes and fees will be clearly stated and added to the total price.",
  "Once a reservation is confirmed, we do not offer discounts or modifications to pricing.",
  "Payments for tour expeditions are required in full before the start of the tour.",
  "Refunds will only be granted in cases of significant health emergencies or life-threatening situations, with supporting documentation.",
  "All refund requests are reviewed case by case and, if approved, processed within a reasonable time frame.",
  "Other than the circumstances above, we do not offer refunds for change of plans, personal preferences, or dissatisfaction with the tour experience.",
];

const ccpaRights = [
  "Request disclosure of the categories and specific pieces of personal data collected.",
  "Request deletion of personal data collected about the consumer.",
  "Request that a business that sells personal data does not sell the consumer's personal data.",
];

const gdprData = [
  "Contact Information: Name and email address.",
  "Payment Information: Billing information for processing payments.",
  "Passport and Identification Information: Required for international travel arrangements.",
  "Health Information: Medical conditions and dietary preferences relevant to your safety and well-being during expeditions.",
  "Emergency Contact Information: Details of a person to contact in case of emergencies.",
  "Feedback and Reviews: Information you provide to help us improve our services.",
];

function PrivacyPolicy() {
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
          <h1>Privacy Policy</h1>
        </section>

        <section className={policy.content_card}>
          <article className={policy.policy_block}>
            <p className={policy.section_label}>PRIVACY POLICY</p>
            <h2>Privacy Policy for Expeditions George Of The Jungle</h2>
            <p>
              At Expeditions George Of The Jungle, accessible from
              Expeditionsgeorgeofthejungle.com, one of our main priorities is
              the privacy of our visitors. This Privacy Policy document contains
              the types of information collected and recorded by Expeditions
              George Of The Jungle and how we use it.
            </p>
            <p>
              This Privacy Policy applies only to our online activities and is
              valid for visitors to our website with regards to information they
              shared and/or collect through Expeditions George Of The Jungle. It
              does not apply to information collected offline or via channels
              other than this website.
            </p>
          </article>

          <article className={policy.policy_block}>
            <p className={policy.section_label}>CONSENT</p>
            <h2>Your Consent</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and
              agree to its terms. If you have additional questions or require
              more information, do not hesitate to contact us.
            </p>
          </article>

          <article className={policy.policy_block}>
            <p className={policy.section_label}>INFORMATION WE COLLECT</p>
            <h2>Personal Information</h2>
            <p>
              The personal information you are asked to provide, and the reasons
              why you are asked to provide it, will be made clear at the point
              we ask you for your personal information.
            </p>
            <p>
              If you contact us directly, we may receive your name, email
              address, phone number, message contents, attachments, and any
              other information you choose to provide. When you register for an
              account, we may ask for contact information including name,
              company name, address, email address, and telephone number.
            </p>
          </article>

          <article className={policy.policy_block}>
            <p className={policy.section_label}>HOW WE USE YOUR INFORMATION</p>
            <h2>Use of Information</h2>
            <div className={policy.item_grid}>
              {useItems.map((item) => (
                <div className={policy.info_item} key={item}>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className={policy.policy_block}>
            <p className={policy.section_label}>DEPOSIT RESERVATION & REFUND</p>
            <h2>The Importance Fee Deposit Reservation & Refund</h2>
            <p>
              At Expeditions George of the Jungle, we strive to provide
              exceptional tour experiences. We clarify our refund policy to
              ensure transparency and set clear expectations regarding refunds.
            </p>
            <div className={policy.section_list}>
              {refundItems.map((item) => (
                <section className={policy.text_section} key={item}>
                  <p>{item}</p>
                </section>
              ))}
            </div>
          </article>

          <article className={policy.policy_block}>
            <p className={policy.section_label}>LOG FILES</p>
            <h2>Website Logs</h2>
            <p>
              Expeditions George Of The Jungle follows a standard procedure of
              using log files. These files log visitors when they visit
              websites. Information collected may include IP addresses, browser
              type, Internet Service Provider, date and time stamp,
              referring/exit pages, and possibly number of clicks. This
              information is used for trends, site administration, movement on
              the website, and demographic information.
            </p>
          </article>

          <article className={policy.policy_block}>
            <p className={policy.section_label}>COOKIES AND WEB BEACONS</p>
            <h2>Cookies</h2>
            <p>
              Like any other website, Expeditions George Of The Jungle uses
              cookies to store information including visitors' preferences and
              the pages accessed or visited. This information helps optimize the
              user experience by customizing web page content based on browser
              type and/or other information.
            </p>
          </article>

          <article className={policy.policy_block}>
            <p className={policy.section_label}>ADVERTISING PARTNERS</p>
            <h2>Google DoubleClick DART Cookie</h2>
            <p>
              Google is a third-party vendor on our site and may use DART
              cookies to serve ads to visitors based upon visits to this website
              and other sites on the internet. Visitors may decline DART cookies
              by visiting Google's ad and content network Privacy Policy.
            </p>
            <div className={policy.contact_links}>
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Advertising Privacy Policy
              </a>
            </div>
            <p>
              Third-party ad servers or ad networks may use cookies, JavaScript,
              or web beacons in advertisements and links that appear on
              Expeditions George Of The Jungle. These technologies measure ad
              effectiveness and personalize advertising content. We have no
              access to or control over cookies used by third-party advertisers.
            </p>
          </article>

          <article className={policy.policy_block}>
            <p className={policy.section_label}>THIRD PARTY PRIVACY POLICIES</p>
            <h2>Other Websites</h2>
            <p>
              Expeditions George Of The Jungle's Privacy Policy does not apply
              to other advertisers or websites. We advise you to consult the
              privacy policies of third-party ad servers for detailed
              information, practices, and instructions about opting out. You can
              disable cookies through your individual browser options.
            </p>
          </article>

          <article className={policy.policy_block}>
            <p className={policy.section_label}>CCPA PRIVACY RIGHTS</p>
            <h2>Do Not Sell My Personal Information</h2>
            <div className={policy.item_grid}>
              {ccpaRights.map((item) => (
                <div className={policy.info_item} key={item}>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <p>
              If you make a request, we have one month to respond. If you would
              like to exercise any of these rights, please contact us.
            </p>
          </article>

          <article className={policy.policy_block}>
            <p className={policy.section_label}>GDPR COMPLIANCE</p>
            <h2>General Data Protection Regulation</h2>
            <p>
              Expeditions George of the Jungle respects your privacy and is
              dedicated to protecting your personal information. We collect only
              the necessary information required to offer expedition services
              effectively and improve your experience.
            </p>
            <div className={policy.section_list}>
              {gdprData.map((item) => (
                <section className={policy.text_section} key={item}>
                  <p>{item}</p>
                </section>
              ))}
            </div>
            <p>
              We collect personal data to fulfill contractual obligations,
              manage bookings, operate expeditions, communicate updates, and
              share relevant information about our services. We maintain data
              protection measures designed to safeguard information from
              unauthorized access, disclosure, or misuse.
            </p>
            <p>
              As an USA resident, you have certain rights regarding your
              personal data, including access, rectification, erasure,
              restriction of processing, and data portability. For questions,
              contact our Data Protection Officer at info@georgeexpeditions.com.
            </p>
          </article>

          <article className={`${policy.policy_block} ${policy.contact_block}`}>
            <p className={policy.section_label}>CONTACT US</p>
            <h2>Questions About This Policy</h2>
            <p>
              Don't hesitate to contact us if you have any questions regarding
              our Privacy Policy.
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

export default PrivacyPolicy;
