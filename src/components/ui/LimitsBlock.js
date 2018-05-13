import { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class LimitsBlock extends Component {

	constructor() {
		super()
		this.state = {
			activeLimit: ''
		}
	}

	handleOpenDialog(limitName) {
		this.setState({
			activeLimit: limitName
		})
	}

	handleCloseDialog() {
		this.setState({
			activeLimit: ''
		})
	}

	render() {		

		const { base, corrected, fact } = this.props.limits,
			limitLabel = {
				'base': `Base ${base} in day`,
				'corrected': `Corrected ${corrected} in day`,
				'fact': `Fact ${fact} in day`
			}

		return (
			<div className='LimitsBlock'>
				<div className='limits__title'>
					<span>LIMITS:</span>
				</div>
				<RaisedButton 
					className='limits__button'
					label={ limitLabel.base } 
					primary={true} 
					onClick={ () => this.handleOpenDialog('base') }
				/>
				<RaisedButton 
					className='limits__button'
					label={ limitLabel.corrected } 
					backgroundColor="#9932CC" 
					labelColor="#FFFFFF" 
					onClick={ () => this.handleOpenDialog('corrected') }
				/>
				<RaisedButton 
					className='limits__button'
					label={ limitLabel.fact } 
					backgroundColor="#FF6347" 
					labelColor="#FFFFFF" 
					onClick={ () => this.handleOpenDialog('fact') }
				/>
				{ this.renderDialog() }
			</div>
		)
	}	

	renderDialog() {

		const { activeLimit } = this.state,
			limitInfoTitle = `Limit ${ activeLimit } info`

		const actions = [
    	  	<FlatButton
    	  	  	label="Ok"
    	  	  	primary={true}
    	  	  	onClick={ this.handleCloseDialog.bind(this) }
    	  	/>
    	]

		return(
			<Dialog
        	  	title={ limitInfoTitle }
        	  	actions={ actions }
        	  	modal={ false }
        	  	open={ activeLimit !== '' }
        	  	onRequestClose={ this.handleCloseDialog.bind(this) }
        	>
        	  	{ this.renderDialogText(activeLimit) }
        	</Dialog>
		)
	}

	renderDialogText(limitName) {
		const { 
			period: { begin }, 
			daysTotal, 
			daysDone, 
			daysRest, 
			lastDateWithExpense ,
			summs: { summIncomes, summExpenses, summNotIncluded }, 
			limits: { base, corrected, fact }
		} = this.props

		const summNetIncome = summIncomes - summNotIncluded,
			currentBalance = summNetIncome - summExpenses,
			result = currentBalance - (daysRest * fact)

		switch(limitName) {
			case 'base':
				return (
					<div>
						<p>Your income is ${summNetIncome} for the selected period.</p>
						<p>The full period includes {daysTotal} days.</p>
						<p>You should have spent no more than ${base} a day.</p>
						<p>This is your base limit for a full period.</p>
					</div>

				)

			case 'corrected':
				return (
					<div>
						<p>You spent ${summExpenses} for the past period from {begin} to {lastDateWithExpense}.</p>
						<p>Your current balance is ${currentBalance} for remaining period {daysRest} days.</p>
						<p>Now you can not spend more than ${corrected} a day.</p>
						<p>This is your corrected limit which should be followed in the remainder of the period.</p>
					</div>
				)

			case 'fact':
				return (
					<div>
						<p>You spent ${summExpenses} for the past period from {begin} to {lastDateWithExpense}.</p>
						<p>It is ${fact} for a day in average.</p>
						<p>If you will spend ${fact} in day for remaining period {daysRest} days,
							expected balance wil be ${result} on end of period.</p>
						<p>It is recommended to adhere to the corrected limit ${corrected} for a day.</p>
					</div>
				)

			default:
				return ''
		}
	}
}