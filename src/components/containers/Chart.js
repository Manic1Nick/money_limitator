import Chart from '../ui/Chart'
import { bindActionCreators as action } from 'redux'
import { connect } from 'react-redux'

import { createDataChart } from '../../util/ChartUtil'

const mapStateToProps = (state, ownProps) => {

    return {
    	data: createDataChart(state)
    }
}

export default connect(mapStateToProps)(Chart)