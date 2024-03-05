import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// import 'dotenv/config';
// import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FACTS_FILE = path.join(__dirname, 'facts.json');

// read facts from file, take fist one out, put it at the end, and save the all back to the file
export function getFunFact() {
  const facts = JSON.parse(fs.readFileSync(FACTS_FILE, 'utf8'));
  const funFact = facts.splice(0, 1)[0];
  facts.push(funFact);
  fs.writeFileSync(FACTS_FILE, JSON.stringify(facts, null, 2), 'utf8');
  return funFact;
}
