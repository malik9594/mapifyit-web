import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

/**
 * PRODUCTION-READY BACKEND SMTP ROUTE (Sync with MapifyIT-Webpanel-Backend config)
 */

type ContactPayload = {
    name?: string;
    email?: string;
    phone?: string;
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

        const { name, email, phone, message } = payload;

        // 1. Validate Input
        if (!name || !email || !phone || !message) {
            return NextResponse.json(
                { error: 'Incomplete data. Please provide name, email, phone, and message.' },
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
        // const mailOptions = {
        //     from: SMTP_CONFIG.from,
        //     to: SMTP_CONFIG.recipient,
        //     replyTo: email, // Direct replies back to the customer
        //     subject: `[Lead] MapifyIt Support Request: ${name}`,
        //     text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
        //     html: `
        //         <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; padding: 40px; color: #111827;">
        //             <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
        //                 <div style="background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%); padding: 30px; text-align: center;">
        //                     <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em;">New Contact Inquiry</h1>
        //                 </div>
        //                 <div style="padding: 40px; border-bottom: 2px solid #f3f4f6;">
        //                     <div style="margin-bottom: 30px;">
        //                         <p style="font-size: 14px; font-weight: 700; color: #6b7280; text-transform: uppercase; margin-bottom: 8px;">Sender Details</p>
        //                         <p style="font-size: 18px; margin: 0; color: #111827;"><strong>${name}</strong></p>
        //                         <p style="font-size: 16px; margin: 0; color: #3b82f6;">${email}</p>
        //                         <p style="font-size: 15px; margin: 6px 0 0; color: #374151;">${phone}</p>
        //                     </div>
        //                     <div style="background-color: #f8fafc; border-radius: 12px; padding: 25px; border-left: 4px solid #3b82f6;">
        //                         <p style="font-size: 14px; font-weight: 700; color: #6b7280; text-transform: uppercase; margin-bottom: 12px;">Message</p>
        //                         <p style="font-size: 16px; line-height: 1.6; color: #374151; margin: 0; white-space: pre-wrap;">${message}</p>
        //                     </div>
        //                 </div>
        //                 <div style="padding: 24px; background-color: #fdfdfd; text-align: center;">
        //                     <p style="font-size: 12px; color: #9ca3af; margin: 0;">Sent via MapifyIt Backend Spatial Engine &bull; Secure SSL Encryption Active</p>
        //                 </div>
        //             </div>
        //         </div>
        //     `,
        // };

          const mailOptions = {
            from: SMTP_CONFIG.from,
            to: SMTP_CONFIG.recipient,
            replyTo: email,
            subject: `🔔 New Inquiry: ${name} via MapifyIt`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Lead - MapifyIt</title>
                </head>
                <body style="margin: 0; padding: 0; background-color: #f6f9fc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e1e8ef;">
                        <!-- Brand Header -->
                        <tr>
                            <td align="center" style="background-color: #0B0F14; padding: 35px 20px; border-bottom: 4px solid #2F80FF;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">
                                    <img src="https://mapifyit.com/mapify-white-bg.png" alt="MapifyIt Logo" style="max-width: 200px; height: auto;" />
                                </h1>
                            </td>
                        </tr>

                        <!-- Hero Message -->
                        <tr>
                            <td style="padding: 40px 40px 20px 40px;">
                                <h2 style="margin: 0 0 15px 0; color: #1a202c; font-size: 22px; font-weight: 700;">New Support Request</h2>
                                <p style="margin: 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                                    A new lead has just contacted the <strong>MapifyIt</strong> platform. Below are the submission details for your review.
                                </p>
                            </td>
                        </tr>

                        <!-- Contact Details Block -->
                        <tr>
                            <td style="padding: 20px 40px;">
                                <div style="background-color: #ffffff; border: 1px solid #edf2f7; border-radius: 12px; padding: 25px;">
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="padding-bottom: 15px;">
                                                <p style="margin: 0; font-size: 11px; font-weight: 700; color: #a0aec0; text-transform: uppercase; letter-spacing: 1px;">Customer Name</p>
                                                <p style="margin: 4px 0 0 0; font-size: 16px; color: #2d3748; font-weight: 600;">${name}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-bottom: 15px;">
                                                <p style="margin: 0; font-size: 11px; font-weight: 700; color: #a0aec0; text-transform: uppercase; letter-spacing: 1px;">Email Address</p>
                                                <p style="margin: 4px 0 0 0; font-size: 16px;"><a href="mailto:${email}" style="color: #2F80FF; text-decoration: none; font-weight: 600;">${email}</a></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p style="margin: 0; font-size: 11px; font-weight: 700; color: #a0aec0; text-transform: uppercase; letter-spacing: 1px;">Phone Number</p>
                                                <p style="margin: 4px 0 0 0; font-size: 16px; color: #2d3748;">${phone}</p>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>

                        <!-- Message Content -->
                        <tr>
                            <td style="padding: 0 40px 40px 40px;">
                                <div style="background-color: #f8fafc; border-radius: 12px; padding: 25px; border-left: 5px solid #2F80FF;">
                                    <p style="margin: 0 0 10px 0; font-size: 11px; font-weight: 700; color: #a0aec0; text-transform: uppercase; letter-spacing: 1px;">Inquiry Message</p>
                                    <p style="margin: 0; font-size: 16px; line-height: 1.7; color: #2d3748; white-space: pre-wrap;">${message}</p>
                                </div>
                                
                                <div align="center" style="margin-top: 35px;">
                                    <a href="mailto:${email}" style="background-color: #2F80FF; color: #ffffff; padding: 16px 35px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 15px; box-shadow: 0 4px 6px rgba(47, 128, 255, 0.2); display: inline-block;">Quick Reply</a>
                                </div>
                            </td>
                        </tr>

                        <!-- Technical Footer -->
                        <tr>
                            <td style="background-color: #f7fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #edf2f7;">
                                <p style="margin: 0; font-size: 12px; color: #a0aec0; line-height: 1.6;">
                                    <strong>MapifyIt System Notification</strong><br>
                                    Encoded via SSL/TLS Port 465 &bull; Automated Routing Engine
                                </p>
                            </td>
                        </tr>
                    </table>
                    <p style="text-align: center; font-size: 11px; color: #cbd5e0; margin-top: 25px;">
                        © ${new Date().getFullYear()} MapifyIt Platform. Confidentiality assured.
                    </p>
                </body>
                </html>
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

    } catch (error: unknown) {
        console.error('[Backend] SMTP error detected:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        return NextResponse.json(
            {
                error: process.env.NODE_ENV === 'development'
                    ? `Authentication Failed: ${errorMessage}. Check your mail server logs and credentials.`
                    : 'System is currently unable to process mail requests. Please try again later.'
            },
            { status: 500 }
        );
    }
}
