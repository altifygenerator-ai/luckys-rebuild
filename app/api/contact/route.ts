import { NextResponse } from "next/server";

function clean(value: unknown, max = 2000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
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
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().startsWith("application/json")) {
      return NextResponse.json({ error: "Invalid request format." }, { status: 415 });
    }

    // Keep unexpected or oversized requests from reaching the email provider.
    const declaredSize = Number(request.headers.get("content-length") ?? 0);
    if (declaredSize > 12_000) {
      return NextResponse.json({ error: "Message is too long." }, { status: 413 });
    }
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 12_000) {
      return NextResponse.json({ error: "Message is too long." }, { status: 413 });
    }

    // Browsers submitting from other sites should not be able to invoke this form.
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }

    const body = JSON.parse(rawBody);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid message." }, { status: 400 });
    }
    if (clean(body.company)) return NextResponse.json({ ok: true });

    const name = clean(body.name, 120);
    const phone = clean(body.phone, 80);
    const email = clean(body.email, 160);
    const message = clean(body.message, 3000);

    if (!name || !phone || !message) {
      return NextResponse.json({ error: "Please include your name, phone number, and message." }, { status: 400 });
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return NextResponse.json({ error: "Please check your phone number and email." }, { status: 400 });
    }

    // Optional Cloudflare Turnstile challenge: enabled only after BOTH
    // environment variables are configured in the deployment.
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (turnstileSecret || turnstileSiteKey) {
      if (!turnstileSecret || !turnstileSiteKey) {
        return NextResponse.json({ error: "The contact form is temporarily unavailable. Please call Lucky's." }, { status: 503 });
      }
      const challenge = clean(body["cf-turnstile-response"], 2048);
      if (!challenge) {
        return NextResponse.json({ error: "Please complete the verification before sending." }, { status: 400 });
      }
      const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: turnstileSecret, response: challenge }),
        signal: AbortSignal.timeout(7000),
        cache: "no-store",
      });
      if (!verification.ok) {
        return NextResponse.json({ error: "Verification is temporarily unavailable. Please call Lucky's." }, { status: 503 });
      }
      const verdict = await verification.json() as { success?: boolean };
      if (!verdict.success) {
        return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
      }
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
