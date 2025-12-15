export default function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  debounceMs: number,
): (...args: Parameters<T>) => void {
  let time: number | null = null;

  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (time !== null) {
      if (now - time < debounceMs) return;
    }
    time = now;
    func(...args);
  };
}
