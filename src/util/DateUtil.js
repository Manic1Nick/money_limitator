export default class DateUtil {

    static createChartArrayDates(dateBegin, dateEnd) {
        let currDate = new Date(dateBegin),
            endDate = new Date(dateEnd),
            days = []

        while(currDate <= endDate) {
            days.push({ "name": DateUtil.formatDate(currDate) })
            currDate.setDate(currDate.getDate() + 1)
        }
        return days
    }

    static createArrayDates(dateBegin, dateEnd) {
        let currDate = new Date(dateBegin),
            endDate = new Date(dateEnd),
            days = []

        while(currDate <= endDate) {
            days.push(DateUtil.formatDate(currDate))
            currDate.setDate(currDate.getDate() + 1)
        }
        return days
    }

    static formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }
}