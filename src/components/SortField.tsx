import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

/**
 * Props for the SortField component.
 */
export interface SortFieldProps {
  /** The label or content to display for the sort field. */
  children: React.ReactNode;
  /** Indicates if the sorting is initially ascending. */
  ascending?: boolean;
  /** Callback triggered when the sorting order changes. */
  onChange: (ascending: boolean) => unknown;
}

/**
 * Renders a clickable sort field with ascending/descending icons.
 * @param {SortFieldProps} props - Props for the SortField component.
 */
export function SortField({
  children,
  ascending: ascProp,
  onChange,
}: SortFieldProps) {
  // State to manage the current sorting order
  const [ascending, setAscending] = useState(ascProp ? true : false);

  return (
    <div
      className="flex gap-1 items-center"
      data-testid="sort-field"
      onClick={() => {
        setAscending(!ascending); // Toggle sorting order
        onChange(!ascending); // Trigger the onChange callback
      }}
    >
      {children}{" "}
      {ascending ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
    </div>
  );
}
