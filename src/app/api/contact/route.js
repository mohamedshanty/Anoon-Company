import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";
import clientPromise from "@/lib/db"; // Use the new lazy connection
import { adminEmailTemplate } from "@/lib/email-templates/admin-template";
import { userEmailTemplate } from "@/lib/email-templates/user-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const { isRateLimited } = rateLimit(ip);

    if (isRateLimited) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const { name, email, phone, message, recaptchaToken } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    if (process.env.RECAPTCHA_SECRET_KEY) {
      const recaptchaResponse = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        { method: "POST" },
      );
      const recaptchaData = await recaptchaResponse.json();

      if (!recaptchaData.success) {
        return NextResponse.json(
          { message: "reCAPTCHA verification failed." },
          { status: 400 },
        );
      }
    }

    // Log to MongoDB
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB || "anoon_db");
      await db.collection("messages").insertOne({
        name,
        email,
        phone,
        message,
        ip,
        submittedAt: new Date(),
      });
    } catch (dbError) {
      console.error("Database logging failed:", dbError);
      // Continue even if DB fails
    }

    // Send emails using Resend
    try {
      await Promise.all([
        resend.emails.send({
          from: `Anoon <${process.env.EMAIL_FROM || "noreply@anoonsolutions.com"}>`,
          to: process.env.EMAIL_TO,
          reply_to: email,
          subject: `New Message from ${name}`,
          html: adminEmailTemplate({ name, email, message }),
        }),
        resend.emails.send({
          from: `Anoon <${process.env.EMAIL_FROM || "noreply@anoonsolutions.com"}>`,
          to: email,
          subject: "Thank you for contacting Anoon!",
          html: userEmailTemplate({ name }),
        }),
      ]);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Decide if you want to throw or just log
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Submission Error:", error);
    return NextResponse.json(
      { message: "Failed to process request", error: error.message },
      { status: 500 },
    );
  }
}
