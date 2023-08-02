import * as momentTimeZone from "moment-timezone";
export declare class DateProcessService {
    constructor();
    setDate(): string;
    getShortDate(): string;
    getDiffInDays(date: any): number;
    getNextPointToPointInTime(days: number, date: any): String[];
    convertHumanDateIntoSystemDate(date: string): string;
    getBackpointInTime(days: number): momentTimeZone.Moment;
    getNextPointInTime(days: number): string;
    getNextPointDate(days: number, date: string): string[];
    getDecodeXFormat(time: string, local: string): Promise<unknown>;
    get_dateType(encodeDate?: any, local?: string, type?: string, model?: string): Promise<unknown>;
    typeDate(type: string, r: any[]): any;
}
