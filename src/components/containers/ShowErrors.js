import ShowErrors from '../ui/ShowErrors'
import { connect } from 'react-redux'
import { bindActionCreators as action } from 'redux'
import { clearError, clearAllErrors } from '../../actions'

const mapStateToProps = (state) => {
	return {
		errors: state.errors
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onClearError: action(clearError, dispatch),
		onClearAllErrors: action(clearAllErrors, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowErrors)