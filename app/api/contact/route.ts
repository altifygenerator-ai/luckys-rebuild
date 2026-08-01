import { NextResponse } from "next/server";

function clean(value: unknown, max = 2000) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;",
  })[character] ?? character);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (clean(body.company)) return NextResponse.json({ ok: true });

    const name = clean(body.name, 120);
    const phone = clean(body.phone, 80);
    const email = clean(body.email, 160);
    const message = clean(body.message, 3000);

    if (!name || !phone || !message) {
      return NextResponse.json({ error: "Please include your name, phone number, and message." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    const to = process.env.CONTACT_TO_EMAIL || "info@caddocanoeandkayak.com";

    if (!apiKey || !from) {
      return NextResponse.json({ error: "The online form is not connected yet. Please call 870-356-2772." }, { status: 503 });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email || undefined,
        subject: `Website message from ${name}`,
        html: `
          <h2>New Lucky's website message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email || "Not provided")}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        `,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) throw new Error("Email provider rejected the message");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Your message could not be sent. Please call 870-356-2772." }, { status: 500 });
  }
}
