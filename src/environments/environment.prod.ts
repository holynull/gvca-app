export const environment = {
    production: true,
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
            debug: false, // 调试状态，将显示错误信息
            url: '', // 接口的url地址
        }
    },
    videoDir: 'course_video',
};
