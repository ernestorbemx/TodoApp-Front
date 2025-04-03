import { Card } from "@heroui/card";


export function TodoStats() {
    return <Card className="flex flex-row gap-16 p-4">
        <div className="flex flex-col">
            <h5>Average time to complete remaining tasks:</h5>
            <p>30:00 minutes</p>
        </div>
        <div className="flex flex-col">
            <h5>Average time to complete by priority:</h5>
            <p>Low: 5:00 minutes</p>
            <p>Medium: 15:00 minutes</p>
            <p>High: 15:00 minutes</p>
        </div>
    </Card>
}