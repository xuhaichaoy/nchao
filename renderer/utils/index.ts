import { useEffect } from "react";

export const useAsyncEffect = (
  effect: () => Promise<void | (() => void)>,
  dependencies?: any[]
) => {
  return useEffect(() => {
    const cleanupPromise = effect();
    return () => {
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, dependencies);
};
