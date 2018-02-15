import { PropTypes } from 'prop-types'

import HeadPeriod from './HeadPeriod'
import HeadResult from './HeadResult'
import HeadMoney from './HeadMoney'

const HeadBlock = (props) => {

	const { 
		period={}, 
		incomes={}, 
		expenses={}, 
		notIncluded={}, 
		summs={},
		limits={},
		addSumm=f=>f,
		deleteSumm=f=>f
	} = props

	return(
		<div className='HeadBlock'>
			<div className='HeadControl'>
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
				incomes={ incomes }
				expenses={ expenses }
				notIncluded={ notIncluded }
				summs={ summs }
				addSumm={ addSumm }
				deleteSumm={ deleteSumm }
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
	deleteSumm: PropTypes.func
}

export default HeadBlock