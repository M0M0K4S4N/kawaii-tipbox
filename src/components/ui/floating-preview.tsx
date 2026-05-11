import React from 'react';
import { X } from 'lucide-react';
import { useDraggable } from '@/hooks/use-draggable';

interface FloatingPreviewProps {
  imageUrl: string;
  onClose: () => void;
  initialPosition?: { x: number; y: number };
}

export const FloatingPreview: React.FC<FloatingPreviewProps> = ({
  imageUrl,
  onClose,
  initialPosition = { x: 100, y: 100 }
}) => {
  const { position, isDragging, handleMouseDown, elementRef } = useDraggable(initialPosition);

  return (
    <div
      ref={elementRef}
      className="fixed z-50 bg-white border-2 border-gray-300 rounded-lg shadow-2xl overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center justify-between bg-gray-100 px-2 py-1 border-b border-gray-300">
        <span className="text-xs font-medium text-gray-700">Preview</span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded transition-colors"
          title="Close preview"
        >
          <X className="w-3 h-3 text-gray-600" />
        </button>
      </div>
      <div className="relative">
        <img
          src={imageUrl}
          alt="Preview"
          className="max-w-xs max-h-64 object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
};
