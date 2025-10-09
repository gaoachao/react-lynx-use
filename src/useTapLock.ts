import { useMainThreadRef } from '@lynx-js/react';
import type { MainThread } from '@lynx-js/types';

const TAP_THRESHOLD = 8;

function useTapLock(tapThreshold: number = TAP_THRESHOLD) {
  const tapLockRef = useMainThreadRef<boolean>(true);
  const touchStartRef = useMainThreadRef<number>(0);

  function handleTouchStart(event: MainThread.TouchEvent) {
    'main thread';
    tapLockRef.current = true;
    touchStartRef.current = event.detail.x;
  }

  function handleTouchMove(event: MainThread.TouchEvent) {
    'main thread';
    const deltaX = event.detail.x - touchStartRef.current;
    if (Math.abs(deltaX) > tapThreshold) {
      tapLockRef.current = false;
    }
    return tapLockRef.current;
  }

  function handleTouchEnd(event: MainThread.TouchEvent) {
    'main thread';
    const deltaX = event.detail.x - touchStartRef.current;
    if (Math.abs(deltaX) > tapThreshold) {
      tapLockRef.current = false;
    }
    return tapLockRef.current;
  }

  return {
    tapLockRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}

export { useTapLock };
