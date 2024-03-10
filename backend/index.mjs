import fs from 'fs';
import Mustache from 'mustache';

// import 'dotenv/config';

import { getFunFact } from './src/facts.mjs';
import { factConstructor } from './src/factConstructor.mjs';

const OUTPUT_FILE = 'printer-output.html';
const ms = 60 * 60 * 1000; // milliseconds in an hour

function roundToHour(date) {
  return new Date(Math.round(date.getTime() / ms) * ms);
}

async function renderOutput(currentTime, funFact) {
  const template = fs.readFileSync('./src/template.html', 'utf8');
  const completedFact = await factConstructor(funFact);
  const output = Mustache.render(template, {
    ...funFact,
    completedFact,
    currentTime,
  });
  return output;
}

async function createFile() {
  // round the date because the script might not run exactly on the hour
  const currentTime = roundToHour(new Date()).toLocaleString('en-US', {
    timeZone: 'US/Central',
    hour: '2-digit',
    minute: '2-digit',
  });
  // take the index of the next fact to be printed from the command line arguments
  const nextFactIndex = process.argv.slice(2) ?? 0;
  const funFact = getFunFact(nextFactIndex);
  const data = await renderOutput(currentTime, funFact);

  fs.writeFileSync(OUTPUT_FILE, data);

  console.log('File written successfully');
  console.log('------------------------');

  console.log(fs.readFileSync(OUTPUT_FILE, 'utf8'));
}

// init
createFile();
