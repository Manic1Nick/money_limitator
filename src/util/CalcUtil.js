export default class CalcUtil {

    static calcSumm(datesObj) {
        if (!datesObj) return 0

        return Object.values(datesObj).reduce((result, summ) => {
            return result + summ
        }, 0)
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

    static calcExpectedResult({ period, incomes, expenses, summs, limits }) {

        let summsTotals = CalcUtil.concatIncomesAndExpenses(incomes, expenses),
            lastDateWithExpense = CalcUtil.getLastDay(summsTotals),
            daysRest = CalcUtil.getDaysInPeriod({ 
                begin: lastDateWithExpense, end: period.end,  
            }),
            restOfMoney = summs.incomes - summs.notIncluded - summs.expenses

        let result = restOfMoney - (--daysRest * limits.fact)

        return Math.round(result)
    }

    static getLastDay(obj) {
        if (!obj) return -1

        return Object.keys(obj).slice(-1)[0]
    }

    static getDaysInPeriod(period) {
        if (!period) return -1

        return (new Date(period.end) - new Date(period.begin))/(1000*60*60*24)
    }
}