import { useCallback, useState } from "@lynx-js/react";
import type { BaseEvent } from "@lynx-js/types";

export type UseInputOptions<T = string> = {
  onChange?: (value: T) => void;
  validator?: (value: T) => boolean;
  formatter?: (value: T) => T;
};

export type InputInputEvent = {
  value: string;
  selectionStart: number;
  selectionEnd: number;
  isComposing?: boolean;
};

function useInput<T = string>(initialValue: T, options?: UseInputOptions<T>) {
  const [value, setValue] = useState<T>(initialValue);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleInput = useCallback(
    (e: BaseEvent<"bindinput", InputInputEvent>) => {
      const inputValue = e.detail.value as T;

      const formattedValue = options?.formatter
        ? options.formatter(inputValue)
        : inputValue;

      if (options?.validator) {
        if (!options.validator(formattedValue)) {
          return;
        }
      }

      setValue(formattedValue);

      if (options?.onChange) {
        options.onChange(formattedValue);
      }
    },
    [options]
  );

  const clear = useCallback(() => {
    setValue("" as T);
  }, []);

  return {
    value,
    reset,
    clear,
    handleInput,
  };
}

export default useInput;
