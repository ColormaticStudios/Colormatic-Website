<script lang="ts">
  import { canvasDpiScaler } from "$lib/utils/canvas-dpi-scaler";
  import { onMount } from "svelte";

  let canvas = $state() as HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  let { darkTheme = $bindable() } = $props();
  let timeScale = 1;
  let animated = false;
  let reducedMotion = false;
  let shouldAnimate = false;
  let frameInterval = 1000 / 30;
  let lastFrameTime = 0;
  let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
  let animationFrameId: number | null = null;
  let shapePaths: {
    circle: Path2D | null;
    square: Path2D | null;
    triangle: Path2D | null;
    star: Path2D | null;
    waveyCircle: Path2D | null;
  } = {
    circle: null,
    square: null,
    triangle: null,
    star: null,
    waveyCircle: null,
  };

  $effect(() => {
    darkTheme; // Let Svelte know that this needs to update for darkTheme

    for (let i = 0; i < particles.length; i++) {
      // This recolors each particle so their new color will be correct
      let particle = particles[i];
      particle.color = getRandomColor();
    }

    for (let i = 0; i < gradients.length; i++) {
      // This recolors each gradient so their new color will be correct
      let gradient = gradients[i];
      gradient.color = getRandomColor();
      gradient.prepareBuffer();
    }

    // Don't try to render if ctx hasn't initialized yet
    if (!animated && ctx) {
      render(false);
    }
  });

  let particles: Particle[] = [];
  let gradients: Gradient[] = [];

  onMount(() => {
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const startAnimationLoop = () => {
      if (animationFrameId === null) {
        lastFrameTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const stopAnimationLoop = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const updateAnimationState = () => {
      shouldAnimate = animated && !document.hidden && !reducedMotion;
      if (shouldAnimate) {
        startAnimationLoop();
      } else {
        stopAnimationLoop();
      }
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      updateAnimationState();
    };

    // Compatibility: older Safari/iOS only supports addListener/removeListener on MediaQueryList.
    const compatMediaQuery = mediaQuery as MediaQueryList & {
      addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
      removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
    };

    const addReducedMotionListener = () => {
      if (typeof compatMediaQuery.addEventListener === "function") {
        compatMediaQuery.addEventListener("change", handleReducedMotionChange);
        return;
      }
      compatMediaQuery.addListener?.(handleReducedMotionChange);
    };

    const removeReducedMotionListener = () => {
      if (typeof compatMediaQuery.removeEventListener === "function") {
        compatMediaQuery.removeEventListener(
          "change",
          handleReducedMotionChange,
        );
        return;
      }
      compatMediaQuery.removeListener?.(handleReducedMotionChange);
    };

    const handleVisibilityChange = () => {
      updateAnimationState();
    };

    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      resizeTimeout = setTimeout(() => {
        resize();
        resizeTimeout = null;
      }, 100);
    };

    reducedMotion = mediaQuery.matches;
    updateAnimationState();
    initShapePaths();

    resize();
    init();
    render(false);
    updateAnimationState();

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    addReducedMotionListener();

    return () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      removeReducedMotionListener();
      stopAnimationLoop();
    };
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
    color: string;
    constructor() {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.speedX = Math.random() / 5 - 0.1; // -0.25 to 0.25
      this.speedY = Math.random() / 5 - 0.1;
      this.growthSpeed = Math.random() * 0.02 + 0.01; // 0.01 to 0.03
      this.color = getRandomColor();
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
    draw(angle: number, color: string) {}
  }

  class Circle extends Shape {
    draw(angle: number, color: string) {
      ctx.fillStyle = color;
      if (shapePaths.circle) {
        ctx.fill(shapePaths.circle);
        return;
      }

      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }

  class Square extends Shape {
    draw(angle: number, color: string) {
      ctx.rotate((angle * Math.PI) / 180);
      ctx.fillStyle = color;
      if (shapePaths.square) {
        ctx.fill(shapePaths.square);
        return;
      }

      ctx.fillRect(-5, -5, 10, 10);
    }
  }

  class Triangle extends Shape {
    draw(angle: number, color: string) {
      ctx.rotate((angle * Math.PI) / 180);
      ctx.fillStyle = color;
      if (shapePaths.triangle) {
        ctx.fill(shapePaths.triangle);
        return;
      }

      ctx.beginPath();
      ctx.moveTo(0, -5);
      ctx.lineTo(4.3301270189, 2.5);
      ctx.lineTo(-4.3301270189, 2.5);
      ctx.closePath();
      ctx.fill();
    }
  }

  class Star extends Shape {
    draw(angle: number, color: string) {
      ctx.rotate((angle * Math.PI) / 180);
      ctx.fillStyle = color;
      if (shapePaths.star) {
        ctx.fill(shapePaths.star);
        return;
      }

      ctx.beginPath();
      drawStarPath(ctx);
      ctx.fill();
    }
  }

  class WaveyCircle extends Shape {
    draw(angle: number, color: string) {
      ctx.rotate((angle * Math.PI) / 180);
      ctx.fillStyle = color;
      if (shapePaths.waveyCircle) {
        ctx.fill(shapePaths.waveyCircle);
        return;
      }

      ctx.beginPath();
      drawWaveyCirclePath(ctx);
      ctx.fill();
    }
  }

  function drawStarPath(pathTarget: CanvasRenderingContext2D | Path2D) {
    const outerRadius = 5;
    const innerRadius = 2.2;
    const points = 4;

    for (let i = 0; i < points * 2; i++) {
      const currentRadius = i % 2 === 0 ? outerRadius : innerRadius;
      const theta = -Math.PI / 2 + (Math.PI * i) / points;
      const x = Math.cos(theta) * currentRadius;
      const y = Math.sin(theta) * currentRadius;

      if (i === 0) pathTarget.moveTo(x, y);
      else pathTarget.lineTo(x, y);
    }

    pathTarget.closePath();
  }

  function drawWaveyCirclePath(pathTarget: CanvasRenderingContext2D | Path2D) {
    const segments = 32;
    const baseRadius = 4.6;
    const waveAmplitude = 0.8;
    const waves = 8;

    for (let i = 0; i <= segments; i++) {
      const theta = (Math.PI * 2 * i) / segments;
      const radius = baseRadius + Math.sin(theta * waves) * waveAmplitude;
      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * radius;

      if (i === 0) pathTarget.moveTo(x, y);
      else pathTarget.lineTo(x, y);
    }

    pathTarget.closePath();
  }

  function initShapePaths() {
    if (typeof Path2D === "undefined") {
      return;
    }

    const circle = new Path2D();
    circle.arc(0, 0, 5, 0, Math.PI * 2);
    circle.closePath();

    const square = new Path2D();
    square.rect(-5, -5, 10, 10);
    square.closePath();

    const triangle = new Path2D();
    triangle.moveTo(0, -5);
    triangle.lineTo(4.3301270189, 2.5);
    triangle.lineTo(-4.3301270189, 2.5);
    triangle.closePath();

    const star = new Path2D();
    drawStarPath(star);

    const waveyCircle = new Path2D();
    drawWaveyCirclePath(waveyCircle);

    shapePaths = { circle, square, triangle, star, waveyCircle };
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
      this.rotationSpeed = (Math.random() - 0.5) * 2; // -1 to 1
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
      ctx.translate(this.x, this.y);
      ctx.scale(this.size / 10, this.size / 10);
      ctx.globalAlpha = 0.5;
      this.shape.draw(this.angle, this.color);
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
    alpha: number;
    renderingBuffer: OffscreenCanvas;
    constructor() {
      super();
      this.radius = Math.random() * 500 + 300;
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

  function animate(now: number) {
    if (shouldAnimate) {
      const deltaMs = now - lastFrameTime;
      if (deltaMs >= frameInterval) {
        timeScale = Math.min(deltaMs / (1000 / 60), 3);
        render(true);
        lastFrameTime = now;
      }

      animationFrameId = requestAnimationFrame(animate);
    } else {
      animationFrameId = null;
    }
  }
</script>

<canvas bind:this={canvas} class="bg-canvas"></canvas>

<style lang="scss">
  canvas.bg-canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;

    @media print {
      display: none;
    }
  }
</style>
