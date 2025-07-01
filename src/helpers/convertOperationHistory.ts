import {OperationHistory, OperationHistoryStatus} from "@/types/operation.interface";

export interface OperationHistoryUI {
    type: "check-in" | "check-out";
    time: string; // formatted as "HH:mm"
    date: string; // "Hôm nay" | "Hôm qua" | "2 ngày trước" | "x ngày trước"
    location: string;
    status: "success" | "late";
}

export function convertOperationHistoryToUI(operationHistory: OperationHistory[]): OperationHistoryUI[] {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const diffTime = today.getTime() - date.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Hôm nay";
        if (diffDays === 1) return "Hôm qua";
        if (diffDays === 2) return "2 ngày trước";
        return `${diffDays} ngày trước`;
    };

    const formatTime = (timeStr: string) => {
        const date = new Date(timeStr);
        return date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const getStatusText = (status: OperationHistoryStatus) => {
        switch (status) {
            case OperationHistoryStatus.ONTIME:
                return "success";
            case OperationHistoryStatus.EARLY:
                return "success";
            case OperationHistoryStatus.LATE:
                return "late";
            default:
                return "success";
        }
    };

    return operationHistory.map(item => ({
        type: item.operation.toLowerCase() === "check-in" ? "check-in" : "check-out",
        time: formatTime(item.time),
        date: formatDate(item.date),
        location: "Văn phòng chính", // Default location, you can modify this based on your needs
        status: getStatusText(item.status),
    }));
}
