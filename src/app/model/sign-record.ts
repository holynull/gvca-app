import { SignStatus } from './sign-status.enum';
import { ExemptState } from './exempt-state.enum';
import { HolidayState } from './holiday-state.enum';

export class SignRecord {
    gradeId: number;
    signAddress: string;
    majorId: number;
    addTime: Date;
    departmentId: number;
    latitude: number;
    signStatus: SignStatus;
    exemptState: ExemptState;
    updateTime: Date;
    signDate: Date;
    timedate: string;
    holidayState: HolidayState;
    recordId: number;
    studentId: number;
    classId: number;
    schoolId: number;
    company: number;
    longitude: number;
}