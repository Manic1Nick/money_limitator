import LimitsBlock from '../ui/LimitsBlock'
import { bindActionCreators as action } from 'redux'
import { connect } from 'react-redux'

import DateUtil from '../../util/DateUtil'

const mapStateToProps = (state, ownProps) => {

	const lastDateWithExpense = DateUtil.getLastDate(state.expenses),
		daysTotal = DateUtil.getDaysInPeriod(state.period),
        daysDone = DateUtil.getDaysInPeriod({ 
            begin: state.period.begin, end: lastDateWithExpense,  
        }),
		daysRest = DateUtil.getDaysInPeriod({ 
            begin: lastDateWithExpense, end: state.period.end,  
        })

    return {
    	limits: state.limits,
    	summs: state.summs,
    	period: state.period,
    	daysTotal,
    	daysDone,
    	daysRest: daysRest - 1,
    	lastDateWithExpense
    }
}

export default connect(mapStateToProps)(LimitsBlock)