import CalcUtil from './CalcUtil'
import DateUtil from './DateUtil'

export default class ChartUtil {

    static createDataChart({ period={}, expenses={}, limits={}, summs={} }) {

        let dates = DateUtil.createChartArrayDates(period.begin, period.end),
            expense, summBase, summCorrected, summFact
        
        summBase = summCorrected = summFact = (summs.incomes - summs.notIncluded)

        dates.forEach(date => {
            expense = expenses[date.name]

            Object.assign(
                date, 
                { "base": summBase >= 0 ? summBase : 0 }, 
                { "corrected": summCorrected >= 0 ? summCorrected : 0 }, 
                { "fact": summFact >= 0 ? summFact : null },
                { "expense": expense }
            )
            
            summBase -= limits.base
            
            if (expense >= 0) {
                summCorrected -= expense
                summFact -= expense

            } else {
                summCorrected -= limits.corrected
                summFact -= limits.fact
            }
        })
        return dates
    }
}