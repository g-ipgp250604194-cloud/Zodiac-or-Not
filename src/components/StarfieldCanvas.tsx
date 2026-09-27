import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  alphaSpeed: number;
  color: string;
}

export const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const starCount = Math.min(Math.floor((width * height) / 3500), 220);
    const starColors = ['#ffffff', '#e0f2fe', '#fef3c7', '#bae6fd', '#fed7aa'];
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.8 + 0.2,
      alphaSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    let eclipticOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space gradient
      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, '#040714');
      bgGradient.addColorStop(0.5, '#070c1e');
      bgGradient.addColorStop(1, '#02040b');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Faint cosmic nebula cloud
      const nebulaGrad = ctx.createRadialGradient(
        width * 0.35,
        height * 0.4,
        20,
        width * 0.35,
        height * 0.4,
        width * 0.6
      );
      nebulaGrad.addColorStop(0, 'rgba(30, 58, 138, 0.16)');
      nebulaGrad.addColorStop(0.5, 'rgba(15, 23, 42, 0.08)');
      nebulaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle Ecliptic line across canvas (celestial wave)
      eclipticOffset += 0.0005;
      ctx.save();
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.16)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 12]);
      ctx.beginPath();
      const waveAmplitude = height * 0.15;
      const waveCenter = height * 0.5;
      for (let x = 0; x <= width; x += 20) {
        const y = waveCenter + Math.sin((x / width) * Math.PI * 1.5 + eclipticOffset) * waveAmplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // Draw & twinkle stars
      stars.forEach((star) => {
        star.alpha += star.alphaSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.2) {
          star.alphaSpeed = -star.alphaSpeed;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.shadowColor = star.color;
        ctx.shadowBlur = star.radius * 3;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
