const GITHUB_USERNAME = "originalWhiteShadow";

async function loadGitHubProfile() {
  const avatar = document.getElementById("githubAvatar");
  const nameEl = document.getElementById("githubName");
  const handleEl = document.getElementById("githubHandle");
  const bioEl = document.getElementById("dynamicBio");

  // Instant fallback that still auto-updates from GitHub's avatar endpoint.
  avatar.src = `https://github.com/${GITHUB_USERNAME}.png?size=320`;
  handleEl.textContent = `@${GITHUB_USERNAME}`;

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (!response.ok) {
      throw new Error("GitHub API request failed");
    }

    const data = await response.json();
    avatar.src = `${data.avatar_url}&s=320`;
    nameEl.textContent = data.name || "Poornananda";
    handleEl.textContent = `@${data.login}`;

    if (data.bio) {
      bioEl.textContent = data.bio;
    }
  } catch (error) {
    console.warn("Using fallback profile data:", error);
  }
}

function setupScrollReveal() {
  const revealEls = document.querySelectorAll("[data-reveal]");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -6% 0px"
    }
  );

  revealEls.forEach(el => observer.observe(el));
}

function setupSmoothNavigation() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

loadGitHubProfile();
setupScrollReveal();
setupSmoothNavigation();
