import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit() { }

    logout() {
        this.auth.logout();
        this.router.navigate(['/tabs/home']);
    }

}
