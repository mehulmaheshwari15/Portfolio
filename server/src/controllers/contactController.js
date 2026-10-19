import mongoose from "mongoose";
import Contact from "../models/Contact.js";

export async function createContact(req, res, next) {
  try {
    const { name, email, message } = req.body;

    if (
      typeof name !== "string" || !name.trim() ||
      typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof message !== "string" || !message.trim()
    ) {
      return res.status(400).json({ message: "Please provide a valid name, email, and message." });
    }

    if (mongooseUnavailable()) {
      return res.status(503).json({ message: "Contact service is temporarily unavailable." });
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    });

    return res.status(201).json({
      message: "Your message has been received.",
      id: contact._id
    });
  } catch (error) {
    next(error);
  }
}

function mongooseUnavailable() {
  return !process.env.MONGODB_URI || mongoose.connection.readyState !== 1;
}