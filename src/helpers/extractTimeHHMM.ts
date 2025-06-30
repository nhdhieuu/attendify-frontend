export function extractTimeHHMM(datetimeString: string) {
    const date = new Date(datetimeString);
    const hh = date.getHours().toString().padStart(2, '0');
    const mm = date.getMinutes().toString().padStart(2, '0');
    return `${hh}:${mm}`;
}
