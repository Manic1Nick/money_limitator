import { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'

import DialogLimitInfo from './DialogLimitInfo'
import DialogLimits from './DialogLimits'

export default class Limits extends Component {

	constructor() {
		super()
		this.state = { 
			activeLimit: '',
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
			{ limits } = this.props,
			limitLabel = {
				'base': `Base ${limits.base} in day`,
				'corrected': `Corrected ${limits.corrected} in day`,
				'fact': `Fact ${limits.fact} in day`
			},
			limitsData = this.props

		return (
			<div className='Limits'>
				<div className='limits__title'>
					<span onClick={ () => this.handleOpenDialogLimits() }>
						LIMITS:
					</span>
				</div>
				<RaisedButton 
					className='limits__button'
					label={ limitLabel.base } 
					primary={true} 
					onClick={ () => this.handleOpenDialogLimitInfo('base') }
				/>
				<RaisedButton 
					className='limits__button'
					label={ limitLabel.corrected } 
					backgroundColor="#9932CC" 
					labelColor="#FFFFFF" 
					onClick={ () => this.handleOpenDialogLimitInfo('corrected') }
				/>
				<RaisedButton 
					className='limits__button'
					label={ limitLabel.fact } 
					backgroundColor="#FF6347" 
					labelColor="#FFFFFF" 
					onClick={ () => this.handleOpenDialogLimitInfo('fact') }
				/>
				
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