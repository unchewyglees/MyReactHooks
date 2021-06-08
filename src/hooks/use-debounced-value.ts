import {useCallback, useEffect, useRef, useState} from 'react';

export default function useDebouncedValue<T>(currentOrInitialValue: T, delay: number): [T, (newValueToDebounce: T) => void] {
  const [debouncedValue, setDebouncedValue] = useState(currentOrInitialValue);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const onValue = useCallback((newValue: T) => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => {
        setDebouncedValue(newValue);
      },
      delay,
    );
  }, []);

  useEffect(() => {
    if (debouncedValue !== currentOrInitialValue) {
      onValue(currentOrInitialValue);
      return () => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
      };
    }
    return;
  }, [currentOrInitialValue]);

  return [debouncedValue, onValue];
}
