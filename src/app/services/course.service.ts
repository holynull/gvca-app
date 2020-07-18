import { Injectable } from '@angular/core';
import { CourseCat } from 'app/model/course-cat';
import { ApiService } from './api.service';
import { Course } from 'app/model/course';
import { CourseSelectStates } from 'app/model/course-sel-status';
import { PageInfo } from 'app/model/pageInfo';
import { Lesson } from 'app/model/lesson';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CourseInfo } from 'app/model/course-info';
import { LessonRecord } from 'app/model/lesson-record';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    courseCats: Array<CourseCat> = new Array();

    courses: Array<Course> = new Array();

    info: CourseInfo = new CourseInfo();

    records: Array<LessonRecord> = new Array();

    constructor(
        private api: ApiService,
    ) {

    }

    getAllCourseCats() {
        this.api.getCourseCat().subscribe(res => {
            if (res.code === 1) {
                this.courseCats.splice(0, this.courseCats.length);
                res.info.forEach(e => {
                    let cc = new CourseCat();
                    cc.addTime = new Date(e.addTime);
                    cc.courseTypeId = e.courseTypeId;
                    cc.typeName = e.typeName;
                    cc.updateTime = new Date(e.updateTime);
                    this.courseCats.push(cc);
                });
            } else {
                console.error(res, {});
            }
        })
    }

    loadCourse(type: number, pageInfo: PageInfo, callbak?: (state: CourseSelectStates) => any) {
        if (pageInfo.curPageNum === 1) {
            this.courses.splice(0, this.courses.length);
        }
        this.api.getCourseList(type, pageInfo.curPageNum, pageInfo.pageSize).subscribe(res => {
            if (res.code === 1) {
                if (pageInfo.curPageNum === 1) {
                    this.courses.splice(0, this.courses.length);
                }
                res.info.forEach(e => {
                    let course = new Course();
                    course.departmentName = e.departmentName;
                    course.courseType = e.courseType;
                    course.ifSelect = e.ifSelect;
                    course.courseDesc = e.courseDesc;
                    course.majorId = e.majorId;
                    course.addTime = new Date(e.addTime);
                    course.teacherName = e.teacherName;
                    course.departmentId = e.departmentId;
                    course.semesterName = e.semesterName;
                    course.typeName = e.typeName;
                    course.updateTime = new Date(e.updateTime);
                    course.sort = e.sort;
                    course.courseCycle = e.courseCycle;
                    course.semesterId = e.semesterId;
                    course.courseName = e.courseName;
                    course.teacherId = e.teacherId;
                    course.courseStatus = e.courseStatus;
                    course.majorName = e.majorName;
                    course.courseId = Number(e.courseId);
                    course.courseDetail = e.courseDetail;
                    course.photo = e.photo;
                    this.courses.push(course);
                });
            } else {
                console.error(res, {});
            }
            if (callbak) {
                callbak(res.selectState);
            }
        });
    }

    getCourse(id: number): Course {
        for (let i = 0; i < this.courses.length; i++) {
            if (this.courses[i].courseId === id) {
                return this.courses[i];
            }
        }
    }

    getLesson(pageInfo: PageInfo, courseId: number): Promise<Array<Lesson>> {
        return this.api.getLessonList(pageInfo.curPageNum, pageInfo.pageSize, String(courseId)).toPromise().then(res => {
            let arr = new Array<Lesson>();
            if (res.code === 1) {
                res.info.forEach(e => {
                    let l = new Lesson();
                    l.lessonStatus = e.lessonStatus;
                    l.loadState = e.loadState;
                    l.addTime = new Date(e.addTime);
                    l.lessonId = Number(e.lessonId);
                    l.updateTime = new Date(e.updateTime);
                    l.sort = e.sort;
                    l.lessonName = e.lessonName;
                    l.courseName = e.courseName;
                    l.teacherId = e.teacherId;
                    l.videoUrl = e.videoUrl;
                    l.lessonLength = Number(e.lessonLength);
                    l.transcodeDurtion = e.transcodeDurtion;
                    l.courseId = e.courseId;
                    l.lessonType = e.lessonType;
                    l.videosize = Number(e.videosize);
                    l.downLoadTaskId = e.downLoadTaskId;
                    arr.push(l);
                });
            } else {
                console.error("获取课件列表出错", res);
            }
            return arr;
        });
    }

    selectCourse(): Observable<any> {
        let cids = '';
        let arr = this.courses.filter(e => {
            return e.checked;
        });
        arr.forEach(e => {
            if (cids === '') {
                cids = String(e.courseId);
            } else {
                cids = cids + ',' + e.courseId;
            }
        });
        if (cids !== '') {
            return this.api.insertStuCourse(cids);
        } else {
            return of('no cids selected.');
        }
    }

    /**
     * 更新用户听课数据
     * @param cid  
     * @param lid 
     */
    updateLessonStuData(lesson: Lesson, gapTime: number, lessonLength: number) {
        this.api.insertStuLesson(String(lesson.courseId), String(lesson.lessonId), String(Math.floor(gapTime)), String(Math.floor(lessonLength)))
            .subscribe(res => {
                if (res.code !== 1) {
                    console.error(res);
                }
            });
    }

    getUserCourseInfo(): Promise<any> {
        return this.api.getUserInfo().toPromise().then(res => {
            if (res.code === 1) {
                this.info.questionCount = Number(res.info[0].questionCount);
                this.info.lessentTime = Number(res.info[0].lessentTime);
                this.info.examMnCount = Number(res.info[0].examMnCount);
                this.info.studentName = res.info[0].studentName;
                this.info.photo = res.info[0].photo;
                this.info.examCount = Number(res.info[0].examCount);
                return this.info;
            } else {
                console.error('获取用户的学习统计数据出错', res);
                return this.info;
            }
        });
    }

    loadLessonRecords(): Promise<boolean> {
        return this.api.getStuLessonList().toPromise().then(res => {
            if (res.code === 1) {
                this.records.splice(0, this.records.length);
                res.info.forEach(e => {
                    let record = new LessonRecord();
                    record.lessonStatus = Number(e.lessonStatus);
                    record.loadState = Number(e.loadState);
                    record.addTime = new Date(e.addTime);
                    record.lessonId = Number(e.lessonId);
                    record.updateTime = new Date(e.updateTime);
                    record.sort = Number(e.sort);
                    record.lessonName = e.lessonName;
                    record.courseName = e.courseName;
                    record.teacherId = Number(e.teacherId);
                    record.videoUrl = e.videoUrl;
                    record.lessonLength = Number(e.lessonLength);
                    record.transcodeDurtion = e.transcodeDurtion;
                    record.courseId = Number(e.courseId);
                    record.lessonType = Number(e.lessonType);
                    record.videosize = Number(e.videosize);
                    this.records.push(record);
                });
                return true;
            } else {
                console.error('获取听课记录出错', res);
                return false;
            }
        });
    }

    getLessonById(courseId: number, lessonId: number): Promise<Lesson> {
        let pageInfo = new PageInfo();
        return this.getLesson(pageInfo, courseId).then(arr => {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].lessonId === lessonId) {
                    return arr[i];
                }
            }
            return null;
        });
    }

}
