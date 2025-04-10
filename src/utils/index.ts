export function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
}

export function dueDateBackground(dueDate?: Date) {
    if(!dueDate) {
        return "bg-white"
    }
    const today = Date.now()
    if(dueDate.valueOf() - today > 1000 * 60 * 60 * 24 * 7 * 2) { // More than 2 weeks
        return "bg-green-100"
    }
    if(dueDate.valueOf() - today > 1000 * 60 * 60 * 24 * 7 * 1) { // Between one week and two weeks
        return "bg-yellow-100"
    }
    return "bg-red-100" // One week between
}
