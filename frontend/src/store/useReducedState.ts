import { useCallback } from "react";
import { RecoilState, useRecoilState } from "recoil";

export function useReducedState<T, T2>(
  state: RecoilState<T>,
  getter: (state: T) => T2,
  setter: (state: T, value: T2) => T
): [T2, (newValue: T2) => void] {
  const [value, setValue] = useRecoilState<T>(state);
  const setter2 = useCallback(
    (newValue: T2) => {
      setValue((prev: T): T => setter(prev, newValue));
    },
    [setValue, setter]
  );
  return [getter(value), setter2];
}
