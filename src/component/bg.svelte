<script lang="ts">
  import { canvasDpiScaler } from "../script/canvas_dpi_scaler.ts";
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  let dark_theme = false;
  let time_scale = 1;

  let particlesArray: Array<Particle> = [];
  let gradientsArray: Array<Gradient> = [];

  let particleImages = {
    // This is horrible code
    circle: {} as HTMLImageElement,
    square: {} as HTMLImageElement,
    triangle: {} as HTMLImageElement,
    star: {} as HTMLImageElement,
    wavyCircle: {} as HTMLImageElement,
  };

  onMount(() => {
    canvas = document.getElementById("bg-canvas") as HTMLCanvasElement;
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    particleImages.circle = new Image() as HTMLImageElement;
    particleImages.circle.src = "/img/bg-shapes/circle.svg";

    particleImages.square = new Image() as HTMLImageElement;
    particleImages.square.src = "/img/bg-shapes/square.svg";

    particleImages.triangle = new Image() as HTMLImageElement;
    particleImages.triangle.src = "/img/bg-shapes/triangle.svg";

    particleImages.star = new Image() as HTMLImageElement;
    particleImages.star.src = "/img/bg-shapes/star.svg";

    particleImages.wavyCircle = new Image() as HTMLImageElement;
    particleImages.wavyCircle.src = "/img/bg-shapes/wavy-circle.svg";

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      dark_theme = true;
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        dark_theme = event.matches;
        gradientsArray.forEach((gradient: Gradient) => {
          gradient.color = getRandomColor();
        });
      });

    resize();
    init();
    animate();

    window.addEventListener("resize", resize);
  });

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvasDpiScaler(canvas, ctx);
  }

  const clamp = (val: number, min: number, max: number) =>
    Math.min(Math.max(val, min), max);

  class Entity {
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    growthSpeed: number;
    constructor() {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.speedX = (Math.random() - 0.5) * 0.2; // -0.1 to 0.1
      this.speedY = (Math.random() - 0.5) * 0.2;
      this.growthSpeed = Math.random() * 0.02 + 0.01; // 0.01 to 0.03
    }

    update() {
      this.x += this.speedX * time_scale;
      this.y += this.speedY * time_scale;

      // Reverse direction if particle hits edge
      if (this.x <= 0 || this.x >= window.innerWidth) {
        this.speedX = -this.speedX;
      }
      this.x = clamp(0, this.x, window.innerWidth);
      if (this.y <= 0 || this.y >= window.innerHeight) {
        this.speedY = -this.speedY;
      }
      this.y = clamp(0, this.y, window.innerHeight);
    }
  }

  class Shape {
    // Reference implementation for Shape
    draw(angle: number, size: number) {
      return;
    }
  }

  class Circle extends Shape {
    draw(angle: number, size: number) {
      ctx.drawImage(particleImages.circle, 0, 0);
    }
  }

  class Square extends Shape {
    draw(angle: number, size: number) {
      ctx.rotate((angle * Math.PI) / 180);
      ctx.drawImage(particleImages.square, -size / 2, -size / 2);
    }
  }

  class Triangle extends Shape {
    draw(angle: number, size: number) {
      ctx.rotate((angle * Math.PI) / 180);
      ctx.drawImage(particleImages.triangle, -size / 2, -size / 2);
    }
  }

  class Star extends Shape {
    draw(angle: number, size: number) {
      ctx.rotate((angle * Math.PI) / 180);
      ctx.drawImage(particleImages.star, -size / 2, -size / 2);
    }
  }

  class WaveyCircle extends Shape {
    draw(angle: number, size: number) {
      ctx.rotate((angle * Math.PI) / 180);
      ctx.drawImage(particleImages.wavyCircle, -size / 2, -size / 2);
    }
  }

  class Particle extends Entity {
    shape: Shape;
    angle: number;
    rotationSpeed: number;
    size: number;
    originalSize: number;
    constructor() {
      super();
      this.shape = new [Circle, Square, Triangle, Star, WaveyCircle][
        Math.floor(Math.random() * 5)
      ](); // A very strange but effective way to pick a random shape
      this.angle = Math.random() * 360;
      this.rotationSpeed = Math.random() * 2 - 1; // -1 to 1
      this.originalSize = Math.random() * 8 + 8; // 8 to 16
      this.size = this.originalSize;
    }

    update() {
      super.update();
      this.angle += this.rotationSpeed * time_scale;

      // Breathing effect: oscillate size
      this.size += this.growthSpeed * time_scale;
      if (
        this.size >= this.originalSize * 1.25 ||
        this.size <= this.originalSize * 0.75
      ) {
        this.growthSpeed = -this.growthSpeed; // Reverse growth direction
      }
    }

    draw() {
      ctx.save();
      // The source images are black, so we are inverting them
      // different amounts to get different shades of gray
      ctx.filter = dark_theme ? "invert(0.25)" : "invert(0.75)";
      ctx.translate(this.x, this.y);
      ctx.scale(this.size / 10, this.size / 10);
      this.shape.draw(this.angle, this.size);
      ctx.restore();
    }
  }

  function getRandomColor() {
    if (dark_theme) {
      let r = Math.floor(Math.random() * 255 - 100);
      let b = Math.floor(Math.random() * 255 - 100);
      let g = Math.floor(Math.random() * 255 - 100);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      let r = Math.floor(Math.random() * 100 + 155);
      let g = Math.floor(Math.random() * 100 + 155);
      let b = Math.floor(Math.random() * 100 + 155);
      return `rgb(${r}, ${g}, ${b})`;
    }
  }

  class Gradient extends Entity {
    originalRadius: number;
    radius: number;
    color: string;
    alpha: number;
    dAlpha: number;
    constructor() {
      super();
      this.originalRadius = Math.random() * 500 + 300;
      this.radius = this.originalRadius;
      this.color = getRandomColor();
      this.alpha = Math.random() * 0.5 + 0.5; // Initial alpha between 0.5 and 1
      this.dAlpha = (Math.random() - 0.5) * 0.01;
    }

    update() {
      super.update();

      // Breathing effect: oscillate size
      this.radius += this.growthSpeed * time_scale;
      if (
        this.radius >= this.originalRadius * 1.1 ||
        this.radius <= this.originalRadius * 0.9
      ) {
        this.growthSpeed = -this.growthSpeed; // Reverse growth direction
      }
    }

    draw() {
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.radius,
      );
      gradient.addColorStop(0, this.color);
      if (dark_theme) {
        gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
      } else {
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      }
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  function init() {
    particlesArray = [];
    for (let i = 0; i < 20; i++) {
      particlesArray.push(new Particle());
    }
    gradientsArray = [];
    for (let i = 0; i < 10; i++) {
      gradientsArray.push(new Gradient());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i_gradient = 0; i_gradient < gradientsArray.length; i_gradient++) {
      let gradient = gradientsArray[i_gradient];
      gradient.update();
      gradient.draw();
    }

    for (let i_particle = 0; i_particle < particlesArray.length; i_particle++) {
      let particle = particlesArray[i_particle];
      particle.update();
      particle.draw();
    }

    requestAnimationFrame(animate);
  }
</script>

<canvas id="bg-canvas"></canvas>

<style>
  canvas#bg-canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }
</style>
