import { Component } from 'react'

import IndicatorLimit from './IndicatorLimit'
import DialogLimitInfo from '../dialogs/DialogLimitInfo'
import DialogLimits from '../dialogs/DialogLimits'

import { COLORS_LIMITS as COLORS } from '../../../constants'
import { LIMITS_NAMES as LIMITS } from '../../../constants'

export default class LimitsIndicators extends Component {

	constructor() {
		super()
		this.state = { 
			activeLimit: '', //if has value => open Dialog LimitInfo
			openChartLimits: false
		}
	}

	handleOpenDialogLimitInfo(limitName) {
		this.setState({ activeLimit: limitName })
	}

	handleCloseDialogLimitInfo() {
		this.setState({ activeLimit: '' })
	}

	handleOpenDialogLimits() {
		this.setState({ openChartLimits: true })
	}

	handleCloseDialogLimits() {
		this.setState({ openChartLimits: false })
	}

	render() {

		const { activeLimit, openChartLimits } = this.state,
			{ limitsData } = this.props,
			{ limits } = limitsData

		let limitsLabels = {
				'base': `Base ${limits.base} in day`,
				'corrected': `Corrected ${limits.corrected} in day`,
				'fact': `Fact ${limits.fact} in day`
			},
			styleTitle = { color: `${COLORS.title}` }

		return (
			<div className='Limits'>
				<div className='Limits__title' style={ styleTitle }>
					<span onClick={ () => this.handleOpenDialogLimits() } >
						LIMITS:
					</span>
				</div>
				<div className='Limits__buttons'>
					{
						LIMITS.map((limitName, index) => 
							<IndicatorLimit
								key={ index }
								name={ limitName }
								label={ limitsLabels[limitName] }
								onOpenLimitInfo={ this.handleOpenDialogLimitInfo.bind(this) }
							/>
						)
					}
				</div>
				
				<DialogLimitInfo
					open={ activeLimit !== '' }
					activeLimit={ activeLimit }
					limitsData={ limitsData }
					modal={ false }
					closeDialog={ this.handleCloseDialogLimitInfo.bind(this) }
				/>

				<DialogLimits 
					open={ openChartLimits }
					limits={ limits }
					modal={ false }
					closeDialog={ this.handleCloseDialogLimits.bind(this) }
				/>
			</div>
		)
	}
}