import fs from 'fs';

// import 'dotenv/config';

import { getFunFact } from './src/facts.mjs';
import { factConstructor } from './src/factConstructor.mjs';

const OUTPUT_FILE = 'print-data.txt';
const ms = 60 * 60 * 1000; // milliseconds in an hour

function roundToHour(date) {
  return new Date(Math.round(date.getTime() / ms) * ms);
}

async function renderOutput(currentTime, funFact) {
  const completedFact = await factConstructor(funFact);

  return `BING BONG!

THE TIME IS NOW ${currentTime}

${completedFact}
`;
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

  // pass the index of the next fact to be printed to the stdout (must be string)
  process.stdout.write(`${Number(nextFactIndex) + 1}`);
}

// init
createFile();
