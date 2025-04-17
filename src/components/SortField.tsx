import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface SortFieldProps {
  children: React.ReactNode;
  ascending?: boolean;
  onChange: (ascending: boolean) => unknown;
}

export function SortField({
  children,
  ascending: ascProp,
  onChange,
}: SortFieldProps) {
  const [ascending, setAscending] = useState(ascProp ? true : false);

  return (
    <div
      className="flex gap-1 items-center"
      data-testid="sort-field"
      onClick={() => {
        setAscending(!ascending);
        onChange(!ascending);
      }}
    >
      {children}{" "}
      {ascending ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
    </div>
  );
}
