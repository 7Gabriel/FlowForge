import React, { memo } from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';

export const AnimatedEdge = memo(({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      {/* Edge Path (tracejado) */}
      <path
        id={id}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: selected ? '#3B82F6' : '#94A3B8',
        }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        strokeDasharray="5,5"
      />

      {/* ⚠️ Animated Overlay (fluxo animado) */}
      <path
        style={{
          strokeWidth: 2,
          stroke: '#3B82F6',
          strokeOpacity: 0.6,
          fill: 'none',
        }}
        d={edgePath}
        strokeDasharray="5,5"
        strokeDashoffset="0"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-10"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>
    </>
  );
});

AnimatedEdge.displayName = 'AnimatedEdge';