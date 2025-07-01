// FallingStars.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';

interface FallingStarsProps {
  height?: number; // SVG height
  starCount?: number; // Number of stars
  colors?: string[]; // Star colors
  shapes?: string[]; // Star shape IDs
  minDuration?: number; // Min animation duration (seconds)
  maxDuration?: number; // Max animation duration (seconds)
  maxDelay?: number; // Max animation delay (seconds)
  viewBoxWidth?: number; // ViewBox width for scaling
  children: React.ReactNode
}

const FallingStars: React.FC<FallingStarsProps> = ({
  height = 141,
  starCount = 80,
  colors = ['white', '#659549', '#2BBD34', '#34A853'],
  shapes = ['star1', 'star2', 'star3', 'star4', 'star5'],
  minDuration = 2.5,
  maxDuration = 4.5,
  maxDelay = 0.5,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewBoxWidth, setViewBoxWidth] = useState(1030); // Initial fallback width

  // Update viewBoxWidth based on container width
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => {
      const width = container.getBoundingClientRect().width;
      setViewBoxWidth(width || 834); // Fallback to 834 if width is 0
    };

    // Initial width
    updateWidth();

    // Resize observer for dynamic updates
    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  // Generate stars with random positions, shapes, colors, and animation params
  const stars = useMemo(() => {
    const result = [];
    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * (viewBoxWidth - 20) + 10; // Random x from 10 to viewBoxWidth-10
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const duration = minDuration + Math.random() * (maxDuration - minDuration);
      const delay = Math.random() * maxDelay;
      const blinkDuration = 0.5 + Math.random() * 1; // 0.5s to 1.5s for blink
      result.push({ x, shape, color, duration, delay, blinkDuration });
    }
    return result;
  }, [starCount, viewBoxWidth, shapes, colors, minDuration, maxDuration, maxDelay]);

  return (
    <div className="falling-stars-container">
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${viewBoxWidth} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        aria-label="Animated falling stars on a gradient background"
      >
        {/* Mask to constrain content */}
        <mask id="mask0_18108_3682" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width={viewBoxWidth} height={height}>
          <rect width={viewBoxWidth} height={height} fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_18108_3682)">
          {/* Gradient background with shadow */}
          <g filter="url(#filter0_d_18108_3682)">
            <path
              d={`M0 12C0 5.37259 5.37258 0 12 0H${viewBoxWidth - 12}C${viewBoxWidth - 5.37258} 0 ${viewBoxWidth} 5.37258 ${viewBoxWidth} 12V${height - 12}C${viewBoxWidth} ${height - 5.37258} ${viewBoxWidth - 5.37258} ${height} ${viewBoxWidth - 12} ${height}H12C5.37259 ${height} 0 ${height - 5.37258} 0 ${height - 12}V12Z`}
              fill="url(#paint0_linear_18108_3682)"
              shapeRendering="crispEdges"
            />
          </g>
          {/* Stars group */}
          <g opacity="0.8">
            {stars.map((star, index) => (
              <use
                key={index}
                className="star"
                xlinkHref={`#${star.shape}`}
                x={star.x}
                fill={star.color}
                style={{
                  animationDuration: `${star.duration}s`,
                  animationDelay: `${star.delay}s`,
                  // @ts-ignore - CSS custom property
                  '--blink-duration': `${star.blinkDuration}s`,
                }}
              />
            ))}
          </g>
          <foreignObject x="0" y="0" width={viewBoxWidth} height={height}>
            {children}
          </foreignObject>
        </g>
        {/* Definitions: gradient, filter, and star shapes */}
        <defs>
          <filter id="filter0_d_18108_3682" x="0" y="0" width={viewBoxWidth} height={height} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.894118 0 0 0 0 0.164706 0 0 0 0.6 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_18108_3682" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_18108_3682" result="shape" />
          </filter>
          <linearGradient id="paint0_linear_18108_3682" x1={viewBoxWidth / 2} y1={height - 25.5} x2={viewBoxWidth / 2 + 10.402} y2={-13.6955} gradientUnits="userSpaceOnUse">
            <stop stopColor="#00E42A" stopOpacity="0.08" />
            <stop offset="1" stopColor="#00E42A" stopOpacity="0.35" />
          </linearGradient>
          {/* Star shapes */}
          <path id="star1" d="M0 0.756V1.527L-0.388 1.912H0.388L0.775 2.297V1.912L1.551 1.527L0.775 1.141V0.756L0.388 1.141L0 0.756Z" />
          <path id="star2" d="M0 0.357L-0.388 -0.0281L0 0.5868H-0.388L-0.776 -0.7984V0.5868L-1.551 -0.0281H-0.776V0.7422L-0.388 0.357H0Z" />
          <path id="star3" d="M0 0.135L0.775 -1.0204H1.938L1.163 -1.7759L1.551 -2.9313L0 -2.5461L-1.164 -3.3164V-1.7759L-1.939 -1.0204L-0.776 -0.6352L0 0.135Z" />
          <path id="star4" d="M0 -0.9263L1.164 -0.5412L1.551 0.6142L2.327 -0.1561H3.49L3.102 -1.3115L3.49 -2.4669L2.327 -2.0818L1.164 -3.2372V-1.6966L0 -0.9263Z" />
          <path id="star5" d="M0 0.77V1.926L-1.163 2.696L0 3.081L0.388 4.236L1.163 3.466H2.326L1.938 2.311L2.326 1.155L1.163 1.54L0 0.77Z" />
        </defs>
      </svg>
    </div>
  );
};

export default FallingStars;