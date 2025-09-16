import { renderHook, act } from "@lynx-js/react/testing-library";
import { useError } from "../../src/react-use";

const setup = () => renderHook(() => useError());

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error on error dispatch", () => {
  const errorStr = "some_error";

  try {
    const { result } = setup();

    act(() => {
      result.current(new Error(errorStr));
    });
  } catch (err) {
    // @ts-ignore
    expect(err.message).toEqual(errorStr);
  }
});
