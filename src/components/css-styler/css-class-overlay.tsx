"use client";

import React, { useState, useEffect, useRef } from 'react';

interface ElementInfo {
  element: HTMLElement;
  classes: string[];
  overlayDesc: string;
  position: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

interface TagPosition {
  x: number;
  y: number;
}

// Debounce function to optimize performance
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const CSSClassOverlay = ({
  enabled,
  color = '#9ba9c0ff'
}: {
  enabled: boolean;
  color?: string;
}) => {
  const [elements, setElements] = useState<ElementInfo[]>([]);
  const [tagPositions, setTagPositions] = useState<TagPosition[]>([]);
  const [draggedTag, setDraggedTag] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Find all elements with the target class
  const findTargetElements = () => {
    // Find elements in the document body since we can't access the preview pane's internal container
    const targetElements = document.querySelectorAll('.DonateGoal_style__goal');
    const elementInfos: ElementInfo[] = [];

    targetElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        const rect = element.getBoundingClientRect();

        // Use viewport coordinates directly since our overlay is fixed positioned
        elementInfos.push({
          element,
          classes: Array.from(element.classList),
          overlayDesc: element.getAttribute('data-overlay-desc') || 'Unknown',
          position: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
          }
        });

        // Also find all div elements inside this goal element
        const innerDivs = element.querySelectorAll('div');
        innerDivs.forEach((div) => {
          if (div instanceof HTMLElement) {
            const divRect = div.getBoundingClientRect();
            elementInfos.push({
              element: div,
              classes: Array.from(div.classList),
              overlayDesc: div.getAttribute('data-overlay-desc') || 'Unknown',
              position: {
                top: divRect.top,
                left: divRect.left,
                width: divRect.width,
                height: divRect.height
              }
            });
          }
        });
      }
    });

    return elementInfos;
  };

  // Initialize tag positions when elements change
  useEffect(() => {
    if (elements.length > 0) {
      const newPositions: TagPosition[] = elements.map((el, index) => {
        // If we already have a position for this tag, keep it
        if (tagPositions[index]) {
          return tagPositions[index];
        }

        // Otherwise, position at the element
        const elementCenterX = el.position.left + el.position.width / 2;
        const elementCenterY = el.position.top + el.position.height / 2;

        return {
          x: elementCenterX,
          y: elementCenterY
        };
      });

      setTagPositions(newPositions);
    }
  }, [elements]);

  // Update elements when enabled or container changes
  useEffect(() => {
    if (enabled) {
      const updateElements = () => {
        setElements(findTargetElements());
      };

      // Debounced version for performance
      const debouncedUpdateElements = debounce(updateElements, 100);

      updateElements();

      // Set up a mutation observer to detect changes
      const observer = new MutationObserver(debouncedUpdateElements);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
      });

      // Also update on window resize and scroll with debouncing
      window.addEventListener('resize', debouncedUpdateElements);
      window.addEventListener('scroll', debouncedUpdateElements, { passive: true });

      return () => {
        observer.disconnect();
        window.removeEventListener('resize', debouncedUpdateElements);
        window.removeEventListener('scroll', debouncedUpdateElements);
      };
    } else {
      setElements([]);
    }
  }, [enabled]);

  // Handle mouse down on tag
  const handleTagMouseDown = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setDraggedTag(index);
  };

  // Handle mouse move for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggedTag !== null) {
        const newPositions = [...tagPositions];
        newPositions[draggedTag] = { x: e.clientX, y: e.clientY };
        setTagPositions(newPositions);
      }
    };

    const handleMouseUp = () => {
      setDraggedTag(null);
    };

    if (draggedTag !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedTag, tagPositions]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50" ref={overlayRef}>
      {/* Game-style Callout Tags */}
      {enabled && elements.map((el, index) => {
          const isMainElement = el.classes.includes('DonateGoal_style__goal');

          // Get tag position from state or use default
          const tagPos = tagPositions[index] || { x: 0, y: 0 };
          const elementCenterX = el.position.left + el.position.width / 2;
          const elementCenterY = el.position.top + el.position.height / 2;

          // Calculate line endpoints
          const lineStartX = tagPos.x;
          const lineStartY = tagPos.y + 20; // Bottom of tag
          const lineEndX = elementCenterX;
          const lineEndY = elementCenterY; // Middle of element

          return (
            <div key={index}>
              {/* Callout Tag */}
              <div
                className={`absolute bg-background border border-border rounded-md p-2 shadow-lg text-xs font-mono whitespace-nowrap cursor-move ${
                  draggedTag === index ? 'cursor-grabbing' : 'cursor-grab'
                }`}
                style={{
                  top: tagPos.y,
                  left: tagPos.x,
                  transform: 'translate(-50%, -50%)',
                  maxWidth: '300px',
                  overflow: 'auto',
                  textOverflow: 'ellipsis',
                  borderLeft: `3px solid ${color}`,
                  zIndex: draggedTag === index ? 70 : 60,
                  pointerEvents: 'auto'
                }}
                onMouseDown={handleTagMouseDown(index)}
              >
                <div className="font-semibold text-foreground mb-1">
                  {el.classes.join(', ')}
                </div>
                <div className="text-muted-foreground text-xs">
                  {el.overlayDesc}
                </div>
              </div>

              {/* Pointing Line from Tag to Element */}
              <svg
                className="absolute pointer-events-none"
                style={{
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 55
                }}
              >
                <line
                  x1={lineStartX}
                  y1={lineStartY}
                  x2={lineEndX}
                  y2={lineEndY}
                  stroke={color}
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                {/* Circle head */}
                <circle
                  cx={lineEndX}
                  cy={lineEndY}
                  r="2"
                  fill={color}
                />
              </svg>

              {/* Element Highlight */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: el.position.top,
                  left: el.position.left,
                  width: el.position.width,
                  height: el.position.height,
                  border: `2px solid ${color}`,
                  borderRadius: '4px',
                  zIndex: 50
                }}
              />
            </div>
          );
        })}
    </div>
  );
};