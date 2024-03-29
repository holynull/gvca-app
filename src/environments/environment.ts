// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    api: {
        useProxy: false,
        websocket: {
            url: 'ws://192.168.0.10/ws',
            reconnectTime: 3000 // 连接失败，重试连接时间间隔
        },
        apiDomain: '61.178.106.250:9031',
        apiProtocol: 'http',
        default: {
            timeoutMs: 2000, // 接口超时时间
            retryTimes: 2, // 接口重试次数，不包含第一次
            debug: false, // 调试状态，将显示错误信息
        },
        example: {
            timeoutMs: 2000, // 接口超时时间
            retryTimes: 2, // 接口重试次数，不包含第一次
            debug: true, // 调试状态，将显示错误信息
            url: '', // 接口的url地址
        },
        login: { // 登录接口
            id: 1,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getStu',
        },
        getAdv: { // 获取轮播图
            id: 2,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getAdv',
        },
        getNoticeCats: { // 首页分类
            id: 3,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getNoticeCat',
        },
        getNotice: { // 公告
            id: 4,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getNotice',
        },
        getCourseCat: {
            id: 5,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getCourseCat',
        },
        getCourseList: {
            id: 6,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getCourseList',
        },
        getHomeWorkList: {
            id: 7,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getHomeWorkList',
        },
        getLessonList: {
            id: 8,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getLessonList',
        },
        insertStuCourse: {
            id: 9,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/insertStuCourse',
        },
        insertStuLesson: {
            id: 10,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/insertStuLesson',

        },
        getEaxmCourseList: {
            id: 11,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getEaxmCourseList',
        },
        getEaxmCourseDetailList: {
            id: 12,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getEaxmCourseDetailList',
        },
        getQuestionList: {
            id: 13,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getQuestionList',
        },
        getExamList: {
            id: 14,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getExamList',
        },
        getExamQuestionList: {
            id: 15,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getExamQuestionList',
        },
        insertStuLxQuestion: {
            id: 16,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/insertStuLxQuestion',
        },
        insertStuQuestion: {
            id: 17,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/insertStuQuestion',
        },
        getUserInfo: {
            id: 18,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getUserInfo',

        },
        updateUserInfo: {
            id: 19,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/updateUserInfo',
        },
        uploadfile: {
            id: 20,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/uploadfile',

        },
        getSignList: {
            id: 21,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getSignList',
        },
        getSignCompany: {
            id: 22,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getSignCompany',
        },
        insertStuSign: {
            id: 23,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/insertStuSign',
        },
        insertStuHome: {
            id: 24,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/insertStuHome',
        },
        updateExemptState: {
            id: 25,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/updateExemptState',
        },
        updateHolidayState: {
            id: 26,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/updateHolidayState',
        },
        getStuLessonList: {
            id: 27,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getStuLessonList',
        },
        getStuExamList: {
            id: 28,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getStuExamList',
        },
        getStuHomeWorkList: {
            id: 29,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getStuHomeWorkList',
        },
        getExamStatistical: {
            id: 30,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getExamStatistical',
        },
        getRandomExamList:{
            id: 31,
            timeoutMs: 2000,
            retryTimes: 2,
            debug: true,
            url: '/front/app/getRandomExamList', 
        },
    },
    videoDir: 'course_video',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
