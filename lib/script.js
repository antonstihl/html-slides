const cpadElement = document.querySelector("pre#cpad");
if (cpadElement) {
  cpadElement.innerHTML = `
    <div id="clean-cpad" class="cpad">
      <svg width="25px" height="25px" viewBox="0 0 100 100">
        <path d="M 35 20 q 15 -30 30 0" class="clean-btn arrow-up" />
        <path d="M 35 80 q 15 30 30 0" class="clean-btn arrow-down" />
        <path d="M 20 35 q -30 15 0 30" class="clean-btn arrow-left" />
        <path d="M 80 35 q 30 15 0 30" class="clean-btn arrow-right" />
      </svg>
    </div>`;
} else {
  console.log("No <pre> #cpad element in document.");
}

const leftArrow = document.querySelectorAll(".arrow-left");
const rightArrow = document.querySelectorAll(".arrow-right");
const downArrow = document.querySelectorAll(".arrow-down");
const upArrow = document.querySelectorAll(".arrow-up");

const initialSection = document.querySelector("div#slide-deck > section");
if (!initialSection) {
  throw new Error(
    document.querySelector("div#slide-deck")
      ? "No sections in div#slide-deck found."
      : "No div#slide-deck in document."
  );
}
initialSection.classList.add("current");
// initialSection.scrollIntoView("instant");

addEventListener("click", () => {
  if (document.body.style.cursor === "none") {
    document.body.style.removeProperty('cursor');
  } else {
    document.body.style.cursor = "none";
  }
});

addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    goToNextSection();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    goToPreviousSection();
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    focusNext();
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    focusPrevious();
  } else if (e.key === "n") {
    e.preventDefault();
    if (getNextFocusable()) {
      focusNext();
    } else {
      goToNextSection();
    }
  } else if (e.key === "b") {
    e.preventDefault();
    if (getPreviousFocusable()) {
      focusPrevious();
    } else {
      goToPreviousSection();
    }
  } else if (e.key === "r") {
    currentSection().scrollIntoView();
  }
});

function currentSection() {
  return document.querySelector("div#slide-deck > .current");
}

function nextSection() {
  return document.querySelector("div#slide-deck > .current+section");
}

function previousSection() {
  return document.querySelector("div#slide-deck > section:has(+ .current)");
}

function goToNextSection() {
  const next = nextSection();
  if (!next) {
    return;
  }
  currentSection().classList.remove("current");
  next.scrollIntoView();
  next.classList.add("current");
}

function goToPreviousSection() {
  const previous = previousSection();
  if (!previous) {
    return;
  }
  currentSection().classList.remove("current");
  previous.scrollIntoView();
  previous.classList.add("current");
}

function focusNext() {
  currentSection().scrollIntoView({ behavior: "instant" });
  const nextFocusable = getNextFocusable();
  if (!!nextFocusable) {
    clearFocus();
    focus(nextFocusable);
  }
}

function focusPrevious() {
  currentSection().scrollIntoView({ behavior: "instant" });
  const previousFocusable = getPreviousFocusable();
  const focused = currentSection().querySelector(".current-focus");
  if (!previousFocusable) {
    clearFocus();
    unfocus(focused);
  } else {
    unfocus(focused);
    clearFocus();
    focus(previousFocusable);
  }
}

function getNextFocusable() {
  const focusables = getFocusables();
  const currentFocusableIndex = focusables.findIndex((e) =>
    e.classList.contains("current-focus")
  );
  if (currentFocusableIndex === focusables.length - 1) {
    return undefined;
  } else {
    return focusables[currentFocusableIndex + 1];
  }
}

function getPreviousFocusable() {
  const focusables = getFocusables();
  const currentFocusableIndex = focusables.findIndex((e) =>
    e.classList.contains("current-focus")
  );
  if (currentFocusableIndex === 0) {
    return undefined;
  } else {
    return focusables[currentFocusableIndex - 1];
  }
}

function getFocusables() {
  return Array.from(
    currentSection().querySelectorAll(
      ".focusable, .focusable-reveal, .f, .fr"
    )
  );
}

function focus(e) {
  e?.classList.add("current-focus");
  e?.classList.add("previous-focus");
}

function unfocus(e) {
  e?.classList.remove("current-focus");
  e?.classList.remove("previous-focus");
}

function clearFocus() {
  currentSection()
    .querySelectorAll(".current-focus")
    .forEach((e) => e.classList.remove("current-focus"));
}
