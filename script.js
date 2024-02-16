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
focusNext();
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
  if (!getFocusedElement()) {
    initializeFocus();
  }
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
  if (!getFocusedElement()) {
    initializeFocus();
  }
  refreshControls();
}

function getFocusedElement() {
  return currentSection().querySelector(".focus");
}

function initializeFocus() {
  getNextFocusable()?.classList.add("focus");
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
  const nextFocusableElement = getNextFocusable();
  if (!!nextFocusableElement) {
    clearSectionFocus();
    focus(nextFocusableElement);
    refreshControls();
  }
}

function focus(e) {
  e.classList.add("focus");
  if (e.classList.contains("animate-in")) {
    e.classList.add("animated-in");
  }
  Array.from(e.children).forEach(focus);
}

function focusPrevious() {
  currentSection().scrollIntoView({ behavior: "instant" });
  const previousFocusableElement = getPreviousFocusable();
  if (!!previousFocusableElement) {
    const focusedElement = getFocusedElement();
    focusedElement.classList.remove("animated-in");
    clearSectionFocus();
    focus(previousFocusableElement);
    refreshControls();
  }
}

function clearSectionFocus() {
  currentSection()
    .querySelectorAll(".focus")
    .forEach((e) => e.classList.remove("focus"));
}

function getNextFocusable() {
  const focusableElements = getFocusableChildren(currentSection());
  const focusedElementIndex = focusableElements.findIndex((e) =>
    e.classList.contains("focus")
  );
  if (focusedElementIndex === focusableElements.length - 1) {
    return undefined;
  } else {
    return focusableElements[focusedElementIndex + 1];
  }
}

function getPreviousFocusable() {
  const focusableElements = getFocusableChildren(currentSection());
  const focusedElementIndex = focusableElements.findIndex((e) =>
    e.classList.contains("focus")
  );
  if (focusedElementIndex === 0) {
    return undefined;
  } else {
    return focusableElements[focusedElementIndex - 1];
  }
}

function getFocusableChildren(p) {
  return Array.from(p.children).flatMap((e) => {
    if (e.children.length > 0) {
      if (e.classList.contains("focusable")) {
        return [e];
      } else {
        return [...getFocusableChildren(e)];
      }
    } else {
      return [e];
    }
  });
}
