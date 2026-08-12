import fs from "fs";
import path from "path";
import { loadConfig } from "./config.js";
import formatReport, { formatCurrency, formatOrderRow } from "./formatter.js";

const config = loadConfig();

const orders = [
  {
    id: 1,
    items: [{ name: "Laptop", price: 1200 }, { name: "Mouse", price: 50 }],
    customer: { name: "John Doe" },
    status: "completed",
  },
  {
    id: 2,
    items: [{ name: "Phone", price: 800 }, { name: "Charger", price: 20 }],
    customer: null,
    status: "refunded",
  },
  {
    id: 3,
    items: [{ name: "Tablet", price: 600 }, { name: "Case", price: 30 }],
    customer: { name: "Jane Smith" },
    status: "completed",
  },
  {
    id: 4,
    items: [
      { name: "Monitor", price: 300 },
      { name: "Stand", price: 50 },
      { name: "Webcam", price: 80 },
    ],
    customer: { name: "Bob Johnson" },
    status: "completed",
  },
];

const report = formatReport({
  title: config.title,
  threshold: config.threshold,
  orders,
});

const outputDir = path.join(process.cwd(), config.outputDir);
fs.mkdirSync(outputDir, { recursive: true });

const outputPath = path.join(outputDir, "report.md");
fs.writeFileSync(outputPath, report);

console.log(`===Report Generated===`);
console.log(`Written to: ${outputPath}`);
console.log(`--------------------------------`);
console.log(report);