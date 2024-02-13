const sections = document.querySelectorAll("section");
const iterableSections = getLinkedArray(sections);

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

let currentSection = iterableSections[0];
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
    animateNext();
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    animateBack();
  } else if (e.key === "n") {
    e.preventDefault();
    if (hasNextAnimation()) {
      animateNext();
    } else if (currentSection.next) {
      goToNextSection();
    }
  } else if (e.key === "b") {
    e.preventDefault();
    if (hasPreviousAnimation()) {
      animateBack();
    } else if (currentSection.previous) {
      goToPreviousSection();
    }
  } else if ((e.key = "r")) {
    currentSection.scrollIntoView();
  }
});

function goToNextSection() {
  currentSection.next?.scrollIntoView();
  nextSection();
}

function goToPreviousSection() {
  currentSection.previous?.scrollIntoView();
  previousSection();
}

function nextSection() {
  currentSection = currentSection.next || currentSection;
  refreshControls();
}

function previousSection() {
  currentSection = currentSection.previous || currentSection;
  refreshControls();
}

function refreshControls() {
  if (!currentSection.previous) {
    upArrow.forEach((e) => e.classList.add("hide"));
  } else {
    upArrow.forEach((e) => e.classList.remove("hide"));
  }
  if (!currentSection.next) {
    downArrow.forEach((e) => e.classList.add("hide"));
  } else {
    downArrow.forEach((e) => e.classList.remove("hide"));
  }
  if (!hasNextAnimation()) {
    rightArrow.forEach((e) => e.classList.add("hide"));
  } else {
    rightArrow.forEach((e) => e.classList.remove("hide"));
  }
  if (!hasPreviousAnimation()) {
    leftArrow.forEach((e) => e.classList.add("hide"));
  } else {
    leftArrow.forEach((e) => e.classList.remove("hide"));
  }
}

function hasNextAnimation() {
  return !!getNextAnimatable();
}

function hasPreviousAnimation() {
  return getPreviouslyAnimatedArray().length > 0;
}

function animateNext() {
  const nextAnimatable = getNextAnimatable();
  if (nextAnimatable) {
    nextAnimatable?.classList.add("animated-in");
    clearSectionFocus();
    nextAnimatable?.classList.add("focus");
  }
  refreshControls();
}

function animateBack() {
  const previouslyAnimatedArray = getPreviouslyAnimatedArray();
  if (previouslyAnimatedArray.length > 0) {
    const mostRecentlyAnimated =
      previouslyAnimatedArray[previouslyAnimatedArray.length - 1];
    mostRecentlyAnimated.classList.remove("animated-in");
    clearSectionFocus();
    const animatedInElements =
      currentSection.querySelectorAll(".animated-in");
    if (animatedInElements.length > 0) {
      animatedInElements[animatedInElements.length - 1].classList.add("focus");
    }
  }
  refreshControls();
}

function clearSectionFocus() {
  currentSection
    .querySelectorAll(".focus")
    .forEach((e) => e.classList.remove("focus"));
}

function getNextAnimatable() {
  return currentSection.querySelector(".animate-in:not(.animated-in)");
}

function getPreviouslyAnimatedArray() {
  return currentSection.querySelectorAll(".animate-in.animated-in");
}

function getLinkedArray(inputArray) {
  const linkedOutputArray = [];
  for (let i = 0; i < inputArray.length; i++) {
    linkedOutputArray[i] = inputArray[i];
  }

  for (let i = 0; i < linkedOutputArray.length; i++) {
    linkedOutputArray[i].previous =
      i > 0 ? linkedOutputArray[i - 1] : undefined;
    linkedOutputArray[i].next =
      i < linkedOutputArray.length - 1 ? linkedOutputArray[i + 1] : undefined;
  }
  return linkedOutputArray;
}
