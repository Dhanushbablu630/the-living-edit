import fs from "node:fs";
import OpenAI from "openai";

const values = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split(/\r?\n/)
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => { const index = line.indexOf("="); return [line.slice(0, index), line.slice(index + 1)]; }),
);

try {
  const response = await new OpenAI({ apiKey: values.OPENAI_API_KEY }).responses.create({ model: "gpt-5", input: "Reply with exactly: connection verified", max_output_tokens: 20, store: false });
  console.log(`OpenAI connection verified: ${response.output_text}`);
} catch (error) {
  console.error(`OpenAI check failed: ${error.status ?? "unknown"} ${error.code ?? ""} ${error.message ?? "Unknown error"}`);
  process.exit(1);
}
