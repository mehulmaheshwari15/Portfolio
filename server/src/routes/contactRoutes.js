import { Router } from "express";
import Contact from "../models/Contact.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    const contact = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    };

    if (
      !contact.name ||
      contact.name.length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) ||
      contact.email.length > 254 ||
      !contact.message ||
      contact.message.length > 5000
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid contact details.",
      });
    }

    await Contact.create(contact);

    return res.status(201).json({
      success: true,
      message: "Your message has been saved successfully.",
    });
  } catch (error) {
    console.error("Contact submission failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to save your message. Please try again later.",
    });
  }
});

export default router;