function load() {
  fetch("https://antonstihl.github.io/html-slides/lib/clean-cpad.js")
    .then((response) => response.text())
    .then((html) => {
      document.querySelector("pre#cpad").innerHTML = html;
    })
    .catch((error) => console.error("Error loading HTML:", error));

  const styles = document.createElement("link");
  styles.rel = "stylesheet";
  styles.href = "https://antonstihl.github.io/html-slides/lib/styles.css";
  document.head.appendChild(styles);

  const script = document.createElement("script");
  script.src = "https://antonstihl.github.io/html-slides/lib/core-script.js";
  script.defer = true;
  document.body.appendChild(script);
}

load();
