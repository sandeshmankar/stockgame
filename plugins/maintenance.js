import config from "../config/config.global";

export default function(context) {
  if (config.isMaintenance == "true") {
    // If application is in maintenance mode
    return context.redirect("/maintenance");
  }
  return;
}
