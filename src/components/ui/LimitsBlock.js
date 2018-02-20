import { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class LimitsBlock extends Component {

	constructor(props) {
		super()
		this.state = {
			limits: props.limits,
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
        	  	{ this._generateDialogText(activeLimit) }
        	</Dialog>
		)
	}

	render() {		
		return (
			<div className='LimitsBlock'>
				<div className='limits__title'>
					<span>LIMITS:</span>
				</div>
				<RaisedButton 
					className='limits__button'
					label={ this._generateLimitLable('base') } 
					primary={true} 
					onClick={ () => this.handleOpenDialog('base') }
				/>
				<RaisedButton 
					className='limits__button'
					label={ this._generateLimitLable('corrected') } 
					backgroundColor="#9932CC" 
					labelColor="#FFFFFF" 
					onClick={ () => this.handleOpenDialog('corrected') }
				/>
				<RaisedButton 
					className='limits__button'
					label={ this._generateLimitLable('fact') } 
					backgroundColor="#FF6347" 
					labelColor="#FFFFFF" 
					onClick={ () => this.handleOpenDialog('fact') }
				/>
				{ this.renderDialog() }
			</div>
		)
	}

	_generateLimitLable(limitName) {
		const { base, corrected, fact } = this.state.limits

		switch(limitName) {
			case 'base':
				return `Base ${base} in day`

			case 'corrected':
				return `Corrected ${corrected} in day`

			case 'fact':
				return `Fact ${fact} in day`

			default:
				return ''
		}
	}

	_generateDialogText(limitName) {
		const { base, corrected, fact } = this.state.limits,
			{ period, summs, daysTotal, daysDone, daysRest, lastDateWithExpense } = this.props,
			summNetIncome = summs.incomes - summs.notIncluded,
			currentBalance = summNetIncome - summs.expenses,
			result = currentBalance - (daysRest * fact)

		switch(limitName) {
			case 'base':
				return (
					<div>
						<p>Your income is {summNetIncome} for the selected period.</p>
						<p>The full period includes {daysTotal} days.</p>
						<p>You should have spent no more than {base} a day.</p>
						<p>This is your base limit for a full period.</p>
					</div>

				)

				/*`
					Your income is ${ summNetIncome } for the selected period.
					The full period includes ${ daysTotal } days.
					You should have spent no more than ${ base } a day.
					This is your base limit for a full period.
				`*/

			case 'corrected':
				return (
					<div>
						<p>You spent {summs.expenses} for the past period from {period.begin} to {lastDateWithExpense}.</p>
						<p>Your current balance is {currentBalance} for remaining period {daysRest} days.</p>
						<p>Now you can not spend more than {corrected} a day.</p>
						<p>This is your corrected limit which should be followed in the remainder of the period.</p>
					</div>
				)

				/*`
					You spent ${ summs.expenses } for the past period from ${ period.begin } to ${ lastDateWithExpense }.
					Your current balance is ${ currentBalance } for remaining period ${ daysRest } days.
					Now you can not spend more than ${ corrected } a day.
					This is your corrected limit which should be followed in the remainder of the period.
				`*/

			case 'fact':
				return (
					<div>
						<p>You spent {summs.expenses} for the past period from {period.begin} to {lastDateWithExpense}.</p>
						<p>It is {fact} for a day in average.</p>
						<p>If you will spend {fact} in day for remaining period {daysRest} days,
							expected balance wil be {result} on end of period.</p>
						<p>It is recommended to adhere to the corrected limit {corrected} for a day.</p>
					</div>
				)
				
				/*`
					You spent ${ summs.expenses } for the past period from ${ period.begin } to ${ lastDateWithExpense }.
					It is ${ fact } for a day in average.
					If you will spend ${ fact } in day for remaining period ${ daysRest } days,
					expected balance wil be ${ result } on end of period.
					It is recommended to adhere to the corrected limit ${ corrected } for a day.
				`*/

			default:
				return ''
		}
	}
	
}