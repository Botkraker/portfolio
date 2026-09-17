// Reveal sections as they enter the viewport, and highlight active nav link.

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".primary-nav a");

  // Show the "add media" overlay for any project video whose source file
  // isn't there yet, and hide it automatically once the file is added.
  document.querySelectorAll(".project-video").forEach((video) => {
    const source = video.querySelector("source");
    if (!source) return;
    fetch(source.src, { method: "HEAD" })
      .then((res) => {
        if (!res.ok) video.closest(".project-media").classList.add("show-placeholder");
      })
      .catch(() => video.closest(".project-media").classList.add("show-placeholder"));
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08 }
    );
    sections.forEach((section) => revealObserver.observe(section));

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          const link = document.querySelector(`.primary-nav a[href="#${id}"]`);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove("is-active"));
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((section) => navObserver.observe(section));
  } else {
    sections.forEach((section) => section.classList.add("is-visible"));
  }
});
