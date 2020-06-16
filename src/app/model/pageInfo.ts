export class PageInfo {
    total: number;
    curPageNum: number = 1;
    totalPage: number;
    pageSize: number = 10;
    maxPageNum = 10;
    curRange = 1;

    getPageNum() {
        if (this.pageSize !== 0 && this.total !== 0) {
            if (this.total <= this.pageSize) {
                return 1;
            } else if (this.total % this.pageSize !== 0) {
                return Math.floor(this.total / this.pageSize) + 1;
            } else {
                return Math.floor(this.total / this.pageSize);
            }
        } else {
            return 0
        }
    }

    getRangeNum() {
        let pageNum = this.getPageNum();
        if (pageNum <= this.maxPageNum) {
            return 1;
        } else if (pageNum % this.maxPageNum !== 0) {
            return Math.floor(pageNum / this.maxPageNum) + 1;
        } else {
            return Math.floor(pageNum / this.maxPageNum);
        }
    }

    nextPage(page?) {
        if (page) {
            this.curPageNum = page;
        } else {
            this.curPageNum = this.curPageNum + 1;
        }
    }

    firstPage() {
        this.curPageNum = 1
    }
}