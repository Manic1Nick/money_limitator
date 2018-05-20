import { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'

import LimitDialog from './LimitDialog'

export default class LimitsBlock extends Component {

	constructor() {
		super()
		this.state = { activeLimit: '' }
	}

	handleOpenDialog(limitName) {
		this.setState({ activeLimit: limitName })
	}

	handleCloseDialog() {
		this.setState({ activeLimit: '' })
	}

	render() {

		const { activeLimit } = this.state,
			{ base, corrected, fact } = this.props.limits,
			limitLabel = {
				'base': `Base ${base} in day`,
				'corrected': `Corrected ${corrected} in day`,
				'fact': `Fact ${fact} in day`
			},
			limitsData = this.props

		return (
			<div className='LimitsBlock'>
				<div className='limits__title'>
					<span>LIMITS:</span>
				</div>
				<RaisedButton 
					className='limits__button'
					label={ limitLabel.base } 
					primary={true} 
					onClick={ () => this.handleOpenDialog('base') }
				/>
				<RaisedButton 
					className='limits__button'
					label={ limitLabel.corrected } 
					backgroundColor="#9932CC" 
					labelColor="#FFFFFF" 
					onClick={ () => this.handleOpenDialog('corrected') }
				/>
				<RaisedButton 
					className='limits__button'
					label={ limitLabel.fact } 
					backgroundColor="#FF6347" 
					labelColor="#FFFFFF" 
					onClick={ () => this.handleOpenDialog('fact') }
				/>
				
				<LimitDialog
					open={ activeLimit !== '' }
					activeLimit={ activeLimit }
					limitsData={ limitsData }
					modal={ false }
					closeDialog={ this.handleCloseDialog.bind(this) }
				/>
			</div>
		)
	}
}