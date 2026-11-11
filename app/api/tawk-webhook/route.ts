import crypto from 'crypto';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

type TawkChatStartPayload = {
    event?: string;
    chatId?: string;
    time?: string;
    domain?: string;
    referrer?: string;
    message?: {
        text?: string;
        type?: string;
    };
    visitor?: {
        name?: string;
        email?: string;
        city?: string;
        country?: string;
    };
};

function isValidSignature(body: string, signature: string, secret: string) {
    if (!signature || !secret) return false;

    const expected = crypto
        .createHmac('sha1', secret)
        .update(body)
        .digest('hex');

    if (signature.length !== expected.length) return false;

    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expected),
    );
}

export async function GET() {
    return NextResponse.json({ ok: true, service: 'tawk-webhook' });
}

export async function POST(request: Request) {
    const rawBody = await request.text();
    const signature = request.headers.get('x-tawk-signature') || '';

    if (!isValidSignature(rawBody, signature, process.env.TAWK_WEBHOOK_SECRET || '')) {
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
    }

    let payload: TawkChatStartPayload;
    try {
        payload = JSON.parse(rawBody);
    } catch {
        return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    if (payload.event !== 'chat:start') {
        return NextResponse.json({ received: true });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const smtpFrom = process.env.SMTP_FROM;

    if (!smtpHost || !smtpUser || !smtpPassword || !smtpFrom) {
        console.error('[Tawk webhook] SMTP environment variables are missing');
        return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
            user: smtpUser,
            pass: smtpPassword,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const visitorName = payload.visitor?.name || 'Unknown visitor';
    const visitorEmail = payload.visitor?.email || 'Not provided';
    const message = payload.message?.text || 'No message provided';

    await transporter.sendMail({
        from: smtpFrom,
        to: ['hassan@mapifyit.com','hassanrazamalik512@gmail.com'],
        subject: `New tawk.to chat from ${visitorName}`,
        text: [
            'A new tawk.to chat has started.',
            '',
            `Visitor: ${visitorName}`,
            `Email: ${visitorEmail}`,
            `Message: ${message}`,
            `Website: ${payload.domain || 'Not provided'}`,
            `Chat ID: ${payload.chatId || 'Not provided'}`,
            `Time: ${payload.time || 'Not provided'}`,
        ].join('\n'),
    });

    return NextResponse.json({ success: true });
}
