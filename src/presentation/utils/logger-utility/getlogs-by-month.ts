import { LoggerEntity } from "@domain/logger/entities/logger-entity";


interface ILog {
    level: string
    timestamp: string
    message: string
}
export function groupLogsByMonth(logs: any[]) {
    const groupedLogs: Record<string, any[]> = {};

    logs.forEach(log => {
        const date = new Date(log.timestamp);
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();

        const key = `${month} ${year}`;

        if (!groupedLogs[key]) {
            groupedLogs[key] = [];
        }

        groupedLogs[key].push({
            level: log.level,
            timestamp: log.timestamp,
            message: log.message,
        });
    });

    return groupedLogs;
}
