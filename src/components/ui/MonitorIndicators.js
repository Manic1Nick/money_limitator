import { PropTypes } from 'prop-types'
import { Component } from 'react'

import IndicatorPeriod from './indicators/IndicatorPeriod'
import IndicatorResult from './indicators/IndicatorResult'
import ListsSummsIndicators from './indicators/ListsSummsIndicators'
import LimitsIndicators from './indicators/LimitsIndicators'
import ListsSummsActions from './ListsSummsActions'
import DialogInputSumm from './dialogs/DialogInputSumm'

export default class MonitorIndicators extends Component {

	constructor(props) {
		super(props)
		this.state = { 
			inputSummOpening: false,
			inputSummIsExpense: true	
		}
	}

	openInputSumm = (isExpense) => {
		this.setState({ 
			inputSummOpening: true,
			inputSummIsExpense: isExpense 
		})
	}

	closeInputSumm = () => {
		this.setState({ inputSummOpening: false })
	}

	render() {

		const { 
			period={}, //
			incomes={}, //
			expenses={}, //
			notIncluded={}, 
			summs={},//
			limits={},//
			addSumm=f=>f//
		} = this.props

		const { inputSummOpening, inputSummIsExpense } = this.state,
			{ screenSize } = this.props
	
		return(
			<div className='MonitorIndicators'>
				<div className='MonitorIndicators__head'>			
					<div className='MonitorIndicators__PeriodResult'>
						<IndicatorPeriod 
							period={ period }
							screenSize={ screenSize }
						/>
						<IndicatorResult 
							period={ period }
							incomes={ incomes }
							expenses={ expenses }
							summs={ summs }
							limits={ limits }
						/>
					</div>
	
					<div className='MonitorIndicators__SummsActions'>
						<ListsSummsIndicators
							data={ this.props }
							inputNewSumm={ this.openInputSumm }
							screenSize={ screenSize }
						/>
						<ListsSummsActions 
							inputNewSumm={ this.openInputSumm }
						/>
					</div>

					<LimitsIndicators 
						className='MonitorIndicators__Limits'
						limitsData={ this.props }
						screenSize={ screenSize }
					/>
				</div>
	
				<DialogInputSumm
					open={ inputSummOpening }
					period={ period }
                    isExpense={ inputSummIsExpense }
                    listSumms={ inputSummIsExpense ? expenses : incomes }
                    addSumm={ addSumm }
                    onClose={ this.closeInputSumm }
                />
			</div>		
		)
	}
}

MonitorIndicators.propTypes = {
	props: PropTypes.object
}