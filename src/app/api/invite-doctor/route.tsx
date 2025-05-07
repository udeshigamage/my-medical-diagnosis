import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, contactNumber } = await req.json();

    const registrationLink = `${
      process.env.BASE_URL
    }/Auth/Signup-Doctor?email=${encodeURIComponent(email)}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Your App" <no-reply@yourapp.com>',
      to: email,
      subject: "Doctor Registration Invitation",
      html: `
        <p>Hello Dr. ${name},</p>
        <p>You’ve been invited to join our platform as a doctor.</p>
        <p><a href="${registrationLink}">Click here to complete your registration</a></p>
        <p>Contact Number: ${contactNumber}</p>
      `,
    });

    return NextResponse.json({ message: "Invitation sent" }, { status: 200 });
  } catch (error) {
    console.error("Error sending invitation:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
