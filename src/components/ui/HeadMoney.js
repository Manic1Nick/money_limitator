import { PropTypes } from 'prop-types'
import { Component } from 'react'

import HeadMoneyAction from './HeadMoneyAction'
import DialogBalanceInfo from './DialogBalanceInfo'

import { concatIncomesAndExpenses } from '../../util/CalcUtil'
import { getDaysInPeriod, getLastDateWithSumm } from '../../util/DateUtil'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'

export default class HeadMoney extends Component {

	constructor() {
		super()
		this.state = { openBalanceInfo: false }
	}

	handleOpenDialog() {
		this.setState({ openBalanceInfo: true })
	}

	handleCloseDialog() {
		this.setState({ openBalanceInfo: false })
	}

	render() {

		const { 
			incomes={}, 
			expenses={}, 
			notIncluded={}, 
			summs: {
				summIncomes, summExpenses, summNotIncluded
			},
			daysRest=0,
			addSumm=f=>f,
			deleteSumm=f=>f
		} = this.props,

		limitsData = this.props,

		{ openBalanceInfo } = this.state
	
		let labelIncomes = `incomes: ${ summIncomes - summNotIncluded }`,
			labelExpenses = `expenses: ${ summExpenses }`,
			labelSumm = `balance: ${ summIncomes - summNotIncluded - summExpenses } / days: ${ daysRest }`
	
		return (
			<Paper className='HeadMoney' zDepth={1}>
				<HeadMoneyAction
					listName="Incomes"
					label={ labelIncomes }
					listSumms={ concatIncomesAndExpenses(incomes, notIncluded) }
					addSumm={ addSumm }
					deleteSumm={ deleteSumm }
				/>
				<Divider />
				
				<HeadMoneyAction 
					listName="Expenses"
					label={ labelExpenses }
					listSumms={ expenses }
					addSumm={ addSumm }
					deleteSumm={ deleteSumm }
				/>
				<Divider />
				
				<FlatButton
					className='HeadMoney__button'
					label={ labelSumm }
					onClick={ () => this.handleOpenDialog() }
				/>
	
				<DialogBalanceInfo
					open={ openBalanceInfo }
					limitsData={ limitsData }
					modal={ false }
					closeDialog={ this.handleCloseDialog.bind(this) }
				/>
			</Paper>
		)
	}
}

HeadMoney.propTypes = {
	period: PropTypes.object,
	incomes: PropTypes.object,
	expenses: PropTypes.object,
	notIncluded: PropTypes.object,
	summs: PropTypes.object,
	daysRest: PropTypes.number,
	daysDone: PropTypes.number,
	addSumm: PropTypes.func,
	deleteSumm: PropTypes.func
}