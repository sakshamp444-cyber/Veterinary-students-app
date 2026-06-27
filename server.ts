import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

let currentDirname = '';
try {
  if (typeof __dirname !== 'undefined') {
    currentDirname = __dirname;
  } else {
    currentDirname = path.dirname(fileURLToPath(import.meta.url));
  }
} catch (e) {
  currentDirname = process.cwd();
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // AI Veterinary Search Route
  app.post('/api/search', async (req, res) => {
    try {
      const { query, mode } = req.body; // mode: 'disease' | 'medicine' | 'animal' | 'general'
      if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({ 
          error: 'Gemini API Key is not configured. Please add it to Settings > Secrets.' 
        });
      }

      // Initialize GoogleGenAI SDK correctly with server-side API Key
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Customized System Instruction for MP Veterinary & Animal Husbandry Diploma Students
      const systemInstruction = `You are "Dhanvantari Vet AI", an elite AI Veterinary Assistant specialized in the 2-Year Diploma in Animal Husbandry (DAHET/DVLT) curriculum for Madhya Pradesh (NDVSU Jabalpur syllabus).
Your primary role is to provide clear, scientifically accurate, and easy-to-understand information for veterinary students.
The user is searching in the category: "${mode.toUpperCase()}".

Provide structured veterinary guidance. For diseases, include common Indian synonyms, etiology (bacterial/viral/fungal/parasitic), susceptible species (e.g., cows, buffaloes, goats), clinical signs (e.g., high fever, vesicles), diagnosis, treatment outline, vaccination schedule (if any), and prevention tips.
For medicines, include category/class, indications, common routes of administration (Intramuscular, Subcutaneous, Intravenous, Oral), standard dosage for large/small animals, withdrawal period (milk & meat), and major contraindications.
For animal knowledge, focus on Indian livestock breeds (e.g., Murrah, Sahiwal, Gir, Jamunapari, Barbari), housing, clean milk production, nutrition, artificial insemination, and reproduction indicators.

Format everything in professional, highly readable markdown with bold text, clean lists, and structured tables where applicable. Include a prominent, respectful Vet Warning at the bottom: "⚠️ Vet Warning: This guidance is for educational review only. Clinical administration must be performed under the supervision of a registered veterinarian."`;

      // Use gemini-3.5-flash as the standard model for textual Q&A
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: query,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error('Gemini Search API error:', error);
      res.status(500).json({ 
        error: error.message || 'An error occurred while communicating with the AI model.' 
      });
    }
  });

  // AI-Powered Interactive Case Study Feedback Route
  app.post('/api/case-feedback', async (req, res) => {
    try {
      const { caseTitle, studentHistory, studentDiagnosis, studentTreatment } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({ 
          error: 'Gemini API Key is not configured. Please add it to Settings > Secrets.' 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `You are a clinical veterinary examiner evaluating a student's diagnostic and treatment plan for an interactive veterinary case study.
Evaluate their clinical reasoning, diagnosis, and therapeutic plan based on standard Indian livestock practices (Veterinary Medicine & Surgery Diploma level).
Be encouraging, educational, and constructive.`;

      const prompt = `Case Study: ${caseTitle}
Student's Notes: ${studentHistory || 'None'}
Student's Proposed Diagnosis: ${studentDiagnosis}
Student's Proposed Treatment: ${studentTreatment}

Please evaluate this clinical plan:
1. DIAGNOSIS ACCURACY: Is the student's diagnosis correct or a viable differential?
2. THERAPEUTIC REASONING: Evaluate their chosen treatment (routes, drugs, dosage safety).
3. CLINICAL FEEDBACK: Provide constructive corrections and practical veterinary wisdom.
4. SCORE: Give an educational score from 1 to 10 based on clinical safety.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.6,
        },
      });

      res.json({ evaluation: response.text });
    } catch (error: any) {
      console.error('Case study evaluation error:', error);
      res.status(500).json({ error: error.message || 'An error occurred during case evaluation.' });
    }
  });

  // AI-Powered Massive Textbook Chapter Notes Route
  app.post('/api/generate-textbook', async (req, res) => {
    try {
      const { subjectName, subjectCode, chapterTitle, chapterSummary } = req.body;
      if (!subjectName || !chapterTitle) {
        return res.status(400).json({ error: 'Subject and Chapter names are required.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({ 
          error: 'Gemini API Key is not configured. Please configure it in AI Studio settings.' 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `You are "Dhanvantari Vet AI", an elite senior professor of Veterinary Science and Animal Husbandry in India (specializing in the Nanaji Deshmukh Veterinary Science University, Jabalpur curriculum).
Your task is to write an EXTREMELY detailed, comprehensive, university-level textbook chapter (equivalent to 10 textbook pages, approximately 2500-3000 words) for the given subject and chapter title.
Format your response in beautiful, professional, highly readable Markdown. Use clear headings, bullet points, structured comparison tables, bold technical terms, and standard definitions.

Your output must be divided into the following 5 distinct, highly detailed sections:

# 1. Comprehensive Academic Theory & Concepts (शैक्षणिक सिद्धांत)
- Write an extensive, deep-dive academic lecture on the topic. Describe every physiological pathway, anatomical structure, or breeding policy with high scientific precision.
- Include Hindi translations of critical terms in parentheses next to their English names (e.g., "Abomasum (चतुर्थ आमाशय)").

# 2. Comparative Veterinary Analysis (तुलनात्मक पशु चिकित्सा विश्लेषण)
- Create a detailed comparative analysis across major Indian species (e.g., Cattle, Buffalo, Sheep, Goat, Poultry, Pig).
- Use a markdown table to illustrate critical differences in anatomical structure, physiological parameters, drug doses, or housing guidelines.

# 3. Clinical Pathology, Symptoms & Diagnosis (नैदानिक रोग विज्ञान एवं निदान)
- Detail the pathological progression of associated diseases or structural deficiencies.
- Present a clear list of clinical symptoms, differential indicators, field tests (e.g., CMT, Rothera's test), and laboratory diagnostic standards.

# 4. Indian Field Interventions & Therapeutics (क्षेत्रीय उपचार एवं औषधियाँ)
- Outline real-world treatment protocols suitable for Indian rural veterinary dispensaries.
- Detail drug names, routes of administration (IM, IV, SC), standard therapeutic dosages for large vs. small animals, and withdrawal safety warnings (milk/meat).

# 5. Advanced Practice Questions & Self-Evaluation (स्व-मूल्यांकन प्रश्नोत्तरी)
- Provide a robust study guide with:
  1. 5 comprehensive long-answer practice questions with detailed model answers.
  2. 5 high-yield multiple-choice questions (MCQs) with explained answers.
  3. A final "Pro Tip" box summarizing the core clinical takeaways of the chapter.`;

      const prompt = `Please generate the complete 10-page comprehensive textbook chapter for:
Subject: ${subjectName} (${subjectCode})
Chapter: ${chapterTitle}
Summary of Chapter: ${chapterSummary || 'General veterinary guidelines'}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.5,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error('Textbook generation error:', error);
      res.status(500).json({ error: error.message || 'An error occurred during textbook notes generation.' });
    }
  });

  // Serve static files in production / Dev Vite Server in development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(currentDirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(currentDirname, 'dist', 'index.html'));
    });
  } else {
    // Dynamic import to prevent Vite from being required in production-only builds
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start full-stack server:', err);
});
