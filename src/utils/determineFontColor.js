const THRESHOLD = 120;

const determineFontColor = (backgroundColor) => {
	let rgbStr;

	if (backgroundColor.substring(0, 1) === "#") {
		rgbStr = hexToRGB(backgroundColor);
	} else if (backgroundColor.substring(0, 3) === "rgb") {
		rgbStr = backgroundColor;
	}

	const rgb = rgbStr
		.substring(4, rgbStr.length - 1)
		.replace(/ /g, "")
		.split(",");

	const brightness =
		parseInt(rgb[0]) * 0.299 +
		parseInt(rgb[1]) * 0.587 +
		parseInt(rgb[2]) * 0.114;

	if (brightness > THRESHOLD) return "black";
	return "white";
};

const hexToRGB = (h) => {
	let r = 0,
		g = 0,
		b = 0;

	if (h.length == 4) {
		r = "0x" + h[1] + h[1];
		g = "0x" + h[2] + h[2];
		b = "0x" + h[3] + h[3];
	} else if (h.length == 7) {
		r = "0x" + h[1] + h[2];
		g = "0x" + h[3] + h[4];
		b = "0x" + h[5] + h[6];
	}

	return "rgb(" + +r + "," + +g + "," + +b + ")";
};

export default determineFontColor;
