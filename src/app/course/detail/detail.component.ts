import { Component, OnInit, ViewChild } from '@angular/core';
import { VgMedia, BitrateOption } from 'videogular2/compiled/core';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

    curTab = 1;

    constructor() { }
    @ViewChild('myMedia') myMedia: VgMedia;
    videoPath: string;
    videoQuality1: BitrateOption = {
        qualityIndex: 720,
        width: 500,
        height: 300,
        bitrate: 1,
        mediaType: "video/mp4",
        label: "高清",
    };
    videoQuality2: BitrateOption = {
        qualityIndex: 960,
        width: 500,
        height: 300,
        bitrate: 1,
        mediaType: "video/mp4",
        label: "超清",
    };
    dashBitrates: Array<BitrateOption> = [];

    ngOnInit() { 
        this.videoPath = "http://static.videogular.com/assets/videos/videogular.mp4";
        // this.dashBitrates.push(this.videoQuality1, this.videoQuality2);
    }

    selectTab(tab) {
        this.curTab = tab;
    }
}
