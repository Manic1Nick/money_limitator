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

        let lastDateWithExpense = DateUtil.getLastDate(expenses),
            daysRest = DateUtil.getDaysInPeriod({ 
                begin: lastDateWithExpense, end: period.end,  
            }),
            restOfMoney = summs.incomes - summs.notIncluded - summs.expenses

        let result = restOfMoney - (--daysRest * limits.fact)

        return Math.round(result)
    }
}