import ChartBalance from '../charts/ChartBalance'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const DialogBalanceInfo = ({ open=false, limitsData={}, closeDialog=f=>f }) => {
    
    const { daysDone, daysRest, summs } = limitsData

    const dialogActions = [
        <FlatButton
            label="Ok"
            primary={true}
            onClick={ () => closeDialog() }
        />
    ]

    const balanceInfo = 
        <div className='DialogBalanceInfo__message'>
            <h4>{ _generateMessageAboutBalance() }</h4>
        </div>

    
    return(
        <Dialog
            className='Dialog'
            open={ open }
            title='Balance info'
            actions={ dialogActions }
            modal={ false }
            onRequestClose={ () => closeDialog() }
        >
            <ChartBalance
                daysDone={ daysDone }
                daysRest={ daysRest }
                summs={ summs }
            />
            { balanceInfo }
        </Dialog>
    )

    function _generateMessageAboutBalance() {
        const { summIncomes, summExpenses, summNotIncluded } = summs,
            currentBalance = summIncomes - summNotIncluded - summExpenses

        let message

        if (daysRest && currentBalance > 0) {
            message = `You have $${currentBalance} for ${daysRest} days.`
            
        } else if (daysRest && currentBalance < 0) {
            message = `Unfortunately, you don't have money already for ${daysRest} days.`
            
        } else if (daysRest === 0 && currentBalance > 0) {
            message = `Congratulations! Your economy is ${currentBalance} for past period.`
        
        } else if (daysRest === 0 && currentBalance < 0) {
            message = `
                Unfortunately, this period ended with balance $${currentBalance} for you. 
                Try to save money in the next period.
            `            
        } else if (daysRest === 0 && currentBalance === 0) {
            message = `
                Wow! You very accurately adhered to money limits. 
                Your balance is 0. But you can try to save money in the next period.
            `
        }
        return message
    }
}

export default DialogBalanceInfo