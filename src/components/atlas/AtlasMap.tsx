import { useState } from 'react';
import TalkTooltip from './TalkTooltip';

export interface AtlasMarker {
  slug: string;
  x: number;
  y: number;
  title: string;
  event: string;
  dateISO: string;
  location: string;
  type: 'invited' | 'oral' | 'poster' | 'tutorial' | 'seminar';
  thumbnailSrc?: string;
  thumbnailAlt?: string;
}

export interface AtlasMapProps {
  landPath: string;
  graticulePath: string;
  width: number;
  height: number;
  markers: AtlasMarker[];
}

export default function AtlasMap({
  landPath,
  graticulePath,
  width,
  height,
  markers,
}: AtlasMapProps) {
  const [hovered, setHovered] = useState<AtlasMarker | null>(null);

  return (
    <div style={{ position: 'relative' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="World map of talk venues"
      >
        <path
          d={graticulePath}
          fill="none"
          stroke="var(--color-border-tertiary)"
          strokeWidth={0.5}
          strokeDasharray="1 3"
          opacity={0.4}
        />
        <path
          d={landPath}
          fill="var(--color-background-secondary)"
          stroke="var(--color-border-tertiary)"
          strokeWidth={0.5}
        />
        {markers.map((m) => {
          const isHovered = hovered?.slug === m.slug;
          return (
            <a
              key={m.slug}
              href={`/research/talks/${m.slug}/`}
              aria-label={`${m.title} — ${m.location}`}
            >
              <circle
                cx={m.x}
                cy={m.y}
                r={isHovered ? 8 : 5}
                fill="var(--color-accent)"
                stroke="var(--color-background)"
                strokeWidth={1.5}
                onMouseEnter={() => setHovered(m)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  cursor: 'pointer',
                  transition: 'r 0.15s ease-out',
                }}
              />
            </a>
          );
        })}
      </svg>
      {hovered && (
        <TalkTooltip
          marker={hovered}
          containerWidth={width}
          containerHeight={height}
        />
      )}
    </div>
  );
}
