import fs from 'fs';
// import 'dotenv/config';
// import { exec } from 'child_process';

const FACTS_FILE = 'facts.json';

// function getSubredditLatest(subreddit) {
//   const command = `curl -H "Accept: application/json" https://www.reddit.com/r/${subreddit}/new.json?limit=3  -o output-twochromosomes.json`;

//   exec(command, function (error, stdout, stderr) {
//     console.log('stdout: ' + stdout);
//     console.log('stderr: ' + stderr);

//     const facts = JSON.parse(
//       fs.readFileSync('output-twochromosomes.json', 'utf8'),
//     );
//     console.log('----------------');
//     // console.log(facts.data.children);
//     console.log('----------------');

//     if (error !== null) {
//       console.log('exec error: ' + error);
//     }
//   });
// }

// read facts from file, take fist one out, put it at the end, and save the all back to the file
export function getFunFact() {
  const facts = JSON.parse(fs.readFileSync(FACTS_FILE, 'utf8'));
  const funFact = facts.splice(0, 1)[0];
  facts.push(funFact);
  fs.writeFileSync(FACTS_FILE, JSON.stringify(facts, null, 2), 'utf8');
  return funFact;
}
