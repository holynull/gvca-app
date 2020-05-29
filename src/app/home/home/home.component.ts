import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    slideOpts = {
        // init: false,
        speed: 400,
        initialSlide: 0,
        // loop: true,
        // observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        // observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            waitForTransition: false,
            reverseDirection: true,
        }, // 可选选项，自动滑动
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    };
    noticeOpts = {
        speed: 400,
        // loop: true,
        autoplay: {
            delay: 5000, // 1秒切换一次
            disableOnInteraction: false,
            waitForTransition: false,
            reverseDirection: true,
        }, // 可选选项，自动滑动
        direction: 'vertical',
    };

    @ViewChild('bannerSlides', {})
    bannerSlides: IonSlides;

    @ViewChild('noticeSlides', {})
    noticeSlides: IonSlides;

    constructor(
        private activeRoute: ActivatedRoute
    ) {
        this.activeRoute.queryParams.subscribe(param => {
            // if (this.bannerSlides) {
            //     this.bannerSlides.slideNext().then();
            // }
            // if (this.noticeSlides) {
            //     this.noticeSlides.slideNext().then();
            // }
        });
    }

    ngOnInit() { }

}
