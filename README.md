[TOC]

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



## 11获取练习题库课程列表以及总题数和已做题数接口：

请求示例：http://kzs.7east.cn/front/app/getEaxmCourseList?token=34789

请求参数：token
返回参数示例：

```
{
	"code": 1,
	"codeMsg": "获取练习题库课程列表成功！",
	"info": [{
		"dateline": 0,
		"name": "课程1",
		"questionUsedSum": "1",
		"qcid": 1,
		"pid": 0,
		"questionSum": 8,
		"status": 1
	}, {
		"dateline": 0,
		"name": "课程2",
		"questionUsedSum": "0",
		"qcid": 2,
		"pid": 0,
		"questionSum": 0,
		"status": 1
	}, {
		"dateline": 0,
		"name": "课程3",
		"qcid": 3,
		"pid": 0,
		"questionSum": 0,
		"status": 1
	}]
}
```

参数解析： code：状态码，1成功 0无数据  -1未知token         
codeMsg：状态信息
name：课程名称
qcid：课程id
questionSum：课程下题的总数量
questionUsedSum：课程下已做题数量

## 12 获取练习题库知识点列表以及总题数和已做题数接口：

请求示例：http://kzs.7east.cn/front/app/getEaxmCourseDetailList?token=34789&pid=1

请求参数：token
 				  pid：练习题库下的课程id(第11接口中的qcid)
返回参数示例：

```
{
	"code": 1,
	"codeMsg": "获取练习题库知识点列表成功！",
	"info": [{
		"dateline": 0,
		"name": "知识点1",
		"questionUsedSum": "2",
		"qcid": 4,
		"pid": 1,
		"questionSum": 4,
		"status": 1
	}, {
		"dateline": 0,
		"name": "知识点2",
		"questionUsedSum": "2",
		"qcid": 5,
		"pid": 1,
		"questionSum": 3,
		"status": 1
	}, {
		"dateline": 0,
		"name": "知识点3",
		"questionUsedSum": "1",
		"qcid": 6,
		"pid": 1,
		"questionSum": 1,
		"status": 1
	}]
}
```

参数解析： code：状态码，1成功 0无数据  -1未知token         
codeMsg：状态信息
name：知识点名称
qcid：课程id
questionSum：知识点下题的总数量
questionUsedSum：知识点下已做题数量
pid：课程id

## 13 获取知识点下试题接口：

请求示例：http://kzs.7east.cn/front/app/getQuestionList?token=34789&qcid=4

请求参数：token
 				  qcid：练习题库下的知识点id(第12接口中的qcid)
返回参数示例：

```
{
	"code": 1,
	"codeMsg": "获取试题列表成功！",
	"info": [{
		"trueAnswer": "A",
		"questionId": 1,
		"question": "20+21等于多少?",
		"addTime": 1517306820000,
		"questionCategoryId": 1,
		"optional": [{
			"A": "41"
		}, {
			"B": "42"
		}, {
			"C": "43"
		}, {
			"D": "44"
		}],
		"updateTime": 1517306820000,
		"studentAnswer": "A",
		"explains": "无",
		"questionType": 1,
		"questionStatus": 1
	}, {
		"trueAnswer": "A",
		"questionId": 125,
		"question": "ASD",
		"addTime": 1583944995361,
		"questionCategoryId": 1,
		"optional": [{
			"A": "A"
		}, {
			"B": "S"
		}, {
			"C": "D"
		}, {
			"D": "E"
		}, {
			"E": "F"
		}, {
			"F": "G"
		}],
		"updateTime": 1583944995360,
		"studentAnswer": "B",
		"explains": "1111111",
		"questionType": 1,
		"questionStatus": 1
	}, {
		"trueAnswer": "A",
		"questionId": 126,
		"question": "ASDF",
		"addTime": 1583945830069,
		"questionCategoryId": 1,
		"optional": [{
			"A": "123"
		}, {
			"B": "456"
		}, {
			"C": "789"
		}, {
			"D": "110"
		}, {
			"E": "112"
		}],
		"updateTime": 1583945830069,
		"studentAnswer": "",
		"explains": "11111",
		"questionType": 1,
		"questionStatus": 1
	}, {
		"trueAnswer": "ADCDE",
		"questionId": 127,
		"question": "11111",
		"addTime": 1583945892247,
		"questionCategoryId": 1,
		"optional": [{
			"A": "1111"
		}, {
			"B": "1111"
		}, {
			"C": "1111"
		}, {
			"D": "1111"
		}, {
			"E": "1111"
		}, {
			"F": "11111"
		}],
		"updateTime": 1583945892246,
		"studentAnswer": "",
		"explains": "111",
		"questionType": 2,
		"questionStatus": 1
	}]
}
```

