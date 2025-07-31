import { useCounter } from "react-use";
import { useEffect, useRef } from "react";

export const usePersistentCounter = (
  key: string,
  min: number = 0,
  max: number = 60
) => {
  const [count, actions] = useCounter(max, max, min);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      actions.set((prev) => {
        if (prev <= min + 1) {
          localStorage.removeItem(`${key}_start`);
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return min;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const start = localStorage.getItem(`${key}_start`);
    if (start) {
      const elapsed = Math.floor((Date.now() - Number(start)) / 1000);
      const remaining = max - elapsed;
      if (remaining > 0) {
        actions.set(remaining);
        startInterval();
      } else {
        actions.set(min);
        localStorage.removeItem(`${key}_start`);
      }
    } else {
      actions.set(min);
    }
  }, [key]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
    };
  }, []);

  const reset = (value = max) => {
    localStorage.setItem(`${key}_start`, Date.now().toString());
    actions.set(value);
    startInterval();
  };

  const clear = () => {
    localStorage.removeItem(`${key}_start`);
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    actions.set(min);
  };

  return [count, { ...actions, reset, clear }] as const;
};
