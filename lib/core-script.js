const sections = document.querySelectorAll("section");
const leftArrow = document.querySelectorAll(".arrow-left");
const rightArrow = document.querySelectorAll(".arrow-right");
const downArrow = document.querySelectorAll(".arrow-down");
const upArrow = document.querySelectorAll(".arrow-up");

addEventListener("click", () => {
  if (document.body.style.cursor === "none") {
    document.body.style.cursor = "default";
  } else {
    document.body.style.cursor = "none";
  }
});

document.querySelector("section").classList.add("current");
refreshControls();

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
  return document.querySelector(".current");
}

function nextSection() {
  return document.querySelector(".current+section");
}

function previousSection() {
  return document.querySelector("section:has(+ .current)");
}

function goToNextSection() {
  const next = nextSection();
  if (!next) {
    return;
  }
  currentSection().classList.remove("current");
  next.scrollIntoView();
  next.classList.add("current");
  refreshControls();
}

function goToPreviousSection() {
  const previous = previousSection();
  if (!previous) {
    return;
  }
  currentSection().classList.remove("current");
  previous.scrollIntoView();
  previous.classList.add("current");
  refreshControls();
}

function refreshControls() {
  if (!previousSection()) {
    upArrow.forEach((e) => e.classList.add("hide"));
  } else {
    upArrow.forEach((e) => e.classList.remove("hide"));
  }
  if (!nextSection()) {
    downArrow.forEach((e) => e.classList.add("hide"));
  } else {
    downArrow.forEach((e) => e.classList.remove("hide"));
  }
  if (!getNextFocusable()) {
    rightArrow.forEach((e) => e.classList.add("hide"));
  } else {
    rightArrow.forEach((e) => e.classList.remove("hide"));
  }
  if (!getPreviousFocusable()) {
    leftArrow.forEach((e) => e.classList.add("hide"));
  } else {
    leftArrow.forEach((e) => e.classList.remove("hide"));
  }
}

function focusNext() {
  currentSection().scrollIntoView({ behavior: "instant" });
  const nextFocusable = getNextFocusable();
  if (!!nextFocusable) {
    clearFocus();
    focus(nextFocusable);
    refreshControls();
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
    refreshControls();
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
      ".focusable, .f, .focusable-reveal, .f-reveal, .fr"
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
