function load(url) {
  fetch(`${url}/lib/clean-cpad.html`)
    .then((response) => response.text())
    .then((html) => {
      const cpadElement = document.querySelector("pre#cpad");
      if (cpadElement) {
        cpadElement.innerHTML = html;
      } else {
        console.log("No <pre> #cpad element in document.");
      }
    })
    .catch((error) => console.error("Error loading HTML: ", error));

  const styles = document.createElement("link");
  styles.rel = "stylesheet";
  styles.href = `${url}/lib/styles.css`;
  document.head.appendChild(styles);

  const script = document.createElement("script");
  script.src = `${url}/lib/core-script.js`;
  script.defer = true;
  document.body.appendChild(script);
}

load(
  "https://cdn.jsdelivr.net/gh/antonstihl/html-slides@refactor/enable-reuse"
);
