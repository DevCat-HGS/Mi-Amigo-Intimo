import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Bubble {
  id: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  emotion: string;
  velocity: { x: number; y: number };
}

const emotions = [
  { name: 'Joy', color: '#FCD34D' },
  { name: 'Calm', color: '#60A5FA' },
  { name: 'Love', color: '#F87171' },
  { name: 'Hope', color: '#34D399' },
  { name: 'Energy', color: '#F472B6' }
];

const BubbleGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [message, setMessage] = useState('');

  const createBubble = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const emotion = emotions[Math.floor(Math.random() * emotions.length)];
    const radius = Math.random() * 20 + 20;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = canvas.height + radius;

    return {
      id: Date.now() + Math.random(),
      x,
      y,
      radius,
      color: emotion.color,
      emotion: emotion.name,
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: -Math.random() * 2 - 1
      }
    };
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setBubbles([]);
    setMessage('');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !gameStarted) return;

    let animationFrameId: number;
    let lastBubbleTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create new bubbles periodically
      if (Date.now() - lastBubbleTime > 1000) {
        const newBubble = createBubble();
        if (newBubble) {
          setBubbles(prev => [...prev, newBubble]);
        }
        lastBubbleTime = Date.now();
      }

      // Update and draw bubbles
      setBubbles(prev => prev.filter(bubble => {
        bubble.x += bubble.velocity.x;
        bubble.y += bubble.velocity.y;

        // Bounce off walls
        if (bubble.x <= bubble.radius || bubble.x >= canvas.width - bubble.radius) {
          bubble.velocity.x *= -1;
        }

        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
        ctx.closePath();

        // Draw emotion text
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(bubble.emotion, bubble.x, bubble.y);

        // Remove bubbles that go off screen
        return bubble.y + bubble.radius > 0;
      }));

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setBubbles(prev => {
      const newBubbles = [...prev];
      for (let i = newBubbles.length - 1; i >= 0; i--) {
        const bubble = newBubbles[i];
        const distance = Math.sqrt(
          Math.pow(x - bubble.x, 2) + Math.pow(y - bubble.y, 2)
        );

        if (distance < bubble.radius) {
          newBubbles.splice(i, 1);
          setScore(prev => prev + 10);
          setMessage(`You're feeling ${bubble.emotion.toLowerCase()}! That's perfectly okay.`);
          break;
        }
      }
      return newBubbles;
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <p className="text-lg font-semibold">Score: {score}</p>
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-purple-600"
          >
            {message}
          </motion.p>
        )}
      </div>
      
      {!gameStarted ? (
        <button
          onClick={startGame}
          className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors mb-4"
        >
          Start Game
        </button>
      ) : (
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          onClick={handleCanvasClick}
          className="border border-gray-200 rounded-lg bg-gray-50"
        />
      )}
      
      <div className="mt-4 text-sm text-gray-600">
        Click the bubbles to express your emotions!
      </div>
    </div>
  );
};

export default BubbleGame;