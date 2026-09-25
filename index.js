let isModalOpen = false;
let contrastToggle = false;
let lastFocusedElement = null;

function openMenu() {
  document.body.classList.add("menu--open");
  const menuButton = document.querySelector(
    ".btn__menu:not(.btn__menu--close)",
  );
  const menu = document.querySelector(".menu__backdrop");
  menuButton?.setAttribute("aria-expanded", "true");
  menu?.setAttribute("aria-hidden", "false");
  document.querySelector(".btn__menu--close")?.focus();
}

function closeMenu() {
  document.body.classList.remove("menu--open");
  const menuButton = document.querySelector(
    ".btn__menu:not(.btn__menu--close)",
  );
  const menu = document.querySelector(".menu__backdrop");
  menuButton?.setAttribute("aria-expanded", "false");
  menu?.setAttribute("aria-hidden", "true");
}

function createBackgroundSymbols() {
  const field = document.querySelector(".shape__field");
  if (!field) return null;

  const symbols = [
    "+",
    "-",
    "×",
    "÷",
    "=",
    "≠",
    "<",
    ">",
    "±",
    "∞",
    "π",
    "∑",
    "√",
    "#",
    "%",
    "&",
    "@",
    "$",
    "^",
    "~",
    "!",
    "?",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  const colors = [
    "#a8d8ea",
    "#f6b6c8",
    "#b9e4c9",
    "#f7d794",
    "#c9b6e4",
    "#f4a896",
  ];
  const columns = 24;
  const rows = 20;
  const placements = [];

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const symbol = document.createElement("span");
      symbol.className = "shape";
      symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      symbol.style.left = `${((column + 0.5) / columns) * 100}%`;
      symbol.style.top = `${((row + 0.5) / rows) * 100}%`;
      symbol.style.setProperty(
        "--symbol-color",
        colors[Math.floor(Math.random() * colors.length)],
      );
      symbol.style.fontSize = `${18 + Math.floor(Math.random() * 22)}px`;
      field.append(symbol);
      placements.push({
        element: symbol,
        x: ((column + 0.5) / columns) * 100,
        y: ((row + 0.5) / rows) * 100,
      });
    }
  }

  return { field, placements };
}

const backgroundSymbols = createBackgroundSymbols();

if (backgroundSymbols) {
  const { field, placements } = backgroundSymbols;
  const landing = document.querySelector("#landing-page");
  let pointerX = 0;
  let pointerY = 0;
  let frameRequested = false;
  let idleTimer = null;

  function fadePointerWave() {
    placements.forEach(({ element }) => element.classList.remove("shape--lit"));
    idleTimer = null;
  }

  function scheduleIdleFade() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(fadePointerWave, 1000);
  }

  function revealPointerWave() {
    frameRequested = false;
    const bounds = field.getBoundingClientRect();
    const radius = Math.min(150, bounds.width * 0.08);
    const radiusSquared = radius * radius;

    placements.forEach(({ element, x, y }) => {
      const symbolX = (x / 100) * bounds.width;
      const symbolY = (y / 100) * bounds.height;
      const deltaX = symbolX - pointerX;
      const deltaY = symbolY - pointerY;
      element.classList.toggle(
        "shape--lit",
        deltaX * deltaX + deltaY * deltaY <= radiusSquared,
      );
    });
  }

  function updatePointerWave(event) {
    const bounds = field.getBoundingClientRect();
    pointerX = event.clientX - bounds.left;
    pointerY = event.clientY - bounds.top;

    if (!frameRequested) {
      frameRequested = true;
      requestAnimationFrame(revealPointerWave);
    }

    scheduleIdleFade();
  }

  landing?.addEventListener("pointermove", updatePointerWave);

  landing?.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") updatePointerWave(event);
  });

  landing?.addEventListener("pointerup", (event) => {
    if (event.pointerType === "touch") scheduleIdleFade();
  });

  landing?.addEventListener("pointercancel", (event) => {
    if (event.pointerType === "touch") scheduleIdleFade();
  });

  landing?.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "touch") {
      scheduleIdleFade();
      return;
    }

    clearTimeout(idleTimer);
    fadePointerWave();
  });
}

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
}

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList.add("modal__overlay--visible");
  emailjs
    .sendForm(
      "service_mbp1cxn",
      "template_neqjd78",
      event.target,
      "cYMCtYadw1AaV-lFw",
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList.add("modal__overlay--visible");
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "This email service is temporarily unavaible. Please conact me directly at silverspace@gmail.com.",
      );
    });
}

