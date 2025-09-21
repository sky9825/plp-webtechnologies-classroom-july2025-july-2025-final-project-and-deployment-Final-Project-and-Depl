// =========================
// Mobile Menu Toggle
// =========================
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navLinks.style.display = navLinks.classList.contains("active") ? "flex" : "none";
  });

  // Close menu when a link is clicked (mobile UX improvement)
  const links = navLinks.querySelectorAll("a");
  links.forEach(link =>
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      navLinks.style.display = "none";
    })
  );
}

// =========================
// Scroll Animations
// =========================
const animatedElements = document.querySelectorAll(".fade-in, .slide-left, .slide-right");

if (animatedElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedElements.forEach((el) => observer.observe(el));
}

// =========================
// Testimonials Carousel
// =========================
const track = document.getElementById("testimonial-track");
const testimonials = document.querySelectorAll(".testimonial");
let index = 0;

function showTestimonial() {
  index = (index + 1) % testimonials.length;
  track.style.transform = `translateX(-${index * 100}%)`;
}

if (track && testimonials.length > 0) {
  setInterval(showTestimonial, 4000); // every 4s
}

// =========================
// Booking Form Submission
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("booking-form");
  const confirmationMessage = document.getElementById("confirmation");

  if (bookingForm && confirmationMessage) {
    bookingForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      try {
        const response = await fetch(bookingForm.action, {
          method: "POST",
          body: new FormData(bookingForm),
          headers: { "Accept": "application/json" },
        });

        if (response.ok) {
          confirmationMessage.style.display = "block";
          bookingForm.reset();
        } else {
          alert("Oops! Something went wrong. Please try again.");
        }
      } catch (error) {
        alert("Network error. Please check your connection.");
      }
    });
  }
});