参数解析： code：状态码，1成功 0无数据  -1未知token         
codeMsg：状态信息
question：试题题干
trueAnswer：正确答案 （选择：ABCD 判断：1正确 2错误）
studentAnswer：学生答案（未答题为空字符串）
questionType：试题类型1单选 2多选 3判断
explains：试题解析
  
## 14 获取模拟题库以及考试题库试卷列表接口：

请求示例：http://kzs.7east.cn/front/app/getExamList?token=34789&type=2

请求参数：token
 				  type：2模拟题库  3考试题库
返回参数示例：

```
{
	"code": 1,
	"codeMsg": "获取试卷列表成功！",
	"info": [{
		"gradeId": 1,
		"majorId": 1,
		"addTime": 1470725739000,
		"examName": "测试考试111(11)",
		"sumScore": 100,
		"updateTime": 1470725739000,
		"sort": 1,
		"semesterId": 1,
		"examTemplateId": 1,
		"examId": 1,
		"questionCategoryId": 2,
		"startTime": 1582559400000,
		"endTime": 1582559400000,
		"usedState": "1",
		"status": 1
	}, {
		"gradeId": 1,
		"majorId": 1,
		"addTime": 1582595563053,
		"examName": "测试考试(3)",
		"sumScore": 100,
		"updateTime": 1582595563053,
		"sort": 2,
		"semesterId": 1,
		"examTemplateId": 1,
		"examId": 2,
		"questionCategoryId": 2,
		"startTime": 1582595547000,
		"endTime": 1582595547000,
		"usedState": "1",
		"status": 1
	}, {
		"gradeId": 1,
		"majorId": 1,
		"addTime": 1583137490034,
		"examName": "0302(2)",
		"sumScore": 100,
		"updateTime": 1583137490034,
		"sort": 3,
		"semesterId": 1,
		"examTemplateId": 1,
		"examId": 4,
		"questionCategoryId": 2,
		"startTime": 1583137454000,
		"endTime": 1583137456000,
		"usedState": "1",
		"status": 1
	}]
}
```

参数解析： code：状态码，1成功 0无数据  -1未知token  2不满足答题条件        
codeMsg：状态信息
examName：试卷名称
examId：试卷id
usedState： 1 改试卷已答过题   0未答题

## 15 获取试卷下试题接口：

请求示例：http://kzs.7east.cn/front/app/getExamQuestionList?token=34789&examId=1

请求参数：token
 				  examId：模拟和考试题库下的试卷id(第13接口中的examId)
返回参数示例：

