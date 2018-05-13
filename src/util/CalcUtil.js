import { 
    getLastDate, 
    getDaysInPeriod,
    sortObjectByDates,
    getLastDateWithSumm,
    createArrayDates,
    shiftDate
} from './DateUtil'

export function calcSumm(datesObj) {
    if (!datesObj) return 0

    let summ = 0
    Object.keys(datesObj).forEach(date => {
        summ += datesObj[date]
    })
    return summ
}

export function concatIncomesAndExpenses(incomesObj, expensesObj) {
    let newExpensesObj = {}
    Object.keys(expensesObj).forEach(key => {
        newExpensesObj[key] = expensesObj[key] * -1            
    })
    return concatListsSumms(incomesObj, newExpensesObj)
}

export function concatListsSumms(...listsSumms) {
    let result = {}
    listsSumms.forEach(list => {
        for(let key in list) {
            result[key] = result[key] ? result[key] + list[key] : list[key]
        }
    })
    return result
}

export function formatListSumms(listSumms) {
    let formattedSumms = sortObjectByDates(listSumms),
        firstDate = Object.keys(formattedSumms)[0],
        lastDateWithSumm = getLastDateWithSumm(formattedSumms)    
        
    formattedSumms = fillEmptyDates(formattedSumms, firstDate, lastDateWithSumm)        
    formattedSumms = deleteZeroDates(formattedSumms, lastDateWithSumm, null)
    
    return formattedSumms
}

export function fillEmptyDates(listSumms, begin, end) {
    let dates = Object.keys(listSumms)

    if (!begin) begin = dates[0]
    if (!end) end = dates[dates.length - 1]

    dates = createArrayDates(begin, end)
    dates.forEach(date => {
        if (!listSumms[date]) listSumms[date] = 0
    })
    return listSumms
}

export function deleteZeroDates(listSumms, begin, end) {
    let dates = Object.keys(listSumms)

    if (!begin) begin = dates[0]
    if (!end) end = dates[dates.length - 1]

    dates = createArrayDates(begin, end)
    dates.forEach(date => {
        if (listSumms[date] === 0) delete listSumms[date]
    })
    return listSumms
}

export function calcExpectedResult({ period, expenses, summs, limits }) {

    const { summIncomes={}, summExpenses={}, summNotIncluded={} } = summs

    let lastDateWithExpense = getLastDate(expenses),
        restOfDays = getDaysInPeriod({ 
            begin: lastDateWithExpense, end: period.end,  
        }) - 1,
        restOfMoney = summIncomes - summNotIncluded - summExpenses

    let result = restOfMoney - (restOfDays * limits.fact)

    return Math.round(result)
}