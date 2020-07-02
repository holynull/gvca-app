import { LessonRecordType } from './lesson-record-type.enum';

export class LessonRecord {
    lessonStatus: number;
    loadState: number;
    addTime: Date;
    lessonId: number;
    updateTime: Date;
    sort: number;
    lessonName: string;
    courseName: string;
    teacherId: number;
    videoUrl: string;
    lessonLength: number;
    transcodeDurtion: string;
    courseId: number;
    lessonType: LessonRecordType;
    videosize: number;
}