```
{
	"code": 1,
	"codeMsg": "获取试题列表成功！",
	"info": [{
		"trueAnswer": "A",
		"questionId": 1,
		"question": "20+21等于多少?",
		"addTime": 1517306820000,
		"questionCategoryId": 1,
		"optional": [{
			"A": "41"
		}, {
			"B": "42"
		}, {
			"C": "43"
		}, {
			"D": "44"
		}],
		"updateTime": 1517306820000,
		"studentAnswer": "A",
		"explains": "无",
		"questionType": 1,
		"questionStatus": 1
	}, {
		"trueAnswer": "A",
		"questionId": 125,
		"question": "ASD",
		"addTime": 1583944995361,
		"questionCategoryId": 1,
		"optional": [{
			"A": "A"
		}, {
			"B": "S"
		}, {
			"C": "D"
		}, {
			"D": "E"
		}, {
			"E": "F"
		}, {
			"F": "G"
		}],
		"updateTime": 1583944995360,
		"studentAnswer": "B",
		"explains": "1111111",
		"questionType": 1,
		"questionStatus": 1
	}, {
		"trueAnswer": "A",
		"questionId": 126,
		"question": "ASDF",
		"addTime": 1583945830069,
		"questionCategoryId": 1,
		"optional": [{
			"A": "123"
		}, {
			"B": "456"
		}, {
			"C": "789"
		}, {
			"D": "110"
		}, {
			"E": "112"
		}],
		"updateTime": 1583945830069,
		"studentAnswer": "C",
		"explains": "11111",
		"questionType": 1,
		"questionStatus": 1
	}, {
		"trueAnswer": "ADCDE",
		"questionId": 127,
		"question": "11111",
		"addTime": 1583945892247,
		"questionCategoryId": 1,
		"optional": [{
			"A": "1111"
		}, {
			"B": "1111"
		}, {
			"C": "1111"
		}, {
			"D": "1111"
		}, {
			"E": "1111"
		}, {
			"F": "11111"
		}],
		"updateTime": 1583945892246,
		"studentAnswer": "D",
		"explains": "111",
		"questionType": 2,
		"questionStatus": 1
	}, {
		"trueAnswer": "1",
		"questionId": 131,
		"question": "通配符“?”只能代替一个字符.",
		"addTime": 1583974611670,
		"questionCategoryId": 1,
		"optional": [],
		"updateTime": 1583974980619,
		"studentAnswer": "",
		"explains": "错误的",
		"questionType": 3,
		"questionStatus": 1
	}, {
		"trueAnswer": "2",
		"questionId": 132,
		"question": "<font style=\"vertical-align: inherit;\"><font style=\"vertical-align: inherit;\">这只是一个判断题<\/font><\/font>",
		"addTime": 1592744619096,
		"questionCategoryId": 3,
		"optional": [],
		"updateTime": 1592744696474,
		"studentAnswer": "",
		"explains": "<font style=\"vertical-align: inherit;\"><font style=\"vertical-align: inherit;\">判断题解析<\/font><\/font>",
		"questionType": 3,
		"questionStatus": 1
	}]
}
```

参数解析： code：状态码，1成功 0无数据  -1未知token         
codeMsg：状态信息
question：试题题干
trueAnswer：正确答案 （选择：ABCD 判断：1正确 2错误）
studentAnswer：学生答案（未答题为空字符串）
questionType：试题类型1单选 2多选 3判断
explains：试题解析

## 16 练习题库答题接口：

请求示例：`http://kzs.7east.cn/front/app/insertStuLxQuestion?token=34789&jsonlist=[{"questionId":1,"studentAnswer":"A","state":1,"score":2},{"questionId":125,"studentAnswer":"B","state":2,"score":0}]&qcpid=1&qcid=4`

请求参数：token
  qcpid：练习题库课程Id
qcid：练习题库知识点Id
jsonlist：答题json格式字符串
questionId：试题id（接口12中questionId）
studentAnswer：学生答题答案（单选例：A 多选例：A,B,C 判断例：1）*1正确2错误
state：1答对 2答错
Score：单题得分


返回参数示例：

`{"code":1,"codeMsg":"成功！"}`

参数解析： code：状态码，1成功 0失败  -1未知token         
codeMsg：状态信息

## 17 模拟题库和考试题库答题接口：

请求示例：`http://kzs.7east.cn/front/app/insertStuQuestion?token=34789&jsonlist=[{"questionId":1,"studentAnswer":"A","state":1,"score":2},{"questionId":125,"studentAnswer":"B","state":2,"score":0}]&examId=4`

请求参数：token
  examId：试卷Id（接口12中examId）
