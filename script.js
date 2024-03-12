const cpadPlaceholder = document.querySelector("pre#cpad");
if (cpadPlaceholder) {
  const cpad = document.createElement("div");
  cpad.classList.add("indicator-circle");
  cpadPlaceholder.replaceWith(cpad);
} else {
  console.log("No <pre> #cpad element in document.");
}

const leftArrow = document.querySelectorAll(".arrow-left");
const rightArrow = document.querySelectorAll(".arrow-right");
const downArrow = document.querySelectorAll(".arrow-down");
const upArrow = document.querySelectorAll(".arrow-up");

const initialSection = document.querySelector("div#html-slides > section");
if (!initialSection) {
  throw new Error(
    document.querySelector("div#html-slides")
      ? "No sections in div#html-slides found."
      : "No div#html-slides in document."
  );
}
initialSection.classList.add("current");
// initialSection.scrollIntoView("instant");

addEventListener("click", () => {
  document.body.classList.toggle("laser-pointer");
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
  return document.querySelector("div#html-slides > .current");
}

function nextSection() {
  return document.querySelector("div#html-slides > .current+section");
}

function previousSection() {
  return document.querySelector("div#html-slides > section:has(+ .current)");
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
  return Array.from(currentSection().querySelectorAll(".fr, .f"));
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
