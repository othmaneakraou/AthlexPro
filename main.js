// JavaScript for Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });

  // Close mobile menu when clicking on mobile menu links
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
    });
  });

  // Dynamic WhatsApp links
  const whatsappButtons = document.querySelectorAll('a[href^="https://wa.me"]');
  whatsappButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.classList.add("scale-105");
    });
    button.addEventListener("mouseleave", function () {
      this.classList.remove("scale-105");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Fonction pour initialiser un slider
  function initializeSlider(sliderNumber = "") {
    // Sélecteurs avec suffixe pour le second slider
    const trackId = `slider-track${sliderNumber ? `-${sliderNumber}` : ""}`;
    const bulletsClass = `.bullets${sliderNumber ? `-${sliderNumber}` : ""}`;
    const prevButtonId = `prev-slide${sliderNumber ? `-${sliderNumber}` : ""}`;
    const nextButtonId = `next-slide${sliderNumber ? `-${sliderNumber}` : ""}`;

    // Éléments du slider
    const track = document.getElementById(trackId);
    if (!track) return; // Sortir si l'élément n'existe pas

    const slides = Array.from(track.querySelectorAll(".slide"));
    const bullets = Array.from(document.querySelectorAll(`${bulletsClass} .bullet`));
    const prevButton = document.getElementById(prevButtonId);
    const nextButton = document.getElementById(nextButtonId);

    let currentIndex = 0;
    const slideCount = slides.length;

    // Mettre à jour le slider
    function updateSlider() {
      // Mettre à jour la transformation pour afficher la diapositive actuelle
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Mettre à jour les puces
      bullets.forEach((bullet, index) => {
        if (index === currentIndex) {
          bullet.classList.add("bg-primary-600");
          bullet.classList.remove("bg-secondary-300");
        } else {
          bullet.classList.remove("bg-primary-600");
          bullet.classList.add("bg-secondary-300");
        }
      });
    }

    // Fonctions de navigation
    function goToSlide(index) {
      currentIndex = (index + slideCount) % slideCount; // S'assurer que l'index est dans les limites
      updateSlider();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    // Écouteurs d'événements
    if (prevButton) prevButton.addEventListener("click", prevSlide);
    if (nextButton) nextButton.addEventListener("click", nextSlide);

    // Navigation par puces
    bullets.forEach((bullet, index) => {
      bullet.addEventListener("click", () => {
        goToSlide(index);
      });
    });

    // Support tactile/balayage
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide(); // Balayage vers la gauche, aller à la diapositive suivante
      } else if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide(); // Balayage vers la droite, aller à la diapositive précédente
      }
    }

    // Initialiser le slider au chargement
    updateSlider();

    // // Avancement automatique des diapositives
    // const autoPlayInterval = 5000; // 5 secondes
    // let slideInterval = setInterval(nextSlide, autoPlayInterval);

    // // Mettre en pause la lecture automatique au survol
    // track.addEventListener("mouseenter", () => {
    //   clearInterval(slideInterval);
    // });

    // track.addEventListener("mouseleave", () => {
    //   slideInterval = setInterval(nextSlide, autoPlayInterval);
    // });

    // Retourner un objet avec les fonctions et variables pour une utilisation externe si nécessaire
    return {
      goToSlide,
      nextSlide,
      prevSlide,
      updateSlider
    };
  }

  // Initialiser les deux sliders
  const slider1 = initializeSlider(); // Premier slider (sans suffixe)
  const slider2 = initializeSlider("2"); // Second slider (avec suffixe "2")
  const slider3 = initializeSlider("3"); // Troisième slider (avec suffixe "3")
});
