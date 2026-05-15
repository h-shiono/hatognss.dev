import { useMemo } from 'react';
import type { AtlasMarker } from './AtlasMap';

interface Props {
  marker: AtlasMarker;
  containerWidth: number;
  containerHeight: number;
}

export default function TalkTooltip({
  marker,
  containerWidth,
  containerHeight,
}: Props) {
  const xPct = marker.x / containerWidth;
  const yPct = marker.y / containerHeight;

  // Edge-aware positioning per docs/atlas-design.md §6 tooltip:
  // - flip horizontally if would overflow the right edge
  // - clamp vertically by flipping below when too close to the top
  const anchorRight = xPct > 0.7;
  const flipBelow = yPct < 0.35;

  const transform = [
    anchorRight ? 'translateX(-100%)' : 'translateX(-50%)',
    flipBelow ? 'translateY(12px)' : 'translateY(calc(-100% - 12px))',
  ].join(' ');

  const dateLabel = useMemo(() => {
    const d = new Date(marker.dateISO);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(d);
  }, [marker.dateISO]);

  return (
    <div
      role="tooltip"
      style={{
        position: 'absolute',
        left: `${xPct * 100}%`,
        top: `${yPct * 100}%`,
        transform,
        width: 220,
        pointerEvents: 'none',
        background: 'var(--color-background)',
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 6,
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      <div
        style={{
          height: 130,
          background: 'var(--color-background-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {marker.thumbnailSrc ? (
          <img
            src={marker.thumbnailSrc}
            alt={marker.thumbnailAlt ?? ''}
            width={220}
            height={130}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--color-foreground-muted)',
            }}
          >
            {marker.location || '—'}
          </span>
        )}
      </div>
      <div style={{ padding: '10px 12px' }}>
        <p
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--color-foreground)',
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {marker.title}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--color-foreground-muted)',
            margin: '4px 0 0 0',
          }}
        >
          {dateLabel} · {marker.event}
        </p>
      </div>
    </div>
  );
}
