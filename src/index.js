import { run } from "./app/app";
import "./scss/main.scss";

if (document.readyState !== "loading") {
  run();
} else {
  document.addEventListener("DOMContentLoaded", function() {
    run();
  });
}
