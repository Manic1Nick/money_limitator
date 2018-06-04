import { PropTypes } from 'prop-types'
import { Component } from 'react'

import IndicatorPeriod from './indicators/IndicatorPeriod'
import IndicatorResult from './indicators/IndicatorResult'
import ListsSummsIndicators from './indicators/ListsSummsIndicators'
import LimitsIndicators from './indicators/LimitsIndicators'
import ListsSummsActions from './ListsSummsActions'
import DialogInputSumm from './dialogs/DialogInputSumm'

import { concatIncomesAndExpenses } from '../../util/CalcUtil'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'

export default class MonitorIndicators extends Component {

	constructor() {
		super()
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

		const { inputSummOpening, inputSummIsExpense } = this.state
	
		return(
			<div className='MonitorIndicators'>
				<div className='MonitorIndicators__head'>			
					<div className='MonitorIndicators__PeriodResult'>
						<IndicatorPeriod 
							period={ period }
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
						/>
						<ListsSummsActions 
							inputNewSumm={ this.openInputSumm }
						/>
					</div>

					<DialogInputSumm
                	    open={ inputSummOpening }
                	    isExpense={ inputSummIsExpense }
                	    listSumms={ inputSummIsExpense ? expenses : incomes }
                	    addSumm={ addSumm }
                	    onClose={ this.closeInputSumm }
                	/>
				</div>
	
				<LimitsIndicators 
					className='MonitorIndicators__limits'
					limitsData={ this.props }
				/>
			</div>		
		)
	}
}

MonitorIndicators.propTypes = {
	props: PropTypes.object
}