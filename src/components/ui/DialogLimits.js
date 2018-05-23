import { Component } from 'react'

import ChartLimits from './ChartLimits'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class DialogBalanceInfo extends Component {

    render() {
        const { 
            open, 
            limits, 
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
        	  	title='Limits info'
        	  	actions={ actions }
        	  	modal={ false }
                onRequestClose={ () => closeDialog() }
        	>
                <ChartLimits
                    limits={ limits }
                />
        	</Dialog>
        )
    }
}
