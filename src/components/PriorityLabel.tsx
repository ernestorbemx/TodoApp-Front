const classes: Record<string, string> = {
    "HIGH": "bg-red-600 text-white",
    "MEDIUM": "bg-yellow-400 dark:bg-yellow-300 text-black",
    "LOW": "bg-blue-600 text-white"
}

const labels: Record<string, string> = {
    "HIGH": "High",
    "MEDIUM": "Medium",
    "LOW": "Low"
}
export function PriorityLabel({ priority }: { priority?: string }) {


    if (!priority) {
        return null;
    }

    return <div className={`px-2 py-1 rounded-md w-max ${classes[priority]}`}>
        {labels[priority]}
    </div>
}