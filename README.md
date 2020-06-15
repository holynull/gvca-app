# 安装运行调试

1. 安装ionic cli `npm install -g @ionic/cli`
2. 安装 `npm install`
3. 启动 `ionic serve`
4. 用户chrome访问后台提示的端口，进行调试

# API 说明

App接口：

## 1登陆：

请求示例：http://kzs.7east.cn/front/app/getStu?studentName=peter11&studentPassword=1111
请求参数：studentName：账号（学员姓名）
studentPassword：密码

返回参数示例：

```
{
    "code": 1,
    "studentInfo": {
        "companyPosition": "开发1111",
        "addTime": 1517306820000,
        "idCard": "111112222",
        "departmentId": 1,
        "className": "计算一班",
        "studentId": 34789,
        "classId": 1,
        "schoolId": 1,
        "studentStatus": 1,
        "emergencyContactTel": "1116777",
        "studentSex": 1,
        "departmentName": "电气信息系",
        "gradeName": "2012级",
        "gradeId": 1,
        "majorId": 1,
        "emergencyContact": "1111177777",
        "semesterName": "大一（上）",
        "updateTime": 1578389324083,
        "studentPassword": "1111",
        "semesterId": 1,
        "companyId": 1,
        "studentName": "peter11",
        "studentAddress": "12222",
        "majorName": "计算机专业",
        "studentNum": "09999"
    },
    "codeMsg": "peter11登陆成功！",
    "token": "34789"
}
```

参数解析：code：状态码，1成功登陆 0账号或密码错误  -1其他错误
         codeMsg：状态信息
         studentInfo：学员信息（功能扩展使用）
         token：其他请求使用token

## 2获取轮播图：

请求示例：http://kzs.7east.cn/front/app/getAdv
请求参数：token

返回参数示例：

```
{
    "code": 1,
    "codeMsg": "获取轮播图列表成功！",
    "info": [
        {
            "image": "http://kzs.7east.cn:80/data/2020/03/11//20200311223023-张雪峰.jpg",
            "addTime": 1583932947079,
            "slideShowName": "banner",
            "startTime": 1583856000000,
            "updateTime": 1591802064843,
            "endTime": 1684028800000,
            "slideShowId": 2,
            "url": "www.baidu.com",
            "status": 1
        },
        {
            "image": "http://kzs.7east.cn:80/data/2020/03/11//20200311223023-张雪峰.jpg",
            "addTime": 1583934861038,
            "slideShowName": "首页轮播图",
            "startTime": 1583269200000,
            "updateTime": 1591808375781,
            "endTime": 1683856000000,
            "slideShowId": 3,
            "url": "www.baidu.com",
            "status": 1
        }
    ]
}
```
参数解析： code：状态码，1成功 0无数据  -1未知token         
codeMsg：状态信息
image：图片路径
      slideShowName：轮播图名称
url：外链
startTime：轮播图有效期开始时间戳（毫秒）服务端已判断
endTime：轮播图有效期结束时间戳（毫秒）服务端已判断


## 3获取通知公告类型：（如果嫌麻烦可以写死但是noticeCatId需要对应到获取公告列表的type）

请求示例：http://kzs.7east.cn/front/app/getNoticeCat
请求参数：token
返回参数示例：

```
{
    "code": 1,
    "codeMsg": "获取通知类型成功！",
    "info": [
        {
            "noticeCatId": 1,
            "name": "校内通知",
            "onlineState": 1
        },
        {
            "noticeCatId": 2,
            "name": "系统公告",
            "onlineState": 1
        },
        {
            "noticeCatId": 3,
            "name": "广告",
            "onlineState": 1
        },
        {
            "noticeCatId": 4,
            "name": "公益活动",
            "onlineState": 1
        },
        {
            "noticeCatId": 5,
            "name": "培训通知",
            "onlineState": 1
        },
        {
            "noticeCatId": 6,
            "name": "公共信息",
            "onlineState": 1
        }
    ]
}
```

参数解析： code：状态码，1成功 0无数据  -1未知token         
noticeCatId：类型ID 对应获取公告列表的type参数
name：公告类型
     


