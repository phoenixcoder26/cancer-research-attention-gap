(function () {
  "use strict";

  /* ---------------------------------------------------
     Scroll-reveal for cards / sections
  --------------------------------------------------- */
  var revealTargets = document.querySelectorAll(
    ".metric-card, .method-card, .finding-card, .reco-card, .chart-card, .supporting-card, .why-copy, .why-aside, .section-eyebrow, .caution-banner, .formula-card"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            setTimeout(function () { el.classList.add("in-view"); }, (i % 4) * 70);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------------------------------------------------
     Hero cell-network canvas
  --------------------------------------------------- */
  var canvas = document.getElementById("cell-canvas");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DPR = Math.min(window.devicePixelRatio || 1, 2);

  var W = 0, H = 0, cells = [], raf = null;
  var LINK_DIST = 150;

  var PALETTE = [
    { fill: "rgba(20,112,168,", core: "rgba(14,86,128," },   // blue
    { fill: "rgba(31,166,166,", core: "rgba(15,120,120," },  // teal
    { fill: "rgba(31,166,166,", core: "rgba(15,120,120," },  // teal (weighted more common)
    { fill: "rgba(232,99,122,", core: "rgba(190,70,95," }    // rare rose accent
  ];

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function makeCell(w, h) {
    var paletteIndex = Math.random() < 0.14 ? 3 : Math.floor(Math.random() * 3);
    var r = rand(10, 34);
    return {
      x: rand(0, w),
      y: rand(0, h),
      r: r,
      baseR: r,
      vx: rand(-0.12, 0.12),
      vy: rand(-0.09, 0.09),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.4, 0.9),
      palette: PALETTE[paletteIndex],
      alpha: rand(0.35, 0.85)
    };
  }

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    var count = Math.round((W * H) / 26000);
    count = Math.max(18, Math.min(count, 60));
    cells = [];
    for (var i = 0; i < count; i++) cells.push(makeCell(W, H));
  }

  function step(t) {
    ctx.clearRect(0, 0, W, H);

    // connective lines (molecular network)
    ctx.lineWidth = 1;
    for (var i = 0; i < cells.length; i++) {
      for (var j = i + 1; j < cells.length; j++) {
        var a = cells[i], b = cells[j];
        var dx = a.x - b.x, dy = a.y - b.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          var op = (1 - dist / LINK_DIST) * 0.16;
          ctx.strokeStyle = "rgba(20,112,168," + op.toFixed(3) + ")";
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // cells
    for (var k = 0; k < cells.length; k++) {
      var c = cells[k];

      if (!reduceMotion) {
        c.x += c.vx;
        c.y += c.vy;
        c.r = c.baseR + Math.sin(t * 0.001 * c.speed + c.phase) * c.baseR * 0.12;

        if (c.x < -40) c.x = W + 40;
        if (c.x > W + 40) c.x = -40;
        if (c.y < -40) c.y = H + 40;
        if (c.y > H + 40) c.y = -40;
      }

      var grad = ctx.createRadialGradient(c.x - c.r * 0.3, c.y - c.r * 0.3, c.r * 0.1, c.x, c.y, c.r);
      grad.addColorStop(0, "rgba(255,255,255," + (c.alpha * 0.9).toFixed(2) + ")");
      grad.addColorStop(0.45, c.palette.fill + (c.alpha * 0.55).toFixed(2) + ")");
      grad.addColorStop(1, c.palette.fill + "0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fill();

      // nucleus
      ctx.fillStyle = c.palette.core + (c.alpha * 0.5).toFixed(2) + ")";
      ctx.beginPath();
      ctx.arc(c.x, c.y, Math.max(2, c.r * 0.22), 0, Math.PI * 2);
      ctx.fill();
    }

    if (!reduceMotion) raf = requestAnimationFrame(step);
  }

  resize();
  step(0);
  if (reduceMotion) { /* single static frame already drawn */ }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (raf) cancelAnimationFrame(raf);
      resize();
      step(0);
    }, 150);
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      if (raf) cancelAnimationFrame(raf);
    } else if (!reduceMotion) {
      raf = requestAnimationFrame(step);
    }
  });
})();
