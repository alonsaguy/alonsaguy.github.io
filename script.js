(function () {
  const pages = {
    about: document.getElementById("page-about"),
    research: document.getElementById("page-research"),
    talks: document.getElementById("page-talks"),
  };

  const navButtons = Array.from(document.querySelectorAll("[data-nav]"));
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");

  function setActive(tab) {
    // pages
    Object.keys(pages).forEach((k) => pages[k].classList.toggle("is-active", k === tab));

    // nav button active state (ignore brand link)
    navButtons.forEach((btn) => {
      if (btn.classList.contains("brand")) return;
      btn.classList.toggle("is-active", btn.getAttribute("data-nav") === tab);
    });

    // close mobile menu
    nav?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");

    // update hash for shareable links
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // click handlers
  navButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const tab = btn.getAttribute("data-nav");
      if (tab && pages[tab]) setActive(tab);
    });
  });

  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // init from hash
  const initial = (window.location.hash || "#about").replace("#", "");
  if (pages[initial]) setActive(initial);
  else setActive("about");

  // footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