## 4获取首页通知以及公告列表接口：

请求示例：http://kzs.7east.cn/front/app/getNotice?type=1
请求参数：token
 	  type:公告类型noticeCatId

返回参数示例：

```
{
    "code": 1,
    "codeMsg": "获取通知列表成功！",
    "info": [
        {
            "addTime": 1517306820000,
            "sender": "甘肃建筑职业技术学院",
            "schoolId": 0,
            "noticeStatus": 1,
            "updateTime": 1589197580049,
            "title": "放假通知!!111111111111",
            "noticeId": 1,
            "content": "<p><img src=\"http: \/\/kzs.7east.cn:80\/data\/2020\/03\/11\/\/20200311224111-袁腾飞.jpg\">       老弟们,明天放假!!!   <br></p><img src=\"http://kzs.7east.cn:80/data/2020/03/11//20200311230322-李永乐.png\">"
        }
    ]
}
```

参数解析： code：状态码，1成功 0无数据  -1未知token         
codeMsg：状态信息
sender：通知发送方
title：通知标题
content：通知详细内容（富文本内容）




## 5获取课程类型：（如果嫌麻烦可以写死但是courseTypeId需要对应到获取课程列表的type）

请求示例：http://kzs.7east.cn/front/app/getCourseCat
请求参数：token
返回参数示例：

```
{
    "code": 1,
    "codeMsg": "获取课程类型成功！",
    "info": [
        {
            "addTime": 1517306820000,
            "courseTypeId": 1,
            "typeName": "基本素质教学课程",
            "updateTime": 1583810554850
        },
        {
            "addTime": 1517306820000,
            "courseTypeId": 2,
            "typeName": "专业教学课程",
            "updateTime": 1583810571997
        },
        {
            "addTime": 1517306820000,
            "courseTypeId": 3,
            "typeName": "素质拓展教学课程",
            "updateTime": 1583810589246
        }
    ]
}
```

参数解析： code：状态码，1成功 0无数据  -1未知token         
courseTypeId：类型ID 对应获取课程列表的type参数
typeName：课程类型




## 6获取课程列表接口：
请求示例：http://kzs.7east.cn/front/app/getCourseList?type=1&pageNo=1&pageSize=10
请求参数：token
 	  type:课程类型courseTypeId
  pageNo：页数（从1开始）
  pageSize：每页数量
返回参数示例：

```
{
    "code": 1,
    "codeMsg": "获取课程列表成功！",
    "pageNo": 1,
    "selectState": 1,
    "info": [
        {
            "departmentName": "电气信息系",
            "courseType": 1,
            "ifSelect": 0,
            "courseDesc": "344545",
            "majorId": 1,
            "addTime": 1583980063464,
            "teacherName": "王老师",
            "departmentId": 1,
            "semesterName": "大一（上）",
            "typeName": "基本素质教学课程",
            "updateTime": 1583981879887,
            "sort": 1,
            "courseCycle": "",
            "semesterId": 1,
            "courseName": "阅读理解专项训练",
            "teacherId": 111,
            "courseStatus": 1,
            "majorName": "计算机专业",
            "courseId": 2,
            "courseDetail": "<img src=\"http: //kzs.7east.cn:80/data/2020/03/12//20200312105620-廖雪峰.png\">"
        }
    ]
}
```

参数解析： code：状态码，1成功 0无数据  -1未知token         
codeMsg：状态信息
pageNo：当前页数
courseName：课程名称
majorName：专业名
teacherName：教师名称
departmentName：所属院系
majorName：所属专业
semesterName：所属学期
selectState：是否需要选课0不需要  1需要




## 7获取作业列表接口：

请求示例：http://kzs.7east.cn/front/app/getHomeWorkList?pageNo=1&pageSize=10
请求参数：token
  pageNo：页数（从1开始）
  pageSize：每页数量
返回参数示例：

