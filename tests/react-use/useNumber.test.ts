import { useNumber, useCounter } from "../../src/react-use";

it('should be an alias for useCounter', () => {
  expect(useNumber).toBe(useCounter);
});
