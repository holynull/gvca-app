import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { BootService } from './services/boot.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private screenOrientation: ScreenOrientation,
        private bootSvr: BootService,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then((d) => {
            // ios在config里已经禁止Dark mode
            if (this.platform.is('ios')) {
                this.statusBar.overlaysWebView(true);
            } else {
                this.statusBar.overlaysWebView(false);
                this.statusBar.backgroundColorByHexString('#FFFFFFFF');
            }
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            if (this.platform.is('cordova')) {
                this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(val => {
                    console.log('Lock Screen Orientation.');
                    console.log(val);
                });
            }
        });

    }
}
