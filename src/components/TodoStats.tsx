import { Card } from "@heroui/card";
import { Stats } from "../types";


export function TodoStats({ data }: { data: Stats | undefined }) {
    return <Card className="flex flex-row gap-16 p-4">
        {data ?
            <>

                <div className="flex flex-col">
                    <h5>Average time to complete remaining tasks:</h5>
                    <p>{data.avg == -1 ? "No enough info available" : `${formatTime(data.avg)} minutes`}</p>
                </div>
                <div className="flex flex-col">
                    <h5>Average time to complete by priority:</h5>
                    <p>Low: {data.lowPriorityAvg == -1 ? "No enough info available" : `${formatTime(data.lowPriorityAvg)} minutes`}</p>
                    <p>Medium: {data.mediumPriorityAvg == -1 ? "No enough info available" : `${formatTime(data.mediumPriorityAvg)} minutes`}</p>
                    <p>High: {data.highPriorityAvg == -1 ? "No enough info available" : `${formatTime(data.highPriorityAvg)} minutes`}</p>
                </div>
            </> : <p>No stats at the moment</p>}
    </Card>
}

export function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
}
