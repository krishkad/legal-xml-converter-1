"use server";

import { promises } from "fs";
import mammoth from "mammoth";
import * as natural from "natural";
import PDFParser from "pdf2json";
import { create } from "xmlbuilder2";

// Define interfaces for affidavit structure
interface Affiant {
  name: string;
  address: string;
}

interface Statement {
  text: string;
}

interface Notary {
  name: string;
  date: string;
  commission: string;
}

interface Metadata {
  title: string;
  date: string;
  jurisdiction: string;
}

interface Affidavit {
  metadata: Metadata;
  affiant: Affiant;
  statements: Statement[];
  notary: Notary;
}

// Initialize NLP tools
// Provide an empty abbreviations list to SentenceTokenizer to satisfy type requirements
const tokenizer = new natural.SentenceTokenizer([]);
// const wordTokenizer = new natural.WordTokenizer();

// Function to extract text from input file
async function extractText(filePath: string): Promise<string> {
  const ext = filePath.split(".").pop()?.toLowerCase();

  if (ext === "pdf") {
    return new Promise((resolve, reject) => {
      const pdfParser = new PDFParser();
      pdfParser.loadPDF(filePath);

      // Use type assertion for event handlers due to incomplete @types/pdf2json
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
        let text = "";
        for (const page of pdfData.Pages) {
          for (const textRun of page.Texts) {
            text += decodeURIComponent(textRun.R[0].T) + " ";
          }
        }
        resolve(text);
      });

      // Explicitly type the error event to avoid 'keyof EventMap' error
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pdfParser.on("error" as any, (err: Error) => reject(err));
    });
  } else if (ext === "docx") {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } else if (ext === "txt") {
    return await promises.readFile(filePath, "utf-8");
  } else {
    throw new Error("Unsupported file format");
  }
}

// Function to parse affidavit text into a structured object
function parseAffidavit(text: string): Affidavit {
  const sentences = tokenizer.tokenize(text);
  const affidavit: Affidavit = {
    metadata: { title: "", date: "", jurisdiction: "" },
    affiant: { name: "", address: "" },
    statements: [],
    notary: { name: "", date: "", commission: "" },
  };
  let currentSection: "preamble" | "affiant" | "statements" | "notary" =
    "preamble";

  sentences.forEach((sentence, index) => {
    // const tokens = wordTokenizer.tokenize(sentence);
    sentence = sentence.trim();

    // Identify title (first sentence or matches "Affidavit of...")
    if (index === 0 && sentence.match(/^Affidavit\s+of/i)) {
      affidavit.metadata.title = sentence;
      return;
    }

    // Detect affiant details (e.g., "I, [Name], residing at [Address]")
    if (sentence.match(/^I,\s+/i) || sentence.match(/residing\s+at/i)) {
      currentSection = "affiant";
      const nameMatch = sentence.match(/^I,\s+([^,]+),/i);
      const addressMatch = sentence.match(/residing\s+at\s+(.+)/i);
      affidavit.affiant.name = nameMatch ? nameMatch[1].trim() : "Unknown";
      affidavit.affiant.address = addressMatch
        ? addressMatch[1].replace(/\.$/, "").trim()
        : "Unknown";
      return;
    }

    // Detect notary section (e.g., "Sworn to and subscribed before me...")
    if (sentence.match(/sworn\s+to\s+and\s+subscribed\s+before\s+me/i)) {
      currentSection = "notary";
      const notaryNameMatch = sentence.match(/before\s+me,\s+([^,]+)/i);
      const dateMatch = sentence.match(
        /\b\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b/i
      );
      affidavit.notary.name = notaryNameMatch
        ? notaryNameMatch[1].trim()
        : "Unknown";
      affidavit.notary.date = dateMatch
        ? dateMatch[0]
        : new Date().toISOString().split("T")[0];
      affidavit.notary.commission = "Unknown";
      return;
    }

    // Treat other sentences as statements
    if (currentSection !== "notary" && sentence.length > 10) {
      affidavit.statements.push({ text: sentence });
    }
  });

  // Set default metadata
  affidavit.metadata.date =
    affidavit.notary.date || new Date().toISOString().split("T")[0];
  affidavit.metadata.jurisdiction = "Unknown";

  return affidavit;
}

// Function to convert affidavit object to LegalXML format
function toLegalXML(affidavit: Affidavit): string {
  const xml = create({ version: "1.0", encoding: "UTF-8" })
    .ele("Affidavit", {
      xmlns: "http://www.oasis-open.org/committees/legalxml",
      version: "1.0",
    })
    .ele("Metadata")
    .ele("Title")
    .txt(affidavit.metadata.title || "Affidavit")
    .up()
    .ele("Date")
    .txt(affidavit.metadata.date)
    .up()
    .ele("Jurisdiction")
    .txt(affidavit.metadata.jurisdiction)
    .up()
    .up()
    .ele("Affiant")
    .ele("Name")
    .txt(affidavit.affiant.name)
    .up()
    .ele("Address")
    .txt(affidavit.affiant.address)
    .up()
    .up();

  const statements = xml.ele("Statements");
  affidavit.statements.forEach((statement) => {
    statements.ele("Statement").txt(statement.text).up();
  });

  xml
    .ele("Notary")
    .ele("Name")
    .txt(affidavit.notary.name)
    .up()
    .ele("Date")
    .txt(affidavit.notary.date)
    .up()
    .ele("Commission")
    .txt(affidavit.notary.commission)
    .up();

  return xml.end({ prettyPrint: true });
}

// Main function to process the affidavit
export async function convertAffidavitToXML(
  inputFile: string,
  outputFile: string
): Promise<void> {
  try {
    // Step 1: Extract text from the input file

    const text = await extractText(inputFile);
    console.log("Text extracted successfully.", { text });

    // Step 2: Parse text into structured affidavit
    const affidavit = parseAffidavit(text);
    console.log("Affidavit parsed successfully.");

    // Step 3: Convert to LegalXML
    const xmlOutput = toLegalXML(affidavit);
    console.log("XML generated successfully.");

    // Step 4: Save XML to output file
    await promises.writeFile(outputFile, xmlOutput);
    console.log(`XML saved to ${outputFile}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

