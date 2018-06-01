import ShowNotification from '../ui/ShowNotification'
import { bindActionCreators as action } from 'redux'
import { connect } from 'react-redux'

import { hideNotification } from '../../actions'

const mapStateToProps = (state, ownProps) => {

    return {
        show: state.notifications.show,
        message: state.notifications.message
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onClose: action(hideNotification, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowNotification)