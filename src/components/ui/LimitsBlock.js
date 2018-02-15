import { PropTypes } from 'prop-types'

import RaisedButton from 'material-ui/RaisedButton'

const LimitsBlock = ({ limits={} }) => {
	
	let labelBase = `Base ${limits.base} in day`,
		labelCorrected = `Corrected ${limits.corrected} in day`,
		labelFact = `Fact ${limits.fact} in day`

	return (
		<div className='LimitsBlock'>
			<div className='limits__title'>
				<span>LIMITS:</span>
			</div>
			<RaisedButton 
				className='limits__button'
				label={labelBase} 
				primary={true} 
			/>
			<RaisedButton 
				className='limits__button'
				label={labelCorrected} 
				backgroundColor="#9932CC" 
				labelColor="#FFFFFF" 
			/>
			<RaisedButton 
				className='limits__button'
				label={labelFact} 
				backgroundColor="#FF6347" 
				labelColor="#FFFFFF" 
			/>
		</div>
	)
}

LimitsBlock.propTypes = {
	limits: PropTypes.object
}

export default LimitsBlock