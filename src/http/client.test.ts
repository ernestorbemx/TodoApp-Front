import { http } from "./client";
import { expect, test } from "vitest";

test("client should be an axios instance", () => {
  expect(http).toBeDefined();
});

test("client should have the correct base URL", () => {
  expect(http.defaults.baseURL).toBe("http://localhost:9090/"); // Replace with actual base URL if different
});
