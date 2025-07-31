import { useCounter, useInterval } from "react-use";
import { useEffect } from "react";

export const usePersistentCounter = (
  key: string,
  min: number = 0,
  max: number = 60,
  step: number = 1
) => {
  const getInitial = () => {
    const saved = localStorage.getItem(`${key}_start_time`);
    if (saved) {
      const elapsed = Math.floor((Date.now() - Number(saved)) / 1000);
      const remaining = max - elapsed;
      if (remaining > 0) return remaining;
    }
    return 0;
  };

  const [count, actions] = useCounter(getInitial(), max, min);

  useInterval(
    () => {
      if (count > min) {
        actions.dec(step);
      }
    },
    count > min ? 1000 : null
  );

  useEffect(() => {
    if (count > min && count < max) {
      localStorage.setItem(`${key}_start_time`, Date.now().toString());
    } else {
      localStorage.removeItem(`${key}_start_time`);
    }
  }, [count, key, min, max]);

  const reset = (value = max) => {
    actions.set(value);
    localStorage.setItem(`${key}_start_time`, Date.now().toString());
  };

  return [count, { ...actions, reset }] as const;
};
