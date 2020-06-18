import { Lesson } from './lesson';

export class Course {
    departmentName: string;
    courseType: number;
    ifSelect: number;
    courseDesc: number;
    majorId: number;
    addTime: Date;
    teacherName: string;
    departmentId: number;
    semesterName: string;
    typeName: string;
    updateTime: Date;
    sort: number;
    courseCycle: string;
    semesterId: number;
    courseName: string;
    teacherId: number;
    courseStatus: number;
    majorName: string;
    courseId: number;
    courseDetail: string;
    photo: string;
    lessons: Array<Lesson> = new Array();
    checked: boolean;
}