import { useEffect, RefObject } from 'react';
import {
  PIANO_POSITION,
  PIANO_ROTATION,
  PIANO_SIZE,
  INITIAL_CAMERA_POSITION,
  INITIAL_CAMERA_FOV,
} from '@/features/hero/piano/constants';
import { getProjectedPosition } from '@/features/hero/scene/getProjectedPosition';

interface UsePianoBoundingBoxProps {
  boundingBoxRef: RefObject<HTMLDivElement | null>;
  canvasRef: RefObject<HTMLDivElement | null>;
}

export function usePianoBoundingBox({ boundingBoxRef, canvasRef }: UsePianoBoundingBoxProps) {
  useEffect(() => {
    const updateBoundingBox = () => {
      if (!boundingBoxRef.current || !canvasRef.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const canvasWidth = canvasRect.width;
      const canvasHeight = canvasRect.height;

      const pianoRect = getProjectedPosition(
        {
          position: PIANO_POSITION,
          rotation: PIANO_ROTATION,
          size: PIANO_SIZE,
        },
        {
          position: INITIAL_CAMERA_POSITION,
          fov: INITIAL_CAMERA_FOV,
        },
        canvasWidth,
        canvasHeight,
      );

      boundingBoxRef.current.style.display = 'flex';
      boundingBoxRef.current.style.left = `${pianoRect.x}px`;
      boundingBoxRef.current.style.top = `${pianoRect.y}px`;
      boundingBoxRef.current.style.width = `${pianoRect.width}px`;
      boundingBoxRef.current.style.height = `${pianoRect.height}px`;
    };

    // 첫 렌더링 후 계산
    updateBoundingBox();

    // 윈도우 리사이즈 시 재계산
    window.addEventListener('resize', updateBoundingBox);

    return () => {
      window.removeEventListener('resize', updateBoundingBox);
    };
  }, [boundingBoxRef, canvasRef]);
}
