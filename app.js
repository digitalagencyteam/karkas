// Barre de progression, apparition des blocs au scroll, point actif de la navigation.
(function () {
  var progress = document.querySelector('.progress');
  function onScroll() {
    var h = document.documentElement;
    var p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
    progress.style.width = (p * 100).toFixed(2) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.rv').forEach(function (el) {
    if (reduce) el.classList.add('in');
    else io.observe(el);
  });

  var links = Array.prototype.slice.call(document.querySelectorAll('.dots a, .dots-m a'));
  var map = {};
  links.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    (map[id] = map[id] || []).push(a);
  });
  var so = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) { a.classList.remove('on'); });
      var active = map[e.target.id];
      if (active) active.forEach(function (a) {
        a.classList.add('on');
        if (a.closest('.dots-m')) a.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('section[id]').forEach(function (s) { so.observe(s); });
})();
