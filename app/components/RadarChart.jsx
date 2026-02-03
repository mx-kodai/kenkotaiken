'use client';

import { motion } from 'framer-motion';

export default function RadarChart({ data }) {
    // data format: { label: string, value: number, fullMark: number }[]
    // Normalize values to 0-1 range
    const normalizedData = data.map(d => d.value / d.fullMark);
    const numPoints = data.length;
    const radius = 100;
    const center = { x: 150, y: 150 };
    const angleStep = (Math.PI * 2) / numPoints;

    // Helper to calculate coordinates
    const getCoordinates = (index, value) => {
        const angle = index * angleStep - Math.PI / 2; // Start from top
        return {
            x: center.x + Math.cos(angle) * (radius * value),
            y: center.y + Math.sin(angle) * (radius * value)
        };
    };

    // Generate polygon points string
    const polygonPoints = normalizedData.map((val, i) => {
        const coords = getCoordinates(i, val);
        return `${coords.x},${coords.y}`;
    }).join(' ');

    // Generate axis lines and background polygons
    const backgroundLevels = [1, 0.75, 0.5, 0.25];

    return (
        <div className="relative w-full max-w-[300px] mx-auto aspect-square">
            <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-xl">
                {/* Background Polygons (Grid) */}
                {backgroundLevels.map((level, i) => {
                    const points = data.map((_, idx) => {
                        const coords = getCoordinates(idx, level);
                        return `${coords.x},${coords.y}`;
                    }).join(' ');
                    return (
                        <polygon
                            key={i}
                            points={points}
                            fill={i % 2 === 0 ? '#f0fdf4' : '#ffffff'} // Alternating emerald-50 and white
                            stroke="#e5e7eb"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Axis Lines */}
                {data.map((_, i) => {
                    const end = getCoordinates(i, 1);
                    return (
                        <line
                            key={i}
                            x1={center.x}
                            y1={center.y}
                            x2={end.x}
                            y2={end.y}
                            stroke="#e5e7eb"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Data Polygon */}
                <motion.polygon
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.8, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    points={polygonPoints}
                    fill="rgba(16, 185, 129, 0.4)" // emerald-500 with opacity
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinejoin="round"
                />

                {/* Data Points */}
                {normalizedData.map((val, i) => {
                    const coords = getCoordinates(i, val);
                    return (
                        <motion.circle
                            key={i}
                            initial={{ r: 0 }}
                            animate={{ r: 5 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            cx={coords.x}
                            cy={coords.y}
                            fill="#047857" // emerald-700
                            stroke="#fff"
                            strokeWidth="2"
                        />
                    );
                })}

                {/* Labels */}
                {data.map((item, i) => {
                    // Push labels out a bit further than radius
                    const labelRadius = radius + 25;
                    const angle = i * angleStep - Math.PI / 2;
                    const x = center.x + Math.cos(angle) * labelRadius;
                    const y = center.y + Math.sin(angle) * labelRadius;

                    return (
                        <text
                            key={i}
                            x={x}
                            y={y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-[10px] font-bold fill-gray-600"
                            style={{ fontSize: '12px', fontFamily: 'var(--font-zen-kaku)' }}
                        >
                            {item.label}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
}
