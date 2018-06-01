import { PropTypes } from 'prop-types'

import HeadPeriod from './HeadPeriod'
import HeadResult from './HeadResult'
import ListsSumms from './ListsSumms'
import ListsActions from './ListsActions'
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
			<div className='HeadBlock__main'>			
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

				<div className='HeadBlock__SummsActions'>
					<ListsSumms
						props={ props }
					/>
					<ListsActions
						props={ props }
					/>
				</div>
			</div>

			<div className='HeadBlock__limits'>
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
		</div>		
	)
}

HeadBlock.propTypes = {
	props: PropTypes.object
}

export default HeadBlock