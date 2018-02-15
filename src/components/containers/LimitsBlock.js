import LimitsBlock from '../ui/LimitsBlock'
import { bindActionCreators as action } from 'redux'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
    return {
    	limits: state.limits
    }
}

export default connect(mapStateToProps)(LimitsBlock)