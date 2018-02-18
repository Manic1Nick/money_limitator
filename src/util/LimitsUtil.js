import DateUtil from './DateUtil'

export default class LimitsUtil {

    static calcLimitBase(period, summs) {

        let daysTotal = DateUtil.getDaysInPeriod(period),
            summNetIncomes = summs.incomes - summs.notIncluded

        let result = summNetIncomes / daysTotal

        return Math.round(result)
    }

    static calcLimitCorrected(period, lastDateWithExpense, summs) {

        let daysRest = DateUtil.getDaysInPeriod({ 
                begin: lastDateWithExpense, end: period.end,  
            }),
            summRestMoney = summs.incomes - summs.notIncluded - summs.expenses

        let result = summRestMoney / --daysRest

        return Math.round(result)
    }

    static calcLimitFact(period, lastDateWithExpense, summs) {

        let daysDone = DateUtil.getDaysInPeriod({ 
                begin: period.begin, end: lastDateWithExpense,  
            }),
            summAllExpenses = summs.notIncluded + summs.expenses

        let result = summAllExpenses / ++daysDone

        return Math.round(result)
    }
}