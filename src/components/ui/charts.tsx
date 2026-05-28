"use client";

import React, { useState, useId } from "react";
import { cn } from "../../lib/utils";

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface ChartProps {
  data: ChartData[];
  height?: number;
  className?: string;
}

// ────────────────────────────────────────────────────────────────────────────
// BAR CHART
// ────────────────────────────────────────────────────────────────────────────
export function BarChart({ data, height = 240, className }: ChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const paddingLeft = 40;
  const paddingRight = 10;
  const paddingTop = 20;
  const paddingBottom = 30;

  // Grid lines
  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className={cn("w-full relative", className)}>
      <svg
        viewBox={`0 0 500 ${height}`}
        className="w-full h-auto overflow-visible select-none"
        role="img"
        aria-label={`Bar chart with ${data.length} data points`}
      >
        {/* Y-Axis Grid Lines & Labels */}
        {gridLines.map((ratio, idx) => {
          const val = Math.round(maxValue * ratio);
          const y = paddingTop + (height - paddingTop - paddingBottom) * (1 - ratio);
          return (
            <g key={idx} className="opacity-45 dark:opacity-25">
              <line
                x1={paddingLeft}
                y1={y}
                x2={500 - paddingRight}
                y2={y}
                className="stroke-border"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={paddingLeft - 8}
                y={y + 4}
                className="fill-muted-foreground text-[10px] font-mono text-right"
                textAnchor="end"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((item, idx) => {
          const graphWidth = 500 - paddingLeft - paddingRight;
          const barWidth = (graphWidth / data.length) * 0.6;
          const gap = (graphWidth / data.length) * 0.4;
          const x = paddingLeft + idx * (barWidth + gap) + gap / 2;

          const barHeight = ((height - paddingTop - paddingBottom) * item.value) / maxValue;
          const y = height - paddingBottom - barHeight;

          return (
            <g key={idx}>
              {/* Bar Rect */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(barHeight, 2)}
                rx="4"
                className={cn(
                  "fill-brand transition-all duration-300 cubic-bezier(0.2,0,0,1) cursor-pointer",
                  hoveredIndex === idx ? "fill-brand/90 opacity-95 filter brightness-105" : "opacity-85"
                )}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              {/* X-Axis Label */}
              <text
                x={x + barWidth / 2}
                y={height - paddingBottom + 16}
                className="fill-muted-foreground text-[10px] font-medium"
                textAnchor="middle"
              >
                {item.label}
              </text>

              {/* Hover Value Overlay */}
              {hoveredIndex === idx && (
                <g className="animate-in fade-in duration-200">
                  <rect
                    x={x + barWidth / 2 - 25}
                    y={y - 25}
                    width="50"
                    height="20"
                    rx="3"
                    className="fill-popover shadow-md"
                  />
                  <text
                    x={x + barWidth / 2}
                    y={y - 12}
                    className="fill-popover-foreground text-[10px] font-bold"
                    textAnchor="middle"
                  >
                    {item.value}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Base X-Axis Line */}
        <line
          x1={paddingLeft}
          y1={height - paddingBottom}
          x2={500 - paddingRight}
          y2={height - paddingBottom}
          className="stroke-border"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// LINE CHART
// ────────────────────────────────────────────────────────────────────────────
export function LineChart({ data, height = 240, className }: ChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const gradientId = useId();

  if (!data || data.length < 2) return null;
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const graphWidth = 500 - paddingLeft - paddingRight;
  const graphHeight = height - paddingTop - paddingBottom;

  // Calculate points
  const points = data.map((item, idx) => {
    const x = paddingLeft + (idx / (data.length - 1)) * graphWidth;
    const y = height - paddingBottom - (item.value / maxValue) * graphHeight;
    return { x, y };
  });

  // Create path command
  const pathD = points.reduce((acc, point, idx) => {
    return idx === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
  }, "");

  // Create filled area path
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;

  return (
    <div className={cn("w-full relative", className)}>
      <svg
        viewBox={`0 0 500 ${height}`}
        className="w-full h-auto overflow-visible select-none"
        role="img"
        aria-label={`Line chart with ${data.length} data points`}
      >
        {/* Y Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
          const val = Math.round(maxValue * ratio);
          const y = paddingTop + (1 - ratio) * graphHeight;
          return (
            <g key={idx} className="opacity-45 dark:opacity-25">
              <line
                x1={paddingLeft}
                y1={y}
                x2={500 - paddingRight}
                y2={y}
                className="stroke-border"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={paddingLeft - 8}
                y={y + 4}
                className="fill-muted-foreground text-[10px] font-mono text-right"
                textAnchor="end"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* Fill Area Gradient */}
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <path d={areaD} fill={`url(#${gradientId})`} className="transition-all duration-300" />

        {/* Line Path */}
        <path
          d={pathD}
          fill="none"
          className="stroke-brand transition-all duration-300"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Interactive Nodes */}
        {points.map((point, idx) => {
          return (
            <g key={idx}>
              {/* Invisible Target Area */}
              <circle
                cx={point.x}
                cy={point.y}
                r="12"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              {/* Node Circle */}
              <circle
                cx={point.x}
                cy={point.y}
                r={hoveredIndex === idx ? "6" : "4"}
                className={cn(
                  "fill-background stroke-brand transition-all duration-200 pointer-events-none",
                  hoveredIndex === idx ? "stroke-[3px]" : "stroke-2"
                )}
              />

              {/* X Axis Label */}
              <text
                x={point.x}
                y={height - paddingBottom + 16}
                className="fill-muted-foreground text-[10px] font-medium"
                textAnchor="middle"
              >
                {data[idx].label}
              </text>

              {/* Value Tooltip */}
              {hoveredIndex === idx && (
                <g className="animate-in fade-in duration-200">
                  <rect
                    x={point.x - 25}
                    y={point.y - 28}
                    width="50"
                    height="20"
                    rx="3"
                    className="fill-popover shadow-md"
                  />
                  <text
                    x={point.x}
                    y={point.y - 15}
                    className="fill-popover-foreground text-[10px] font-bold"
                    textAnchor="middle"
                  >
                    {data[idx].value}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// DONUT CHART
// ────────────────────────────────────────────────────────────────────────────
export function DonutChart({ data, height = 240, className }: ChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;
  const totalValue = data.reduce((acc, d) => acc + d.value, 0);
  if (totalValue === 0) return null;
  const radius = 80;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;

  // Center point
  const cx = 110;
  const cy = 110;

  let currentAngle = 0;

  return (
    <div className={cn("w-full flex items-center gap-6", className)}>
      <svg
        viewBox="0 0 220 220"
        className="w-[45%] max-w-[200px] h-auto overflow-visible select-none shrink-0"
        role="img"
        aria-label={`Donut chart showing ${data.length} categories totaling ${totalValue}`}
      >
        {data.map((item, idx) => {
          const ratio = item.value / totalValue;
          const strokeLength = ratio * circumference;
          const angle = ratio * 360;
          const rotation = currentAngle - 90;
          currentAngle += angle;

          const isHovered = hoveredIndex === idx;

          return (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r={radius}
              fill="transparent"
              stroke={item.color || "var(--brand)"}
              strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
              strokeDasharray={`${strokeLength} ${circumference}`}
              strokeDashoffset={0}
              transform={`rotate(${rotation} ${cx} ${cy})`}
              className="transition-all duration-300 cursor-pointer"
              style={{ strokeLinecap: "round" }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          );
        })}

        {/* Center label */}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          className="fill-foreground font-semibold text-sm"
        >
          {hoveredIndex !== null ? data[hoveredIndex].label : "Total"}
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          className="fill-muted-foreground text-xs font-mono font-bold"
        >
          {hoveredIndex !== null ? data[hoveredIndex].value : totalValue}
        </text>
      </svg>

      {/* Legend list */}
      <div className="flex-1 flex flex-col gap-2.5">
        {data.map((item, idx) => (
          <div
            key={idx}
            className={cn(
              "flex items-center gap-2 cursor-pointer transition-all p-1.5 rounded-md border border-transparent",
              hoveredIndex === idx ? "bg-muted/40 border-border" : "hover:bg-muted/20"
            )}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: item.color || "var(--brand)" }}
            />
            <div className="flex flex-col text-[11px]">
              <span className="font-semibold text-foreground leading-none">{item.label}</span>
              <span className="text-muted-foreground mt-0.5 leading-none font-mono text-[9px]">
                {item.value} ({Math.round((item.value / totalValue) * 100)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
