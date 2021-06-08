import useDebouncedValue from './use-debounced-value';
import {act, renderHook} from '@testing-library/react-hooks';

const delayTime = 1000;
const testValue = 'test value';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test('Should initialize with argument passed', async () => {
  const {result} = renderHook(() => useDebouncedValue(testValue, delayTime));
  expect(result.current && result.current[0]).toBe(testValue);
});

test('Should equal initial value and update after delay, resetting delay with each change', () => {
  const {result} = renderHook(() => useDebouncedValue(testValue, delayTime));
  const newValue = 'new value';

  act(() => result.current && result.current[1](newValue));

  expect(result.current && result.current[0]).toBe(testValue);

  act(() => jest.advanceTimersByTime(delayTime / 2));

  act(() => result.current && result.current[1](newValue + newValue));
  act(() => result.current && result.current[1](newValue + newValue + newValue));

  expect(result.current && result.current[0]).toBe(testValue);

  act(() => jest.advanceTimersByTime(delayTime));

  expect(result.current && result.current[0]).toBe(newValue + newValue + newValue);
});
