import { PropTypes } from 'prop-types'
import { Component } from 'react'
import classNames from 'classnames'

import ListSumms from './ListSumms'
import BalanceInfo from './BalanceInfo'

import { concatIncomesAndExpenses } from '../../util/CalcUtil'
import { getDaysInPeriod, getLastDateWithSumm } from '../../util/DateUtil'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'

export default class ListsSumms extends Component {

	render() {

		const {props} = this.props,
		{ 
			incomes={}, 
			expenses={}, 
			notIncluded={}, 
			summs={},
			daysRest=0,
			addSumm=f=>f,
			deleteSumm=f=>f
		} = props,
		{ summIncomes, summExpenses, summNotIncluded } = summs
	
		let labelIncomes = `incomes: ${ summIncomes - summNotIncluded }`,
			labelExpenses = `expenses: ${ summExpenses }`
	
		return (
			<Paper className='ListsSumms' zDepth={1}>
				<ListSumms
					listName="Incomes"
					label={ labelIncomes }
					listSumms={ concatIncomesAndExpenses(incomes, notIncluded) }
					addSumm={ addSumm }
					deleteSumm={ deleteSumm }
				/>
				<Divider />
				
				<ListSumms
					listName="Expenses"
					label={ labelExpenses }
					listSumms={ expenses }
					addSumm={ addSumm }
					deleteSumm={ deleteSumm }
				/>
				<Divider />
	
				<BalanceInfo
					props={ props }
				/>
			</Paper>
		)
	}
}

ListsSumms.propTypes = {
	props: PropTypes.object
}