jsonlist：答题json格式字符串
questionId：试题id（接口12中questionId）
studentAnswer：学生答题答案（单选例：A 多选例：A,B,C 判断例：1）*1正确2错误
state：1答对 2答错
Score：单题得分


返回参数示例：

`{"code":1,"codeMsg":"成功！"}`

参数解析： code：状态码，1成功 0失败  -1未知token         
codeMsg：状态信息


## 18 用户学习统计数据：

请求示例：http://kzs.7east.cn/front/app/getUserInfo?token=34789
请求参数：token
 


返回参数示例：

```
{
	"code": 1,
	"codeMsg": "获取个人学习统计成功！",
	"info": [{
		"questionCount": 5,
		"lessentTime": 251,
		"examMnCount": 3,
		"studentName": "peter11",
		"photo": "http://kzs.7east.cn/data/null",
		"examCount": 1
	}]
}
```

参数解析： code：状态码，1成功 0失败  -1未知token         
codeMsg：状态信息
questionCount：答题数量
lessentTime：听课时长秒值
examMnCount：已做模拟题库套数
examCount：已做考试题库套数
studentName：学生姓名
Photo：头像

## 19 修改个人信息接口：

请求示例：http://kzs.7east.cn/front/app/updateUserInfo?token=34789&studentPassword=111&photo=2020/03/11//20200311223023-张雪峰.jpg
请求参数：token
studentPassword：新密码 
photo：头像路径（20接口上传后返回半路径）

注:密码和头像可以单独传值不需要修改不用传

修改密码例:http://kzs.7east.cn/front/app/updateUserInfo?token=34789&studentPassword=111

返回参数示例：

`{"code":1,"codeMsg":"修改个人信息成功！"}`

参数解析： code：状态码，1成功 0失败  -1未知token         
codeMsg：状态信息

## 20 图片上传接口（上传后返回半路径，其他接口修改或插入值时使用）：

请求示例：http://kzs.7east.cn/front/app/uploadfile?token=34789
请求方式：POST
请求参数：token
  Filedata：MultipartFile类对象

返回参数示例：

```
{
	"code": 1,
	"codeMsg": "上传成功！",
	"path": "/photo/20170807110932.jpg"
}
```

参数解析： code：状态码，1成功 0失败  -1未知token         
codeMsg：状态信息
path：上传后半路径

## 21 获取签到记录接口：

请求示例：http://kzs.7east.cn/front/app/getSignList?token=34789&year=2020&month=05
请求参数：token
 				year：年
month：月（获取整年可不传 10以下月份需要在前面补0）

返回参数示例：
```
{
    "code": 1,
    "codeMsg": "获取签到记录成功！",
    "info": [
        {
            "gradeId": 1,
            "signAddress": "无",
            "majorId": 1,
            "addTime": 1517306820000,
            "departmentId": 1,
            "latitude": 524.236,
            "signStatus": 1,
            "exemptState": 1,
            "updateTime": 1517306820000,
            "signDate": 1517306820000,
            "timedate": "20200531",
            "holidayState": 1,
            "recordId": 5,
            "studentId": 34789,
            "classId": 1,
            "schoolId": 1,
            "company": 1,
            "longitude": 137.235
        }
    ]
}
```

参数解析： code：状态码，1成功 0失败  -1未知token         
codeMsg：状态信息
signAddress：签到地址中文
latitude：纬度
longitude：经度
signStatus：签到状态（1已签到 2签到地址有误 3签到时间有误 4 签到时间地址均有误 5请假 6未签到申请豁免 ）
timedate：签到时间年月日字符串，例：20200603
exemptState：豁免状态（1正常  2申请豁免  3已豁免 4拒绝豁免）
holidayState：请假状态（1正常 2事假  3病假）
 
## 22获取签到单位信息：

请求示例：http://kzs.7east.cn/front/app/getSignCompany?token=34789
请求参数：token

返回参数示例：

