'use client';

import React, { memo, useState } from 'react';
import { EdgeProps, getBezierPath, EdgeLabelRenderer } from 'reactflow';
import { ChevronDown } from 'lucide-react';

type EdgeStyle = 'solid' | 'dashed' | 'dotted' | 'animated';

export const EditableEdge = memo(({
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
  data,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data?.label || '');
  const [showStyleMenu, setShowStyleMenu] = useState(false);
  const edgeStyle: EdgeStyle = data?.edgeStyle || 'dashed';

  const handleLabelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
    if (data?.onLabelChange) {
      data.onLabelChange(id, e.target.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setLabel(data?.label || '');
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleStyleChange = (newStyle: EdgeStyle) => {
    if (data?.onStyleChange) {
      data.onStyleChange(id, newStyle);
    }
    setShowStyleMenu(false);
  };

  const getStrokeDashArray = () => {
    switch (edgeStyle) {
      case 'solid':
        return '0';
      case 'dashed':
        return '5,5';
      case 'dotted':
        return '2,4';
      case 'animated':
        return '5,5';
      default:
        return '5,5';
    }
  };

  const strokeDasharray = getStrokeDashArray();
  const isAnimated = edgeStyle === 'animated';

  return (
    <>
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
        strokeDasharray={strokeDasharray}
      />
      {isAnimated && (
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
          markerEnd={markerEnd}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-10"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      )}

      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <div className="flex items-center gap-1">
            {isEditing ? (
              <input
                type="text"
                value={label}
                onChange={handleLabelChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                autoFocus
                className="px-2 py-1 text-xs border border-blue-500 rounded bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ minWidth: '80px' }}
              />
            ) : (
              <div
                onClick={handleLabelClick}
                className="px-2 py-1 text-xs bg-white border border-gray-300 rounded shadow-sm cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                {label || 'Add label'}
              </div>
            )}

            {selected && !isEditing && (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowStyleMenu(!showStyleMenu);
                  }}
                  className="p-1 bg-white border border-gray-300 rounded hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  title="Change line style"
                >
                  <ChevronDown className="w-3 h-3 text-gray-600" />
                </button>

                {showStyleMenu && (
                  <div className="absolute top-full mt-1 left-0 bg-white border border-gray-300 rounded shadow-lg z-50 min-w-[140px]">
                    <button
                      onClick={() => handleStyleChange('solid')}
                      className={`w-full px-3 py-2 text-left text-xs hover:bg-blue-50 flex items-center gap-2 ${
                        edgeStyle === 'solid' ? 'bg-blue-100 font-semibold' : ''
                      }`}
                    >
                      <span className="flex-1">Solid</span>
                      <span className="text-gray-400">━━━</span>
                    </button>
                    <button
                      onClick={() => handleStyleChange('dashed')}
                      className={`w-full px-3 py-2 text-left text-xs hover:bg-blue-50 flex items-center gap-2 ${
                        edgeStyle === 'dashed' ? 'bg-blue-100 font-semibold' : ''
                      }`}
                    >
                      <span className="flex-1">Dashed</span>
                      <span className="text-gray-400">- - -</span>
                    </button>
                    <button
                      onClick={() => handleStyleChange('dotted')}
                      className={`w-full px-3 py-2 text-left text-xs hover:bg-blue-50 flex items-center gap-2 ${
                        edgeStyle === 'dotted' ? 'bg-blue-100 font-semibold' : ''
                      }`}
                    >
                      <span className="flex-1">Dotted</span>
                      <span className="text-gray-400">· · ·</span>
                    </button>
                    <button
                      onClick={() => handleStyleChange('animated')}
                      className={`w-full px-3 py-2 text-left text-xs hover:bg-blue-50 flex items-center gap-2 ${
                        edgeStyle === 'animated' ? 'bg-blue-100 font-semibold' : ''
                      }`}
                    >
                      <span className="flex-1">Animated</span>
                      <span className="text-gray-400">⟿ ⟿</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
});

EditableEdge.displayName = 'EditableEdge';