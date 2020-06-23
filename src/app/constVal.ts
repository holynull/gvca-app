export class ConstVal {

    /**
     * 当前用户token的key
     */
    public static ACCESS_TOKEN = 'access_token';

    /**
     * 下载任务在storage上的key
     */
    public static DOWNLOAD_TASKS = 'download_task';

    public static USER_INFO = 'user_info';

    public static SLIDE_IMAGES = 'slide_images';

    public static EXER_DATA = 'exer_data';
    public static SIMU_DATA = 'simu_data';
    public static EXAM_DATA = 'exam_data';
    public static LOADING_DURATION_MILLION_SECONDS = 6000; // 配置最好与environment.api.timeoutMs乘以api.retryTimes+1相

}
