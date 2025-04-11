import { Card } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Priority } from "../http/todo";
import { Input } from "@heroui/input";
import { TodoFilter } from "../types";
import { useState } from "react";
import { Button } from "@heroui/button";

const states: { label: string, value: boolean | '' }[] = [
    { label: "All", value: '' },
    { label: "Done", value: true },
    { label: "Undone", value: false },
]


const priorities: { label: string, value: Priority | '' }[] = [
    { label: "All", value: '' },
    { label: "High", value: "HIGH" },
    { label: "Medium", value: "MEDIUM" },
    { label: "Low", value: "LOW" },
]


export interface TodoFiltersProps {
    onChange: (filter: TodoFilter) => unknown,
    searching: boolean
}

export function TodoFilters({ onChange, searching }: TodoFiltersProps) {
    const [filter, setFilter] = useState<TodoFilter>({})

    return <Card className="p-4 gap-4 w-full">
        <h3 className="text-left font-bold text-lg">Filters</h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-2 items-start ">
            <label className="w-16 text-left flex-shrink-0 font-semibold">Text</label>
            <Input data-testid="text-filter" label="Text search" placeholder="Write a text the todo must contain" onValueChange={(text) => {
                setFilter(f => ({ ...f, text: text }))
            }}></Input>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-2 items-start ">
            <label className="w-16 text-left flex-shrink-0 font-semibold">Priority</label>
            <Select
                data-testid="priority-filter"
                size="sm"
                className="max-w-xs"
                items={priorities}
                label="Priority filter"
                placeholder="Select a priority to filter by"
                onSelectionChange={(key) => {
                    setFilter(f => ({ ...f, priority: key.currentKey as Priority }))
                }}
            >
                {(priority: typeof priorities[0]) => <SelectItem key={priority.value}>{priority.label}</SelectItem>}
            </Select>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-2 items-start ">
            <label className="w-16 text-left flex-shrink-0 font-semibold">State</label>
            <Select
                data-testid="status-filter"
                size="sm"
                className="max-w-xs"
                items={states}
                label="State filter"
                placeholder="Select a state to filter by"
                onSelectionChange={(key) => {
                    setFilter(f => ({ ...f, done: key.currentKey as unknown as boolean }))
                }}
            >
                {(state: typeof states[0]) => <SelectItem key={String(state.value)}>{state.label}</SelectItem>}
            </Select>
        </div>
        <Button color="primary" data-testid="filters-button" onPress={() => onChange(filter)} isLoading={searching}>Search</Button>
    </Card >
}