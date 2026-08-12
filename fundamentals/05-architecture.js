import fs from "fs";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import EventEmitter from "events";

const filePath = "file1.txt";

function time() {
  return new Date().toLocaleTimeString();
}

console.log("\n=== Part 1: Blocking vs Non-Blocking ===");

console.log(time(), "Start sync read");
const syncData = fs.readFileSync(filePath, "utf8");
console.log(time(), "End sync read");

console.log(time(), "Start async read");
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) throw err;
  console.log(time(), "End async read");
});

console.log(time(), "This prints before async read finishes");

setTimeout(() => {
  console.log("\n=== Part 2: CPU Blocking Demo ===");

  let count = 0;

  const heartbeat = setInterval(() => {
    count++;
    console.log(time(), "Heartbeat", count);

    if (count === 5) {
      clearInterval(heartbeat);
    }
  }, 500);

  const start = Date.now();

  while (Date.now() - start < 3000) {}

  console.log(time(), "Heavy CPU work finished");
}, 1000);

setTimeout(() => {
  console.log("\n=== Part 3: Thread Pool Benchmark ===");

  const start = Date.now();

  for (let i = 0; i < 5; i++) {
    crypto.pbkdf2("password", "salt", 300000, 64, "sha512", () => {
      console.log(`Hash ${i} finished in ${Date.now() - start} ms`);
    });
  }
}, 6000);

const emitter = new EventEmitter();

emitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

emitter.emit("greet", "buddy");
