const initialSection = document.querySelector("section");
if (initialSection) {
  initialSection.classList.add("current");
} else {
  console.error("No sections in found.");
}

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
  if (nextFocusable) {
    clearCurrentFocus();
    focus(nextFocusable);
  }
}

function focusPrevious() {
  currentSection().scrollIntoView({ behavior: "instant" });
  const previousFocusable = getPreviousFocusable();
  revertCurrentFocus();
  if (previousFocusable) {
    focus(previousFocusable);
  }
}

function focus(e) {
  e?.classList.add("current-focus", "focus-trace");
}

function revertCurrentFocus(e) {
  getCurrentFocus()?.classList.remove("current-focus", "focus-trace");
}

function clearCurrentFocus() {
  getCurrentFocus()?.classList.remove("current-focus");
}

function currentSection() {
  return document.querySelector("section.current");
}

function nextSection() {
  return document.querySelector("section.current+section");
}

function previousSection() {
  return document.querySelector("section:has(+ .current)");
}

function getCurrentFocus() {
  return currentSection().querySelector(".current-focus");
}

function getNextFocusable() {
  return currentSection().querySelector(".f:not(.focus-trace)");
}

function getPreviousFocusable() {
  const previousFocusTrace = currentSection().querySelectorAll(
    ".focus-trace:not(.current-focus)"
  );
  return previousFocusTrace.length === 0
    ? undefined
    : previousFocusTrace[previousFocusTrace.length - 1];
}
