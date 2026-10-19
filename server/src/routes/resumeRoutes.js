import { Router } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const router = Router();
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const resumeDirectory = path.resolve(currentDir, "../../resumes");

const resumeFiles = {
  pdf: {
    filename: "resume.pdf",
    contentType: "application/pdf",
  },
  docx: {
    filename: "resume.docx",
    contentType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
};

function downloadResume(format) {
  return (req, res, next) => {
    const file = resumeFiles[format];

    // Only predefined filenames are used; user input never selects a path.
    const filePath = path.join(
      resumeDirectory,
      format === "pdf" ? "resume.pdf" : "resume.docx"
    );

    fs.stat(filePath, (err, stats) => {
      if (err) {
        if (err.code === "ENOENT" || err.code === "ENOTDIR") {
          return res.status(404).json({
            success: false,
            message: `The ${format.toUpperCase()} resume is not available yet.`,
          });
        }

        return next(err);
      }

      if (!stats.isFile()) {
        return res.status(404).json({
          success: false,
          message: "Resume file not found.",
        });
      }

      res.setHeader("Content-Type", file.contentType);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${file.filename}"`
      );

      res.sendFile(filePath, (sendError) => {
        if (sendError && !res.headersSent) {
          next(sendError);
        }
      });
    });
  };
}

router.get("/pdf", downloadResume("pdf"));
router.get("/docx", downloadResume("docx"));

export default router;