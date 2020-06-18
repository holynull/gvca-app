import { Injectable } from '@angular/core';
import { CourseCat } from 'app/model/course-cat';
import { ApiService } from './api.service';
import { Course } from 'app/model/course';
import { CourseSelectStates } from 'app/model/course-sel-status';
import { PageInfo } from 'app/model/pageInfo';
import { Lesson } from 'app/model/lesson';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    courseCats: Array<CourseCat> = new Array();

    courses: Array<Course> = new Array();

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
                // todo: 测试多视频播放
                let l = new Lesson();
                l.videoUrl = 'http://static.videogular.com/assets/videos/videogular.mp4';
                l.lessonId = new Date().getTime();
                // arr.push(l);
                arr.unshift(l);
                callBack(arr);
            }
        });
    }


}