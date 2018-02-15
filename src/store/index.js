import appReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import C from '../constants'
import DateUtil from '../util/DateUtil'
import CalcUtil from '../util/CalcUtil'

const consoleMessages = store => next => action => {

	let result

	console.groupCollapsed(`dispatching action => ${action.type}`)
	result = next(action)

	let { incomes, expenses, summs, limits, errors } = store.getState()

	console.log(`

		incomes: ${Object.keys(incomes).length}
		expenses: ${Object.keys(expenses).length}
		summs: ${summs.incomes} ${summs.expenses} ${summs.notIncluded}
		limits: ${limits.base} ${limits.corrected} ${limits.fact}
		errors: ${errors.length}

	`)

	console.groupEnd()

	return result
}

export default (initialState={}) => {
	return createStore(
		appReducer, 
		initialState,
		applyMiddleware(
			reduxThunk, 
			consoleMessages
		)
	)
}
