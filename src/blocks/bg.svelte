<script lang="ts">
  import { canvasDpiScaler } from "../script/canvas_dpi_scaler.ts";
  import { onMount } from "svelte";

  let canvas = $state() as HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  let { darkTheme = $bindable() } = $props();
  let timeScale = 1;
  let animated = false;

  $effect(() => {
    for (let i = 0; i < gradients.length; i++) {
      // This recolors each gradient so their new color will be correct
      let gradient = gradients[i];
      gradient.color = getRandomColor();
      gradient.prepareBuffer();
    }

    if (!animated && ctx) {
      // Don't try to render if ctx hasn't initialized yet
      render(false);
    }
  });

  let particleImages: { [key: string]: HTMLImageElement } = {};

  async function loadImg(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  let particles: Particle[] = [];
  let gradients: Gradient[] = [];

  onMount(async () => {
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    let imagePromises = {
      circle: loadImg("/img/bg-shapes/circle.svg"),
      square: loadImg("/img/bg-shapes/square.svg"),
      triangle: loadImg("/img/bg-shapes/triangle.svg"),
      star: loadImg("/img/bg-shapes/star.svg"),
      wavyCircle: loadImg("/img/bg-shapes/wavy-circle.svg"),
    };

    particleImages = await Promise.all(Object.values(imagePromises))
      .then((imgs) => {
        return {
          circle: imgs[0],
          square: imgs[1],
          triangle: imgs[2],
          star: imgs[3],
          wavyCircle: imgs[4],
        };
      })
      .catch((error) => {
        console.error("Error loading images:", error);
        return {};
      });

    Promise.all(Object.values(imagePromises)).then(() => {
      render(false);
    });

    resize();
    init();
    render(false);
    animate();

    window.addEventListener("resize", resize);
  });

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvasDpiScaler(canvas, ctx);

    if (!animated) {
      render(false);
    }
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
      this.speedX = Math.random() - 0.5; // -0.5 to 0.5
      this.speedY = Math.random() - 0.5;
      this.growthSpeed = Math.random() * 0.02 + 0.01; // 0.01 to 0.03
    }

    update() {
      this.x += this.speedX * timeScale;
      this.y += this.speedY * timeScale;

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
      let image = particleImages.circle;
      ctx.drawImage(image, -image.width / 2, -image.height / 2);
    }
  }

  class Square extends Shape {
    draw(angle: number, size: number) {
      ctx.rotate((angle * Math.PI) / 180);

      let image = particleImages.square;
      ctx.drawImage(image, -image.width / 2, -image.height / 2);
    }
  }

  class Triangle extends Shape {
    draw(angle: number, size: number) {
      ctx.rotate((angle * Math.PI) / 180);

      let image = particleImages.triangle;
      ctx.drawImage(image, -image.width / 2, -image.height / 2);
    }
  }

  class Star extends Shape {
    draw(angle: number, size: number) {
      ctx.rotate((angle * Math.PI) / 180);

      let image = particleImages.star;
      ctx.drawImage(image, -image.width / 2, -image.height / 2);
    }
  }

  class WaveyCircle extends Shape {
    draw(angle: number, size: number) {
      ctx.rotate((angle * Math.PI) / 180);

      let image = particleImages.wavyCircle;
      ctx.drawImage(image, -image.width / 2, -image.height / 2);
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
      this.rotationSpeed = (Math.random() - 0.5) * 4; // -2 to 2
      this.originalSize = Math.random() * 8 + 8; // 8 to 16
      this.size = this.originalSize;
    }

    update() {
      super.update();
      this.angle += this.rotationSpeed * timeScale;

      // Breathing effect: oscillate size
      this.size += this.growthSpeed * timeScale;
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
      ctx.filter = darkTheme ? "invert(0.1)" : "invert(0.9)";

      // Draw center of rotation
      // ctx.beginPath();
      // ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
      // ctx.fill();

      ctx.translate(this.x, this.y);
      ctx.scale(this.size / 10, this.size / 10);
      this.shape.draw(this.angle, this.size);
      ctx.restore();
    }
  }

  function getRandomColor() {
    if (darkTheme) {
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
    radius: number;
    color: string;
    alpha: number;
    renderingBuffer: OffscreenCanvas;
    constructor() {
      super();
      this.radius = Math.random() * 500 + 300;
      this.color = getRandomColor();
      this.alpha = Math.random() * 0.5 + 0.5; // Initial alpha between 0.5 and 1
      this.renderingBuffer = new OffscreenCanvas(
        this.radius * 2,
        this.radius * 2,
      );

      // One-shot buffer adjustment
      this.renderingBuffer.width = this.radius * 2;
      this.renderingBuffer.height = this.radius * 2;
      // canvasDpiScaler(
      //   this.renderingBuffer,
      //   this.renderingBuffer.getContext("2d") as CanvasRenderingContext2D,
      // );
      this.prepareBuffer();
    }

    prepareBuffer() {
      let bctx = this.renderingBuffer.getContext(
        "2d",
      ) as OffscreenCanvasRenderingContext2D;

      bctx.clearRect(
        0,
        0,
        this.renderingBuffer.width,
        this.renderingBuffer.height,
      );

      const gradient = ctx.createRadialGradient(
        this.radius,
        this.radius,
        0,
        this.radius,
        this.radius,
        this.radius,
      );
      gradient.addColorStop(0, this.color);
      if (darkTheme) {
        gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
      } else {
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      }
      bctx.globalAlpha = this.alpha;
      bctx.fillStyle = gradient;
      bctx.beginPath();
      bctx.arc(this.radius, this.radius, this.radius, 0, Math.PI * 2);
      bctx.closePath();
      bctx.fill();
    }

    draw() {
      ctx.save();
      ctx.translate(this.x - this.radius, this.y - this.radius);
      ctx.drawImage(this.renderingBuffer, 0, 0);
      ctx.restore();
    }
  }

  function init() {
    let particleCount: number =
      window.innerWidth <= 1024 // 64 * 16 (64rem)
        ? 25
        : 40;

    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    gradients = [];
    for (let i = 0; i < 10; i++) {
      gradients.push(new Gradient());
    }
  }

  function render(update: boolean) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i_gradient = 0; i_gradient < gradients.length; i_gradient++) {
      let gradient = gradients[i_gradient];
      if (update) gradient.update();
      gradient.draw();
    }

    for (let i_particle = 0; i_particle < particles.length; i_particle++) {
      let particle = particles[i_particle];
      if (update) particle.update();
      particle.draw();
    }
  }

  function animate() {
    if (animated) {
      render(true);
    }

    requestAnimationFrame(animate);
  }
</script>

<canvas bind:this={canvas} class="bg-canvas"></canvas>

<style>
  canvas.bg-canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }
</style>
