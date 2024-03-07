const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");
const body = document.querySelector("body");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
    body.style.overflow = "hidden";
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
    body.style.overflow = "auto";
  });
}

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");

  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

function scrollHeader() {
  const header = document.getElementById("header");

  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

let swiperPopular = new Swiper(".popular__container", {
  loop: true,
  spaceBetween: 24,
  slidesPerView: "auto",
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
    },
    1024: {
      spaceBetween: 48,
    },
  },
});

let mixerFeatured = mixitup(".featured__content", {
  selectors: {
    target: ".featured__card",
  },
  animation: {
    duration: 300,
  },
});

const linkFeatured = document.querySelectorAll(".featured__item");

function activeFeatured() {
  linkFeatured.forEach((l) => l.classList.remove("active-featured"));
  this.classList.add("active-featured");
}
linkFeatured.forEach((l) => l.addEventListener("click", activeFeatured));

function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 350) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

const date_tear = document.getElementById("date_year");
const date = new Date();
date_tear.innerHTML = date.getFullYear();

const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  // reset: true
});

sr.reveal(
  `.home__title, .popular__container, .features__img, .featured__filters`
);
sr.reveal(`.home__subtitle`, { delay: 500 });
sr.reveal(`.home__elec`, { delay: 600 });
sr.reveal(`.home__img`, { delay: 800 });
sr.reveal(`.home__car-data`, { delay: 900, interval: 100, origin: "bottom" });
sr.reveal(`.home__button`, { delay: 1000, origin: "bottom" });
sr.reveal(`.about__group, .contact__data`, { origin: "left" });
sr.reveal(`.about__data, .contact__img`, { origin: "right" });
sr.reveal(`.address__map`, { delay: 600, origin: "bottom" });
sr.reveal(`.features__card`, { interval: 300 });
sr.reveal(`.featured__card, .logos__content, .footer__content`, {
  interval: 100,
});
sr.reveal(`address__container`, { delay: 1000, origin: "left" });

//formspree
const form = document.getElementById("my-form");

function hideStatus(message = "") {
  const status = document.getElementById("my-form-status");
  status.innerHTML = message;
  setTimeout(() => {
    status.innerHTML = "";
  }, 3000);
}

async function handleSubmit(event) {
  event.preventDefault();
  const status = document.getElementById("my-form-status");
  const data = new FormData(event.target);

  if (data.get("email") === "") {
    hideStatus("Podaj email, aby wysłać wiadomość!");
    return;
  }
  if (data.get("message") === "") {
    hideStatus("Nie możesz wysłać pustej wiadomości!");
    return;
  }
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        hideStatus("Formularz wysłany!");
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            hideStatus(
              data["errors"].map((error) => error["message"]).join(", ")
            );
          } else {
            hideStatus("Wystąpił problem z wysłaniem formularza.");
          }
        });
      }
    })
    .catch((error) => {
      hideStatus("Wystąpił problem z wysłaniem formularza.");
    });
}

form.addEventListener("submit", handleSubmit);

console.log("main.js loaded");
