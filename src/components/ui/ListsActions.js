import { PropTypes } from 'prop-types'
import { Component } from 'react'
import classNames from 'classnames'

import ListAction from './ListAction'

import { concatIncomesAndExpenses } from '../../util/CalcUtil'

export default class ListsActions extends Component {

	render() {

		const { props } = this.props,
			{ 
				incomes={}, 
				expenses={}, 
				notIncluded={}, 
				summs: {
					summIncomes, summExpenses, summNotIncluded
				},
				addSumm=f=>f
			} = props
		
		return (
            <div className='ListsActions'>
			    <ListAction
			    	listName="Incomes"
			    	listSumms={ concatIncomesAndExpenses(incomes, notIncluded) }
			    	addSumm={ addSumm }
			    />
			    <ListAction
			    	listName="Expenses"
			    	listSumms={ expenses }
			    	addSumm={ addSumm }
			    />
            </div>
		)
	}
}

ListsActions.propTypes = {
	props: PropTypes.object
}