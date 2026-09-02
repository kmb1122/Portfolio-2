let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

function openMenu() {
  document.body.classList.add("menu--open");
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; i++) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`;
  }
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
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal__open");
  }
  isModalOpen = true;
  document.body.classList.add("modal__open");

  const landing = document.getElementById("landing-page");
  if (!landing) return;

  const landingTop = landing.offsetTop;
  const currentScroll = window.scrollY;

  if (Math.abs(currentScroll - landingTop) > 5) {
    window.scrollTo({ top: landingTop, behavior: "smooth" });
  }
}

const projects = [
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
    image: "./P2assets/FES-Internship.png",
    imageAlt: "FES Internship Project",
    title: "Internship with FES",
    technologies: "HTML, CSS, JavaScript, React, Node",
    description:
      "A project showcasing carousels, loading states, and navigation.",
    github: "https://github.com/kmb1122/kim-internship",
    website: "https://kim-internship-phi.vercel.app/",
  },
  {
    image: "./P2assets/MovieSearch.png",
    imageAlt: "Movie Search API Project",
    title: "Movie Search API",
    technologies: "HTML, CSS, JavaScript, React",
    description:
      "Fetches movies and movie data from two different API's. Showcase a loading states, CSS animations, and a sorting feature.",
    github: "https://github.com/kmb1122/MovieSearchProject",
    website: "https://kmb1122.github.io/MovieSearchProject/",
  },
  {
    image: "./P2assets/Project-Library.png",
    imageAlt: "Library Project",
    title: "Library React Project",
    technologies: "HTML, CSS, JavaScript, React",
    description:
      "This project was built using Create React App. It showcases navigating different webpages, sorting, and cart functionality.",
    github: "https://github.com/kmb1122/Library-React-Project",
    website: "https://library-react-project-xi.vercel.app/",
  },
  {
    image: "./P2assets/Treact.png",
    imageAlt: "Treact Project",
    title: "Treact Website",
    technologies: "HTML, CSS, JavaScript",
    description:
      "Showcasing different features of a fluid website including a hamburger menu for smaller screens.",
    github: "https://github.com/kmb1122/Treact-Module3FinalProject",
    website: "https://kmb1122.github.io/Treact-Module3FinalProject/",
  },

  // Add more project objects here.
];

const projectList = document.querySelector("#project__list");
const showMoreButton = document.querySelector("#more__btn");

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
                <div class="project__wrapper">
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
                                <p>GitHib</p>
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
  });

  visibleProjects += nextProjects.length;

  if (visibleProjects >= projects.length) {
    showMoreButton.style.display = "none";
  }
}

showMoreButton.addEventListener("click", renderProjects);

renderProjects();
