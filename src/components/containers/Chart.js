import Chart from '../ui/Chart'
import { bindActionCreators as action } from 'redux'
import { connect } from 'react-redux'

import ChartUtil from '../../util/ChartUtil'

const mapStateToProps = (state, ownProps) => {

    return {
    	data: ChartUtil.createDataChart(state)
    }
}

export default connect(mapStateToProps)(Chart)