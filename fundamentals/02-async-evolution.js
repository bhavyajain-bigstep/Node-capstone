import { readFile, promises } from "fs";

const files = ["file1.txt", "file2.txt", "file3.txt"];

function readFilesCallback(callback) {
  const start = Date.now();
  const results = [];
  let completed = 0;
  files.forEach((file) => {
    readFile(file, "utf8", (err, data) => {
      if (err) return callback(err);
      results.push({ file, data });
      completed++;
      if (completed === files.length) {
        const end = Date.now();
        const duration = end - start;
        callback(null, { results, duration });
      }
    });
  });
}

readFilesCallback((err, res) => {
  if (err) return console.error("Error reading file:", err);
  res.results.forEach((result) => {
    console.log(`\n--- ${result.file} ---`);
    // console.log(result.data);
  });
  console.log(`Total time: ${res.duration}ms\n`);
});

function readFilePromise(file) {
  return new Promise((resolve, reject) => {
    readFile(file, "utf8", (err, data) => {
      if (err) return reject(err);
      resolve({ file, data });
    });
  });
}

function readFilesPromise() {
  const start = Date.now();
  return Promise.all(files.map((file) => readFilePromise(file))).then(
    (results) => {
      const end = Date.now();
      const duration = end - start;
      return { results, duration };
    },
  );
}

readFilesPromise()
  .then((res) => {
    console.log("=== Promise Style ===");
    res.results.forEach((result) => {
      console.log(`\n--- ${result.file} ---`);
      console.log(result.data);
    });
    console.log(`Total time: ${res.duration}ms\n`);
  })
  .catch((err) => {
    console.error("Error reading files:", err);
  });

async function readFilesAsyncAwait() {
  const start = Date.now();

  const results = await Promise.all(
    files.map(async (file) => {
      const data = await promises.readFile(file, "utf8");
      if (!data) throw new Error(`No data read from ${file}`);
      return { file, data };
    }),
  );
  const end = Date.now();
  const duration = end - start;
  return { results, duration };
}

readFilesAsyncAwait()
  .then((res) => {
    console.log("=== Async/Await Style ===");
    res.results.forEach((result) => {
      console.log(`\n--- ${result.file} ---`);
      console.log(result.data);
    });
    console.log(`Total time: ${res.duration}ms\n`);
  })
  .catch((err) => {
    console.error("Error reading files:", err);
  });
