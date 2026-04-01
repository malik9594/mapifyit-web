import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

/**
 * PRODUCTION-READY BACKEND SMTP ROUTE (Sync with MapifyIT-Webpanel-Backend config)
 */

type ContactPayload = {
    name?: string;
    email?: string;
    message?: string;
};

// ─── SMTP CONFIGURATION ──────────────────────────────────────────────────
// Verified with MapifyIT-Webpanel-Backend settings.
const SMTP_CONFIG = {
    host: 'mail.mapifyit.com',
    port: 465, // Working SSL/TLS port
    user: 'noreply@system.mapifyit.com',
    // Corrected password with leading hyphen '-'
    pass: '-,55,sSinqUinGEnTErWaRmtElIChIOnsTICe',
    from: 'MapifyIt Support <noreply@system.mapifyit.com>',
    recipient: 'hassan@mapifyit.com',
};

export async function POST(request: Request) {
    try {
        console.log('[Backend] Received contact request');

        let payload: ContactPayload;
        try {
            payload = await request.json();
        } catch {
            return NextResponse.json({ error: 'Payload must be valid JSON' }, { status: 400 });
        }

        const { name, email, message } = payload;

        // 1. Validate Input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Incomplete data. Please provide name, email, and message.' },
                { status: 400 }
            );
        }

        // 2. Initialize Nodemailer Transporter
        // Using Port 465 with secure: true for implicit SSL/TLS
        const transporter = nodemailer.createTransport({
            host: SMTP_CONFIG.host,
            port: SMTP_CONFIG.port,
            secure: true, // SSL/TLS (Implicit)
            auth: {
                user: SMTP_CONFIG.user,
                pass: SMTP_CONFIG.pass,
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 10000,
            tls: {
                // Keep this to ensure connection on private mail servers
                rejectUnauthorized: false
            }
        });

        // 3. Construct Email Template
        const mailOptions = {
            from: SMTP_CONFIG.from,
            to: SMTP_CONFIG.recipient,
            replyTo: email, // Direct replies back to the customer
            subject: `[Lead] MapifyIt Support Request: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; padding: 40px; color: #111827;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
                        <div style="background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%); padding: 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em;">New Contact Inquiry</h1>
                        </div>
                        <div style="padding: 40px; border-bottom: 2px solid #f3f4f6;">
                            <div style="margin-bottom: 30px;">
                                <p style="font-size: 14px; font-weight: 700; color: #6b7280; text-transform: uppercase; margin-bottom: 8px;">Sender Details</p>
                                <p style="font-size: 18px; margin: 0; color: #111827;"><strong>${name}</strong></p>
                                <p style="font-size: 16px; margin: 0; color: #3b82f6;">${email}</p>
                            </div>
                            <div style="background-color: #f8fafc; border-radius: 12px; padding: 25px; border-left: 4px solid #3b82f6;">
                                <p style="font-size: 14px; font-weight: 700; color: #6b7280; text-transform: uppercase; margin-bottom: 12px;">Message</p>
                                <p style="font-size: 16px; line-height: 1.6; color: #374151; margin: 0; white-space: pre-wrap;">${message}</p>
                            </div>
                        </div>
                        <div style="padding: 24px; background-color: #fdfdfd; text-align: center;">
                            <p style="font-size: 12px; color: #9ca3af; margin: 0;">Sent via MapifyIt Backend Spatial Engine &bull; Secure SSL Encryption Active</p>
                        </div>
                    </div>
                </div>
            `,
        };

        // 4. Dispatch Email
        console.log(`[Backend] Attempting SMTP handshake with ${SMTP_CONFIG.host}:${SMTP_CONFIG.port}`);
        await transporter.sendMail(mailOptions);
        console.log(`[Backend] Success: Email sent for ${name}`);

        return NextResponse.json(
            { success: true, message: 'Your message has been delivered to our engineering team.' },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('[Backend] SMTP error detected:', error);

        return NextResponse.json(
            {
                error: process.env.NODE_ENV === 'development'
                    ? `Authentication Failed: ${error.message}. Check your mail server logs and credentials.`
                    : 'System is currently unable to process mail requests. Please try again later.'
            },
            { status: 500 }
        );
    }
}
