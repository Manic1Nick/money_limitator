import { PropTypes } from 'prop-types'

import ButtonAddNewSumm from './buttons/ButtonAddNewSumm'

const ListsSummsActions = ({ inputNewSumm=f=>f }) =>
    <div className='ListsActions'>
	    <ButtonAddNewSumm
	    	isExpense={ false }
			inputNewSumm={ inputNewSumm }
	    />
	    <ButtonAddNewSumm
	    	isExpense={ true }
			inputNewSumm={ inputNewSumm }
	    />
    </div>

ListsSummsActions.propTypes = {
	inputNewSumm: PropTypes.func
}

export default ListsSummsActions