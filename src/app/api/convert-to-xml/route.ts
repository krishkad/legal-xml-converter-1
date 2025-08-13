import fs, { promises } from "fs";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import path from "path";
import { createWorker } from "tesseract.js";
import { fileURLToPath } from "url";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || "",
  baseURL: "https://openrouter.ai/api/v1",
});

// Helper to get absolute paths in Node.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }

    // const bytes = await file.arrayBuffer();
    // const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    // const filePath = path.join(uploadDir, file.name);

    // await writeFile(filePath, buffer);

    // const inputFile = path.join(uploadDir, file.name); // Replace with your file
    // const outputFile = path.join(uploadDir, `${file.name.split(".")[0]}.xml`);
    // await convertAffidavitToXML(inputFile, outputFile);
    // return Response.json({
    //   message: "File uploaded successfully",
    //   path: `/uploads/${file.name}`,
    // });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const worker = await createWorker("eng", 1, {
      workerPath: path.join(
        __dirname,
        "../../../../node_modules/tesseract.js/src/worker-script/node/index.js"
      ),
      corePath: path.join(
        __dirname,
        "../../../../node_modules/tesseract.js/src/index.js"
      ),
      langPath: path.join(__dirname, "../../../../tessdata"), // Local path to language data
    });

    const {
      data: { text },
    } = await worker.recognize(buffer);

    // Terminate the worker to free resources
    await worker.terminate();
    // const cleanedText = await postProcessText(text);

    console.log([text]);

    const prompt = `You are a legal AI expert specialized in structuring legal documents into XML formats accepted by most judicial systems in the US and Europe. Your task is to take raw legal text (extracted from scanned documents using OCR) and convert it into a valid XML document following the Akoma Ntoso / LegalDocML standard.

Requirements:
Use the <akomaNtoso> root element.

Identify and correctly wrap content such as title, metadata, preamble, body, articles, sections, clauses, and annexes using the appropriate XML tags (e.g., <judgment>, <agreement>, <docTitle>, <preamble>, <body>, <article>, <paragraph>, etc.).

Generate appropriate metadata inside the <meta> tag, including:

country (e.g., "USA", "Germany")

jurisdiction (e.g., "Federal Court", "Berlin Civil Court")

language (e.g., "en", "de")

documentType (e.g., "agreement", "judgment", "pleading")

date (from text if mentioned, else leave blank)

author or parties (if names are identifiable)

Add machine-readable identifiers (eId, wId) for each section or article.

Ensure XML output is well-formed, UTF-8 encoded, and ready for use in e-filing or court archiving systems.

Input:
A block of unstructured legal text extracted from a scanned document.

Output:
A complete Legal XML document conforming to Akoma Ntoso / LegalDocML standards, formatted and indented for readability.

 Input: ${[text]}

1. Purpose: The parties agree to protect confidential information...
2. Obligations: The Receiving Party agrees not to disclose any information...
Output Format:
xml
Copy
Edit
<?xml version="1.0" encoding="UTF-8"?>
<akomaNtoso>
  <agreement>
    <meta>
      <identification source="#court">
        <FRBRWork>
          <FRBRcountry value="USA"/>
          <FRBRjurisdiction value="FederalCourt"/>
          <FRBRdate date="2024-07-15"/>
          <FRBRlanguage language="en"/>
          <FRBRauthor href="#JohnDoe"/>
          <FRBRauthor href="#JaneSmith"/>
          <FRBRthis value="/agreement/nda/2024-07-15"/>
        </FRBRWork>
      </identification>
    </meta>
    <preface>
      <docTitle>Non-Disclosure Agreement (NDA)</docTitle>
    </preface>
    <body>
      <article eId="art1">
        <heading>1. Purpose</heading>
        <paragraph>The parties agree to protect confidential information...</paragraph>
      </article>
      <article eId="art2">
        <heading>2. Obligations</heading>
        <paragraph>The Receiving Party agrees not to disclose any information...</paragraph>
      </article>
    </body>
  </agreement>
</akomaNtoso>
⚠️ Important: If any section is missing, use a placeholder like <article eId="artX"><paragraph>[Text not clearly extracted]</paragraph></article>. Do not skip structure. Strictly only return xml only. their should be no text outside the <?xml /> and <akomaNtoso tags  `;

    const response = await openai.chat.completions.create({
      // model: "deepseek/deepseek-r1:free", // You can also try "deepseek/deepseek-coder"
      model: "moonshotai/kimi-k2:free", // You can also try "deepseek/deepseek-coder"
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const outputFile = path.join(uploadDir, `${file.name.split(".")[0]}.xml`);
    await promises.writeFile(
      outputFile,
      response.choices[0].message.content ?? ""
    );

    console.log({ xml: response.choices[0].message.content });

    const outputFileBuffer = fs.readFileSync(outputFile);

    // Return the extracted text
    return new Response(outputFileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Content-Disposition": `attachment; filename="${
          file.name.split(".")[0]
        }.xml`,
      },
    });
  } catch (error) {
    console.log("[ERROR WHILE CONVERTING TO XML]: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Post-processing module (simplified example)
// const postProcessing = {
//   removeNoise(text:string) {
//     // Remove stray characters and normalize spaces
//     return text
//       .replace(/[^A-Za-z0-9.,-/: \n]/g, "")
//       .replace(/\s+/g, " ")
//       .trim();
//   },
//   correctSpelling(text:string) {
//     // Placeholder for spelling correction (integrate with a library like 'hunspell' or API)
//     // Example: Replace common OCR errors
//     return text
//       // .replace(/0/g, "O") // Fix zero vs. letter O
//       // .replace(/1/g, "I") // Fix one vs. letter I
//       // .replace(/5/g, "S"); // Fix five vs. letter S
//   },
// };

// async function postProcessText(text: string) {
//   let result //=  postProcessing.removeNoise(text);
//   result = postProcessing.correctSpelling(text);
//   return result;
// }
