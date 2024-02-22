function load() {
  fetch("https://cdn.jsdelivr.net/gh/antonstihl/html-slides@refactor/enable-reuse/lib/clean-cpad.js")
    .then((response) => response.text())
    .then((html) => {
      document.querySelector("pre#cpad").innerHTML = html;
    })
    .catch((error) => console.error("Error loading HTML:", error));

  const styles = document.createElement("link");
  styles.rel = "stylesheet";
  styles.href = "https://cdn.jsdelivr.net/gh/antonstihl/html-slides@refactor/enable-reuse/lib/styles.css";
  document.head.appendChild(styles);

  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/gh/antonstihl/html-slides@refactor/enable-reuse/lib/core-script.js";
  script.defer = true;
  document.body.appendChild(script);
}

load();
