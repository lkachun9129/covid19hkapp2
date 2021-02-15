export interface AppRecord {
    histories: VisitHistory[];
}

export interface VisitHistory {
    inTime: number;
    outTime: number;
    active: boolean;
    isAuto: boolean;
    location: string;
}