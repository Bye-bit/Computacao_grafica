const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let carX = 0;
let car_facing = 1;
let wheel_angle = 0;
let car_scale = 1;
const keys = {
  a: false,
  d: false,
  w: false,
  s: false,
};

document.addEventListener("keydown", function (event) {
  if (event.key === "a") {
    keys.a = true;
    car_facing = -1;
  }

  if (event.key === "d") {
    keys.d = true;
    car_facing = 1;
  }

  if (event.key === "w") {
    keys.w = true;
  }

  if (event.key === "s") {
    keys.s = true;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key === "a") {
    keys.a = false;
  }

  if (event.key === "d") {
    keys.d = false;
  }

  if (event.key === "w") {
    keys.w = false;
  }
  if (event.key === "s") {
    keys.s = false;
  }
});

function drawSky() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

  gradient.addColorStop(0, "#101a3a");
  gradient.addColorStop(0.45, "#394b87");
  gradient.addColorStop(0.75, "#f06b5f");
  gradient.addColorStop(1, "#ffb35c");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSun() {
  ctx.save();

  ctx.fillStyle = "#FFD166";
  ctx.beginPath();
  ctx.arc(790, 145, 55, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawCloud(x, y, scale) {
  ctx.save();

  ctx.translate(x, y);
  ctx.scale(scale, scale);

  ctx.fillStyle = "rgba(255, 255, 255, 0.18)";

  ctx.beginPath();
  ctx.arc(0, 20, 30, 0, Math.PI * 2);
  ctx.arc(35, 5, 40, 0, Math.PI * 2);
  ctx.arc(75, 20, 30, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawMountain() {
  ctx.fillStyle = "#20294d";

  ctx.beginPath();
  ctx.moveTo(0, 350);
  ctx.lineTo(120, 245);
  ctx.lineTo(210, 335);
  ctx.lineTo(330, 210);
  ctx.lineTo(450, 350);
  ctx.lineTo(570, 230);
  ctx.lineTo(690, 350);
  ctx.lineTo(820, 205);
  ctx.lineTo(1000, 340);
  ctx.lineTo(1000, 450);
  ctx.lineTo(0, 450);
  ctx.closePath();
  ctx.fill();
}

function drawCity() {
  const buildings = [
    [20, 300, 55, 150],
    [90, 270, 65, 180],
    [170, 315, 45, 135],
    [225, 250, 75, 200],
    [315, 290, 55, 160],
    [385, 235, 80, 215],
    [480, 300, 60, 150],
    [555, 265, 70, 185],
    [640, 305, 50, 145],
    [705, 250, 75, 200],
    [800, 285, 55, 165],
    [870, 235, 90, 215],
  ];

  for (const [x, y, width, height] of buildings) {
    ctx.fillStyle = "#171b31";
    ctx.fillRect(x, y, width, height);

    ctx.fillStyle = "#FFD166";

    for (let windowY = y + 15; windowY < y + height - 10; windowY += 25) {
      for (let windowX = x + 10; windowX < x + width - 8; windowX += 20) {
        ctx.fillRect(windowX, windowY, 7, 9);
      }
    }
  }
}

function drawGround() {
  ctx.fillStyle = "#16251d";
  ctx.fillRect(0, 400, canvas.width, 50);

  const road = ctx.createLinearGradient(0, 450, 0, 600);

  road.addColorStop(0, "#30333a");
  road.addColorStop(1, "#121419");

  ctx.fillStyle = road;
  ctx.fillRect(0, 450, canvas.width, 150);

  ctx.fillStyle = "#FFD166";

  for (let x = 0; x < canvas.width; x += 130) {
    ctx.fillRect(x, 525, 75, 7);
  }
}

function drawWheel(x, y, radius) {
  ctx.save();

  ctx.translate(x, y);
  ctx.rotate(wheel_angle);

  ctx.fillStyle = "#101114";
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#777";
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.65, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#222";
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.48, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#aaa";
  ctx.lineWidth = 4;

  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(
      Math.cos(angle) * radius * 0.43,
      Math.sin(angle) * radius * 0.43,
    );
    ctx.stroke();
  }

  ctx.fillStyle = "#555";
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.16, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawCar() {
  ctx.save();

  ctx.translate(100 + carX, 0);
  ctx.translate(500, 455);
  ctx.scale(car_scale * car_facing, car_scale);
  ctx.translate(-500, -455);

  ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
  ctx.beginPath();
  ctx.ellipse(500, 485, 220, 25, 0, 0, Math.PI * 2);
  ctx.fill();

  const bodyGradient = ctx.createLinearGradient(300, 350, 700, 440);

  bodyGradient.addColorStop(0, "#8b0000");
  bodyGradient.addColorStop(0.45, "#e53935");
  bodyGradient.addColorStop(1, "#7f0000");

  ctx.fillStyle = bodyGradient;

  ctx.beginPath();
  ctx.moveTo(285, 430);
  ctx.lineTo(300, 375);
  ctx.lineTo(350, 365);
  ctx.lineTo(410, 305);
  ctx.lineTo(540, 305);
  ctx.lineTo(610, 365);
  ctx.lineTo(680, 375);
  ctx.lineTo(715, 430);
  ctx.lineTo(700, 455);
  ctx.lineTo(295, 455);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#a91515";

  ctx.beginPath();
  ctx.moveTo(350, 365);
  ctx.lineTo(410, 305);
  ctx.lineTo(540, 305);
  ctx.lineTo(610, 365);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#162b45";

  ctx.beginPath();
  ctx.moveTo(365, 357);
  ctx.lineTo(415, 318);
  ctx.lineTo(470, 318);
  ctx.lineTo(470, 357);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(480, 318);
  ctx.lineTo(535, 318);
  ctx.lineTo(590, 357);
  ctx.lineTo(480, 357);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#111";
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.moveTo(475, 315);
  ctx.lineTo(475, 360);
  ctx.stroke();

  ctx.fillStyle = "#9d1818";
  ctx.fillRect(320, 385, 365, 55);

  ctx.strokeStyle = "#ff6b6b";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(320, 400);
  ctx.lineTo(680, 400);
  ctx.stroke();

  ctx.strokeStyle = "#641010";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(475, 365);
  ctx.lineTo(475, 440);
  ctx.stroke();

  ctx.fillStyle = "#ddd";
  ctx.fillRect(495, 380, 25, 5);

  ctx.fillStyle = "#FFF3B0";
  ctx.fillRect(675, 390, 28, 18);
  ctx.fillRect(680, 414, 20, 12);

  ctx.fillStyle = "#202020";
  ctx.fillRect(680, 430, 45, 18);

  drawWheel(375, 445, 42);
  drawWheel(625, 445, 42);

  ctx.restore();
}

function buildScene() {
  drawSky();
  drawSun();
  drawCloud(100, 100, 1);
  drawCloud(600, 150, 0.7);
  drawMountain();
  drawCity();
  drawGround();
  drawCar();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (keys.d) {
    carX += 5.5;
    wheel_angle += 0.3;
  }

  if (keys.a) {
    carX -= 5.5;
    wheel_angle -= 0.3;
  }

  if (keys.w) {
    car_scale -= 0.01;
  }

  if (keys.s) {
    car_scale += 0.01;
  }

  buildScene();
  requestAnimationFrame(animate);
}

animate();