```
{
    "signStartTime": "8:00",
    "code": 1,
    "distance": 500,
    "addTime": 0,
    "companyDesc": "百度科技有限公司",
    "companyName": "百度科技有限公司",
    "latitude": 40.05704,
    "companyStatus": 1,
    "updateTime": 1593321279731,
    "companyId": 1,
    "companyAddress": "海淀区11",
    "codeMsg": "获取签到单位成功！",
    "signEndTime": "18:00",
    "longitude": 116.3079
}


```

参数解析： code：状态码，1成功 0失败  -1未知token         
codeMsg：状态信息
latitude：单位中心点纬度
longitude：单位中心点经度
companyName：单位名称
companyAddress：公司地址描述
distance：最远打卡距离（米）
companyDesc：公司简介
signStartTime:打卡开始时间
signEndTime:打卡结束时间



 ## 23签到：

请求示例：http://kzs.7east.cn/front/app/insertStuSign?token=34789&longitude=116.647066&latitude=39.894536&signAddress=日光清城type=1
请求参数：token
 			 longitude：精度
 			  latitude：纬度
  signAddress:签到地址
type：签到类型 1已签到 2签到地址有误 3签到时间有误 4 签到时间地址均有误
 

返回参数示例：

```
{
    "code": 1,
    "codeMsg": "签到成功！"
} 
```

参数解析： code：状态码，1成功 0失败  -1未知token         
codeMsg：状态信息


## 24提交作业：二次提交即为修改提交

请求示例：http://kzs.7east.cn/front/app/insertStuHome?token=34789&homeworkId=4&teacherId=111&stuAnsPhoto=2020/03/11//20200311223023-张雪峰.jpg,2020/03/11//20200311223023-张雪峰.jpg&studentAnswer=作业已完成
请求参数：token
 			 homeworkId：作业id 接口7中homeworkId
 teacherId：教师id接口7中teacherId
 stuAnsPhoto：学生作业图片上传后返回的半路径（多个图片用英文半角逗号‘,’隔开）
 studentAnswer：学生作业文字
 			 
 

返回参数示例：

```
{
	"code": 1,
	"codeMsg": "提交作业成功！"
}
```

参数解析： code：状态码，1成功 0失败  -1未知token         
codeMsg：状态信息

## 25 申请豁免：未签到及异常签到状态可申请

请求示例：http://kzs.7east.cn/front/app/updateExemptState?token=34789&timedate=20200502
请求参数：token
 timedate：申请豁免的年月日，例：20200502
 
返回参数示例：

```
{"code":1,"codeMsg":"申请豁免成功！"}
```

参数解析： code：状态码，1成功 0失败  -1未知token         
codeMsg：状态信息

## 26 请假接口：当天未签到可申请请假
请求示例：http://kzs.7east.cn/front/app/updateHolidayState?token=34789&holidayState=2
请求参数：token
 holidayState： 2事假  3病假

返回参数示例：

```
{"code":1,"codeMsg":"申请请假成功！"}
```

参数解析： code：状态码，1成功 0失败  -1未知token         
codeMsg：状态信息
 
 ## 27 个人中心听课记录接口：

请求示例：http://kzs.7east.cn/front/app/getStuLessonList?token=34789
请求参数：token

返回参数示例：

