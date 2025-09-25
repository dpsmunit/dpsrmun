import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CloseIcon, ZoomInIcon, ZoomOutIcon, ArrowPathIcon } from './icons/Icons';
import useWindowSize from '../hooks/useWindowSize';

interface ImageViewerProps {
  src: string;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ src, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialDistance = useRef<number | null>(null);
  const lastTouchMidpoint = useRef<{ x: number; y: number } | null>(null);
  const lastTap = useRef<number>(0);
  const tapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const MIN_SCALE = 1;
  const MAX_SCALE = 5;
  const ZOOM_SENSITIVITY = 0.005;

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  }, [onClose]);

  const clampPosition = useCallback(
    (pos: { x: number; y: number }, currentScale: number) => {
      if (!imageRef.current || !containerRef.current) return pos;

      const imgWidth = imageRef.current.offsetWidth * currentScale;
      const imgHeight = imageRef.current.offsetHeight * currentScale;
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      const maxX = Math.max(0, (imgWidth - containerWidth) / 2);
      const maxY = Math.max(0, (imgHeight - containerHeight) / 2);

      return {
        x: Math.max(-maxX, Math.min(maxX, pos.x)),
        y: Math.max(-maxY, Math.min(maxY, pos.y)),
      };
    },
    []
  );

  const handleZoom = useCallback(
    (delta: number, clientX?: number, clientY?: number) => {
      setScale((prevScale) => {
        const newScale = Math.max(
          MIN_SCALE,
          Math.min(MAX_SCALE, prevScale - delta * ZOOM_SENSITIVITY * prevScale)
        );

        if (newScale <= MIN_SCALE) {
          setPosition({ x: 0, y: 0 });
          return MIN_SCALE;
        }

        const rect = containerRef.current?.getBoundingClientRect();
        const mouseX = (clientX ?? (rect?.left ?? 0) + (rect?.width ?? 0) / 2) - (rect?.left ?? 0);
        const mouseY = (clientY ?? (rect?.top ?? 0) + (rect?.height ?? 0) / 2) - (rect?.top ?? 0);

        const worldX = (mouseX - position.x) / prevScale;
        const worldY = (mouseY - position.y) / prevScale;

        const newX = mouseX - worldX * newScale;
        const newY = mouseY - worldY * newScale;

        setPosition(clampPosition({ x: newX, y: newY }, newScale));
        return newScale;
      });
    },
    [position.x, position.y, clampPosition]
  );

  const handleReset = useCallback(() => {
    setScale(MIN_SCALE);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Mouse drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setStartDrag({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const newPosition = { x: e.clientX - startDrag.x, y: e.clientY - startDrag.y };
    setPosition(clampPosition(newPosition, scale));
  };

  const onMouseUp = () => setIsDragging(false);

  // Touch handlers
  const getDistance = (touches: React.TouchList) =>
    Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);

  const getMidpoint = (touches: React.TouchList) => {
    if (touches.length < 2) return null;
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2,
    };
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      initialDistance.current = getDistance(e.touches);
      lastTouchMidpoint.current = getMidpoint(e.touches);
    } else if (e.touches.length === 1) {
      // Double tap detection
      const now = Date.now();
      if (now - lastTap.current < 300) {
        // Double tap detected
        e.preventDefault();
        if (scale > MIN_SCALE) {
          handleReset();
        } else {
          const touch = e.touches[0];
          const rect = containerRef.current?.getBoundingClientRect();
          if (!rect) return;
          const offsetX = touch.clientX - rect.left - rect.width / 2 - position.x;
          const offsetY = touch.clientY - rect.top - rect.height / 2 - position.y;
          const zoomInScale = 2.5;
          setScale(zoomInScale);
          setPosition(clampPosition({ x: -offsetX * (zoomInScale - 1), y: -offsetY * (zoomInScale - 1) }, zoomInScale));
        }
        lastTap.current = 0;
        if (tapTimeout.current) clearTimeout(tapTimeout.current);
      } else {
        lastTap.current = now;
        tapTimeout.current = setTimeout(() => {
          lastTap.current = 0;
          tapTimeout.current = null;
        }, 300);
      }

      if (scale > 1) {
        setIsDragging(true);
        setStartDrag({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
      }
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialDistance.current) {
      e.preventDefault();
      const newDist = getDistance(e.touches);
      const midpoint = getMidpoint(e.touches);
      if (!midpoint) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const delta = initialDistance.current - newDist;
      handleZoom(delta * 0.2, midpoint.x, midpoint.y);
      initialDistance.current = newDist;
      lastTouchMidpoint.current = midpoint;
    } else if (e.touches.length === 1 && isDragging) {
      e.preventDefault();
      const newPosition = { x: e.touches[0].clientX - startDrag.x, y: e.touches[0].clientY - startDrag.y };
      setPosition(clampPosition(newPosition, scale));
    }
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    initialDistance.current = null;
  };

  // Wheel and keyboard listeners
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleZoom(e.deltaY, e.clientX, e.clientY);
    };
    const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();

    const currentContainer = containerRef.current;
    currentContainer?.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      currentContainer?.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      if (tapTimeout.current) clearTimeout(tapTimeout.current);
    };
  }, [handleClose, handleZoom]);

  // Clamp position on window resize or scale change
  useEffect(() => {
    if (scale <= MIN_SCALE) {
      setPosition({ x: 0, y: 0 });
    } else {
      setPosition((pos) => clampPosition(pos, scale));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth, windowHeight, scale]);

  const ControlButton = ({
    onClick,
    children,
    ariaLabel,
  }: {
    onClick: () => void;
    children: React.ReactNode;
    ariaLabel: string;
  }) => (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="p-3 rounded-full bg-black/30 hover:bg-black/50 text-white/80 hover:text-white backdrop-blur-sm border border-white/20 transition-all duration-200 transform hover:scale-110"
    >
      {children}
    </button>
  );

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" onClick={handleClose} />

      {/* Image container */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden touch-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img
          ref={imageRef}
          src={src}
          alt="Full newsletter view"
          className={`absolute transition-transform duration-200 ease-out ${
            isDragging ? '!duration-0' : ''
          } ${scale > 1 ? 'cursor-grab' : 'cursor-default'} ${isDragging ? 'cursor-grabbing' : ''}`}
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${scale})`,
            willChange: 'transform',
            maxWidth: '90vw',
            maxHeight: '90vh',
          }}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>

      {/* Close button */}
      <button
        className="absolute top-5 right-5 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white/80 hover:text-white backdrop-blur-sm border border-white/20 transition-all duration-200 transform hover:scale-110 z-50"
        onClick={handleClose}
        aria-label="Close"
      >
        <CloseIcon className="w-7 h-7" />
      </button>

      {/* Controls */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 p-2 bg-black/20 backdrop-blur-md rounded-full border border-white/10 z-50">
        <ControlButton onClick={() => handleZoom(50)} ariaLabel="Zoom Out">
          <ZoomOutIcon className="w-6 h-6" />
        </ControlButton>
        <ControlButton onClick={handleReset} ariaLabel="Reset View">
          <ArrowPathIcon className="w-6 h-6" />
        </ControlButton>
        <ControlButton onClick={() => handleZoom(-50)} ariaLabel="Zoom In">
          <ZoomInIcon className="w-6 h-6" />
        </ControlButton>
      </div>
    </div>
  );
};

export default ImageViewer;
