import { ClockFaceTime } from '../models/clock-face-time.interface';
import { DisabledTimeConfig } from '../models/disabled-time-config.interface';
export declare class TimepickerTimeUtils {
    static getHours(format: number): ClockFaceTime[];
    static disableHours(hours: ClockFaceTime[], config: DisabledTimeConfig): ClockFaceTime[];
    static getMinutes(gap?: number): ClockFaceTime[];
    static disableMinutes(minutes: ClockFaceTime[], selectedHour: number, config: DisabledTimeConfig): ClockFaceTime[];
}
