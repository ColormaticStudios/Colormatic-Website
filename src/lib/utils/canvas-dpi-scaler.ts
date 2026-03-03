// Credit: https://github.com/cmpolis/canvas-dpi-scaler

// Based on: http://www.html5rocks.com/en/tutorials/canvas/hidpi/

interface ExtendedCanvasRenderingContext2D extends CanvasRenderingContext2D {
	webkitBackingStorePixelRatio?: number;
	mozBackingStorePixelRatio?: number;
	msBackingStorePixelRatio?: number;
	oBackingStorePixelRatio?: number;
	backingStorePixelRatio?: number;
}

export function canvasDpiScaler(
	canvas: HTMLCanvasElement,
	context: ExtendedCanvasRenderingContext2D,
) {
	if (!canvas || !context) {
		throw new Error("Must pass in `canvas` and `context`.");
	}

	var width =
		canvas.width || // attr, eg: <canvas width='400'>
		canvas.clientWidth; // keep existing width
	var height = canvas.height || canvas.clientHeight;
	var deviceRatio = window.devicePixelRatio || 1;
	var bsRatio =
		context.webkitBackingStorePixelRatio ||
		context.mozBackingStorePixelRatio ||
		context.msBackingStorePixelRatio ||
		context.oBackingStorePixelRatio ||
		context.backingStorePixelRatio ||
		1;
	var ratio = deviceRatio / bsRatio;

	// Adjust canvas if ratio =/= 1
	if (deviceRatio !== bsRatio) {
		canvas.width = Math.round(width * ratio);
		canvas.height = Math.round(height * ratio);
		canvas.style.width = width + "px";
		canvas.style.height = height + "px";
		context.scale(ratio, ratio);
	}
	return ratio;
}
