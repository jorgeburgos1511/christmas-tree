console.log("🎄 truco.js cargado");

// =======================
// CANVAS
// =======================
const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// =======================
// MODE
// =======================
let lightMode = "sparkle";
document.getElementById("lightModeBtn").addEventListener("change", (e) => {
  lightMode = e.target.value;
});

// =======================
// PARTICLES
// =======================
const PARTICLE_COUNT = 1400;
const particles = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    angle: rand(0, Math.PI * 2),
    y: Math.random(),
    size: rand(1, 2.5),
    baseAlpha: rand(0.4, 1),
    alpha: 1,
    speed: rand(0.002, 0.01),
  });
}

// =======================
// DRAW GIFT 🎁
// =======================
function drawGift(x, y, size) {
  // Caja
  ctx.fillStyle = "#c1121f";
  ctx.fillRect(x - size / 2, y - size / 2, size, size);

  // Cinta vertical
  ctx.fillStyle = "#ffd700";
  ctx.fillRect(x - size * 0.08, y - size / 2, size * 0.16, size);

  // Cinta horizontal
  ctx.fillRect(x - size / 2, y - size * 0.08, size, size * 0.16);

  // Moño
  ctx.beginPath();
  ctx.fillStyle = "#ffd700";
  ctx.arc(x - size * 0.2, y - size / 2, size * 0.15, 0, Math.PI * 2);
  ctx.arc(x + size * 0.2, y - size / 2, size * 0.15, 0, Math.PI * 2);
  ctx.fill();
}

// =======================
// RENDER
// =======================
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const top = canvas.height * 0.1;
  const height = canvas.height * 0.65;
  const maxRadius = canvas.height * 0.28;

  // 🌲 Árbol
  particles.forEach((p) => {
    if (lightMode === "off") {
      p.alpha = 0;
    } else if (lightMode === "steady") {
      p.alpha = p.baseAlpha;
    } else {
      p.alpha =
        p.baseAlpha *
        (0.4 + Math.sin(Date.now() * 0.004 + p.angle) * 0.6);
    }

    p.angle += p.speed;

    const r = p.y * maxRadius;
    const x = cx + Math.cos(p.angle) * r;
    const y = top + p.y * height;

    ctx.beginPath();
    ctx.fillStyle = `rgba(180,220,255,${p.alpha})`;
    ctx.arc(x, y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  // ⭐ Estrella
  ctx.beginPath();
  ctx.fillStyle = "rgba(255,255,200,1)";
  ctx.arc(cx, top - 12, 6, 0, Math.PI * 2);
  ctx.fill();

  // 🎁 Regalo
  drawGift(cx, top + height + 35, 40);

  // ❤️ Texto
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255, 180, 200, 0.9)";
  ctx.fillText(
    "Te amo Majin ❤️",
    cx,
    top + height + 90
  );

  requestAnimationFrame(draw);
}

draw();
