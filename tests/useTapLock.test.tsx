import { type MainThreadRef, runOnMainThread } from "@lynx-js/react";
import { fireEvent, render } from "@lynx-js/react/testing-library";
import { useTapLock } from "../src/useTapLock";

describe("useTapLock", () => {
  it("should initialize with tap lock enabled", async () => {
    let tapLockRef: MainThreadRef<boolean> | null = null;
    const Comp = () => {
      const {
        tapLockRef: hookTapLockRef,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
      } = useTapLock();

      tapLockRef = hookTapLockRef;

      return (
        <view
          main-thread:bindtouchstart={handleTouchStart}
          main-thread:bindtouchmove={handleTouchMove}
          main-thread:bindtouchend={handleTouchEnd}
        ></view>
      );
    };

    render(<Comp />);

    const checkTapLockRef = runOnMainThread(() => {
      "main thread";
      return tapLockRef?.current;
    });

    expect(await checkTapLockRef()).toBe(true);
  });

  it("should tapLock when exceeds default thresholdD", async () => {
    let tapLockRef: MainThreadRef<boolean> | null = null;
    const Comp = () => {
      const {
        tapLockRef: hookTapLockRef,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
      } = useTapLock();

      tapLockRef = hookTapLockRef;

      return (
        <view
          main-thread:bindtouchstart={handleTouchStart}
          main-thread:bindtouchmove={handleTouchMove}
          main-thread:bindtouchend={handleTouchEnd}
        ></view>
      );
    };

    const { container } = render(<Comp />);

    const checkTapLockRef = runOnMainThread(() => {
      "main thread";
      return tapLockRef?.current;
    });

    fireEvent.touchstart(container.firstChild, {
      detail: {
        x: 10,
      },
    });

    fireEvent.touchmove(container.firstChild, {
      detail: {
        x: 20,
      },
    });

    expect(await checkTapLockRef()).toBe(false);
  });

  it("should tapLock when exceeds custom threshold", async () => {
    let tapLockRef: MainThreadRef<boolean> | null = null;
    const Comp = () => {
      const {
        tapLockRef: hookTapLockRef,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
      } = useTapLock(20);

      tapLockRef = hookTapLockRef;

      return (
        <view
          main-thread:bindtouchstart={handleTouchStart}
          main-thread:bindtouchmove={handleTouchMove}
          main-thread:bindtouchend={handleTouchEnd}
        ></view>
      );
    };

    const { container } = render(<Comp />);

    const checkTapLockRef = runOnMainThread(() => {
      "main thread";
      return tapLockRef?.current;
    });

    fireEvent.touchstart(container.firstChild, {
      detail: {
        x: 10,
      },
    });

    fireEvent.touchmove(container.firstChild, {
      detail: {
        x: 18,
      },
    });

    expect(await checkTapLockRef()).toBe(true);

    fireEvent.touchend(container.firstChild, {
      detail: {
        x: 31,
      },
    });

    expect(await checkTapLockRef()).toBe(false);
  });
});
