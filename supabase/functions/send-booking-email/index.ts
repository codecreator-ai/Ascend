import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { studentName, studentEmail, subject, tutor, timeSlot, reason } =
      await req.json();

    // NOTE: Resend free tier only allows sending to the account owner's verified email.
    // Until a custom domain is verified at resend.com/domains, all notifications
    // are sent to the Resend account owner email (helloarth09@gmail.com).
    // Once you verify ascendacademics100@gmail.com's domain, change TEAM_EMAIL back.
    const TEAM_EMAIL = "helloarth09@gmail.com";

    const teamEmailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 24px;">
        <div style="background: #111111; padding: 24px; border-radius: 8px 8px 0 0; border-bottom: 3px solid #D4AF37;">
          <h1 style="color: #D4AF37; margin: 0; font-size: 22px; font-weight: 700;">📚 New Booking — Ascend Academics</h1>
        </div>
        <div style="background: #ffffff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
          <p style="color: #374151; margin-top: 0;">A new tutoring session has been booked. Here are the details:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr style="background: #f9f9f9;">
              <td style="padding: 12px; font-weight: 600; color: #111111; width: 40%; border-bottom: 1px solid #e5e7eb;">Student Name</td>
              <td style="padding: 12px; color: #374151; border-bottom: 1px solid #e5e7eb;">${studentName}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: 600; color: #111111; border-bottom: 1px solid #e5e7eb;">Student Email</td>
              <td style="padding: 12px; color: #374151; border-bottom: 1px solid #e5e7eb;">${studentEmail}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 12px; font-weight: 600; color: #111111; border-bottom: 1px solid #e5e7eb;">Subject</td>
              <td style="padding: 12px; color: #374151; border-bottom: 1px solid #e5e7eb;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: 600; color: #111111; border-bottom: 1px solid #e5e7eb;">Tutor</td>
              <td style="padding: 12px; color: #374151; border-bottom: 1px solid #e5e7eb;">${tutor}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 12px; font-weight: 600; color: #111111; border-bottom: 1px solid #e5e7eb;">Time Slot</td>
              <td style="padding: 12px; color: #374151; border-bottom: 1px solid #e5e7eb;">${timeSlot}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: 600; color: #111111;">Reason for Tutoring</td>
              <td style="padding: 12px; color: #374151;">${reason}</td>
            </tr>
          </table>
          <p style="color: #9ca3af; font-size: 12px; margin-bottom: 0;">Submitted via the Ascend Academics platform.</p>
        </div>
      </div>
    `;

    const studentEmailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 24px;">
        <div style="background: #111111; padding: 24px; border-radius: 8px 8px 0 0; border-bottom: 3px solid #D4AF37;">
          <h1 style="color: #D4AF37; margin: 0; font-size: 22px; font-weight: 700;">✅ Session Confirmed — Ascend Academics</h1>
        </div>
        <div style="background: #ffffff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
          <p style="color: #374151; margin-top: 0;">Hi <strong>${studentName}</strong>,</p>
          <p style="color: #374151;">Your tutoring session is confirmed! Here's your booking summary:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr style="background: #f9f9f9;">
              <td style="padding: 12px; font-weight: 600; color: #111111; width: 40%; border-bottom: 1px solid #e5e7eb;">Subject</td>
              <td style="padding: 12px; color: #374151; border-bottom: 1px solid #e5e7eb;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: 600; color: #111111; border-bottom: 1px solid #e5e7eb;">Tutor</td>
              <td style="padding: 12px; color: #374151; border-bottom: 1px solid #e5e7eb;">${tutor}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 12px; font-weight: 600; color: #111111;">Time Slot</td>
              <td style="padding: 12px; color: #374151;">${timeSlot}</td>
            </tr>
          </table>
          <p style="color: #374151;">Your tutor will be in touch shortly. We're excited to help you succeed!</p>
          <div style="background: #111111; border-left: 4px solid #D4AF37; padding: 16px; border-radius: 4px; margin-top: 16px;">
            <p style="margin: 0; font-size: 14px; color: #D4AF37; font-weight: 600;">Questions?</p>
            <p style="margin: 4px 0 0; font-size: 13px; color: #cccccc;">Reach us at <strong>ascendacademics100@gmail.com</strong></p>
          </div>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 16px; margin-bottom: 0;">Ascend Academics — Tutoring by top local students</p>
        </div>
      </div>
    `;

    // Send team notification
    const teamRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Ascend Academics <onboarding@resend.dev>",
        to: [TEAM_EMAIL],
        subject: `New Booking: ${subject} with ${tutor} — ${studentName}`,
        html: teamEmailBody,
      }),
    });

    if (!teamRes.ok) {
      const err = await teamRes.text();
      throw new Error(`Team email failed [${teamRes.status}]: ${err}`);
    }

    // Send confirmation to student (non-blocking if it fails)
    const studentRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Ascend Academics <onboarding@resend.dev>",
        to: [studentEmail],
        subject: `Your session with ${tutor} is confirmed!`,
        html: studentEmailBody,
      }),
    });

    if (!studentRes.ok) {
      const err = await studentRes.text();
      console.error(`Student confirmation email failed [${studentRes.status}]: ${err}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending booking email:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
