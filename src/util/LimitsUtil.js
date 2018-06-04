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


export function generateResultMessage(limitsData) {

    const { 
        period: { begin }, 
        daysTotal, 
        daysDone, 
        daysRest, 
        lastDateWithExpense,
        summs: { summIncomes, summNotIncluded, summExpenses }, 
        limits: { base, corrected, fact }
    } = limitsData,

    currentBalance = summIncomes - summNotIncluded - summExpenses

    let resultMessage = ''
    
    if (daysRest && currentBalance > 0) {
        resultMessage = `
            You spent $${summExpenses} for the past period from ${begin} to ${lastDateWithExpense}.
            Your current balance is $${currentBalance} for remaining period ${daysRest} days.
            Now you should not spend more than $${corrected} a day.
            This is your corrected limit which should be followed in the remainder of the period.
        `
    
    } else if (currentBalance < 0) {
        resultMessage = `   
            Unfortunately, you did not save money in the current period. 
            Try to follow our recommendations in the following periods. 
        `
    
    } else if (currentBalance > 0) {
        resultMessage = ` 
            Congratulations, you have completed the current period with a cash saving of $${currentBalance}. 
        `
    
    } else { //currentBalance = 0
        resultMessage = ` 
            Wow! You very accurately adhered to money limits in the current period! 
            Try to save money in the next period.
        `
    }        
    return resultMessage
}