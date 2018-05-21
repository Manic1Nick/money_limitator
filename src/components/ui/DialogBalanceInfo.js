import { Component } from 'react'

import BalanceChart from './BalanceChart'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class DialogBalanceInfo extends Component {

    render() {
        const { 
            open, 
            limitsData: {
                daysDone, daysRest, summs
            }, 
            closeDialog 
        } = this.props

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
        	  	title='Balance info'
        	  	actions={ actions }
        	  	modal={ false }
                onRequestClose={ () => closeDialog() }
        	>
                <BalanceChart 
                    daysDone={ daysDone }
                    daysRest={ daysRest }
                    summs={ summs }
                />
        	</Dialog>
        )
    }
}
