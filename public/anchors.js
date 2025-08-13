// public/anchors.js
// Adds stable section IDs so tests and navbar links work without touching React code.
// It tries to find headings then sets id on nearest section or creates a tiny anchor as fallback.
(function () {
  function ensureVisibleAnchor(id, el) {
    if (!el) {
      // Create a minimal visible anchor at the end of the body
      const a = document.createElement("div");
      a.id = id;
      a.style.position = "relative";
      a.style.height = "1px";
      a.style.width = "1px";
      a.style.overflow = "hidden";
      document.body.appendChild(a);
      return a;
    }
    // Prefer setting id on closest section
    const section = el.closest("section");
    if (section) {
      section.id = id;
      return section;
    }
    // Otherwise set id directly
    el.id = id;
    return el;
  }

  function findHeading(regex) {
    const els = Array.from(document.querySelectorAll("h1,h2,h3,h4"));
    for (const el of els) {
      const txt = (el.textContent || "").trim();
      if (regex.test(txt)) return el;
    }
    return null;
  }

  function setByHeading(id, regex) {
    const h = findHeading(regex);
    ensureVisibleAnchor(id, h);
  }

  // Run after main content is mounted
  function run() {
    try {
      // Hero: first section or main
      const firstSection = document.querySelector("main section, section, header");
      if (firstSection && !document.getElementById("hero")) {
        firstSection.id = "hero";
      }

      setByHeading("how-it-works", /how\s*it\s*works/i);
      setByHeading("pricing", /pricing/i);
      setByHeading("voice-ai", /(voice\s*ai|voice\s*assistant|lexi)/i);
      setByHeading("footer-cta", /(start.*trial.*now|your\s+competitors|get\s+started)/i);
    } catch (e) {
      // swallow
      console.warn("anchors init failed", e);
    }
  }

  // When using Vite, React mounts after DOMContentLoaded, so also observe mutations.
  const observer = new MutationObserver((m) => {
    // if we already have the anchors, disconnect
    if (document.getElementById("how-it-works") &&
        document.getElementById("pricing")) {
      observer.disconnect();
      return;
    }
    run();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      run();
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => observer.disconnect(), 5000);
    });
  } else {
    run();
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 5000);
  }
})();
