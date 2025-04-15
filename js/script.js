////////////////////////////////
// Fade up Animation
AOS.init();

////////////////////////////////
// Footer Set Current Year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

////////////////////////////////
// Mobile Navigation
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const allLinks = document.querySelectorAll(".header a:link");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// Close mobile navigation

allLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    headerEl.classList.remove("nav-open"); // Close the menu
  });
});

////////////////////////////////
// Sticky Navigation
document.addEventListener("DOMContentLoaded", function () {
  const sectionHeroEl = document.querySelector(".section-hero");

  // Only execute if .section-hero element exists
  if (sectionHeroEl) {
    const obs = new IntersectionObserver(
      function (entries) {
        const ent = entries[0];
        if (!ent.isIntersecting) {
          document.body.classList.add("sticky");
        }

        if (ent.isIntersecting) {
          document.body.classList.remove("sticky");
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-80px",
      }
    );

    obs.observe(sectionHeroEl);
  }
});

////////////////////////////////
// Open Gallery Images in Full Screen (For both Index and Gallery Pages)
// Modal setup
// Modal setup
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close-btn");

// Collect all gallery images
const galleryImages = Array.from(
  document.querySelectorAll(".gallery-item img, .main-gallery-item img")
);
let currentIndex = 0;

// Open image in modal
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    modal.style.display = "block";
    modalImg.src = img.dataset.full || img.src;
  });
});

// Close modal on close button click
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside image
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Close modal with Escape key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    modal.style.display = "none";
  }

  // Navigate with Arrow Keys
  if (modal.style.display === "block") {
    if (e.key === "ArrowRight") {
      updateImageIndex(1);
    } else if (e.key === "ArrowLeft") {
      updateImageIndex(-1);
    }
  }
});

// Function to update the image index and update the modal image source
function updateImageIndex(direction) {
  currentIndex =
    (currentIndex + direction + galleryImages.length) % galleryImages.length;
  modalImg.src =
    galleryImages[currentIndex].dataset.full || galleryImages[currentIndex].src;
}

// Optional: Create navigation arrows inside modal
function createArrowBtn(direction) {
  const btn = document.createElement("div");
  btn.classList.add("arrow-btn", direction); // Added the 'arrow-btn' class
  btn.innerHTML = direction === "left" ? "&#10094;" : "&#10095;";
  btn.addEventListener("click", () => {
    updateImageIndex(direction === "left" ? -1 : 1);
  });
  modal.appendChild(btn);
}

createArrowBtn("left");
createArrowBtn("right");

// Mobile swipe support
let touchStartX = 0;
let touchEndX = 0;

modal.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

modal.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50; // Minimum px to consider swipe
  if (modal.style.display !== "block") return;

  if (touchEndX < touchStartX - swipeThreshold) {
    // Swiped left → next image
    updateImageIndex(1);
  } else if (touchEndX > touchStartX + swipeThreshold) {
    // Swiped right → previous image
    updateImageIndex(-1);
  }
}

////////////////////////////////
// Animate numbers
function animateNumber(number) {
  const target = +number.getAttribute("data-target");
  const current = +number.textContent;

  if (current === target) return; // Skip animation if already at target

  const increment = target / 100; // You can adjust this to make the animation faster/slower
  let count = current;

  function updateNumber() {
    count += increment;
    if (count >= target) {
      count = target; // Ensure it doesn't overshoot
    }
    number.textContent = "+" + Math.floor(count); // Add "+" and update the displayed number

    if (count < target) {
      requestAnimationFrame(updateNumber); // Keep updating the number until it reaches the target
    }
  }

  updateNumber();
}

// Function to check if the element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Scroll event listener
window.addEventListener("scroll", function () {
  const numbers = document.querySelectorAll(".about-me-large-num");
  numbers.forEach((number) => {
    if (isInViewport(number) && !number.classList.contains("animated")) {
      animateNumber(number); // Only animate if the element is in the viewport
      number.classList.add("animated"); // Add a class to ensure the number doesn't animate again
    }
  });
});

// Trigger the animation on load if the element is already in the viewport
window.addEventListener("load", function () {
  const numbers = document.querySelectorAll(".about-me-large-num");
  numbers.forEach((number) => {
    if (isInViewport(number)) {
      animateNumber(number);
      number.classList.add("animated");
    }
  });
});

////////////////////////////////
// Disable right click on images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("contextmenu", (e) => e.preventDefault());
  });
});