```
{
    "code": 1,
    "pageNo": 1,
    "codeMsg": "获取听课记录列表成功！",
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



## 28获取考试记录列表接口：

请求示例：http://kzs.7east.cn/front/app/getStuExamList?token=34789
请求参数：token
 				  
返回参数示例：

```
{
	"code": 1,
	"codeMsg": "获取考试记录列表成功！",
	"info": [ {
		"gradeId": 1,
		"majorId": 1,
		"addTime": 1582595563053,
		"examName": "测试考试(3)",
		"sumScore": 100,
		"updateTime": 1582595563053,
		"sort": 2,
		"semesterId": 1,
		"examTemplateId": 1,
		"examId": 2,
		"questionCategoryId": 2,
		"startTime": 1582595547000,
		"endTime": 1582595547000,
		"usedState": "1",
		"status": 1,
"stuScore":0

	}]
}
```

参数解析： code：状态码，1成功 0无数据  -1未知token  2不满足答题条件        
codeMsg：状态信息
examName：试卷名称
examId：试卷id
stuScore： 学生试题得分

## 29 获取个人中心我的作业接口：

请求示例：http://kzs.7east.cn/front/app/getStuHomeWorkList?token=34789
请求参数：token

返回参数示例：

```
{
	"code": 1,
	"codeMsg": "获取我得作业列表成功！",
	"info": [{
		"dataUrl": "http://kzs.7east.cn/data/2020/06/13/20200613015030-1111.png",
		"departmentName": "电气信息系",
		"majorId": 1,
		"addTime": 1583914924556,
		"teacherName": "王老师",
		"homeworkDetail": "<img src=\"http://localhost:8030/data/2020/03/11/20200311162144-张雪峰.jpg\">  老弟,1加1等于多少?",
		"departmentId": 1,
		"homeworkStatus": 1,
		"semesterName": "大一（上）",
		"updateTime": 1591984234591,
		"sort": 15,
		"workTime": 1591999200000,
		"stuhomeworkStatus": 1,
		"homeworkName": "测试",
		"semesterId": 1,
		"score": "A+",
		"homeworkId": 8,
		"teacherId": 111,
		"workTimeStr": "2020-06-13",
		"schoolId": 1,
		"stuAnsPhoto": "",
		"majorName": "计算机专业"
	}, {
		"dataUrl": "http://kzs.7east.cn/data/2020/03/11/20200311154947-张雪峰.jpg",
		"departmentName": "电气信息系",
		"majorId": 1,
		"addTime": 1583913019888,
		"teacherName": "王老师",
		"homeworkDetail": "<img src=\"http://localhost:8030/data/2020/03/11/20200311155002-张雪峰.jpg\">111111",
		"departmentId": 1,
		"homeworkStatus": 1,
		"semesterName": "大一（上）",
		"updateTime": 1583913019888,
		"sort": 14,
		"workTime": 1591999200000,
		"stuhomeworkStatus": 1,
		"homeworkName": "测试二1",
		"semesterId": 1,
		"score": "B",
		"homeworkId": 7,
		"teacherId": 111,
		"workTimeStr": "2020-06-13",
		"schoolId": 1,
		"stuAnsPhoto": "",
		"majorName": "计算机专业"
	}, {
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
		"studentAnswer": "测试答案",
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
		"stuAnsPhoto": "",
		"majorName": "计算机专业"
	}, {
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
		"studentAnswer": "作业已完成",
		"sort": 12,
		"workTime": 1591912800000,
		"stuhomeworkStatus": 2,
		"homeworkName": "测试二",
		"semesterId": 1,
		"homeworkId": 4,
		"teacherId": 111,
		"workTimeStr": "2020-06-12",
		"schoolId": 1,
		"stuAnsPhoto": "http://kzs.7east.cn/data/2020/03/11//20200311223023-张雪峰.jpg,http://kzs.7east.cn/data/2020/03/11//20200311223023-张雪峰.jpg",
		"majorName": "计算机专业"
	}]
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
stuAnsPhoto：学生作业图片
studentAnswer：学生作业文字


## 30 获取个人中心答题记录统计数据：

请求示例：http://kzs.7east.cn/front/app/getExamStatistical?token=34789&type=1
请求参数：token
 			 	type：题库类型（1练习题库 2模拟题库  3考试题库） 
返回参数示例：

```
{    "code":1,    "rightStr":"80",    "codeMsg":"获取个人中心答题记录统计数据成功！",    "leftStr":"4/5",    "middleStr":""}       
```

参数解析： code：状态码，1成功 0失败  -1未知token  
codeMsg：状态信息
leftStr：左侧显示数据
middleStr：中间显示数据（练习题库无分数显示）
rightStr：左侧显示数据

   