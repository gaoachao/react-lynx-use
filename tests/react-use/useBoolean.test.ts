import { useToggle, useBoolean } from "../../src/react-use";

it("should be an alias for useToggle ", () => {
  expect(useBoolean).toBe(useToggle);
});
