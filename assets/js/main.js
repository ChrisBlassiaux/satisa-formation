(function () {
  var navToggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobileNav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });
  }

  var offerHeaders = document.querySelectorAll('.offer-row__header');

  function syncOfferRowState(btn) {
    var row = btn.closest('.offer-row');
    if (row) {
      row.classList.toggle('is-open', btn.getAttribute('aria-expanded') === 'true');
    }
  }

  offerHeaders.forEach(function (header) {
    syncOfferRowState(header);

    header.addEventListener('click', function () {
      var pairKey = header.getAttribute('data-pair');
      var group = pairKey
        ? document.querySelectorAll('.offer-row__header[data-pair="' + pairKey + '"]')
        : [header];
      var expanding = header.getAttribute('aria-expanded') !== 'true';

      group.forEach(function (btn) {
        btn.setAttribute('aria-expanded', expanding ? 'true' : 'false');
        var body = document.getElementById(btn.getAttribute('aria-controls'));
        if (body) {
          body.hidden = !expanding;
        }
        syncOfferRowState(btn);
      });
    });
  });

  var timelineItems = document.querySelectorAll('.timeline__item');

  if (timelineItems.length) {
    if ('IntersectionObserver' in window) {
      var timelineObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            timelineObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      timelineItems.forEach(function (item) {
        timelineObserver.observe(item);
      });
    } else {
      timelineItems.forEach(function (item) {
        item.classList.add('is-visible');
      });
    }
  }

  var filterButtons = document.querySelectorAll('[data-filter]');
  var filterCards = document.querySelectorAll('[data-category]');

  if (filterButtons.length && filterCards.length) {
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var filter = button.getAttribute('data-filter');

        filterButtons.forEach(function (b) {
          b.classList.remove('tag--active');
        });
        button.classList.add('tag--active');

        filterCards.forEach(function (card) {
          var show = filter === 'all' || card.getAttribute('data-category') === filter;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }
})();
