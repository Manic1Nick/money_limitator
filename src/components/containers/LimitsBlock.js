import LimitsBlock from '../ui/LimitsBlock'
import { bindActionCreators as action } from 'redux'
import { connect } from 'react-redux'

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
    	limits: state.limits,
    	summs: state.summs,
    	period: state.period,
    	daysTotal,
    	daysDone,
    	daysRest,
    	lastDateWithExpense
    }
}

export default connect(mapStateToProps)(LimitsBlock)