import { Resend } from "resend";
import { isSupabaseConfigured, supabase } from "./supabase";

const WELCOME_CODE = "WELCOME10";
const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL || "Cherished by Jade <hello@cherishedbyjade.com>";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function welcomeEmailHtml() {
  return `<div style="font-family:Georgia,serif;max-width:420px;margin:0 auto;padding:32px 24px;color:#1a1a18">
    <p style="letter-spacing:.08em;text-transform:uppercase;font-size:11px;color:#8a8378;margin:0 0 12px">Cherished by Jade</p>
    <h1 style="font-size:22px;margin:0 0 16px">Here's your code</h1>
    <p style="font-size:14px;line-height:1.6;margin:0 0 24px">Thank you for joining us. Use the code below for 10% off your first order.</p>
    <p style="font-size:24px;letter-spacing:.06em;font-weight:600;padding:14px 20px;border:1px solid #ddd8cf;display:inline-block;margin:0 0 24px">${WELCOME_CODE}</p>
    <p style="font-size:12px;line-height:1.6;color:#8a8378;margin:0">Enter this at checkout. One use per customer.</p>
  </div>`;
}

export async function subscribeEmail(rawEmail: string): Promise<{ data: { ok: true } } | { error: string; status: number }> {
  const email = rawEmail.trim().toLowerCase();
  if (!EMAIL_PATTERN.test(email)) return { error: "Enter a valid email address.", status: 400 };
  if (!resend) return { error: "Email sign-up isn't set up yet — check back soon.", status: 503 };

  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("newsletter_subscribers").upsert({ email }, { onConflict: "email", ignoreDuplicates: true });
    if (error) return { error: "Something went wrong — please try again.", status: 500 };
  }

  const { error: sendError } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: "Your 10% off code",
    html: welcomeEmailHtml(),
  });
  if (sendError) return { error: "We couldn't send that email — please try again.", status: 500 };

  return { data: { ok: true } };
}
