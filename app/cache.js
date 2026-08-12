import fs from "fs";
import log from "./logger.js";

const __dirname = process.cwd();

const cacheDir = `${__dirname}/.cache`;
fs.mkdirSync(cacheDir, { recursive: true });

function getCachePath(username) {
  return `${cacheDir}/${username}.json`;
}

function readCache(username) {
  const cachePath = getCachePath(username);
  if (fs.existsSync(cachePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(cachePath, "utf-8"));
      // Stale cache if older than 5 mins
      if (Date.now() - new Date(data.cachedAt).getTime() < 1000 * 60 * 5) {
        log.info(`Cache hit for user: ${username}`);
        return data.data;
      }
    } catch (error) {
      log.error(
        `Failed to read cache for user: ${username}. Error: ${error.message}`,
      );
    }
  }
  log.info(`Cache stale/miss for user: ${username}`);
  return null;
}

function writeCache(username, data) {
  const cachePath = getCachePath(username);
  const toWrite = { data, cachedAt: new Date().toISOString() };
  try {
    fs.writeFileSync(cachePath, JSON.stringify(toWrite), "utf-8");
    log.info(`Cache written for user: ${username}`);
  } catch (error) {
    log.error(
      `Failed to write cache for user: ${username}. Error: ${error.message}`,
    );
  }
}

export { readCache, writeCache };
