// Reveal sections as they enter the viewport, and highlight active nav link.

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".primary-nav a");

  // Show the "add media" overlay for any project video whose source file
  // isn't there yet, and hide it automatically once the file is added.
  // Uses the video element's own error event rather than fetch(), since
  // fetch() can't read file:// URLs when the page is opened directly.
  document.querySelectorAll(".project-video").forEach((video) => {
    if (!video.querySelector("source")) return;
    video.addEventListener("error", () => {
      video.closest(".project-media").classList.add("show-placeholder");
    });
  });

  // Play videos like a silent, looping GIF: on hover for pointer devices,
  // or while scrolled into view on touch devices where hover doesn't exist.
  const canHover = window.matchMedia("(hover: hover)").matches;
  document.querySelectorAll(".project-video").forEach((video) => {
    const stop = () => {
      video.pause();
      video.currentTime = 0;
    };
    stop();

    if (canHover) {
      const media = video.closest(".project-media");
      media.addEventListener("mouseenter", () => video.play().catch(() => {}));
      media.addEventListener("mouseleave", stop);
    } else if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) video.play().catch(() => {});
            else stop();
          });
        },
        { threshold: 0.6 }
      ).observe(video);
    }
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
