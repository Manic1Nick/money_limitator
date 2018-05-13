import {
    createChartArrayDates
} from './DateUtil'

export function createDataChart(obj) {

    const {
        period: { begin, end },
        expenses,
        limits: { base, corrected, fact },
        summs: { summIncomes, summExpenses, summNotIncluded }
    } = obj

    let dates = createChartArrayDates(begin, end),
        expense, summBase, summCorrected, summFact
    
    summBase = summCorrected = summFact = (summIncomes - summNotIncluded)

    dates.forEach(date => {
        expense = expenses[date.name]

        Object.assign(
            date, 
            { "base": summBase >= 0 ? summBase : 0 }, 
            { "corrected": summCorrected >= 0 ? summCorrected : 0 }, 
            { "fact": summFact >= 0 ? summFact : null },
            { "expense": expense }
        )
        
        summBase -= base
        
        if (expense >= 0) {
            summCorrected -= expense
            summFact -= expense

        } else {
            summCorrected -= corrected
            summFact -= fact
        }
    })
    return dates
}