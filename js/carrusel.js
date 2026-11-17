/* Carrusel GBX: muestra 3 fotos a la vez y avanza de una en una. */
(function () {
  document.querySelectorAll('.carrusel').forEach(function (root) {
    var items = Array.prototype.slice.call(root.querySelectorAll('.carrusel-item'));
    var puntos = Array.prototype.slice.call(root.querySelectorAll('.carrusel-punto'));
    var contador = root.querySelector('.carrusel-contador');
    var n = items.length, i = 0;
    function visibles() { return window.matchMedia('(max-width: 768px)').matches ? 1 : 3; }
    function pad(x) { return (x < 10 ? '0' : '') + x; }
    function render() {
      var v = Math.min(visibles(), n), orden = [];
      for (var k = 0; k < v; k++) orden.push((i + k) % n);
      items.forEach(function (el, idx) {
        var pos = orden.indexOf(idx);
        el.hidden = pos === -1;
        el.style.order = pos === -1 ? '' : pos;
      });
      puntos.forEach(function (p, idx) { p.setAttribute('aria-current', idx === i ? 'true' : 'false'); });
      if (contador) contador.textContent = pad(i + 1) + (v > 1 ? '–' + pad(((i + v - 1) % n) + 1) : '') + ' / ' + pad(n);
    }
    root.querySelector('.carrusel-prev').addEventListener('click', function () { i = (i - 1 + n) % n; render(); });
    root.querySelector('.carrusel-next').addEventListener('click', function () { i = (i + 1) % n; render(); });
    puntos.forEach(function (p) { p.addEventListener('click', function () { i = +p.getAttribute('data-i'); render(); }); });
    window.addEventListener('resize', render);
    render();
  });
})();
