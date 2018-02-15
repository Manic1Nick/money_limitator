import { PropTypes } from 'prop-types'

import HeadMoneyAction from './HeadMoneyAction'
import CalcUtil from '../../util/CalcUtil'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'

const HeadMoney = (props) => {

	const { 
		incomes={}, 
		expenses={}, 
		notIncluded={}, 
		summs={},
		addSumm=f=>f,
		deleteSumm=f=>f
	} = props

	let labelIncomes = `incomes: ${ summs.incomes - summs.notIncluded }`,
		labelExpenses = `expenses: ${ summs.expenses }`,
		labelSumm = `rest of money: ${ summs.incomes - summs.notIncluded - summs.expenses }`

	return (
		<Paper className='HeadMoney' zDepth={1}>
			<HeadMoneyAction
				listName="Incomes"
				label={ labelIncomes }
				listSumms={ CalcUtil.concatIncomesAndExpenses(incomes, notIncluded) }
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
            />
		</Paper>
	)
}

HeadMoney.propTypes = {
	incomes: PropTypes.object,
	expenses: PropTypes.object,
	notIncluded: PropTypes.object,
	summs: PropTypes.object,
	addSumm: PropTypes.func,
	deleteSumm: PropTypes.func
}

export default HeadMoney