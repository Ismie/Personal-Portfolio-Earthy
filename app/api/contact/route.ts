import { Resend } from 'resend';

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  const name = String(data.name ?? '').trim();
  const email = String(data.email ?? '').trim();
  const subject = String(data.subject ?? '').trim();
  const message = String(data.message ?? '').trim();

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return Response.json({ ok: false, error: 'validation' }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No key configured yet — the form falls back to a mailto on the client.
    return Response.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  const to = process.env.CONTACT_TO ?? 'kontakt@romanschulz.com';
  const from = process.env.CONTACT_FROM ?? 'Portfolio <onboarding@resend.dev>';

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Neue Nachricht von ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\nBetreff: ${subject || '—'}\n\n${message}`,
    });
    if (error) {
      return Response.json({ ok: false, error: 'send_failed' }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }
}
