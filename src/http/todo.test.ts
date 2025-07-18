import {
  getTodos,
  createTodo,
  editTodo,
  deleteTodo,
  changeStatus,
  getSTats,
  CreateTodo,
} from "./todo";
import { http } from "./client";
import { vi, expect, test } from "vitest";

vi.mock("./client");

/**
 * Tests the `getTodos` function to ensure it calls the correct endpoint.
 */
test("getTodos should call the correct endpoint", async () => {
  const mockResponse = { data: [], status: 200 };
  vi.mocked(http.get).mockResolvedValueOnce(mockResponse);

  const result = await getTodos(
    {},
    { sortingFields: "" },
    { page: 1, size: 10 }
  );
  expect(http.get).toHaveBeenCalledWith("/todos?sortingFields=&page=1&size=10");
  expect(result).toEqual(mockResponse);
});

/**
 * Tests the `createTodo` function to ensure it posts to the correct endpoint.
 */
test("createTodo should post to the correct endpoint", async () => {
  const mockTodo: CreateTodo = { text: "Test Todo", priority: "HIGH" };
  const mockResponse = { data: mockTodo, status: 201 };
  vi.mocked(http.post).mockResolvedValueOnce(mockResponse);

  const result = await createTodo(mockTodo);
  expect(http.post).toHaveBeenCalledWith("/todos", mockTodo);
  expect(result).toEqual(mockResponse);
});

/**
 * Tests the `editTodo` function to ensure it puts to the correct endpoint.
 */
test("editTodo should put to the correct endpoint", async () => {
  const mockTodo: CreateTodo = { text: "Updated Todo", priority: "MEDIUM" };
  const mockResponse = { data: mockTodo, status: 200 };
  vi.mocked(http.put).mockResolvedValueOnce(mockResponse);

  const result = await editTodo(1, mockTodo);
  expect(http.put).toHaveBeenCalledWith("/todos/1", mockTodo);
  expect(result).toEqual(mockResponse);
});

/**
 * Tests the `deleteTodo` function to ensure it deletes the correct endpoint.
 */
test("deleteTodo should delete the correct endpoint", async () => {
  const mockResponse = { status: 204 };
  vi.mocked(http.delete).mockResolvedValueOnce(mockResponse);

  const result = await deleteTodo(1);
  expect(http.delete).toHaveBeenCalledWith("/todos/1");
  expect(result).toEqual(mockResponse);
});

/**
 * Tests the `changeStatus` function to ensure it calls the correct endpoints for done/undone.
 */
test("changeStatus should patch the correct endpoint", async () => {
  await changeStatus(1, true);
  expect(http.put).toHaveBeenCalledWith("/todos/1/done");
  await changeStatus(1, false);
  expect(http.put).toHaveBeenCalledWith("/todos/1/undone");
});

/**
 * Tests the `getStats` function to ensure it calls the correct endpoint.
 */
test("getStats should call the correct endpoint", async () => {
  getSTats();
  expect(http.get).toHaveBeenCalledWith("/todos/stats");
});
