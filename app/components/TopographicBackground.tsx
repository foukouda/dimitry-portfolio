'use client';

import { useEffect, useRef } from 'react';

export default function TopographicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawTopographic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(0.5, '#1a2847');
      gradient.addColorStop(1, '#1e293b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Simple wavy topographic lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
      ctx.lineWidth = 1;

      const spacing = 50;
      const amplitude = 30;
      const frequency = 0.005;

      for (let i = 0; i < canvas.height; i += spacing) {
        ctx.beginPath();
        
        for (let x = 0; x <= canvas.width; x += 5) {
          const wave1 = Math.sin(x * frequency + time * 0.0003 + i * 0.01) * amplitude;
          const wave2 = Math.cos(x * frequency * 0.5 - time * 0.0002) * amplitude * 0.3;
          const y = i + wave1 + wave2;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }

      // Add some major contour lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.25)';
      ctx.lineWidth = 1.5;

      for (let i = 0; i < canvas.height; i += spacing * 3) {
        ctx.beginPath();
        
        for (let x = 0; x <= canvas.width; x += 8) {
          const wave1 = Math.sin(x * frequency + time * 0.0003 + i * 0.01) * amplitude * 1.2;
          const wave2 = Math.cos(x * frequency * 0.5 - time * 0.0002) * amplitude * 0.5;
          const y = i + wave1 + wave2;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }

      time++;
      animationFrameId = requestAnimationFrame(drawTopographic);
    };

    drawTopographic();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
}
