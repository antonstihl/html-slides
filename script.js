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
    if (getNextReveal()) {
      focusNext();
    } else {
      goToNextSection();
    }
  } else if (e.key === "b") {
    e.preventDefault();
    if (getPreviousReveal()) {
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

function getFocusedElement() {
  return currentSection().querySelector(".focus");
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
  if (!getNextReveal()) {
    rightArrow.forEach((e) => e.classList.add("hide"));
  } else {
    rightArrow.forEach((e) => e.classList.remove("hide"));
  }
  if (!getPreviousReveal()) {
    leftArrow.forEach((e) => e.classList.add("hide"));
  } else {
    leftArrow.forEach((e) => e.classList.remove("hide"));
  }
}

function focusNext() {
  currentSection().scrollIntoView({ behavior: "instant" });
  const nextReveal = getNextReveal();
  if (!!nextReveal) {
    clearSectionFocus();
    focus(nextReveal);
    refreshControls();
  }
}

function focusPrevious() {
  currentSection().scrollIntoView({ behavior: "instant" });
  const previousReveal = getPreviousReveal();
  if (!!previousReveal) {
    const focusedReveal = getFocusedElement();
    unfocus(focusedReveal);
    clearSectionFocus();
    focus(previousReveal);
    refreshControls();
  }
}

function getNextReveal() {
  const reveals = getReveals(currentSection());
  const currentRevealIndex = reveals.findIndex((e) =>
    e.classList.contains("focus")
  );
  if (currentRevealIndex === reveals.length - 1) {
    return undefined;
  } else {
    return reveals[currentRevealIndex + 1];
  }
}

function getPreviousReveal() {
  const reveals = getReveals(currentSection());
  const currentRevealIndex = reveals.findIndex((e) =>
    e.classList.contains("focus")
  );
  if (currentRevealIndex === 0) {
    return undefined;
  } else {
    return reveals[currentRevealIndex - 1];
  }
}

function getReveals(e) {
  let reveals = [];
  if (isReveal(e)) reveals.push(e);
  if (e.children.length > 0)
    reveals.push(...Array.from(e.children).flatMap(getReveals));
  return reveals;
}

function isReveal(e) {
  return e.classList.contains("reveal");
}

function focus(e) {
  e.classList.add("focus");
  e.classList.add("revealed");
}

function unfocus(e) {
  e.classList.remove("focus");
  e.classList.remove("revealed");
  Array.from(e.children).forEach(unfocus);
}

function clearSectionFocus() {
  currentSection()
    .querySelectorAll(".focus")
    .forEach((e) => e.classList.remove("focus"));
}
