/*/
 * Wrapping this entire program into a function isn't ideal,
 * but it's the only way I can figure out how to start this
 * when the page finishes loading. (svelte onMount function)
/*/
export function createBackground() {
	var canvas = document.createElement("canvas") as HTMLCanvasElement;
	var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
	canvas.classList.add("bg-canvas");
	document.body.appendChild(canvas);

	function resize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	var dark_theme = false;

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

	let particlesArray: Array<Particle> = [];

	const clamp = (val: number, min: number, max: number) =>
		Math.min(Math.max(val, min), max);

	class Entity {
		x: number;
		y: number;
		size: number;
		originalSize: number;
		speedX: number;
		speedY: number;
		growthSpeed: number;
		constructor() {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;
			this.size = (Math.random() * 5 + 1) * 1.5;
			this.originalSize = this.size;
			this.speedX = (Math.random() - 0.5) * 0.2;
			this.speedY = (Math.random() - 0.5) * 0.2;
			this.growthSpeed = Math.random() * 0.02 + 0.01;
		}

		update() {
			this.x += this.speedX;
			this.y += this.speedY;

			// Reverse direction if particle hits edge
			if (this.x <= 0 || this.x >= canvas.width) {
				this.speedX = -this.speedX;
			}
			this.x = clamp(0, this.x, canvas.width);
			if (this.y <= 0 || this.y >= canvas.height) {
				this.speedY = -this.speedY;
			}
			this.y = clamp(0, this.y, canvas.height);

			// Breathing effect: oscillate size
			this.size += this.growthSpeed;
			if (
				this.size >= this.originalSize * 1.5 ||
				this.size <= this.originalSize * 0.5
			) {
				this.growthSpeed = -this.growthSpeed; // Reverse growth direction
			}
		}
	}

	function roundRect(
		x: number,
		y: number,
		width: number,
		height: number,
		radius: number,
	) {
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(
			x + width,
			y + height,
			x + width - radius,
			y + height,
		);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
	}

	function roundTriangle(size: number, radius: number) {
		const x1 = 0,
			y1 = 0;
		const x2 = size,
			y2 = 0;
		const x3 = size / 2,
			y3 = size / 1.375;
		const midX1 = (x1 + x2) / 2;
		const midY1 = (y1 + y2) / 2;
		const midX2 = (x2 + x3) / 2;
		const midY2 = (y2 + y3) / 2;
		const midX3 = (x3 + x1) / 2;
		const midY3 = (y3 + y1) / 2;
		ctx.arcTo(x2, y2, midX2, midY2, radius);
		ctx.arcTo(x3, y3, midX3, midY3, radius);
		ctx.arcTo(x1, y1, midX1, midY1, radius);
	}

	class Shape {
		draw(angle: number, size: number) {
			return;
		}
	}

	class Circle extends Shape {
		draw(angle: number, size: number) {
			ctx.beginPath();
			ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
			ctx.closePath();
		}
	}

	class Square extends Shape {
		draw(angle: number, size: number) {
			ctx.rotate((angle * Math.PI) / 180);
			ctx.beginPath();
			roundRect(-size / 2, -size / 2, size, size, size / 5);
			ctx.closePath();
		}
	}

	class Triangle extends Shape {
		draw(angle: number, size: number) {
			ctx.rotate((angle * Math.PI) / 180);
			ctx.beginPath();
			roundTriangle(size * 2, size / 5);
			ctx.closePath();
		}
	}

	class Particle extends Entity {
		shape: Shape;
		angle: number;
		rotationSpeed: number;
		constructor() {
			super();
			this.shape = new [Circle, Square, Triangle][
				Math.floor(Math.random() * 3)
			](); // A very strange but effective way to pick a random shape
			this.angle = Math.random() * 360;
			this.rotationSpeed = Math.random() * 2 - 1;
		}

		update() {
			super.update();
			this.angle += this.rotationSpeed;
		}

		draw() {
			ctx.fillStyle = dark_theme ? "#333" : "#bbb";
			ctx.save();
			ctx.translate(this.x, this.y);
			this.shape.draw(this.angle, this.size);
			ctx.fill();
			ctx.restore();
		}
	}

	function getRandomColor() {
		if (dark_theme) {
			const r = Math.floor(Math.random() * 255 - 100);
			const b = Math.floor(Math.random() * 255 - 100);
			const g = Math.floor(Math.random() * 255 - 100);
			return `rgb(${r}, ${g}, ${b})`;
		} else {
			const r = Math.floor(Math.random() * 100 + 155);
			const g = Math.floor(Math.random() * 100 + 155);
			const b = Math.floor(Math.random() * 100 + 155);
			return `rgb(${r}, ${g}, ${b})`;
		}
	}

	class Gradient extends Entity {
		radius: number;
		color: string;
		alpha: number;
		dAlpha: number;
		constructor() {
			super();
			this.radius = Math.random() * 500 + 300;
			this.color = getRandomColor();
			this.alpha = Math.random() * 0.5 + 0.5; // Initial alpha between 0.5 and 1
			this.dAlpha = (Math.random() - 0.5) * 0.01;
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

			ctx.globalAlpha = this.alpha;
			ctx.fillStyle = gradient;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
			ctx.globalAlpha = 1.0;
		}
	}

	let gradientsArray: Array<Gradient> = [];

	function init() {
		particlesArray = [];
		for (let i = 0; i < 100; i++) {
			particlesArray.push(new Particle());
		}
		gradientsArray = [];
		for (let i = 0; i < 10; i++) {
			gradientsArray.push(new Gradient());
		}
	}

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		gradientsArray.forEach((gradient) => {
			gradient.update();
			gradient.draw();
		});

		particlesArray.forEach((particle) => {
			particle.update();
			particle.draw();
		});

		requestAnimationFrame(animate);
	}

	resize();
	init();
	animate();

	window.addEventListener("resize", resize);
}
