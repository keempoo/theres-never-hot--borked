import fs from "fs";
import colors from "colors/safe.js";

console.log("\n", colors.rainbow("––––– TEST SUCCESS! –––––"), "\n\n");

const OUTPUT_FILE = "print-data.txt";

const currentTime = new Date().toLocaleString("en-US", {
  timeZone: "America/New_York",
});

let data = "The current time is\n" + currentTime;

fs.writeFileSync(OUTPUT_FILE, data);
console.log("File written successfully");
console.log("------------------------");
console.log(fs.readFileSync(OUTPUT_FILE, "utf8"));
