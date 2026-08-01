"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Message could not be sent");
      form.reset();
      setStatus("sent");
      setMessage("Your message has been sent. Lucky's will get back with you as soon as possible.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Message could not be sent. Please call Lucky's instead.");
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="shell contact-grid">
        <div className="contact-copy">
          <p className="eyebrow light">Call or send a message</p>
          <h2>How can we help you?</h2>
          <p>For current float availability, cabins, camping, or river questions, call Lucky&apos;s directly or send a message below.</p>
          <a className="contact-phone" href={site.phoneHref}>{site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <address>{site.addressLines.join(", ")}</address>
          <p>{site.hours}</p>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <div className="form-row">
            <label>Name<input name="name" required autoComplete="name" /></label>
            <label>Phone<input name="phone" type="tel" required autoComplete="tel" /></label>
          </div>
          <label>Email<input name="email" type="email" autoComplete="email" /></label>
          <label>Message<textarea name="message" rows={5} required /></label>
          <label className="honeypot" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
          <button className="button button-gold" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send Message"}</button>
          {message && <p className={`form-status ${status}`} role="status">{message}</p>}
        </form>
      </div>
    </section>
  );
}
