import { Card } from "@heroui/card";
import { Stats } from "../types";
import { formatTime } from "../utils";
import { PriorityLabel } from "./PriorityLabel";

/**
 * Props for the TodoStats component.
 */
interface TodoStatsProps {
  /** Statistics data for todos. */
  data: Stats | undefined;
}

/**
 * Renders a card displaying statistics about todos.
 * @param {TodoStatsProps} props - Props for the TodoStats component.
 */
export function TodoStats({ data }: TodoStatsProps) {
  return (
    <Card className="flex flex-col md:flex-row gap-x-16 gap-y-8 p-4">
      {data ? (
        <>
          <div className="grid place-items-center">
            <div className="flex flex-col">
              <h5>
                Average time to complete <b>remaining</b> tasks:
              </h5>
              <p>
                {data.avg === -1 ? (
                  "No enough info available"
                ) : (
                  <span className="font-bold font-mono text-lg">
                    {formatTime(data.avg)}
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <h5>
              Average time to complete by <b>priority</b>:
            </h5>
            <div className="flex flex-col gap-1">
              {/* High priority stats */}
              <div>
                <PriorityLabel priority="HIGH" />{" "}
                {data.highPriorityAvg === -1 ? (
                  "No enough info available"
                ) : (
                  <span className="font-bold font-mono text-lg">
                    {formatTime(data.highPriorityAvg)}
                  </span>
                )}
              </div>
              {/* Medium priority stats */}
              <div>
                <PriorityLabel priority="MEDIUM" />{" "}
                {data.mediumPriorityAvg === -1 ? (
                  "No enough info available"
                ) : (
                  <span className="font-bold font-mono text-lg">
                    {formatTime(data.mediumPriorityAvg)}
                  </span>
                )}
              </div>
              {/* Low priority stats */}
              <div>
                <PriorityLabel priority="LOW" />{" "}
                {data.lowPriorityAvg === -1 ? (
                  "No enough info available"
                ) : (
                  <span className="font-bold font-mono text-lg">
                    {formatTime(data.lowPriorityAvg)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No stats at the moment</p>
      )}
    </Card>
  );
}
