import CalcUtil from './CalcUtil'

export default class LimitsUtil {

    static calcLimitBase(period, incomes) {

        let daysInPeriod = CalcUtil.getDaysInPeriod(period),
            summIncomes = CalcUtil.calcSumm(incomes)

        let result = summIncomes / daysInPeriod

        return Math.round(result)
    }

    static calcLimitCorrected(period, totals) {

        let lastDateWithExpense = CalcUtil.getLastDay(totals),
            daysRest = CalcUtil.getDaysInPeriod({ 
                begin: lastDateWithExpense, end: period.end,  
            }),
            summTotals = CalcUtil.calcSumm(totals)

        let result = summTotals / --daysRest

        return Math.round(result)
    }

    static calcLimitFact(period, incomes, totals) {

        let lastDateWithExpense = CalcUtil.getLastDay(totals),
            daysDone = CalcUtil.getDaysInPeriod({ 
                begin: period.begin, end: lastDateWithExpense,  
            }),
            summIncomes = CalcUtil.calcSumm(incomes),
            summTotals = CalcUtil.calcSumm(totals)

        let result = (summIncomes - summTotals) / ++daysDone

        return Math.round(result)
    }
}