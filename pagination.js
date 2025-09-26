document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll("#showcase .cube");
  let cardsPerPage;
  let currentPage = 1;

  const pageInfo = document.getElementById("page-info");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  function getCardsPerPage() {
    if (window.innerWidth <= 600) {
      return 1; // mobile
    } else if (window.innerWidth <= 900) {
      return 4; // tablet
    } else {
      return 6; // desktop
    }
  }

  function showPage(page) {
    cardsPerPage = getCardsPerPage();
    const totalPages = Math.ceil(cards.length / cardsPerPage);

    // hide all
    cards.forEach(card => card.style.display = "none");

    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    for (let i = start; i < end && i < cards.length; i++) {
      cards[i].style.display = "flex";
    }

    pageInfo.textContent = `Page ${page} of ${totalPages}`;
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });

  nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(cards.length / getCardsPerPage());
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });

  // handle resize
  window.addEventListener("resize", () => {
    showPage(currentPage);
  });

  showPage(currentPage);
});
