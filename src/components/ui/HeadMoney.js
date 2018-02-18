import { PropTypes } from 'prop-types'

import HeadMoneyAction from './HeadMoneyAction'
import CalcUtil from '../../util/CalcUtil'
import DateUtil from '../../util/DateUtil'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'

const HeadMoney = (props) => {

	const { 
		period={},
		incomes={}, 
		expenses={}, 
		notIncluded={}, 
		summs={},
		addSumm=f=>f,
		deleteSumm=f=>f
	} = props

	let daysRest = DateUtil.getDaysInPeriod({ 
    	    begin: DateUtil.getLastDate(expenses), 
    	    end: period.end,  
    	}),
		labelIncomes = `incomes: ${ summs.incomes - summs.notIncluded }`,
		labelExpenses = `expenses: ${ summs.expenses }`,
		labelSumm = `balance: ${ summs.incomes - summs.notIncluded - summs.expenses } / days: ${ --daysRest }`

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
	period: PropTypes.object,
	incomes: PropTypes.object,
	expenses: PropTypes.object,
	notIncluded: PropTypes.object,
	summs: PropTypes.object,
	addSumm: PropTypes.func,
	deleteSumm: PropTypes.func
}

export default HeadMoney