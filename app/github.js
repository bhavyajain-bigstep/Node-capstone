import axios from "axios";
import log from "./logger.js";
import { readCache, writeCache } from "./cache.js";

async function fetchProfile(username, timeoutMs = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await axios.get(`https://api.github.com/users/${username}`, {
      signal: controller.signal,
    });
    log.info(`Fetched profile for user: ${username}`);
    return res.data;
  } finally {
    clearTimeout(id);
  }
}

async function fetchProfileWithRetry(username, retries = 3, timeoutMs = 5000) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fetchProfile(username, timeoutMs);
    } catch (error) {
      log.warn(`Attempt ${attempt + 1} failed for user: ${username}`);
      if (attempt === retries - 1) break;
      const delay = Math.pow(2, attempt) * 500;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  log.error(`All attempts failed for user: ${username}`);
  return null;
}

async function getGithubProfile(username) {
  const cached = readCache(username);
  if (cached) return cached;
  const profile = await fetchProfileWithRetry(username);
  if (profile) writeCache(username, profile);
  return profile;
}

export default getGithubProfile;
