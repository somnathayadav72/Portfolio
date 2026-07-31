import { Resend } from "resend";
import { site } from "@/config/site";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, limit) {
  return String(value ?? "").trim().slice(0, limit);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[character]));
}

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Email service is not configured." }, { status: 500 });
  }

  try {
    const payload = await request.json();
    if (clean(payload.website, 80)) return Response.json({ success: true });

    const name = clean(payload.name, 100);
    const email = clean(payload.email, 160).toLowerCase();
    const company = clean(payload.company, 120) || "Not provided";
    const projectType = clean(payload.projectType || payload.type, 100) || "General enquiry";
    const message = clean(payload.message, 4000);

    if (!name || !email || !message || !emailPattern.test(email)) {
      return Response.json({ error: "Please provide a valid name, email, and message." }, { status: 400 });
    }

    const subject = `${projectType} enquiry from ${name}`;
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company);
    const safeProjectType = escapeHtml(projectType);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Somnath Yadav <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL || site.email],
      reply_to: email,
      subject,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nProject type: ${projectType}\n\n${message}`,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#101114"><h2>New portfolio enquiry</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Company:</strong> ${safeCompany}</p><p><strong>Project type:</strong> ${safeProjectType}</p><hr /><p>${safeMessage}</p></div>`,
    });

    if (error) {
      console.error("Resend contact email failed:", error);
      return Response.json({ error: "The message could not be sent." }, { status: 502 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Contact route failed:", error);
    return Response.json({ error: "The message could not be sent." }, { status: 500 });
  }
}
