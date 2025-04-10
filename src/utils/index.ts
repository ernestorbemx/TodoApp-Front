export function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
}

export function dueDateBackground(dueDate?: Date) {
    if(!dueDate) {
        return "bg-transparent dark:text-white"
    }
    const today = Date.now()
    if(dueDate.valueOf() - today > 1000 * 60 * 60 * 24 * 7 * 2) { // More than 2 weeks
        return "bg-green-200 dark:bg-green-400 dark:text-black"
    }
    if(dueDate.valueOf() - today > 1000 * 60 * 60 * 24 * 7 * 1) { // Between one week and two weeks
        return "bg-yellow-200 dark:bg-yellow-400 dark:text-black"
    }
    return "bg-red-200 dark:bg-red-400 dark:text-black" // One week between
}
