export function convertMinutesToHourMinute(minutes: number): string {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hrs > 0) {
        return `${hrs} giờ ${mins} phút`;
    }
    return `${mins} phút`;
}
