import { PropTypes } from 'prop-types'

import HeadPeriod from './HeadPeriod'
import HeadResult from './HeadResult'
import HeadMoney from './HeadMoney'
import Limits from './Limits'

const HeadBlock = (props) => {

	const { 
		period={}, 
		incomes={}, 
		expenses={}, 
		notIncluded={}, 
		summs={},
		limits={},
		daysTotal=0,
    	daysDone=0,
    	daysRest=0,
    	lastDateWithExpense='',
		addSumm=f=>f,
		deleteSumm=f=>f
	} = props

	return(
		<div className='HeadBlock'>
			<div className='HeadBlock__PeriodResultMoney'>			
				<div className='HeadBlock__PeriodResult'>
					<HeadPeriod 
						period={ period }
					/>
					<HeadResult 
						period={ period }
						incomes={ incomes }
						expenses={ expenses }
						summs={ summs }
						limits={ limits }
					/>
				</div>
				<HeadMoney
					period={ period }
					incomes={ incomes }
					expenses={ expenses }
					notIncluded={ notIncluded }
					summs={ summs }
					addSumm={ addSumm }
					deleteSumm={ deleteSumm }
					daysRest={ daysRest }
					daysDone={ daysDone }
				/>
			</div>

			<Limits 
				limits={ limits }
				summs={ summs }
				period={ period }
				daysTotal={ daysTotal }
				daysDone={ daysDone }
				daysRest={ daysRest }
				lastDateWithExpense={ lastDateWithExpense }
			/>
		</div>		
	)
}

HeadBlock.propTypes = {
	period: PropTypes.object,
	incomes: PropTypes.object,
	expenses: PropTypes.object,
	notIncluded: PropTypes.object,
	summs: PropTypes.object,
	limits: PropTypes.object,
	addSumm: PropTypes.func,
	deleteSumm: PropTypes.func,
	daysTotal: PropTypes.number,
	daysDone: PropTypes.number,
	daysRest: PropTypes.number,
	lastDateWithExpense: PropTypes.string
}

export default HeadBlock