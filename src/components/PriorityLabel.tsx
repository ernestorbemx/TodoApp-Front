import { Priority } from "../http/todo";

const classes: Record<string, string> = {
  HIGH: "bg-red-600 text-white",
  MEDIUM: "bg-yellow-400 dark:bg-yellow-300 text-black",
  LOW: "bg-blue-600 text-white",
};

const labels: Record<string, string> = {
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
};

/**
 * Props for the PriorityLabel component.
 */
export interface PriorityLabelProps {
  /** Priority level to display. */
  priority: Priority;
}

/**
 * Renders a label for the given priority level.
 * @param {PriorityLabelProps} props - Props for the PriorityLabel component.
 */
export function PriorityLabel({ priority }: PriorityLabelProps) {
  if (!priority) {
    return null;
  }

  return (
    <div
      className={`inline-flex px-2 py-1 rounded-md w-max ${classes[priority]}`}
    >
      {labels[priority]}
    </div>
  );
}
