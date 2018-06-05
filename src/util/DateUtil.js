export function createChartArrayDates(dateBegin, dateEnd) {
    let currDate = new Date(dateBegin),
        endDate = new Date(dateEnd),
        days = []

    while(currDate <= endDate) {
        days.push({ "name": formatDate(currDate) })
        currDate.setDate(currDate.getDate() + 1)
    }
    return days
}

export function createArrayDates(dateBegin, dateEnd) {
    let currDate = new Date(dateBegin),
        endDate = new Date(dateEnd),
        days = []

    while(currDate <= endDate) {
        days.push(formatDate(currDate))
        currDate.setDate(currDate.getDate() + 1)
    }
    return days
}

export function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export function getLastDate(obj) {
    if (!obj) return -1

    let dates = sortDates(Object.keys(obj))

    return dates[dates.length - 1]
}

export function getLastDateWithSumm(expenses) {
    if (!expenses) return -1
    
    let dates = sortDates(Object.keys(expenses)),
        i = dates.length - 1,
        lastDate = dates[i]
    
    while (i >= 0 && expenses[lastDate] === 0) {
        lastDate = dates[--i]
    }
    return lastDate
}

export function getNextFreeDate(obj) {
    let lastDateString = getLastDateWithSumm(obj),
        date = shiftDate(lastDateString, 1)
        
    return date
}

export function getDaysInPeriod(period) {
    if (!period) return -1

    return (new Date(period.end) - new Date(period.begin))/(1000*60*60*24)
}

export function sortObjectByDates(obj) {
    let sortedObj = {}

    let dates = sortDates(Object.keys(obj))
        .forEach(date => { 
            sortedObj[date] = obj[date] 
        })

    return sortedObj
}

export function shiftDate(dateString, shifter) {

    let date = new Date(dateString)
    date.setDate(date.getDate() + shifter)
    return date
}

export function sortDates(dates) {
    dates.sort((a, b) => {
        return new Date(a) - new Date(b)
    })

    return dates
}