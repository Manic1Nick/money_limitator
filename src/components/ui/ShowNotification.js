import PropTypes from 'prop-types'

import Snackbar from 'material-ui/Snackbar'

const ShowNotification = ({ show=false, message='', onClose=f=>f }) =>
	<Snackbar
		open={ show }
		message={ message }
		autoHideDuration={ 3000 }
		onRequestClose={ onClose }
	/>

ShowNotification.propTypes = {
	show: PropTypes.bool,
	message: PropTypes.string,
	onClose: PropTypes.func
}

export default ShowNotification