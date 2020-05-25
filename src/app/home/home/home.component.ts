import { Component, OnInit } from '@angular/core';

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
            disableOnInteraction: false
        }, // 可选选项，自动滑动
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    };
    noticeOpts = {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000, // 1秒切换一次
            disableOnInteraction: false
        }, // 可选选项，自动滑动
        direction: 'vertical',
    };
    constructor() { }

    ngOnInit() { }

}
