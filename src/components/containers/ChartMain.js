import ChartMain from '../ui/ChartMain'
import { bindActionCreators as action } from 'redux'
import { connect } from 'react-redux'

import { createDataChart } from '../../util/ChartUtil'

const mapStateToProps = (state, ownProps) => {

    return {
    	data: createDataChart(state)
    }
}

export default connect(mapStateToProps)(ChartMain)