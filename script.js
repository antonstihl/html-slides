if (!document.querySelector("section")) {
  throw new Error("No sections found, but this is required for HTML-slides.");
} else {
  initializeSectionFromQuery() || initializeDefaultSection();
}

function initializeSectionFromQuery() {
  const slideNumber = new URLSearchParams(window.location.search).get("s");
  if (!slideNumber || slideNumber === "" || isNaN(slideNumber)) {
    return false;
  }
  const queriedSection = document.querySelector(
    `section:nth-of-type(${slideNumber})`
  );
  if (queriedSection) {
    queriedSection.classList.add("current");
    return true;
  } else {
    return false;
  }
}

function initializeDefaultSection() {
  document.querySelector("section").classList.add("current");
}

addEventListener("click", () => {
  document.body.classList.toggle("laser-pointer");
});

addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" || e.key === "j") {
    e.preventDefault();
    goToNextSection();
  } else if (e.key === "ArrowUp" || e.key === "k") {
    e.preventDefault();
    goToPreviousSection();
  } else if (e.key === "ArrowRight" || e.key === "l") {
    e.preventDefault();
    focusNext();
  } else if (e.key === "ArrowLeft" || e.key === "j") {
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
    getCurrentSection().scrollIntoView();
  }
});

function goToNextSection() {
  const next = nextSection();
  if (!next) {
    return;
  }
  getCurrentSection().classList.remove("current");
  next.scrollIntoView();
  next.classList.add("current");
  refreshSlideQueryParam();
}

function goToPreviousSection() {
  const previous = previousSection();
  if (!previous) {
    return;
  }
  getCurrentSection().classList.remove("current");
  previous.scrollIntoView();
  previous.classList.add("current");
  refreshSlideQueryParam();
}

function refreshSlideQueryParam() {
  const currentSection = getCurrentSection();
  const currentIndex =
    Array.from(document.querySelectorAll("section")).findIndex(
      (section) => section === currentSection
    ) + 1;
  const params = new URLSearchParams(window.location.search);
  params.set("s", currentIndex);
  window.history.replaceState(
    {},
    "",
    decodeURIComponent(`${window.location.pathname}?${params}`)
  );
}

function focusNext() {
  getCurrentSection().scrollIntoView({ behavior: "instant" });
  const nextFocusable = getNextFocusable();
  if (nextFocusable) {
    clearCurrentFocus();
    focus(nextFocusable);
  }
}

function focusPrevious() {
  getCurrentSection().scrollIntoView({ behavior: "instant" });
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

function getCurrentSection() {
  return document.querySelector("section.current");
}

function nextSection() {
  return document.querySelector("section.current+section");
}

function previousSection() {
  return document.querySelector("section:has(+ .current)");
}

function getCurrentFocus() {
  return getCurrentSection().querySelector(".current-focus");
}

function getNextFocusable() {
  return getCurrentSection().querySelector("[hs-f]:not(.focus-trace)");
}

function getPreviousFocusable() {
  const previousFocusTrace = getCurrentSection().querySelectorAll(
    ".focus-trace:not(.current-focus)"
  );
  return previousFocusTrace.length === 0
    ? undefined
    : previousFocusTrace[previousFocusTrace.length - 1];
}
