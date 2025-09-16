import { useEffect, useState } from "@lynx-js/react";
import type { ObserveCallback, ObserveCallbackResult } from "@lynx-js/types";

export type IntersectionObserverOptions = {
  thresholds?: [];
  initialRatio?: number;
  observeAll?: boolean;
};

// TBD: useBackgroundIntersection - hook name pending
// For main-thread components IntersectionObserver implementation
const useBackgroundIntersection = (
  seletor: string,
  options: IntersectionObserverOptions
): ObserveCallbackResult | null => {
  const [
    intersectionObserveCallbackResult,
    setIntersectionObserveCallbackResult,
  ] = useState<ObserveCallbackResult | null>(null);

  useEffect(() => {
    if (typeof lynx?.createIntersectionObserver === "function") {
      const handler: ObserveCallback = (result: ObserveCallbackResult) => {
        setIntersectionObserveCallbackResult(result);
      };

      const observer = lynx.createIntersectionObserver(
        { componentId: "" },
        options
      );
      observer.observe(seletor, handler);

      return () => {
        setIntersectionObserveCallbackResult(null);
        observer.disconnect();
      };
    }
    return () => {};
  }, [seletor, options.thresholds, options.initialRatio, options.observeAll]);

  return intersectionObserveCallbackResult;
};

export default useBackgroundIntersection;
