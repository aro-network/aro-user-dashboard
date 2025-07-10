export function retry<T>(
  fn: () => Promise<T>,
  options?: {
    maxAttempts?: number;
    delayMs?: number;
    backoffFactor?: number;
    shouldRetry?: (error: any, attempt: number) => boolean;
    onRetry?: (error: any, attempt: number) => void;
  }
): Promise<T> {
  const {
    maxAttempts = 3,
    delayMs = 1000,
    backoffFactor = 1,
    shouldRetry = () => true,
    onRetry = () => {},
  } = options || {};

  return new Promise<T>((resolve, reject) => {
    const attempt = async (attemptNumber: number): Promise<void> => {
      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        if (attemptNumber < maxAttempts && shouldRetry(error, attemptNumber)) {
          onRetry(error, attemptNumber);
          const nextDelay = delayMs * Math.pow(backoffFactor, attemptNumber - 1);
          setTimeout(() => attempt(attemptNumber + 1), nextDelay);
        } else {
          reject(error);
        }
      }
    };

    attempt(1);
  });
}
