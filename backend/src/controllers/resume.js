import embedding from "../ai/agent.js";
import Resume from "../models/Resume.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

import extractText from "../utils/extractText.js";
import path from "path";



function cosineSimilarity(vecA, vecB) {
    const dot = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    return dot / (magA * magB);
}

const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const text = await extractText(req.file);


        if (!text || text.trim() === "") {
            return res.status(400).json({ success: false, message: "Extracted text is empty" });
        }

        const response = await embedding(text);

        if (!response) {
            return res.status(500).json({
                success: false,
                message: "Embedding generation failed — cannot save resume."
            });
        }

        const embeddingVector = response[0].values;

        // const result = await uploadOnCloudinary(`uploads/resumes/${req.file.filename}`)

        // console.log("Result",result.url)

        const newResume = new Resume(
            {
                text: "resume",
                embedding: embeddingVector,
                pdfPath: `uploads/resumes/${req.file.filename}`,
            }
        );
        await newResume.save();


        res.json({ success: true, message: "Resume uploaded and embedded!", embeddingLength: embedding.length });
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ success: false, message: err.message || "Resume upload failed" });
    }
};

const getResume = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Query text is required" });
    }

    const response = await embedding(query);
    const embeddingVector = response[0].values;

    const resumes = await Resume.find(); 

    const scored = resumes.map((doc) => ({
      ...doc.toObject(), 
      score: cosineSimilarity(embeddingVector, doc.embedding),
    }));

    scored.sort((a, b) => b.score - a.score);

    return res.status(200).json(scored.slice(0, 5));

  } catch (err) {
    console.error("Error searching resumes:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

const getallResume = async (req, res) => {
  try {

    const resumes = await Resume.find(); 

    return res.status(200).json(resumes);

  } catch (err) {
    console.error("Error searching resumes:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

const openResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume || !resume.pdfPath) return res.status(404).send("PDF not found");

    const absolutePath = path.join(process.cwd(), resume.pdfPath);

    console.log("Serving PDF:", absolutePath); // debug

    res.sendFile(absolutePath);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export {
    uploadResume,
    getResume,
    openResume,
    getallResume
};
