// =====================================
// PERSONAL INFORMATION & SOCIAL LINKS
// =====================================
const personalInfo = {
  name: "Leir",
  fullName: "Ron Gabriel Darum",
  email: "gabrieldarum@gmail.com",
  location: "Philippines",
  profileImage: "images/profile.jpg", // Replace with images/profile.jpg when ready.
  // Add your real profile URLs. Placeholder values are intentionally hidden.
  socialLinks: {
    facebook: "https://www.facebook.com/share/1CLE4SMrjG/",
    instagram: "https://www.instagram.com/leir.nox",
    github: "https://github.com/alt-lier"
  },
  // Optional Formspree endpoint, e.g. "https://formspree.io/f/xxxxxxxx"
  formspreeEndpoint: "https://formspree.io/f/xbgokqrr"
};

// =====================================
// PROJECT LINKS AND INFORMATION
// =====================================
const projects = [
  {
    title: "Personal Portfolio Website",
    description: "A personal website to showcase my skills, projects, and contact information.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "images/project-portfolio.svg",
    github: "https://github.com/alt-lier/Portfolio.git", // Add your actual repository URL.
    liveDemo: "https://alt-lier.github.io/Portfolio/", // Add your deployed GitHub Pages URL.
    features: ["Responsive layout for desktop, tablet, and mobile", "Centralized personal and project configuration", "Interactive project cards and contact section"]
  },
  {
    title: "Scholarship Application Management System",
    description: "A Java desktop application that manages scholarship applications through a simple graphical interface.",
    technologies: ["Java", "Java Swing"],
    image: "images/project-scholarship.svg",
    github: "https://github.com/alt-lier/Scholarship_Application_Management_System.git", // Add your actual repository URL.
    liveDemo: "",
    features: ["Desktop graphical interface", "Organized scholarship application records", "Designed to make application management simpler"]
  },
  {
    title: "TuneText",
    description: "A Java-based song lyrics player.",
    technologies: ["Java"],
    image: "images/project-tunetext.svg",
    github: "https://github.com/alt-lier/TuneText.git",
    liveDemo: "",
    features: ["Java desktop application", "Song lyrics-focused interface", "A project combining music and programming"]
  }
];

// Keep all editable skill copy together here.
const skillDetails = {
  developer: {
    title: "Aspiring Developer",
    description: "I enjoy building practical digital experiences and learning how software works from the ground up.",
    skills: ["HTML", "CSS", "JavaScript", "Java", "Python"],
    focus: "Building responsive interfaces, writing clear code, and improving through hands-on projects."
  },
  uiux: {
    title: "UI/UX Design",
    description: "I think about how people use a product and how its layout can make tasks feel clear and simple.",
    skills: ["Figma", "Wireframing", "Prototyping"],
    focus: "Planning page structure, exploring layouts, and communicating ideas through prototypes."
  },
  graphic: {
    title: "Graphic Design",
    description: "I like creating clean visuals that communicate an idea and give a project a consistent identity.",
    skills: ["Canva", "Layout Design", "Visual Identity"],
    focus: "Creating simple layouts, visual assets, and cohesive design elements."
  }
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const safeUrl = value => {
  if (!value || /YOUR_USERNAME|YOUR_REPOSITORY|example\.com/i.test(value)) return "";
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch { return ""; }
};
const externalLink = (url, label, className = "btn btn-outline-teal btn-sm") =>
  `<a class="${className}" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;

function renderPersonalInfo() {
  $("#heroName").textContent = personalInfo.name;
  $("#heroFullName").textContent = `${personalInfo.fullName}, but call me ${personalInfo.name}.`;
  $("#aboutLocation").textContent = personalInfo.location;
  $("#contactLocation").textContent = personalInfo.location;
  $("#contactEmail").textContent = personalInfo.email;
  $("#emailLink").href = `mailto:${personalInfo.email}`;
  $("#footerName").textContent = personalInfo.name;
  $("#profileImage").src = personalInfo.profileImage;
  $("#profileImage").alt = `${personalInfo.name}'s profile portrait`;
  document.title = `${personalInfo.name} | Developer Portfolio`;

  const icons = { facebook: "facebook", github: "github", instagram: "instagram" };
  const socialRoot = $("#socialLinks");
  socialRoot.innerHTML = "";
  Object.entries(personalInfo.socialLinks).forEach(([network, rawUrl]) => {
    const url = safeUrl(rawUrl);
    // Keep every social icon visible. It only becomes a link once a real URL is added.
    const item = document.createElement(url ? "a" : "span");
    if (url) {
      item.href = url;
      item.target = "_blank";
      item.rel = "noopener noreferrer";
    } else {
      item.className = "social-link-unconfigured";
      item.setAttribute("aria-disabled", "true");
      item.title = `Add your ${network} URL in js/script.js to activate this icon`;
    }
    item.setAttribute("aria-label", network);
    item.innerHTML = `<i class="bi bi-${icons[network]}" aria-hidden="true"></i>`;
    socialRoot.append(item);
  });
}

