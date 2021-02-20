export interface AppRecord {
    version?: number;
    histories: VisitHistory[];
}

export interface VisitHistory {
    inTime: number;
    outTime: number;
    active: boolean;
    isAuto: boolean;
    locationEn: string;
    locationZh: string;
}