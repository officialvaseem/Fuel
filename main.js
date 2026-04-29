// =============================================
// FUEL.DOT — Main JavaScript
// =============================================
// ---- MOBILE NAV ----
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// ---- SCROLL REVEAL ----
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ---- DISCOVERY FORM ----

// ---- SMOOTH NAV HIDE ON SCROLL ----
let lastScroll = 0;
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  const current = window.scrollY;
  if (navbar) {
    navbar.style.transform =
      current > lastScroll && current > 100
        ? "translateY(-100%)"
        : "translateY(0)";
    navbar.style.transition = "transform 0.35s ease";
  }
  lastScroll = current;
});

// ---- COUNTER ANIMATION (hero stats) ----
const counters = document.querySelectorAll(".stat-num");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);
counters.forEach((c) => counterObserver.observe(c));

function animateCounter(el) {
  const text = el.textContent;
  const num = parseFloat(text.replace(/[^0-9.]/g, ""));
  const prefix = text.match(/^[^0-9]*/)?.[0] || "";
  const suffix = text.match(/[^0-9.]+$/)?.[0] || "";
  if (isNaN(num)) return;
  const duration = 1500;
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * num;
    el.textContent =
      prefix +
      (Number.isInteger(num) ? Math.round(value) : value.toFixed(1)) +
      suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = text;
  };
  requestAnimationFrame(update);
}
// ---- TESTIMONIAL PREMIUM SLIDER ----
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const testimonialDots = document.querySelectorAll(".testimonial-dots .dot");
const testiPrevBtn = document.getElementById("testiPrev");
const testiNextBtn = document.getElementById("testiNext");

let testimonialIndex = 0;

function showTestimonialSlide(index) {
  testimonialSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  testimonialDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

testiNextBtn?.addEventListener("click", () => {
  testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
  showTestimonialSlide(testimonialIndex);
});

testiPrevBtn?.addEventListener("click", () => {
  testimonialIndex =
    (testimonialIndex - 1 + testimonialSlides.length) %
    testimonialSlides.length;
  showTestimonialSlide(testimonialIndex);
});

testimonialDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    testimonialIndex = Number(dot.dataset.slide);
    showTestimonialSlide(testimonialIndex);
  });
});

showTestimonialSlide(testimonialIndex);

// ===== WORK SLIDER (ONE CARD AT A TIME) =====
// =============================================
// ===== WORK SLIDER — CINEMATIC AUTOPLAY WITH PROGRESS BAR =====//
// ===== PROCESS SEQUENCE REVEAL =====
const sequenceObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        sequenceObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

document.querySelectorAll(".reveal-sequence").forEach((el) => {
  sequenceObserver.observe(el);
});
document.addEventListener("DOMContentLoaded", () => {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const scrollBottomBtn = document.getElementById("scrollBottomBtn");

  console.log(scrollTopBtn, scrollBottomBtn);

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const pageHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (scrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }

    if (scrollY < 200) {
      scrollBottomBtn.classList.add("show");
    } else {
      scrollBottomBtn.classList.remove("show");
    }

    if (scrollY > pageHeight - 300) {
      scrollBottomBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  scrollBottomBtn.addEventListener("click", () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  });
});
const aboutVideo = document.getElementById("aboutVideo");
const aboutSection = document.getElementById("about");

if (aboutVideo && aboutSection) {
  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutVideo.play().catch(() => {
            // Browser may block autoplay with sound until user interacts
          });
        } else {
          aboutVideo.pause();
          aboutVideo.currentTime = 0; // starts from beginning when user comes back
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  aboutObserver.observe(aboutSection);
}
function closePopup() {
  document.getElementById("successPopup").style.display = "none";
}

function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;

  fetch(form.action, {
    method: "POST",
    body: new FormData(form)
  })
  .then(() => {
    document.getElementById("successPopup").style.display = "flex";
    form.reset();
  })
  .catch(() => {
    alert("Something went wrong. Try again.");
  });
}