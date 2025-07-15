import { Card } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Priority } from "../http/todo";
import { Input } from "@heroui/input";
import { TodoFilter } from "../types";
import { useState } from "react";
import { Button } from "@heroui/button";

// Define available states for filtering
const states: { label: string; value: boolean | "" }[] = [
  { label: "All", value: "" },
  { label: "Done", value: true },
  { label: "Undone", value: false },
];

// Define available priorities for filtering
const priorities: { label: string; value: Priority | "" }[] = [
  { label: "All", value: "" },
  { label: "High", value: "HIGH" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Low", value: "LOW" },
];

export interface TodoFiltersProps {
  onChange: (filter: TodoFilter) => unknown; // Callback to handle filter changes
  searching: boolean; // Indicates if a search operation is in progress
}

export function TodoFilters({ onChange, searching }: TodoFiltersProps) {
  const [filter, setFilter] = useState<TodoFilter>({}); // State to store current filter values

  return (
    <Card className="p-4 gap-4 w-full">
      <h3 className="text-left font-bold text-lg">Filters</h3>

      {/* Text filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-2 items-start ">
        <label className="w-16 text-left flex-shrink-0 font-semibold">
          Text
        </label>
        <Input
          data-testid="text-filter"
          label="Text search"
          placeholder="Write a text the todo must contain"
          value={filter.text || ""}
          onValueChange={(text) => {
            setFilter((f) => ({ ...f, text: text })); // Update text filter value
          }}
        ></Input>
      </div>

      {/* Priority filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-2 items-start ">
        <label className="w-16 text-left flex-shrink-0 font-semibold">
          Priority
        </label>
        <Select
          data-testid="priority-filter"
          size="sm"
          className="max-w-xs"
          items={priorities}
          label="Priority filter"
          placeholder="Select a priority to filter by"
          selectedKeys={[filter.priority || ""]}
          onSelectionChange={(key) => {
            setFilter((f) => ({ ...f, priority: key.currentKey as Priority })); // Update priority filter value
          }}
        >
          {(priority: (typeof priorities)[0]) => (
            <SelectItem key={priority.value}>{priority.label}</SelectItem>
          )}
        </Select>
      </div>

      {/* State filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-2 items-start ">
        <label className="w-16 text-left flex-shrink-0 font-semibold">
          State
        </label>
        <Select
          data-testid="status-filter"
          size="sm"
          className="max-w-xs"
          items={states}
          label="State filter"
          placeholder="Select a state to filter by"
          selectedKeys={[filter.done === undefined ? "" : String(filter.done)]}
          onSelectionChange={(key) => {
            setFilter((f) => ({
              ...f,
              done: key.currentKey as unknown as boolean, // Update state filter value
            }));
          }}
        >
          {(state: (typeof states)[0]) => (
            <SelectItem key={String(state.value)}>{state.label}</SelectItem>
          )}
        </Select>
      </div>

      {/* Search button */}
      <Button
        color="primary"
        data-testid="filters-button"
        onPress={() => onChange(filter)} // Trigger onChange with current filter values
        isLoading={searching}
      >
        Search
      </Button>

      {/* Reset button */}
      <Button
        color="secondary"
        variant="flat"
        data-testid="reset-filters-button"
        onPress={() => {
          setFilter({}); // Clear all filters
          onChange({}); // Trigger onChange with empty filter
        }}
      >
        Reset
      </Button>
    </Card>
  );
}
