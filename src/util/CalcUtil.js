import DateUtil from './DateUtil'

export default class CalcUtil {

    static calcSumm(datesObj) {
        if (!datesObj) return 0

        let summ = 0
        Object.keys(datesObj).forEach(date => {
            summ += datesObj[date]
        })
        return summ
    }

    static concatIncomesAndExpenses(incomesObj, expensesObj) {
        let newExpensesObj = {}
        Object.keys(expensesObj).forEach(key => {
            newExpensesObj[key] = expensesObj[key] * -1            
        })
        return CalcUtil.concatListsSumms(incomesObj, newExpensesObj)
    }

    static concatListsSumms(...listsSumms) {
        let result = {}
        listsSumms.forEach(list => {
            for(let key in list) {
                result[key] = result[key] ? result[key] + list[key] : list[key]
            }
        })
        return result
    }

    static deleteZeroDates(listSumms) {
        let result = {}
        for(let key in listSumms) {
            if (listSumms[key] > 0) result[key] = listSumms[key]
        }
        return result
    }

    static calcExpectedResult({ period, expenses, summs, limits }) {

        let lastDateWithExpense = CalcUtil.getLastDate(expenses),
            daysRest = CalcUtil.getDaysInPeriod({ 
                begin: lastDateWithExpense, end: period.end,  
            }),
            restOfMoney = summs.incomes - summs.notIncluded - summs.expenses

        let result = restOfMoney - (--daysRest * limits.fact)

        return Math.round(result)
    }

    static getLastDate(obj) {
        if (!obj) return -1

        let dates = Object.keys(obj)
        dates.sort((a, b) => {
            return new Date(a) - new Date(b)
        })

        return dates[dates.length - 1]
    }

    static getDaysInPeriod(period) {
        if (!period) return -1

        return (new Date(period.end) - new Date(period.begin))/(1000*60*60*24)
    }

    static sortObjectByKeysDates(obj) {
        let sortedObj = {}

        let dates = Object.keys(obj)
            .sort((a, b) => { 
                return new Date(a) - new Date(b)
            })
            .forEach(date => { 
                sortedObj[date] = obj[date] 
            })

        return sortedObj
    }
}