function toggleModal() {
  const modal = document.querySelector(".modal");

  if (isModalOpen) {
    isModalOpen = false;
    document.body.classList.remove("modal__open");
    modal?.setAttribute("aria-hidden", "true");
    lastFocusedElement?.focus();
    return;
  }
  isModalOpen = true;
  lastFocusedElement = document.activeElement;
  closeMenu();
  document.body.classList.add("modal__open");
  modal?.setAttribute("aria-hidden", "false");
  modal?.querySelector("input, textarea, button")?.focus();

  const landing = document.getElementById("landing-page");
  if (!landing) return;

  const landingTop = landing.offsetTop;
  const currentScroll = window.scrollY;

  if (Math.abs(currentScroll - landingTop) > 5) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

document.addEventListener("click", (e) => {
  const modal = document.querySelector(".modal");
  if (!isModalOpen) return;

  if (modal.contains(e.target)) return;

  if (e.target.closest("[onclick='toggleModal()']")) return;

  toggleModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (isModalOpen) toggleModal();
    else closeMenu();
    return;
  }

  if (event.key !== "Tab" || !isModalOpen) return;

  const modal = document.querySelector(".modal");
  const focusable = modal?.querySelectorAll(
    'button, input, textarea, a[href], [tabindex]:not([tabindex="-1"])',
  );
  if (!focusable?.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

const projects = [
  {
    image: "./P2assets/TeacherInterventionDashboard.png",
    imageAlt: "Teacher Intervention Dashboard",
    title: "Intervention Dashboard",
    technologies: "Next.js, TypeScript, Tailwind, Vitest",
    description:
      "A dashboard that flags students needing intervention from their assessment data. Showcasing a testing page with Vitest.",
    github: "https://github.com/kmb1122/Teacher-Intervention-Dashboard",
    website: "https://teacher-intervention-dashboard.vercel.app/",
  },
  {
    image: "./P2assets/Summarist-Internship.png",
    imageAlt: "Summarist Internship Project",
    title: "Summarist Internship",
    technologies: "HTML, CSS, TypeScript, React, Next.js, Firestore",
    description:
      "Showcases Firebase Authentication, Firestore, an audio player, and Stripe payments.",
    github: "https://github.com/kmb1122/Summarist-Internship",
    website: "https://summarist-internship-kohl.vercel.app/",
  },
  {
    image: "./P2assets/Skinstric.png",
    imageAlt: "Skinstric Internship Project",
    title: "Skinstric Internship",
    technologies: "HTML, CSS, TypeScript, React, Next.js, GSAP animations",
    description:
      "Boast a processing time of less than 2 minutes while also showcasing CSS and GSAP animations.",
    github: "https://github.com/kmb1122/Skinstric-Internship",
    website: "https://skinstric-internship-peach.vercel.app/",
  },
  {
    image: "./P2assets/FES-Internship.png",
    imageAlt: "FES Internship Project",
    title: "Internship with FES",
    technologies: "HTML, CSS, JavaScript, React, Node",
    description:
      "A project with carousels, loading states, and dynamic routing.",
    github: "https://github.com/kmb1122/kim-internship",
    website: "https://kim-internship-phi.vercel.app/",
  },
  {
    image: "./P2assets/MovieSearch.png",
    imageAlt: "Movie Search API Project",
    title: "Movie Search API",
    technologies: "HTML, CSS, JavaScript, React",
    description:
      "Fetches movie data from two different API's. Showcases loading states, CSS animations, and a sorting feature.",
    github: "https://github.com/kmb1122/MovieSearchProject",
    website: "https://kmb1122.github.io/MovieSearchProject/",
  },
  {
    image: "./P2assets/Project-Library.png",
    imageAlt: "Library Project",
    title: "Library React Project",
    technologies: "HTML, CSS, JavaScript, React",
    description:
      "This project was built using Create React App. It showcases dynamic routing, a sorting feature, and a cart functionality.",
    github: "https://github.com/kmb1122/Library-React-Project",
    website: "https://library-react-project-xi.vercel.app/",
  },

  // Add more project objects here.
];

const projectList = document.querySelector("#project__list");
const showMoreButton = document.querySelector("#more__btn");
const scrollRevealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12 },
      )
    : null;

if (scrollRevealObserver) {
  document.body.classList.add("scroll-reveal-ready");
  document
    .querySelectorAll(".scroll-reveal-target")
    .forEach((target) => scrollRevealObserver.observe(target));
}

console.log("projectList:", projectList);
console.log("showMoreButton:", showMoreButton);

const projectsPerClick = 4;
let visibleProjects = 0;

function renderProjects() {
  const nextProjects = projects.slice(
    visibleProjects,
    visibleProjects + projectsPerClick,
  );

  nextProjects.forEach((project) => {
    projectList.insertAdjacentHTML(
      "beforeend",
      `
            <li class="project">
                <div class="project__wrapper scroll-reveal-target">
                    <img
                        src="${project.image}"
                        alt="${project.imageAlt}"
                        class="project__img"
                    >
                    <div class="project__wrapper--bg"></div>

                    <div class="project__description">
                        <h3 class="project__description--title">
                            ${project.title}
                        </h3>

                        <h4 class="project__description--sub-title">
                            ${project.technologies}
                        </h4>

                        <p class="project__description--para">
                            ${project.description}
                        </p>

                        <div class="project__description--links">
                            <a
                                href="${project.github}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="project__description--link"
                                aria-label="View ${project.title} on GitHub"
                            >
                                <i class="fa-brands fa-github"></i>
                                <p>GitHub</p>
                            </a>

                            <a
                                href="${project.website}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="project__description--link"
                                aria-label="Visit ${project.title} website"
                            >
                                <i class="fas fa-link"></i>
                                <p>User Interface</p>
                            </a>
                        </div>
                    </div>
                </div>
            </li>
            `,
    );
    scrollRevealObserver?.observe(
      projectList.lastElementChild.querySelector(".project__wrapper"),
    );
  });

  visibleProjects += nextProjects.length;

  if (visibleProjects >= projects.length) {
    showMoreButton.style.display = "none";
  }
}

showMoreButton.addEventListener("click", renderProjects);

renderProjects();
