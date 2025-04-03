import { Card } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Priority } from "../http/todo";
import { Input } from "@heroui/input";
import { TodoFilter } from "../types";
import { useState } from "react";

export const states: { label: string, value: boolean | null }[] = [
    { label: "All", value: null },
    { label: "Done", value: true },
    { label: "Undone", value: false },
]


export const priorities: { label: string, value: Priority | null }[] = [
    { label: "All", value: null },
    { label: "High", value: "HIGH" },
    { label: "Medium", value: "MEDIUM" },
    { label: "Low", value: "LOW" },
]


export interface TodoFiltersProps {
    onChange: (filter: TodoFilter) => unknown
}

export function TodoFilters() {
    const [filter, setFilter] = useState<TodoFilter>({})

    return <Card className="p-4">
        <div className="flex gap-8 items-center ">
            <label className="w-16 text-left flex-shrink-0">Text</label>
            <Input label="Text search" placeholder="Write a text the todo must contain"></Input>
        </div>
        <div className="flex gap-8 items-center  ">
            <label className="w-16 text-left flex-shrink-0">Priority</label>
            <Select
                size="sm"
                className="max-w-xs"
                items={priorities}
                label="Priority filter"
                placeholder="Select a priority to filter by"
            >
                {(priority: typeof priorities[0]) => <SelectItem key={priority.value}>{priority.label}</SelectItem>}
            </Select>
        </div>
        <div className="flex gap-8 items-center ">
            <label className="w-16 text-left flex-shrink-0">State</label>
            <Select
                size="sm"
                className="max-w-xs"
                items={priorities}
                label="State filter"
                placeholder="Select a state to filter by"
            >
                {(priority: typeof priorities[0]) => <SelectItem key={priority.value}>{priority.label}</SelectItem>}
            </Select>
        </div>
    </Card >
}