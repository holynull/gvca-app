export class Notice {
    addTime: Date;
    sender: string;
    schoolId: number;
    noticeStatus: number;
    updateTime: Date;
    title: string;
    noticeId: number;
    content: string;
    dataUrl: string;

    getAttachFileName() {
        return this.dataUrl.substring(this.dataUrl.lastIndexOf('/') + 1);
    }

    getAttachFileTypeCss() {
        let extname = this.getAttachFileName().substring(this.getAttachFileName().lastIndexOf('.') + 1).toLowerCase();
        switch (extname) {
            case 'pdf':
                return 'file_pdf';
            case 'ppt':
                return 'file_ppt';
            case 'pptx':
                return 'file_ppt';
            case 'doc':
                return 'file_word';
            case 'docx':
                return 'file_word';
            case 'zip':
                return 'file_zip';
            case 'rar':
                return 'file_rar';
            case 'swf':
                return 'file_fla';
            default:
                return '';
        }
    }
}