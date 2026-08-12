import EventEmitter from "events";

class Logger extends EventEmitter {
  info(message) {
    this.emit("info", message);
  }

  warn(message) {
    this.emit("warn", message);
  }

  error(message) {
    this.emit("error", message);
  }
}

const log = new Logger();

log.on("error", (error) => {
  console.error("[ERROR]", error);
});

log.on("warn", (warning) => {
  console.warn("[WARN]", warning);
});

log.on("info", (info) => {
  console.info("[INFO]", info);
});

export default log;