```

{
    "code": 1,
    "pageNo": 1,
    "codeMsg": "获取作业列表成功！",
    "info": [
        {
            "dataUrl": "http://kzs.7east.cn/data/2020/02/17/20200217112115-TIM图片20200110180553.gif",
            "departmentName": "电气信息系",
            "majorId": 1,
            "addTime": 1581909680224,
            "teacherName": "王老师",
            "homeworkDetail": "233",
            "departmentId": 1,
            "homeworkStatus": 1,
            "semesterName": "大一（上）",
            "updateTime": 1581909680224,
            "sort": 12,
            "workTime": 1591912800000,
            "stuhomeworkStatus": 2,
            "homeworkName": "测试二",
            "semesterId": 1,
            "score": "A",
            "homeworkId": 4,
            "teacherId": 111,
            "workTimeStr": "2020-06-12",
            "schoolId": 1,
            "majorName": "计算机专业"
        },
        {
            "dataUrl": "http://kzs.7east.cn/data/2020/02/17/20200217124826-TIM图片20200107150257.jpg",
            "departmentName": "电气信息系",
            "majorId": 1,
            "addTime": 1581914913144,
            "teacherName": "王老师",
            "homeworkDetail": "123",
            "departmentId": 1,
            "homeworkStatus": 1,
            "semesterName": "大一（上）",
            "updateTime": 1581916164792,
            "sort": 13,
            "workTime": 1591912800000,
            "stuhomeworkStatus": 2,
            "homeworkName": "2020作业测试4",
            "semesterId": 1,
            "score": "C",
            "homeworkId": 5,
            "teacherId": 111,
            "workTimeStr": "2020-06-12",
            "schoolId": 1,
            "majorName": "计算机专业"
        }
    ]
}
```

参数解析： code：状态码，1成功 0无数据  -1未知token         
codeMsg：状态信息
pageNo：当前页数
homeworkName：作业名称
teacherName：教师名称
departmentName：所属院系
majorName：所属专业
semesterName：所属学期
dataUrl：附件路径
stuhomeworkStatus：作业完成状态  0未提交  1普通提交   2修改后提交   3作业打回需修改  4批改完成
score：批改后评分




## 8获取课件列表接口：

请求示例：http://kzs.7east.cn/front/app/getLessonList?pageNo=1&pageSize=10&courseId=10
请求参数：token
  pageNo：页数（从1开始）
  pageSize：每页数量
courseId：课程id
返回参数示例：

```
{
    "code": 1,
    "pageNo": 1,
    "codeMsg": "获取课件列表成功！",
    "info": [
        {
            "lessonStatus": 1,
            "loadState": 1,
            "addTime": 1591193141443,
            "lessonId": 125,
            "updateTime": 1592042349526,
            "sort": 0,
            "lessonName": "课件测试1",
            "courseName": "阅读理解专项训练",
            "teacherId": 0,
            "videoUrl": "http://kzs.7east.cn/data/2020/06/13//20200613175838-111.mp4",
            "lessonLength": 0,
            "transcodeDurtion": "00:02:44",
            "courseId": 2,
            "lessonType": 2,
            "videosize": 16506880
        }
    ]
}
```

参数解析： code：状态码，1成功 0无数据  -1未知token         
codeMsg：状态信息
pageNo：当前页数
lessonName：课件名称
courseName：课程名称
videoUrl：视频路径
lessonLength：当前听课记录秒值（为0时未听过该课件）
transcodeDurtion：视频时长




## 9选课接口：

请求示例：http://kzs.7east.cn/front/app/insertStuCourse?cids=4,5,6,7
请求参数：token
  cids：课程courseId（例：4,5,6,7）
返回参数示例：

```
{    "code":1,    "codeMsg":"选课成功！"   }
```

参数解析： code：状态码，1成功 0失败  -1未知token         
codeMsg：状态信息


## 10插入听课记录接口：

请求示例：http://kzs.7east.cn/front/app/insertStuLesson?cid=3&lid=126&gapTime=60&lessonLength=167
请求参数：token
  cid：课程courseId（例：4,5,6,7）
Lid：课件lessonId
gapTime：距离上次听课记录请求间隔时间（秒值）
lessonLength：听课到多少秒（听课时间记录秒值）
返回参数示例：

```
{    "code":1,    "codeMsg":"成功！"   }
```

参数解析： code：状态码，1成功 0失败  -1未知token         
codeMsg：状态信息



