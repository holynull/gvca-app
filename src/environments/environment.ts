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
        apiDomain: '192.168.0.10',
        apiProtocol: 'http',

        example: {
            timeoutMs: 2000, // 接口超时时间
            retryTimes: 2, // 接口重试次数，不包含第一次
            debug: true, // 调试状态，将显示错误信息
            url: '', // 接口的url地址
        }
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
