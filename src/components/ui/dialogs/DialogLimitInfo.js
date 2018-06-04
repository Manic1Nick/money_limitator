import ChartBalance from '../charts/ChartBalance'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { generateResultMessage } from '../../../util/LimitsUtil'

const DialogLimitInfo = ({ limitsData={}, open=false, activeLimit='', closeDialog=f=>f }) => {

    const { 
        period: { begin }, 
        daysTotal, 
        daysDone, 
        daysRest, 
        lastDateWithExpense,
        summs, 
        limits: { base, corrected, fact }
    } = limitsData
    
    let limitInfoTitle = `Limit ${ activeLimit } info`,
        limitsInfo = generateLimitsInfo()        
    
    const dialogActions = [
        <FlatButton
        label="Ok"
        primary={true}
        onClick={ () => closeDialog() }
        />
    ]

    return(
        <Dialog
            className='Dialog'
            open={ open }
            title={ limitInfoTitle }
            actions={ dialogActions }
            modal={ false }
            onRequestClose={ () => closeDialog() }
        >
            <ChartBalance 
                daysDone={ daysDone }
                daysRest={ daysRest }
                summs={ summs }
            />
            { limitsInfo[activeLimit] }
            { generateResultMessage(limitsData) }
        </Dialog>
    )

    function generateLimitsInfo() {
        let limits = {},
            { summIncomes, summExpenses, summNotIncluded } = summs,
            currentBalance = summIncomes - summNotIncluded - summExpenses

        limits.base = 
            <div>
                <h4>Incomes total: ${summIncomes}</h4>
                <h4>Days total: {daysTotal}</h4>
                <h4>Base limit: ${base} in day</h4>
            </div>

        limits.corrected = 
            <div>
                <h4>Current balance: ${currentBalance}</h4>
                <h4>Days remaining: {daysRest}</h4>
                <h4>Corrected limit: ${corrected} in day</h4>
            </div>

        limits.fact = 
            <div>
                <h4>Spent money: ${summExpenses}</h4>
                <h4>Days past: {daysDone + 1}</h4>
                <h4>Fact limit: ${fact} in day</h4>
            </div>

        return limits
    }
}

export default DialogLimitInfo
