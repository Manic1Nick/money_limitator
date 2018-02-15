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

const mapStateToProps = (state, ownProps) => {
    return {
    	period: state.period,
    	incomes: state.incomes,
    	expenses: state.expenses,
    	summs: state.summs,
    	limits: state.limits,
    	notIncluded: state.notIncluded
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