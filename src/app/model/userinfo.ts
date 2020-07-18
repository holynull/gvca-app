import { Gender } from './gender.enum';

export class UserInfo {
    companyPosition: string;
    addTime: Date;
    idCard: string;
    departmentId: number;
    className: string;
    studentId: number;
    classId: number;
    schoolId: number;
    studentStatus: number;
    emergencyContactTel: string;
    studentSex: Gender;
    departmentName: string;
    gradeName: string;
    gradeId: number;
    majorId: number;
    emergencyContact: string;
    semesterName: string;
    updateTime: Date;
    studentPassword: string;
    semesterId: number;
    companyId: number;
    studentName: string;
    studentAddress: string;
    majorName: string;
    studentNum: string;
    photo: string;
    isScore:number; // 1允许查看成绩    2不允许
    isSort:number; // 1允许查看排名    2不允许
}