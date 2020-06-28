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

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    courseCats: Array<CourseCat> = new Array();

    courses: Array<Course> = new Array();

    info: CourseInfo = new CourseInfo();

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

    getLesson(pageInfo: PageInfo, courseId: number, callBack?: (arr: Array<Lesson>) => any) {
        this.api.getLessonList(pageInfo.curPageNum, pageInfo.pageSize, String(courseId)).subscribe(res => {
            let arr = new Array<Lesson>();
            if (res.code === 1) {
                res.info.forEach(e => {
                    let l = new Lesson();
                    l.lessonStatus = e.lessonStatus;
                    l.loadState = e.loadState;
                    l.addTime = new Date(e.addTime);
                    l.lessonId = e.lessonId;
                    l.updateTime = new Date(e.updateTime);
                    l.sort = e.sort;
                    l.lessonName = e.lessonName;
                    l.courseName = e.courseName;
                    l.teacherId = e.teacherId;
                    l.videoUrl = e.videoUrl;
                    l.lessonLength = e.lessonLength;
                    l.transcodeDurtion = e.transcodeDurtion;
                    l.courseId = e.courseId;
                    l.lessonType = e.lessonType;
                    l.videosize = e.videosize;
                    l.downLoadTaskId = e.downLoadTaskId;
                    arr.push(l);
                });
            } else {
                console.error(res, {});
            }
            if (callBack) {
                callBack(arr);
            }
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

}
