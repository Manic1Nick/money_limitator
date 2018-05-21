import HeadBlock from '../ui/HeadBlock'
import { bindActionCreators as action } from 'redux'
import { connect } from 'react-redux'

import { 
	addNewIncome, 
	addNewExpense, 
	addNotIncluded,
	deleteIncome, 
	deleteExpense, 
	deleteNotIncluded 
} from '../../actions'

import {
	getLastDate,
	getDaysInPeriod
} from '../../util/DateUtil'

const mapStateToProps = (state, ownProps) => {

	const lastDateWithExpense = getLastDate(state.expenses),
		daysTotal = getDaysInPeriod(state.period),
		daysDone = getDaysInPeriod({ 
			begin: state.period.begin, end: lastDateWithExpense,  
		}),
		daysRest = getDaysInPeriod({ 
			begin: lastDateWithExpense, end: state.period.end,  
		}) - 1

    return {
    	period: state.period,
    	incomes: state.incomes,
    	expenses: state.expenses,
    	summs: state.summs,
    	limits: state.limits,
		notIncluded: state.notIncluded,
    	daysTotal,
    	daysDone,
    	daysRest,
    	lastDateWithExpense
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		addSumm(summ) {
			if (!summ.isExpense) dispatch(addNewIncome(summ))
			else if (!summ.notIncluded) dispatch(addNewExpense(summ))
			else dispatch(addNotIncluded(summ))
		},
		deleteSumm(summ) {
			if (!summ.isExpense) dispatch(deleteIncome(summ))
			else if (!summ.notIncluded) dispatch(deleteExpense(summ))
			else dispatch(deleteNotIncluded(summ))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HeadBlock)