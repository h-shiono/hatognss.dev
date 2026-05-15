import { useEffect, useState } from 'react';
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
  // `hoveredSlug` highlights the marker (set from either map or list hover).
  // `tooltipMarker` shows the tooltip — set only from marker hover, per
  // docs/atlas-design.md §7 "Hover list row → highlight marker, but no tooltip".
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [tooltipMarker, setTooltipMarker] = useState<AtlasMarker | null>(null);

  // Map → List: reflect hover state onto list rows via data attribute.
  useEffect(() => {
    const rows = document.querySelectorAll<HTMLElement>('[data-atlas-id]');
    rows.forEach((row) => {
      if (row.dataset.atlasId === hoveredSlug) {
        row.dataset.atlasHovered = 'true';
      } else {
        delete row.dataset.atlasHovered;
      }
    });
  }, [hoveredSlug]);

  // List → Map: subscribe to hover on list rows so markers grow without tooltip.
  useEffect(() => {
    const rows = document.querySelectorAll<HTMLElement>('[data-atlas-id]');
    const cleanups: Array<() => void> = [];
    rows.forEach((row) => {
      const slug = row.dataset.atlasId;
      if (!slug) return;
      const enter = () => setHoveredSlug(slug);
      const leave = () => setHoveredSlug(null);
      row.addEventListener('mouseenter', enter);
      row.addEventListener('mouseleave', leave);
      cleanups.push(() => {
        row.removeEventListener('mouseenter', enter);
        row.removeEventListener('mouseleave', leave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

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
          const isHovered = hoveredSlug === m.slug;
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
                onMouseEnter={() => {
                  setHoveredSlug(m.slug);
                  setTooltipMarker(m);
                }}
                onMouseLeave={() => {
                  setHoveredSlug(null);
                  setTooltipMarker(null);
                }}
                style={{
                  cursor: 'pointer',
                  transition: 'r 0.15s ease-out',
                }}
              />
            </a>
          );
        })}
      </svg>
      {tooltipMarker && (
        <TalkTooltip
          marker={tooltipMarker}
          containerWidth={width}
          containerHeight={height}
        />
      )}
    </div>
  );
}