function projectCardMarkup(project, index, clone = false) {
  return `
    <article class="project-card${clone ? " is-carousel-clone" : ""}" data-project-card="${index}" ${clone ? 'aria-hidden="true"' : ""}>
      <div class="project-thumb">
        <img src="${escapeAttribute(project.image)}" alt="${escapeAttribute(project.title)} preview" loading="lazy">
        <span class="project-dots" aria-hidden="true"><i></i><i></i><i></i></span>
      </div>
      <div class="project-content">
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <div class="project-meta">
          <span class="tag-list">${project.technologies.map(t => `<em>${escapeHtml(t)}</em>`).join("")}</span>
          <button class="text-link" type="button" data-project="${index}" tabindex="${clone ? "-1" : "0"}">View details <i class="bi bi-arrow-right"></i></button>
        </div>
      </div>
    </article>`;
}

function renderProjects() {
  buildCarousel();
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}
function escapeAttribute(value = "") { return escapeHtml(value); }

let carouselIndex = 0;
let carouselCloneCount = 0;
let carouselVisibleCount = 3;
let carouselResizeTimer;

function visibleProjectCount() {
  if (window.matchMedia("(max-width: 767px)").matches) return 1;
  if (window.matchMedia("(max-width: 991px)").matches) return 2;
  return 3;
}

function buildCarousel() {
  const track = $("#projectTrack");
  if (!track) return;
  carouselVisibleCount = visibleProjectCount();
  carouselCloneCount = Math.min(carouselVisibleCount, projects.length);
  const before = projects.slice(-carouselCloneCount).map((project, i) =>
    projectCardMarkup(project, projects.length - carouselCloneCount + i, true)).join("");
  const originals = projects.map((project, index) => projectCardMarkup(project, index)).join("");
  const after = projects.slice(0, carouselCloneCount).map((project, index) =>
    projectCardMarkup(project, index, true)).join("");
  track.innerHTML = before + originals + after;
  track.querySelectorAll("[data-project]").forEach(button => {
    button.addEventListener("click", () => openProject(Number(button.dataset.project)));
  });
  carouselIndex = carouselCloneCount;
  track.style.transition = "none";
  updateCarousel();
  requestAnimationFrame(() => {
    track.style.transition = "";
  });
}

