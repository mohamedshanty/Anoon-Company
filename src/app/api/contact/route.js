import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { rateLimit } from '@/lib/rate-limit';
import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const { isRateLimited } = rateLimit(ip);

    if (isRateLimited) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const { name, email, phone, message, recaptchaToken } = await req.json();

    // 1. Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 2. reCAPTCHA Verification
    if (process.env.RECAPTCHA_SECRET_KEY) {
      const recaptchaResponse = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        { method: 'POST' }
      );
      const recaptchaData = await recaptchaResponse.json();

      if (!recaptchaData.success) {
        return NextResponse.json(
          { message: 'reCAPTCHA verification failed.' },
          { status: 400 }
        );
      }
    }

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Gaza',
      dateStyle: 'full',
      timeStyle: 'long',
    });

    // 3. Log to MongoDB
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
        timestamp,
      });
    } catch (dbError) {
      console.error("Database logging failed:", dbError);
      // We continue even if DB fails, as email is the primary goal
    }

    // 4. Configure SMTP transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        // Do not fail on invalid certificates if any, but since it's Gmail, it should be fine.
        rejectUnauthorized: true,
      }
    });

    // 5. Admin Notification Email
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `🚀 [New Message] ${name} - ${timestamp}`,
      text: `
        New contact form submission:
        ---------------------------
        Date: ${timestamp}
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'N/A'}
        Message: ${message}
      `,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #38bdf8;">New Contact Form Submission</h2>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p><strong>Date:</strong> ${timestamp}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;"><strong>Message:</strong><br/>${message}</p>
          <p style="font-size: 12px; color: #999;">IP: ${ip}</p>
        </div>
      `,
    };

    // 6. User Auto-Reply Email
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for contacting Anoon!`,
      text: `Hello ${name},\n\nThank you for reaching out to us. We have received your message and our team will get back to you as soon as possible.\n\nBest regards,\nAnoon Team`,
      html: `
        <div style="font-family: sans-serif; text-align: center; color: #333; max-width: 600px; margin: auto; padding: 40px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #38bdf8;">Hello ${name}!</h1>
          <p style="font-size: 18px;">Thank you for reaching out to <strong>Anoon</strong>.</p>
          <p>We've received your message and wanted to let you know that we're on it!</p>
          <p>Our team will review your inquiry and get back to you as soon as possible.</p>
          <div style="margin: 30px 0; padding: 20px; background: #f0f9ff; border-radius: 8px;">
            <p style="margin: 0; font-style: italic;">"Your vision is our mission."</p>
          </div>
          <p style="color: #666;">Best regards,<br/><strong>The Anoon Team</strong></p>
        </div>
      `,
    };

    // Send emails
    try {
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(userMailOptions)
      ]);
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
      // If we could not send emails, we still want to report the error properly
      throw emailError;
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Submission Error:', error);
    
    // Provide a more descriptive error message to the client
    let errorMessage = 'Failed to process request';
    if (error.code === 'ESOCKET' || error.code === 'ETIMEDOUT' || error.code === 'ENETUNREACH') {
      errorMessage = 'Connection failed: Unable to reach email server. Please check your network or try again later.';
    } else if (error.code === 'EAUTH') {
      errorMessage = 'Authentication failed: Please check your email credentials.';
    }

    return NextResponse.json(
      { message: errorMessage, error: error.message },
      { status: 500 }
    );
  }
}
