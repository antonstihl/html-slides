function load() {
  fetch("/lib/clean-cpad.html")
    .then((response) => response.text())
    .then((html) => {
      document.querySelector("pre#cpad").innerHTML = html;
    })
    .catch((error) => console.error("Error loading HTML:", error));

  const styles = document.createElement("link");
  styles.rel = "stylesheet";
  styles.href = "/lib/styles.css";
  document.head.appendChild(styles);

  const script = document.createElement("script");
  script.src = "/lib/core-script.js";
  script.defer = true;
  document.body.appendChild(script);
}

load();
