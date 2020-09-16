import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendService } from 'app/services/attend.service';
import { AuthService } from 'app/services/auth.service';
import { CourseService } from 'app/services/course.service';

@Component({
    selector: 'app-cert',
    templateUrl: './cert.component.html',
    styleUrls: ['./cert.component.scss'],
})
export class CertComponent implements OnInit {

    constructor(private auth: AuthService,
        private router: Router,
        public courseSvr: CourseService,
        public attendSvr: AttendService,) {

        this.courseSvr.getUserCourseInfo().then();
    }

    ngOnInit() { }

}
