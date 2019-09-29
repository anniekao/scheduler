import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application/Application";

afterEach(cleanup);

const consoleError = console.error;
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((...args) => {
    if (
      !args[0].includes(
        "Warning: An update to %s inside a test was not wrapped in act"
      )
    ) {
      consoleError(...args);
    }
  });
});

it("renders without crashing", () => {
  render(<Application />);
});
