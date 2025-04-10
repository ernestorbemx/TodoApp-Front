import { Card } from "@heroui/card";
import { Stats } from "../types";
import { formatTime } from "../utils";
import { PriorityLabel } from "./PriorityLabel";


export function TodoStats({ data }: { data: Stats | undefined }) {
    return <Card className="flex flex-col md:flex-row gap-x-16 gap-y-8 p-4">
        {data ?
            <>
                <div className="grid place-items-center">
                    <div className="flex flex-col">
                        <h5>Average time to complete <b>remaining</b> tasks:</h5>
                        <p>{data.avg == -1 ? "No enough info available" : <span className="font-bold font-mono text-lg">{formatTime(data.avg)} minutes</span>}</p>
                    </div>

                </div>
                <div className="flex flex-1 flex-col">
                    <h5>Average time to complete by <b>priority</b>:</h5>
                    <div className="flex flex-col gap-1">
                        <p><PriorityLabel priority="HIGH"></PriorityLabel> {data.lowPriorityAvg == -1 ? "No enough info available" : <span className="font-bold font-mono text-lg">{formatTime(data.lowPriorityAvg)} minutes</span>}</p>
                        <p><PriorityLabel priority="MEDIUM"></PriorityLabel> {data.mediumPriorityAvg == -1 ? "No enough info available" : <span className="font-bold font-mono text-lg">{formatTime(data.mediumPriorityAvg)} minutes</span>}</p>
                        <p><PriorityLabel priority="LOW"></PriorityLabel> {data.highPriorityAvg == -1 ? "No enough info available" : <span className="font-bold font-mono text-lg">{formatTime(data.highPriorityAvg)} minutes</span>}</p>
                    </div>
                </div>
            </> : <p>No stats at the moment</p>}
    </Card>
}

