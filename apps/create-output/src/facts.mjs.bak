import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FACTS_FILE = path.join(__dirname, 'facts.yaml');

// read facts from file, take fist one out, put it at the end, and save the all back to the file
export function getFunFact(nextFactIndex) {
  const facts = parse(fs.readFileSync(FACTS_FILE, 'utf8'));
  // the fact index is increased infinitely so this limits it to the length of the facts array
  const index = nextFactIndex % facts.length;
  const funFact = facts[index];
  return funFact;
}
