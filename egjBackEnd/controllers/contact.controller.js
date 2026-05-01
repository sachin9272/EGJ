import { sendEmailStrict } from "../utils/email.js";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const getContactRecipients = () => {
  const recipients =
    process.env.CONTACT_EMAIL_TO || process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

  return recipients
    ?.split(",")
    .map((email) => email.trim())
    .filter(Boolean);
};

const contactEmailTemplate = ({
  fullName,
  email,
  phone,
  nationality,
  message,
}) => {
  const rows = [
    ["Full Name", fullName || "Not provided"],
    ["Email Address", email],
    ["Phone | Whatsapp", phone || "Not provided"],
    ["Nationality", nationality || "Not provided"],
  ];

  return `
    <div style="margin:0;padding:0;background:#061008;font-family:Arial,Helvetica,sans-serif;color:#f4eed9;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#061008;padding:24px 12px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;border:1px solid rgba(244,238,217,0.35);border-radius:16px;overflow:hidden;background:#10180d;">
              <tr>
                <td style="padding:28px 28px 20px;background:linear-gradient(135deg,#1e9146,#79a81c);">
                  <p style="margin:0 0 8px;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#f4eed9;">Website Contact Form</p>
                  <h1 style="margin:0;font-size:30px;line-height:1.15;color:#ffffff;">New Contact Request</h1>
                  <p style="margin:10px 0 0;font-size:16px;color:#f4eed9;">A visitor submitted the contact form on Expeditions George of the Jungle.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 28px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    ${rows
                      .map(
                        ([label, value]) => `
                          <tr>
                            <td style="padding:14px 0;border-bottom:1px solid rgba(244,238,217,0.16);">
                              <p style="margin:0 0 5px;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:#d9b650;">${escapeHtml(label)}</p>
                              <p style="margin:0;font-size:17px;line-height:1.5;color:#f4eed9;word-break:break-word;">${escapeHtml(value)}</p>
                            </td>
                          </tr>
                        `
                      )
                      .join("")}
                  </table>
                  <div style="margin-top:22px;padding:18px;border-radius:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(244,238,217,0.16);">
                    <p style="margin:0 0 8px;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:#d9b650;">Your Message</p>
                    <p style="margin:0;font-size:17px;line-height:1.6;color:#f4eed9;white-space:pre-wrap;">${escapeHtml(message || "Not provided")}</p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
};

export const sendContactEmail = async (req, res) => {
  try {
    const { fullName = "", email = "", phone = "", nationality = "", message = "" } =
      req.body || {};

    if (!fullName.trim() || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Full name and email address are required.",
      });
    }

    const recipients = getContactRecipients();

    if (!recipients?.length) {
      return res.status(500).json({
        success: false,
        message: "Contact email recipient is not configured.",
      });
    }

    await sendEmailStrict({
      to: recipients.join(","),
      replyTo: email.trim(),
      subject: `New contact request${fullName ? ` from ${fullName}` : ""}`,
      html: contactEmailTemplate({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        nationality: nationality.trim(),
        message: message.trim(),
      }),
    });

    return res.status(200).json({
      success: true,
      message: "Contact request sent successfully.",
    });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send your message right now. Please try again later.",
    });
  }
};
