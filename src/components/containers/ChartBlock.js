import ChartBlock from '../ui/ChartBlock'
import { bindActionCreators as action } from 'redux'
import { connect } from 'react-redux'

import { createArrayDates } from '../../util/DateUtil'
import { createDataChart } from '../../util/ChartUtil'

import { addNewExpense, deleteExpense } from '../../actions'

const mapStateToProps = (state, ownProps) => {

    const { begin, end } = state.period, 
        dates = createArrayDates(begin, end)

    return {
        dates,
        expenses: state.expenses,
    	data: createDataChart(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
		addSumm: action(addNewExpense, dispatch),
		deleteSumm: action(deleteExpense, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartBlock)