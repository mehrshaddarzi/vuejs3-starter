export class Helper {

    static isNumeric(str) {
        //@see https://bobbyhadz.com/blog/javascript-check-if-string-contains-only-digits
        return /^[0-9]+$/.test(str)
    }

    static getNumeric(str) {
        if (this.isNumeric(str)) {
            return parseInt(str)
        }

        return false
    }

    static empty(str) {
        if (str === undefined) {
            return false
        }

        return str.length < 1
    }

    static objectMerge(first = {}, two = {}) {
        // @see https://www.javascripttutorial.net/object/javascript-merge-objects/
        return Object.assign(first, two);
    }

    static getPageNumber(route) {
        if (!Helper.empty(route.query.page) && Helper.isNumeric(route.query.page)) {
            return Helper.getNumeric(route.query.page)
        }

        return 1
    }

    static getPageSize(route, size = 10) {
        if (!Helper.empty(route.query.limit) && Helper.isNumeric(route.query.limit)) {
            return Helper.getNumeric(route.query.limit)
        }

        return size
    }

    static getPageTitle(title, homeName = true, seperate = null) {
        let name;
        if (seperate === null) {
            seperate = ' ' + process.env.VUE_APP_TITLE_SEPARATE + ' '
        }
        if (homeName === true) {
            name = process.env.VUE_APP_TITLE + seperate
        }

        return name + title
    }
}