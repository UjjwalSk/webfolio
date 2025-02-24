import { useEffect, useState } from 'react';

const generateBlobPath = () => {
  const numPoints = 15;
  const points = [];
  const radius = 25;
  const center = 32;

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    const variance = Math.random() * 10 - 5;
    const x = Math.cos(angle) * (radius + variance) + center;
    const y = Math.sin(angle) * (radius + variance) + center;
    points.push([x, y]);
  }

  let path = `M ${points[0][0]},${points[0][1]}`;

  for (let i = 0; i < points.length; i++) {
    const p0 = points[(i - 1 + points.length) % points.length];
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];
    const p3 = points[(i + 2) % points.length];

    const cp1x = p1[0] + (p2[0] - p0[0]) * 0.2;
    const cp1y = p1[1] + (p2[1] - p0[1]) * 0.2;
    const cp2x = p2[0] - (p3[0] - p1[0]) * 0.2;
    const cp2y = p2[1] - (p3[1] - p1[1]) * 0.2;

    path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`;
  }

  path += " Z";
  return path;
};

const DynamicFavicon = () => {
  const [currentPath, setCurrentPath] = useState(generateBlobPath());
  const [nextPath, setNextPath] = useState(generateBlobPath());

  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']") || document.createElement('link');
    favicon.type = 'image/svg+xml';
    favicon.rel = 'icon';
    document.head.appendChild(favicon);

    const updateFavicon = () => {
      const newGradientId = `grad${Date.now()}`;

      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="${newGradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fff" />
              <stop offset="33.33%" stop-color="#fff" />
              <stop offset="100%" stop-color="#000" />
            </linearGradient>
          </defs>
          <path d="${currentPath}" fill="url(#${newGradientId})">
            <animate
              attributeName="d"
              dur="2s"
              repeatCount="1"
              values="${currentPath};${nextPath}"
              fill="freeze"
            />
          </path>
        </svg>
      `;

      favicon.href = `data:image/svg+xml;base64,${btoa(svg)}`;
      setCurrentPath(nextPath);
      setNextPath(generateBlobPath());
    };

    const interval = setInterval(updateFavicon, 2000); // Updates every 1s

    return () => clearInterval(interval);
  }, [currentPath, nextPath]);

  return null;
};

export default DynamicFavicon;
