import getGithubProfile from "./github.js";
import log from "./logger.js";

const usernames = process.argv.slice(2);

if (usernames.length === 0) {
  log.error("Usage: node app/index.js <username1> [username2] [...]");
  process.exit(1);
}

Promise.all(usernames.map(getGithubProfile))
  .then((profiles) => {
    profiles.forEach((profile, index) => {
      if (profile) log.info(`Profile for ${usernames[index]}: ${profile}`);
      else log.error(`Failed to fetch profile for ${usernames[index]}`);
    });
  })
  .catch((error) => {
    log.error("An unexpected error occurred:", error);
  });
