import { getDaysInPeriod } from './DateUtil'

export function calcLimitBase(period, summs) {

    let { summIncomes, summExpenses, summNotIncluded } = summs,
        daysTotal = getDaysInPeriod(period),
        summNetIncomes = summIncomes - summNotIncluded,
        result = 0
        
    if (daysTotal) result = summNetIncomes / daysTotal

    return Math.round(result)
}

export function calcLimitCorrected(period, lastDateWithExpense, summs) {

    let { summIncomes, summExpenses, summNotIncluded } = summs,
        daysRest = getDaysInPeriod({ 
            begin: lastDateWithExpense, end: period.end,  
        }) - 1,
        summRestMoney = summIncomes - summNotIncluded - summExpenses,
        result = 0
        
    if (daysRest) result = summRestMoney / daysRest

    return Math.round(result)
}

export function calcLimitFact(period, lastDateWithExpense, summs) {

    let { summIncomes, summExpenses, summNotIncluded } = summs,
        daysDone = getDaysInPeriod({ 
            begin: period.begin, end: lastDateWithExpense,  
        }) + 1,
        summAllExpenses = summNotIncluded + summExpenses,
        result = 0
        
    if (daysDone) result = summAllExpenses / daysDone

    return Math.round(result)
}