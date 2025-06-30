import {WorkHourChartData} from "@/components/attendance-chart";
import {Operation} from "@/types/operation.interface";

export const convertToChartData = (apiData: Operation[]): WorkHourChartData[] => {
    const dayMapping: { [key: number]: string } = {
        1: "CN",  // Chủ nhật
        2: "T2",  // Thứ 2
        3: "T3",  // Thứ 3
        4: "T4",  // Thứ 4
        5: "T5",  // Thứ 5
        6: "T6",  // Thứ 6
        7: "T7"   // Thứ 7
    }

    const weekData: { [key: string]: number } = {
        "CN": 0,
        "T2": 0,
        "T3": 0,
        "T4": 0,
        "T5": 0,
        "T6": 0,
        "T7": 0
    }

    apiData.forEach(item => {
        const workDate = new Date(item.workDate)
        const dayOfWeek = workDate.getDay() === 0 ? 7 : workDate.getDay()
        const dayName = dayMapping[dayOfWeek === 0 ? 1 : dayOfWeek + 1]

        if (dayName && item.totalHours > 0) {
            weekData[dayName] = Math.round(item.totalHours * 10) / 10
        }
    })

    return [
        {day: "T2", hours: weekData["T2"]},
        {day: "T3", hours: weekData["T3"]},
        {day: "T4", hours: weekData["T4"]},
        {day: "T5", hours: weekData["T5"]},
        {day: "T6", hours: weekData["T6"]},
        {day: "T7", hours: weekData["T7"]},
        {day: "CN", hours: weekData["CN"]}
    ]
}