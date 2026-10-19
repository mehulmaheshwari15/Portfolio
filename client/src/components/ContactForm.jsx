import { useState } from "react";
import "./ContactForm.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (status !== "idle") {
      setStatus("idle");
      setErrorMessage("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setErrorMessage("Please complete all fields.");
      setStatus("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please provide a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Failed to save your message. Please try again.");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setErrorMessage(
        err.message === "Failed to fetch"
          ? "Unable to connect to the server. Please check your connection."
          : err.message
      );
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-heading">
          <span className="contact-eyebrow">GET IN TOUCH</span>

          <h2>
            Let's Connect<span className="gold-dot">.</span>
          </h2>

          <p>
            Have a project idea or opportunity? Let's talk.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-field">
            <label htmlFor="contact-name">Your name</label>

            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              maxLength={100}
              value={form.name}
              onChange={handleChange}
              disabled={status === "submitting"}
              required
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-email">Email address</label>

            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="john@example.com"
              autoComplete="email"
              maxLength={254}
              value={form.email}
              onChange={handleChange}
              disabled={status === "submitting"}
              required
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-message">Your message</label>

            <textarea
              id="contact-message"
              name="message"
              placeholder="What's on your mind?"
              rows={4}
              maxLength={5000}
              value={form.message}
              onChange={handleChange}
              disabled={status === "submitting"}
              required
            />
          </div>

          <button
            className="contact-submit"
            type="submit"
            disabled={status === "submitting"}
          >
            <span>{status === "submitting" ? "Sending..." : "Send Message"}</span>
            <span className="contact-arrow" aria-hidden="true">
              ↗
            </span>
          </button>

          {status === "error" && (
            <p className="contact-feedback error" role="alert">
              {errorMessage || "Please complete all fields."}
            </p>
          )}

          {status === "success" && (
            <p className="contact-feedback success" role="status">
              ✓ Your message has been sent successfully. Thank you!
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