function updateCarousel(animate = true) {
  const track = $("#projectTrack");
  if (!track) return;
  const card = $(".project-card", track);
  if (!card) return;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const step = card.getBoundingClientRect().width + gap;
  track.style.transition = animate ? "" : "none";
  track.style.transform = `translateX(-${carouselIndex * step}px)`;
  const activeDot = ((carouselIndex - carouselCloneCount) % projects.length + projects.length) % projects.length;
  $("#carouselCount").textContent = `${String(activeDot + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
  $$("[data-carousel-dot]").forEach((dot, index) => {
    dot.classList.toggle("active", index === activeDot);
    dot.setAttribute("aria-current", index === activeDot ? "true" : "false");
  });
}

function moveCarousel(direction) {
  const track = $("#projectTrack");
  if (!track || track.classList.contains("is-sliding")) return;
  track.classList.add("is-sliding");
  carouselIndex += direction;
  updateCarousel();
}

$("#projectPrev").addEventListener("click", () => moveCarousel(-1));
$("#projectNext").addEventListener("click", () => moveCarousel(1));
$("#carouselDots").addEventListener("click", event => {
  const dot = event.target.closest("[data-carousel-dot]");
  if (!dot) return;
  const target = Number(dot.dataset.carouselDot);
  const current = ((carouselIndex - carouselCloneCount) % projects.length + projects.length) % projects.length;
  let distance = target - current;
  if (distance > projects.length / 2) distance -= projects.length;
  if (distance < -projects.length / 2) distance += projects.length;
  carouselIndex += distance;
  updateCarousel();
});

$("#projectTrack").addEventListener("transitionend", event => {
  if (event.propertyName !== "transform") return;
  const track = event.currentTarget;
  if (carouselIndex >= projects.length + carouselCloneCount) carouselIndex = carouselCloneCount;
  else if (carouselIndex < carouselCloneCount) carouselIndex = projects.length + carouselCloneCount - 1;
  track.classList.remove("is-sliding");
  updateCarousel(false);
  requestAnimationFrame(() => { track.style.transition = ""; });
});

window.addEventListener("resize", () => {
  clearTimeout(carouselResizeTimer);
  carouselResizeTimer = setTimeout(() => {
    if (visibleProjectCount() !== carouselVisibleCount) buildCarousel();
    else updateCarousel(false);
  }, 120);
});

const detailModal = new bootstrap.Modal($("#detailModal"));
function openProject(index) {
  const project = projects[index];
  if (!project) return;
  $("#modalEyebrow").textContent = "FEATURED PROJECT";
  $("#detailModalTitle").textContent = project.title;
  const github = safeUrl(project.github);
  const demo = safeUrl(project.liveDemo);
  $("#modalBody").innerHTML = `
    <img class="modal-project-image" src="${escapeAttribute(project.image)}" alt="${escapeAttribute(project.title)} preview">
    <p class="modal-description">${escapeHtml(project.description)}</p>
    <h3 class="h6 fw-bold mt-4">Technologies used</h3>
    <div class="skill-modal-tags">${project.technologies.map(t => `<span>${escapeHtml(t)}</span>`).join("")}</div>
    <h3 class="h6 fw-bold mt-4">Key features</h3>
    <ul class="modal-feature-list">${(project.features || []).map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <div class="modal-actions">
      ${github ? externalLink(github, '<i class="bi bi-github"></i> GitHub repository') : '<span class="text-secondary small align-self-center">Repository link not configured yet.</span>'}
      ${demo ? externalLink(demo, '<i class="bi bi-box-arrow-up-right"></i> Live demo', "btn btn-coral btn-sm") : ""}
    </div>`;
  detailModal.show();
}

$$("[data-skill]").forEach(button => button.addEventListener("click", () => {
  const skill = skillDetails[button.dataset.skill];
  if (!skill) return;
  $("#modalEyebrow").textContent = "SKILLS & TOOLS";
  $("#detailModalTitle").textContent = skill.title;
  $("#modalBody").innerHTML = `<p class="modal-description">${escapeHtml(skill.description)}</p>
    <div class="skill-modal-tags">${skill.skills.map(s => `<span>${escapeHtml(s)}</span>`).join("")}</div>
    <h3 class="h6 fw-bold mt-4">What I focus on</h3><p class="modal-description">${escapeHtml(skill.focus)}</p>`;
  detailModal.show();
}));

// Contact form: a real Formspree endpoint sends; otherwise open a prefilled email draft.
$("#contactForm").addEventListener("submit", async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const feedback = $("#formFeedback");
  const button = $("#sendMessage");
  feedback.classList.remove("error");
  feedback.textContent = "";
  if (!form.checkValidity()) {
    form.reportValidity();
    feedback.textContent = "Please complete all fields with a valid email address.";
    feedback.classList.add("error");
    return;
  }
  const name = $("#visitorName").value.trim();
  const email = $("#visitorEmail").value.trim();
  const message = $("#visitorMessage").value.trim();
  if (!name || !email || !message) {
    feedback.textContent = "Please complete all fields.";
    feedback.classList.add("error");
    return;
  }

  const endpoint = safeUrl(personalInfo.formspreeEndpoint);
  if (endpoint) {
    button.disabled = true;
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Sending...';
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });
      if (!response.ok) throw new Error("The email service did not accept the message.");
      feedback.textContent = "Thanks! Your message has been sent.";
      form.reset();
    } catch (error) {
      feedback.textContent = "Could not send your message. Please try again or email me directly.";
      feedback.classList.add("error");
    } finally {
      button.disabled = false;
      button.innerHTML = 'Send message <i class="bi bi-arrow-right"></i>';
    }
  } else {
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    feedback.textContent = "Opening your email app with a prepared message. Send it there to complete delivery.";
    window.location.href = `mailto:${encodeURIComponent(personalInfo.email)}?subject=${subject}&body=${body}`;
  }
});

// Scroll reveal, active navigation, and back-to-top.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$(".reveal").forEach(element => revealObserver.observe(element));

const sections = $$("main section[id]");
const navLinks = $$(".nav-link");
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => navObserver.observe(section));

const backToTop = $("#backToTop");
window.addEventListener("scroll", () => backToTop.classList.toggle("visible", window.scrollY > 500), { passive: true });
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
$$(".nav-link").forEach(link => link.addEventListener("click", () => {
  const nav = $("#mainNav");
  if (nav.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(nav).hide();
}));
$("#currentYear").textContent = new Date().getFullYear();

renderPersonalInfo();
renderProjects();
