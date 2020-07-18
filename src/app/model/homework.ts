import { HomeworkStatus } from './homework-status.enum';

export class Homework {
    dataUrl: string;
    departmentName: string;
    majorId: number;
    addTime: Date;
    teacherName: string;
    homeworkDetail: string;
    departmentId: number;
    homeworkStatus: number;
    semesterName: string;
    updateTime: Date;
    sort: number;
    workTime: Date;
    stuhomeworkStatus: HomeworkStatus;
    homeworkName: string;
    semesterId: number;
    score: string;
    homeworkId: number;
    teacherId: number;
    workTimeStr: string;
    schoolId: number;
    majorName: string;
    stuAnsPhoto: string;
    checkResult:string;

    workTimeToStr(): string {
        return (this.workTime.getMonth() + 1) + '月' + (this.workTime.getDate()) + '日';
    }

    workTimeToWeekDayStr(): string {
        switch (this.workTime.getDay()) {
            case 0:
                return '星期日';
            case 1:
                return '星期一';
            case 2:
                return '星期二';
            case 3:
                return '星期三';
            case 4:
                return '星期四';
            case 5:
                return '星期五';
            case 6:
                return '星期六';
        }
    }
}