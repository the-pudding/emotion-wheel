export function moveTo(point) {
  return ' M ' + point.x + ' ' + point.y;
}

export function lineTo(point) {
  return ' L ' + point.x + ' ' + point.y;
}

export function arcTo(r, point, largeArcFlag = 0, sweepFlag = 0) {
  return (
    ' A ' +
    r +
    ' ' +
    r +
    ` 0 ${largeArcFlag} ${sweepFlag} ` +
    point.x +
    ' ' +
    point.y
  );
}

export function polarToSvg(polarPoint, centerX, centerY) {
  return cartesianToSvg(polarToCartesian(polarPoint), centerX, centerY);
}

export function cartesianToSvg(point, centerX, centerY) {
  const x = point.x + centerX;
  const y = -point.y + centerY;
  return { x: x, y: y };
}

export function polarToCartesian(polarPoint) {
  const x = polarPoint.r * Math.cos(polarPoint.theta);
  const y = polarPoint.r * Math.sin(polarPoint.theta);
  return { x: x, y: y };
}