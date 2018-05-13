import { PropTypes } from 'prop-types'

import HeadMoneyAction from './HeadMoneyAction'
import { concatIncomesAndExpenses } from '../../util/CalcUtil'
import { getDaysInPeriod, getLastDateWithSumm } from '../../util/DateUtil'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'

const HeadMoney = (props) => {

	const { 
		period={},
		incomes={}, 
		expenses={}, 
		notIncluded={}, 
		summs: {
			summIncomes, summExpenses, summNotIncluded
		},
		addSumm=f=>f,
		deleteSumm=f=>f
	} = props

	let daysRest = getDaysInPeriod({ 
    	    begin: getLastDateWithSumm(expenses), 
    	    end: period.end,  
    	}),
		labelIncomes = `incomes: ${ summIncomes - summNotIncluded }`,
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