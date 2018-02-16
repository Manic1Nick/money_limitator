import CalcUtil from './CalcUtil'

export default class LimitsUtil {

    static calcLimitBase(period, summs) {

        let daysTotal = CalcUtil.getDaysInPeriod(period),
            summNetIncomes = summs.incomes - summs.notIncluded

        let result = summNetIncomes / daysTotal

        return Math.round(result)
    }

    static calcLimitCorrected(period, lastDateWithExpense, summs) {

        let daysRest = CalcUtil.getDaysInPeriod({ 
                begin: lastDateWithExpense, end: period.end,  
            }),
            summRestMoney = summs.incomes - summs.notIncluded - summs.expenses

        let result = summRestMoney / --daysRest

        return Math.round(result)
    }

    static calcLimitFact(period, lastDateWithExpense, summs) {

        let daysDone = CalcUtil.getDaysInPeriod({ 
                begin: period.begin, end: lastDateWithExpense,  
            }),
            summAllExpenses = summs.notIncluded + summs.expenses

        let result = summAllExpenses / ++daysDone

        return Math.round(result)
    }
}