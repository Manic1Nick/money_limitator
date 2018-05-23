import { Component } from 'react'

import ChartBalance from './ChartBalance'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class DialogLimitInfo extends Component {

    renderLimitData(limitName) {
        const { 
            period: { begin }, 
            daysTotal, 
            daysDone, 
            daysRest, 
            lastDateWithExpense ,
            summs: { summIncomes, summExpenses, summNotIncluded }, 
            limits: { base, corrected, fact }
        } = this.props.limitsData,
            
            currentBalance = summIncomes - summNotIncluded - summExpenses

        switch(limitName) {
            case 'base':
                return(
                    <div>
                        <h4>Incomes total: ${summIncomes}</h4>
                        <h4>Days total: {daysTotal}</h4>
                        <h4>Base limit: ${base} in day</h4>
                    </div>
                )
            
            case 'corrected':
                return(
                    <div>
                        <h4>Current balance: ${currentBalance}</h4>
                        <h4>Days remaining: {daysRest}</h4>
                        <h4>Corrected limit: ${corrected} in day</h4>
                    </div>
                )

            case 'fact':
                return(
                    <div>
                        <h4>Spent money: ${summExpenses}</h4>
                        <h4>Days past: {daysDone + 1}</h4>
                        <h4>Fact limit: ${fact} in day</h4>
                    </div>
                )
        }
    }

    render() {
        const { open, activeLimit, limitsData, closeDialog } = this.props,
            limitInfoTitle = `Limit ${ activeLimit } info`

		const actions = [
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
        	  	actions={ actions }
        	  	modal={ false }
                onRequestClose={ () => closeDialog() }
        	>
                <ChartBalance 
                    daysDone={ limitsData.daysDone }
                    daysRest={ limitsData.daysRest }
                    summs={ limitsData.summs }
                />
                { this.renderLimitData(activeLimit) }
                { this._generateResultMessage() }
        	</Dialog>
        )
    }

    _generateResultMessage() {
        const { 
            period: { begin },
            daysRest, 
            lastDateWithExpense ,
            summs: { summIncomes, summExpenses, summNotIncluded }, 
            limits: { corrected }
        } = this.props.limitsData,
            
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
}
