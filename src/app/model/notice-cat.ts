import { Notice } from './notice';
export class NoticeCat {
    noticeCatId: number;
    name: string;
    onlineState: number;
    notices: Array<Notice> = new Array();
}