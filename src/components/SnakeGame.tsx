import React, { useEffect, useState, useRef } from "react";

const CELL_SIZE = 30;
const SPEED = 100;
const DARK_AREAS = [
  { x: 15, y: 10, radius: 6 },
  { x: 30, y: 18, radius: 5 },
  { x: 22, y: 5, radius: 4 },
];

const getRandomPosition = (snake, width, height) => {
  let newPos;
  do {
    newPos = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
  } while (snake.some(segment => segment.x === newPos.x && segment.y === newPos.y));
  return newPos;
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [snakeColor, setSnakeColor] = useState("#00ffcc");
  const [score, setScore] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dimensions, setDimensions] = useState({
    width: Math.floor(window.innerWidth / CELL_SIZE),
    height: Math.floor(window.innerHeight / CELL_SIZE)
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: Math.floor(window.innerWidth / CELL_SIZE),
        height: Math.floor(window.innerHeight / CELL_SIZE)
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
        const newDirection = {
          ArrowUp: { x: 0, y: -1 },
          ArrowDown: { x: 0, y: 1 },
          ArrowLeft: { x: -1, y: 0 },
          ArrowRight: { x: 1, y: 0 },
          w: { x: 0, y: -1 },
          s: { x: 0, y: 1 },
          a: { x: -1, y: 0 },
          d: { x: 1, y: 0 }
        }[e.key];  // Removed toLowerCase() here
      
        if (newDirection) {
            setDirection(newDirection);
          }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction]);

  useEffect(() => {
    const gameInterval = setInterval(() => {
      setSnake((prev) => {
        const newHead = {
          x: (prev[0].x + direction.x + dimensions.width) % dimensions.width,
          y: (prev[0].y + direction.y + dimensions.height) % dimensions.height,
        };

        const newSnake = [newHead, ...prev];
        
        // Check if snake ate the food
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(getRandomPosition(newSnake, dimensions.width, dimensions.height));
          setScore(s => s + 5);
          return newSnake;
        }
        
        newSnake.pop();

        // Check if snake is in a dark area
        const isInDarkArea = DARK_AREAS.some((area) => {
          const dx = newHead.x - area.x;
          const dy = newHead.y - area.y;
          return Math.sqrt(dx * dx + dy * dy) < area.radius;
        });

        setSnakeColor(isInDarkArea ? "#ffffff" : "#00ffcc"); //"#00ffcc"

        return newSnake;
      });
    }, SPEED);

    return () => clearInterval(gameInterval);
  }, [direction, food, dimensions]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw grid
    ctx.strokeStyle = "#1f2937";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < canvas.width; i += CELL_SIZE) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += CELL_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw dark areas with gradient
    DARK_AREAS.forEach((area) => {
      const gradient = ctx.createRadialGradient(
        area.x * CELL_SIZE, area.y * CELL_SIZE, 0,
        area.x * CELL_SIZE, area.y * CELL_SIZE, area.radius * CELL_SIZE
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.9)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(area.x * CELL_SIZE, area.y * CELL_SIZE, area.radius * CELL_SIZE, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Snake with gradient effect
    snake.forEach(({ x, y }, index) => {
      const alpha = 1 - (index / snake.length) * 0.6;
      ctx.fillStyle = index === 0 ? snakeColor : `${snakeColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
      ctx.shadowBlur = index === 0 ? 15 : 10;
      ctx.shadowColor = snakeColor;
      ctx.beginPath();
      ctx.roundRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1, 5);
      ctx.fill();
    });

    // Draw Food with pulsing effect
    const pulseSize = Math.sin(Date.now() / 200) * 2;
    ctx.fillStyle = "#ff4444";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#ff0000";
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      (CELL_SIZE / 2) + pulseSize,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw Score
    ctx.font = "bold 24px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.shadowBlur = 4;
    ctx.shadowColor = "#000000";
    ctx.fillText(`Score: ${score}`, 20, canvas.height - 40);
  }, [snake, food, snakeColor, score]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
    //   style={{ backgroundColor: "#111827" }}
    />
  );
};

export default SnakeGame;