// script.js
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("artistSearch");
  const cards = Array.from(document.querySelectorAll(".artist-grid .card"));

  // basic filter function
  function filterCards(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      // show all
      cards.forEach(c => c.classList.remove("hidden"));
      return;
    }

    cards.forEach(card => {
      const nameEl = card.querySelector(".name");
      const roleEl = card.querySelector(".role");
      const nameText = nameEl ? nameEl.textContent.toLowerCase() : "";
      const roleText = roleEl ? roleEl.textContent.toLowerCase() : "";
      // match if query exists in name or role
      const match = nameText.includes(q) || roleText.includes(q);
      if (match) card.classList.remove("hidden");
      else card.classList.add("hidden");
    });
  }

  // debounce helper so filtering isn't too jumpy while typing
  function debounce(fn, wait = 180) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  const debouncedFilter = debounce(e => filterCards(e.target.value), 150);

  input.addEventListener("input", debouncedFilter);

  // Optional: allow pressing Escape to clear the search
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      input.value = "";
      filterCards("");
    }
  });
});

